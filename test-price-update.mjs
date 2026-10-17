import { parseIntent } from './src/services/intentParser.ts';

const priceTestCases = [
  // English
  { input: "Change price of biscuit to 15", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },
  { input: "Set biscuit price to 15", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },
  { input: "Biscuit price is now 15 rupees", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },
  { input: "Update price of rice to 70", expectedIntent: "UPDATE_PRICE", expectedProduct: "Rice", expectedPrice: 70 },
  
  // Hindi
  { input: "बिस्किट का भाव 15 रुपये करो", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },
  { input: "बिस्किट की कीमत 15 कर दो", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },
  { input: "चावल का भाव 70 करो", expectedIntent: "UPDATE_PRICE", expectedProduct: "Rice", expectedPrice: 70 },

  // Gujarati
  { input: "બિસ્કિટનો ભાવ 15 કરો", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },
  { input: "ચોખાનો ભાવ 70 રૂપિયા કરો", expectedIntent: "UPDATE_PRICE", expectedProduct: "Rice", expectedPrice: 70 },

  // Marathi
  { input: "बिस्किटचा भाव 15 रुपये करा", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },
  { input: "तांदळाचा भाव 70 करा", expectedIntent: "UPDATE_PRICE", expectedProduct: "Rice", expectedPrice: 70 },

  // Tamil
  { input: "பிஸ்கட் விலை 15 ஆக மாற்று", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },

  // Telugu
  { input: "బిస్కెట్ ధర 15 చేయండి", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },

  // Bengali
  { input: "বিস্কুটের দাম 15 টাকা করুন", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },

  // Kannada
  { input: "ಬಿಸ್ಕತ್ತು ಬೆಲೆ 15 ಮಾಡಿ", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 },

  // Malayalam
  { input: "ബിസ്കറ്റ് വില 15 ആക്കുക", expectedIntent: "UPDATE_PRICE", expectedProduct: "Biscuits", expectedPrice: 15 }
];

let passed = 0;
let failed = 0;

console.log("=== TESTING VOICE PRICE UPDATE INTENT (9 LANGUAGES) ===\n");

for (const tc of priceTestCases) {
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
  if (tc.expectedPrice !== undefined && result.entities.pricePerUnit !== tc.expectedPrice) {
    isPass = false;
    errors.push(`Expected new price: ${tc.expectedPrice}, got: ${result.entities.pricePerUnit}`);
  }

  if (isPass) {
    console.log(`✓ PASS [${result.language}]: "${tc.input}" -> ${result.intent} (${result.entities.productName} @ ₹${result.entities.pricePerUnit})`);
    passed++;
  } else {
    console.error(`✗ FAIL [${result.language}]: "${tc.input}"`);
    for (const e of errors) console.error(`   - ${e}`);
    failed++;
  }
}

console.log(`\nRESULTS: ${passed} passed, ${failed} failed (${priceTestCases.length} total)`);
if (failed > 0) process.exit(1);
else process.exit(0);
