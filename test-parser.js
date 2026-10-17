// Automated test runner for SahayakAI Intent Parser
import { parseIntent, normalizeText, detectLanguage } from './src/services/intentParser.js';

const testCases = [
  // 1. ADD STOCK - English
  {
    input: "Add 20 bottles of water",
    expectedIntent: "ADD_STOCK",
    expectedQty: 20,
    expectedProduct: "Water",
    expectedUnit: "bottles"
  },
  {
    input: "Add 10 kg rice",
    expectedIntent: "ADD_STOCK",
    expectedQty: 10,
    expectedProduct: "Rice",
    expectedUnit: "kg"
  },
  {
    input: "Add 5 packets of biscuits",
    expectedIntent: "ADD_STOCK",
    expectedQty: 5,
    expectedProduct: "Biscuits",
    expectedUnit: "packets"
  },
  {
    input: "I received 20 bottles of water",
    expectedIntent: "ADD_STOCK",
    expectedQty: 20,
    expectedProduct: "Water"
  },
  {
    input: "Stock 20 bottles of water",
    expectedIntent: "ADD_STOCK",
    expectedQty: 20,
    expectedProduct: "Water"
  },

  // 2. ADD STOCK - Hindi & Devanagari
  {
    input: "20 बोतल पानी का स्टॉक डालो",
    expectedIntent: "ADD_STOCK",
    expectedQty: 20,
    expectedProduct: "Water",
    expectedUnit: "bottles"
  },
  {
    input: "२० बोतल पानी का स्टॉक डालो",
    expectedIntent: "ADD_STOCK",
    expectedQty: 20,
    expectedProduct: "Water"
  },
  {
    input: "20 किलो चावल जोड़ो",
    expectedIntent: "ADD_STOCK",
    expectedQty: 20,
    expectedProduct: "Rice",
    expectedUnit: "kg"
  },
  {
    input: "10 पैकेट बिस्कुट जोड़ो",
    expectedIntent: "ADD_STOCK",
    expectedQty: 10,
    expectedProduct: "Biscuits",
    expectedUnit: "packets"
  },

  // 3. RECORD SALE - English
  {
    input: "Sold 3 bottles of water for 90 rupees",
    expectedIntent: "RECORD_SALE",
    expectedQty: 3,
    expectedProduct: "Water",
    expectedAmount: 90
  },
  {
    input: "I sold 5 kg rice for 300",
    expectedIntent: "RECORD_SALE",
    expectedQty: 5,
    expectedProduct: "Rice",
    expectedAmount: 300
  },
  {
    input: "Sold 10 packets of biscuits for 100",
    expectedIntent: "RECORD_SALE",
    expectedQty: 10,
    expectedProduct: "Biscuits",
    expectedAmount: 100
  },

  // 4. RECORD SALE - Hindi
  {
    input: "3 बोतल पानी 90 रुपये में बेचा",
    expectedIntent: "RECORD_SALE",
    expectedQty: 3,
    expectedProduct: "Water",
    expectedAmount: 90
  },
  {
    input: "5 किलो चावल 300 रुपये में बेचा",
    expectedIntent: "RECORD_SALE",
    expectedQty: 5,
    expectedProduct: "Rice",
    expectedAmount: 300
  },

  // 5. CHECK STOCK - English & Hindi
  {
    input: "Check stock of water",
    expectedIntent: "CHECK_STOCK",
    expectedProduct: "Water"
  },
  {
    input: "How much water is left",
    expectedIntent: "CHECK_STOCK",
    expectedProduct: "Water"
  },
  {
    input: "Show rice stock",
    expectedIntent: "CHECK_STOCK",
    expectedProduct: "Rice"
  },
  {
    input: "पानी का स्टॉक कितना है",
    expectedIntent: "CHECK_STOCK",
    expectedProduct: "Water"
  },
  {
    input: "चावल कितना बचा है",
    expectedIntent: "CHECK_STOCK",
    expectedProduct: "Rice"
  },

  // 6. CHECK EARNINGS - English & Hindi
  {
    input: "Check earnings",
    expectedIntent: "CHECK_EARNINGS"
  },
  {
    input: "How much did I earn today",
    expectedIntent: "CHECK_EARNINGS"
  },
  {
    input: "Today's earnings",
    expectedIntent: "CHECK_EARNINGS"
  },
  {
    input: "आज की कमाई कितनी है",
    expectedIntent: "CHECK_EARNINGS"
  },
  {
    input: "आज मैंने कितना कमाया",
    expectedIntent: "CHECK_EARNINGS"
  },

  // 7. LOW STOCK - English & Hindi
  {
    input: "Low stock",
    expectedIntent: "LOW_STOCK"
  },
  {
    input: "Which items are running low",
    expectedIntent: "LOW_STOCK"
  },
  {
    input: "Show low stock",
    expectedIntent: "LOW_STOCK"
  },
  {
    input: "कौन सा सामान कम है",
    expectedIntent: "LOW_STOCK"
  },
  {
    input: "कम स्टॉक दिखाओ",
    expectedIntent: "LOW_STOCK"
  }
];

let passed = 0;
let failed = 0;

console.log("=== RUNNING INTENT PARSER TEST SUITE ===\n");

for (const tc of testCases) {
  const result = parseIntent(tc.input);
  let isPass = true;
  const errors = [];

  if (result.intent !== tc.expectedIntent) {
    isPass = false;
    errors.push(`Expected intent: ${tc.expectedIntent}, got: ${result.intent}`);
  }

  if (tc.expectedProduct && result.entities.productName !== tc.expectedProduct) {
    isPass = false;
    errors.push(`Expected product: ${tc.expectedProduct}, got: ${result.entities.productName}`);
  }

  if (tc.expectedQty !== undefined && result.entities.quantity !== tc.expectedQty) {
    isPass = false;
    errors.push(`Expected qty: ${tc.expectedQty}, got: ${result.entities.quantity}`);
  }

  if (tc.expectedAmount !== undefined && result.entities.amount !== tc.expectedAmount) {
    isPass = false;
    errors.push(`Expected amount: ${tc.expectedAmount}, got: ${result.entities.amount}`);
  }

  if (isPass) {
    console.log(`✓ PASS: "${tc.input}" -> ${result.intent}`);
    passed++;
  } else {
    console.error(`✗ FAIL: "${tc.input}"`);
    for (const e of errors) {
      console.error(`   - ${e}`);
    }
    failed++;
  }
}

console.log(`\n========================================`);
console.log(`RESULTS: ${passed} passed, ${failed} failed (${testCases.length} total)`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
