// Comprehensive test script to verify Sahayak AI Express + SQLite Backend API
const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- Starting Backend API Test Suite ---');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name} ->`, err.message);
      failed++;
    }
  }

  // 1. Health check
  await test('GET /health', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    const json = await res.json();
    if (json.status !== 'ok' || !json.database.includes('SQLite')) {
      throw new Error(`Unexpected health response: ${JSON.stringify(json)}`);
    }
  });

  // 2. Products - List
  let initialCount = 0;
  await test('GET /products (seeded MSME catalog)', async () => {
    const res = await fetch(`${BASE_URL}/products`);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data) || json.data.length === 0) {
      throw new Error(`Failed to list products: ${JSON.stringify(json)}`);
    }
    initialCount = json.data.length;
    console.log(`   Found ${initialCount} products in SQLite.`);
  });

  // 3. Products - Create
  const testProdId = `test-prod-${Date.now()}`;
  await test('POST /products (create new inventory item)', async () => {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: testProdId,
        name: 'Tata Salt',
        hindiName: 'टाटा नमक',
        aliases: ['salt', 'namak', 'tata namak'],
        quantity: 50,
        unit: 'packets',
        price: 28,
        lowStockThreshold: 10,
        category: 'Spices & Essentials'
      })
    });
    const json = await res.json();
    if (!json.success || json.data.name !== 'Tata Salt' || json.data.quantity !== 50) {
      throw new Error(`Failed to create product: ${JSON.stringify(json)}`);
    }
  });

  // 4. Sales - Record sale & verify stock reduction
  await test('POST /sales (record transaction and update stock)', async () => {
    const res = await fetch(`${BASE_URL}/sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: testProdId,
        productName: 'Tata Salt',
        quantity: 5,
        unit: 'packets',
        unitPrice: 28,
        amount: 140
      })
    });
    const json = await res.json();
    if (!json.success || json.data.amount !== 140) {
      throw new Error(`Failed to record sale: ${JSON.stringify(json)}`);
    }

    // Verify stock is now 50 - 5 = 45
    const prodRes = await fetch(`${BASE_URL}/products/${testProdId}`);
    const prodJson = await prodRes.json();
    if (prodJson.data.quantity !== 45) {
      throw new Error(`Expected product quantity to be 45, got ${prodJson.data.quantity}`);
    }
    console.log(`   Stock correctly reduced from 50 to 45.`);
  });

  // 5. Sales - Stats summary
  await test('GET /sales/stats (daily & total revenue summary)', async () => {
    const res = await fetch(`${BASE_URL}/sales/stats`);
    const json = await res.json();
    if (!json.success || json.data.today.totalRevenue < 140) {
      throw new Error(`Sales stats incorrect: ${JSON.stringify(json)}`);
    }
    console.log(`   Today revenue: ₹${json.data.today.totalRevenue}, transactions: ${json.data.today.totalTransactions}`);
  });

  // 6. Auth - Login
  await test('POST /auth/login (verify phone + PIN)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '9876543210',
        pin: '1234'
      })
    });
    const json = await res.json();
    if (!json.success || json.data.ownerName !== 'Ramesh Kumar') {
      throw new Error(`Failed login: ${JSON.stringify(json)}`);
    }
    console.log(`   Authenticated user: ${json.data.ownerName} (${json.data.shopName})`);
  });

  // 7. Wholesale - Distributors & Orders
  await test('GET /wholesale/distributors and POST /wholesale/orders', async () => {
    const distRes = await fetch(`${BASE_URL}/wholesale/distributors`);
    const distJson = await distRes.json();
    if (!distJson.success || distJson.data.length === 0) {
      throw new Error(`Distributors listing failed: ${JSON.stringify(distJson)}`);
    }

    const orderRes = await fetch(`${BASE_URL}/wholesale/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        distributorName: 'Shree Ganesh FMCG Wholesalers',
        distributorPhone: '9820011223',
        items: [
          { productId: testProdId, productName: 'Tata Salt', quantity: 100, unit: 'packets' }
        ],
        notes: 'Deliver before 10 AM counter opening'
      })
    });
    const orderJson = await orderRes.json();
    if (!orderJson.success || orderJson.data.items.length !== 1) {
      throw new Error(`Wholesale order creation failed: ${JSON.stringify(orderJson)}`);
    }
  });

  // 8. Offline-First Sync - Push & Pull
  await test('POST /sync/push and GET /sync/pull', async () => {
    const pushRes = await fetch(`${BASE_URL}/sync/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products: [
          {
            id: 'sync-test-item',
            name: 'Maggi 2-Minute Noodles',
            hindiName: 'मैगी नूडल्स',
            quantity: 40,
            unit: 'packets',
            price: 14,
            lowStockThreshold: 10,
            category: 'Snacks',
            createdAt: Date.now(),
            updatedAt: Date.now()
          }
        ]
      })
    });
    const pushJson = await pushRes.json();
    if (!pushJson.success || pushJson.synced.products !== 1) {
      throw new Error(`Sync push failed: ${JSON.stringify(pushJson)}`);
    }

    const pullRes = await fetch(`${BASE_URL}/sync/pull?since=0`);
    const pullJson = await pullRes.json();
    if (!pullJson.success || !pullJson.data.products.find(p => p.id === 'sync-test-item')) {
      throw new Error(`Sync pull failed to find pushed item`);
    }
    console.log(`   Sync push & pull verified successfully.`);
  });

  // Clean up test product
  await fetch(`${BASE_URL}/products/${testProdId}`, { method: 'DELETE' });
  await fetch(`${BASE_URL}/products/sync-test-item`, { method: 'DELETE' });

  console.log('\n--- Backend API Test Summary ---');
  console.log(`Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
