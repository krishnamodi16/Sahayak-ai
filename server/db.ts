import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'sahayak.sqlite');
console.log(`[Database] Initializing SQLite database at: ${DB_PATH}`);

export const db = new DatabaseSync(DB_PATH);

// Enable WAL mode for high concurrency and performance
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

/**
 * Initialize Tables
 */
export function initDatabaseSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      ownerName TEXT NOT NULL,
      shopName TEXT NOT NULL,
      email TEXT,
      phone TEXT UNIQUE NOT NULL,
      pin TEXT NOT NULL,
      category TEXT NOT NULL,
      language TEXT DEFAULT 'hi',
      createdAt INTEGER NOT NULL,
      lastLoginAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      hindiName TEXT,
      aliases TEXT, -- JSON array of aliases
      quantity REAL NOT NULL DEFAULT 0,
      unit TEXT NOT NULL,
      price REAL NOT NULL,
      lowStockThreshold REAL NOT NULL DEFAULT 5,
      category TEXT,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY,
      productId TEXT NOT NULL,
      productName TEXT NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT NOT NULL,
      unitPrice REAL NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS wholesale_orders (
      id TEXT PRIMARY KEY,
      distributorName TEXT NOT NULL,
      distributorPhone TEXT NOT NULL,
      items TEXT NOT NULL, -- JSON array of items
      notes TEXT,
      createdAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS distributors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      category TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      message TEXT NOT NULL,
      hindiMessage TEXT,
      timestamp INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      data TEXT NOT NULL -- JSON stringified
    );
  `);

  seedInitialData();
}

function seedInitialData() {
  // Check if users exist
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (userCount.count === 0) {
    console.log('[Database] Seeding initial MSME shopkeeper users...');
    const insertUser = db.prepare(`
      INSERT INTO users (id, ownerName, shopName, email, phone, pin, category, language, createdAt, lastLoginAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = Date.now();
    insertUser.run(
      'user-ramesh-01',
      'Ramesh Kumar',
      'Ramesh Kirana & General Store',
      'ramesh.kirana@sahayak.ai',
      '9876543210',
      '1234',
      'Kirana / Grocery (किराना स्टोर)',
      'hi',
      now - 30 * 86400000,
      now
    );

    insertUser.run(
      'user-patel-02',
      'Suresh Patel',
      'Patel Provision & Super Store',
      'suresh.patel@sahayak.ai',
      '9898989898',
      '1234',
      'Supermarket / Provision (પટેલ સ્ટોર)',
      'gu',
      now - 15 * 86400000,
      now
    );

    insertUser.run(
      'user-murugan-03',
      'S. Murugan',
      'Murugan Maligai Store',
      'murugan.maligai@sahayak.ai',
      '9765432109',
      '1234',
      'Retail & Wholesale (மளிகைக் கடை)',
      'ta',
      now - 10 * 86400000,
      now
    );
  }

  // Check if products exist
  const prodCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  if (prodCount.count === 0) {
    console.log('[Database] Seeding initial Kirana products catalog...');
    const insertProd = db.prepare(`
      INSERT INTO products (id, name, hindiName, aliases, quantity, unit, price, lowStockThreshold, category, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = Date.now();
    const defaultProducts = [
      {
        id: 'prod-rice',
        name: 'Rice',
        hindiName: 'चावल',
        aliases: JSON.stringify(['chawal', 'chaawal', 'rice', 'चावल', 'basmati', 'kolam']),
        quantity: 25,
        unit: 'kg',
        price: 60,
        lowStockThreshold: 5,
        category: 'Grains & Pulses',
        createdAt: now - 86400000 * 7,
        updatedAt: now - 3600000
      },
      {
        id: 'prod-water',
        name: 'Water',
        hindiName: 'पानी',
        aliases: JSON.stringify(['pani', 'water', 'paani', 'पानी', 'bisleri', 'aquafina', 'water bottle', 'bottle']),
        quantity: 8,
        unit: 'bottles',
        price: 20,
        lowStockThreshold: 5,
        category: 'Beverages',
        createdAt: now - 86400000 * 5,
        updatedAt: now - 1800000
      },
      {
        id: 'prod-biscuits',
        name: 'Biscuits',
        hindiName: 'बिस्कुट',
        aliases: JSON.stringify(['biscuit', 'biscuits', 'parle g', 'good day', 'बिस्कुट', 'बिस्कुट पैकेट']),
        quantity: 3,
        unit: 'packets',
        price: 10,
        lowStockThreshold: 5,
        category: 'Snacks',
        createdAt: now - 86400000 * 6,
        updatedAt: now - 5400000
      },
      {
        id: 'prod-milk',
        name: 'Milk',
        hindiName: 'दूध',
        aliases: JSON.stringify(['milk', 'doodh', 'dudh', 'दूध', 'amul', 'mother dairy']),
        quantity: 12,
        unit: 'packets',
        price: 30,
        lowStockThreshold: 5,
        category: 'Dairy',
        createdAt: now - 86400000 * 3,
        updatedAt: now - 7200000
      },
      {
        id: 'prod-soap',
        name: 'Soap',
        hindiName: 'साबुन',
        aliases: JSON.stringify(['soap', 'sabun', 'saabun', 'साबुन', 'lifebuoy', 'dettol', 'lux']),
        quantity: 15,
        unit: 'bars',
        price: 25,
        lowStockThreshold: 4,
        category: 'Personal Care',
        createdAt: now - 86400000 * 4,
        updatedAt: now - 900000
      },
      {
        id: 'prod-oil',
        name: 'Cooking Oil',
        hindiName: 'तेल',
        aliases: JSON.stringify(['oil', 'tel', 'cooking oil', 'mustard oil', 'sunflower oil', 'fortune', 'धारा']),
        quantity: 6,
        unit: 'liters',
        price: 140,
        lowStockThreshold: 3,
        category: 'Oils & Ghee',
        createdAt: now - 86400000 * 8,
        updatedAt: now - 14400000
      },
      {
        id: 'prod-sugar',
        name: 'Sugar',
        hindiName: 'चीनी',
        aliases: JSON.stringify(['sugar', 'chini', 'cheeni', 'शक्कर', 'sakkar']),
        quantity: 18,
        unit: 'kg',
        price: 44,
        lowStockThreshold: 5,
        category: 'Grains & Pulses',
        createdAt: now - 86400000 * 10,
        updatedAt: now - 18000000
      },
      {
        id: 'prod-tea',
        name: 'Tea Leaves',
        hindiName: 'चाय पत्ती',
        aliases: JSON.stringify(['tea', 'chai', 'chai patti', 'चाय पत्ती', 'tata tea', 'red label']),
        quantity: 9,
        unit: 'packets',
        price: 110,
        lowStockThreshold: 3,
        category: 'Beverages',
        createdAt: now - 86400000 * 5,
        updatedAt: now - 21600000
      }
    ];

    for (const p of defaultProducts) {
      insertProd.run(
        p.id,
        p.name,
        p.hindiName,
        p.aliases,
        p.quantity,
        p.unit,
        p.price,
        p.lowStockThreshold,
        p.category,
        p.createdAt,
        p.updatedAt
      );
    }
  }

  // Seed distributors
  const distCount = db.prepare('SELECT COUNT(*) as count FROM distributors').get() as { count: number };
  if (distCount.count === 0) {
    const insertDist = db.prepare(`
      INSERT INTO distributors (id, name, phone, category)
      VALUES (?, ?, ?, ?)
    `);
    insertDist.run('dist-1', 'Shree Ganesh FMCG & Grocery Wholesalers', '9820011223', 'Groceries, Biscuits & FMCG');
    insertDist.run('dist-2', 'City Grain, Rice & Oil Depot', '9811223344', 'Rice, Wheat, Oil & Grains');
    insertDist.run('dist-3', 'Balaji Dairy & Beverages Distributor', '9876501234', 'Water, Milk & Beverages');
  }

  // Seed initial activities
  const actCount = db.prepare('SELECT COUNT(*) as count FROM activities').get() as { count: number };
  if (actCount.count === 0) {
    const insertAct = db.prepare(`
      INSERT INTO activities (id, type, message, hindiMessage, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `);
    const now = Date.now();
    insertAct.run('act-1', 'SYSTEM', 'Sahayak AI Backend initialized with SQLite database', 'सहायक एआई बैकएंड शुरू हुआ', now - 3600000);
    insertAct.run('act-2', 'ADD_STOCK', 'Stock added: 25 kg Rice at ₹60/kg', 'चावल 25 किलो स्टॉक में जोड़ा गया', now - 1800000);
  }
}
