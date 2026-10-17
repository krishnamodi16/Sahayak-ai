import { parseIntent } from './src/services/intentParser.ts';

const testCases = [
  // 1. English
  { input: "Add 20 bottles of water", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "Sold 3 bottles of water for 90 rupees", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "Check stock of water", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "Check earnings", expectedIntent: "CHECK_EARNINGS" },
  { input: "Low stock", expectedIntent: "LOW_STOCK" },

  // 2. Hindi
  { input: "20 बोतल पानी का स्टॉक डालो", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "3 बोतल पानी 90 रुपये में बेचा", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "पानी का स्टॉक कितना है", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "आज की कमाई कितनी है", expectedIntent: "CHECK_EARNINGS" },
  { input: "कौन सा सामान कम है", expectedIntent: "LOW_STOCK" },

  // 3. Tamil
  { input: "20 தண்ணீர் பாட்டில்கள் சேர்க்கவும்", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "3 தண்ணீர் பாட்டில்கள் 90 ரூபாய்க்கு விற்றது", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "தண்ணீர் இருப்பு எவ்வளவு உள்ளது", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "இன்றைய வருமானம் என்ன", expectedIntent: "CHECK_EARNINGS" },
  { input: "குறைந்த இருப்பு", expectedIntent: "LOW_STOCK" },

  // 4. Telugu
  { input: "20 నీళ్ల బాటిళ్లు జోడించు", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "3 నీళ్ల బాటిళ్లు 90 రూపాయలకు అమ్మాను", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "నీళ్ల స్టాక్ ఎంత మిగిలింది", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "ఈరోజు సంపాదన ఎంత", expectedIntent: "CHECK_EARNINGS" },
  { input: "తక్కువ స్టాక్", expectedIntent: "LOW_STOCK" },

  // 5. Bengali
  { input: "20 বোতল জল যোগ করুন", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "3 বোতল জল 90 টাকায় বিক্রি", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "জল কতটুকু বাকি আছে", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "আজকের আয় কত", expectedIntent: "CHECK_EARNINGS" },
  { input: "কম স্টক", expectedIntent: "LOW_STOCK" },

  // 6. Marathi
  { input: "20 बाटल्या पाणी साठा जोडा", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "3 बाटल्या पाणी 90 रुपयांत विकले", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "पाणी साठा किती शिल्लक आहे", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "आजची कमाई किती आहे", expectedIntent: "CHECK_EARNINGS" },
  { input: "कमी साठा", expectedIntent: "LOW_STOCK" },

  // 7. Gujarati
  { input: "20 બોટલ પાણીનો સ્ટોક ઉમેરો", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "3 બોટલ પાણી 90 રૂપિયામાં વેચ્યું", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "પાણીનો કેટલો સ્ટોક બાકી છે", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "આજની કમાણી કેટલી છે", expectedIntent: "CHECK_EARNINGS" },
  { input: "ઓછો સ્ટોક", expectedIntent: "LOW_STOCK" },

  // 8. Kannada
  { input: "20 ಬಾಟಲ್ ನೀರು ಸೇರಿಸಿ", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "3 ಬಾಟಲ್ ನೀರು 90 ರೂಪಾಯಿಗೆ ಮಾರಾಟ", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "ನೀರಿನ ದಾಸ್ತಾನು ಎಷ್ಟು ಉಳಿದಿದೆ", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "ಇಂದಿನ ಗಳಿಕೆ ಎಷ್ಟು", expectedIntent: "CHECK_EARNINGS" },
  { input: "ಕಡಿಮೆ ದಾಸ್ತಾನು", expectedIntent: "LOW_STOCK" },

  // 9. Malayalam
  { input: "20 കുപ്പി വെള്ളം ചേർക്കുക", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "3 കുപ്പി വെള്ളം 90 രൂപയ്ക്ക് വിറ്റു", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedAmount: 90, expectedProduct: "Water" },
  { input: "വെള്ളം എത്ര സ്റ്റോക്ക് ബാക്കിയുണ്ട്", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "ഇന്നത്തെ വരുമാനം എത്രയാണ്", expectedIntent: "CHECK_EARNINGS" },
  { input: "കുറഞ്ഞ സ്റ്റോക്ക്", expectedIntent: "LOW_STOCK" }
];

let passed = 0;
let failed = 0;

console.log("=== RUNNING MULTILINGUAL (9 LANGUAGES) TEST SUITE ===\n");

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
    console.log(`✓ PASS [${result.language}]: "${tc.input}" -> ${result.intent}`);
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
