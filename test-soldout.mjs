import { parseIntent } from './src/services/intentParser.ts';

const testCases = [
  { input: "20 kilo rice is sold out", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Rice" },
  { input: "20 kg rice is sold out", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Rice" },
  { input: "20 kg rice sold out", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Rice" },
  { input: "20 kg rice sold", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Rice" },
  { input: "sold 20 kg rice", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Rice" },
  { input: "20 kilo chawal bik gaya", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Rice" },
  { input: "20 kilo chawal bech diya", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Rice" },
  { input: "20 किलो चावल बिक गया", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Rice" },
  { input: "20 किलो चावल बेच दिया", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Rice" },
  { input: "Add 20 bottles of water", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "Sold 3 bottles of water for 90 rupees", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "Check stock of water", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "Check earnings", expectedIntent: "CHECK_EARNINGS" },
  { input: "Low stock", expectedIntent: "LOW_STOCK" },
  { input: "20 தண்ணீர் பாட்டில்கள் விற்றது", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Water" },
  { input: "20 నీళ్ల బాటిళ్లు అమ్మాను", expectedIntent: "RECORD_SALE", expectedQty: 20, expectedProduct: "Water" }
];

let passed = 0;
let failed = 0;

console.log("=== TESTING SOLD OUT & SALE INTENT PARSER ===\n");

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
    console.log(`✓ PASS [${result.language}]: "${tc.input}" -> ${result.intent} (qty: ${result.entities.quantity}, prod: ${result.entities.productName})`);
    passed++;
  } else {
    console.error(`✗ FAIL [${result.language}]: "${tc.input}"`);
    for (const e of errors) {
      console.error(`   - ${e}`);
    }
    failed++;
  }
}

console.log(`\n========================================`);
console.log(`RESULTS: ${passed} passed, ${failed} failed (${testCases.length} total)`);
console.log(`========================================`);
