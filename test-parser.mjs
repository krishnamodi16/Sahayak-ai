// Map of Devanagari numerals
const DEVANAGARI_DIGITS = {
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
};

// Map of Hindi/English number words
const WORD_TO_NUMBER = {
  'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
  'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
  'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
  'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20,
  'twenty five': 25, 'twenty-five': 25, 'thirty': 30, 'forty': 40, 'fifty': 50,
  'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90, 'hundred': 100,

  'शून्य': 0, 'एक': 1, 'दो': 2, 'तीन': 3, 'चार': 4, 'पाँच': 5, 'पांच': 5,
  'छह': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'दस': 10, 'ग्यारह': 11, 'बारह': 12,
  'तेरह': 13, 'चौदह': 14, 'पंद्रह': 15, 'सोलह': 16, 'सत्रह': 17, 'अठारह': 18,
  'उन्नीस': 19, 'बीस': 20, 'पच्चीस': 25, 'तीस': 30, 'पैंतीस': 35, 'चालीस': 40,
  'पचास': 50, 'साठ': 60, 'सत्तर': 70, 'अस्सी': 80, 'नब्बे': 90, 'सौ': 100,
  'डेढ़': 1.5, 'ढाई': 2.5, 'आधा': 0.5,

  'ek': 1, 'do': 2, 'teen': 3, 'chaar': 4, 'char': 4, 'paanch': 5, 'panch': 5,
  'chhe': 6, 'saat': 7, 'aath': 8, 'nau': 9, 'das': 10, 'gyarah': 11, 'barah': 12,
  'pandrah': 15, 'solah': 16, 'bees': 20, 'pachees': 25, 'tees': 30, 'chaalis': 40,
  'pachaas': 50, 'pachas': 50, 'saath': 60, 'sau': 100
};

const UNIT_MAP = {
  'kg': 'kg', 'kgs': 'kg', 'kilo': 'kg', 'kilos': 'kg', 'kilogram': 'kg', 'kilograms': 'kg', 'किलो': 'kg', 'किलोग्राम': 'kg',
  'g': 'g', 'gram': 'g', 'grams': 'g', 'gm': 'g', 'gms': 'g', 'ग्राम': 'g',
  'bottle': 'bottles', 'bottles': 'bottles', 'बोतल': 'bottles', 'बोतले': 'bottles', 'बोतलें': 'bottles',
  'packet': 'packets', 'packets': 'packets', 'pkt': 'packets', 'pkts': 'packets', 'पैकेट': 'packets', 'पैक': 'packets',
  'bar': 'bars', 'bars': 'bars', 'साबुन': 'bars', 'बार': 'bars',
  'liter': 'liters', 'liters': 'liters', 'litre': 'liters', 'litres': 'liters', 'l': 'liters', 'ltr': 'liters', 'लीटर': 'liters',
  'piece': 'pieces', 'pieces': 'pieces', 'pc': 'pieces', 'pcs': 'pieces', 'पीस': 'pieces', 'नग': 'pieces',
  'box': 'boxes', 'boxes': 'boxes', 'डिब्बा': 'boxes', 'पेटी': 'boxes'
};

const PRODUCT_ALIASES = {
  'water': 'Water',
  'water bottle': 'Water',
  'water bottles': 'Water',
  'pani': 'Water',
  'paani': 'Water',
  'पानी': 'Water',
  'bisleri': 'Water',
  'aquafina': 'Water',

  'rice': 'Rice',
  'chawal': 'Rice',
  'chaawal': 'Rice',
  'चावल': 'Rice',
  'basmati': 'Rice',
  'kolam': 'Rice',

  'biscuit': 'Biscuits',
  'biscuits': 'Biscuits',
  'बिस्कुट': 'Biscuits',
  'बिस्कुट पैकेट': 'Biscuits',
  'parle g': 'Biscuits',
  'good day': 'Biscuits',

  'milk': 'Milk',
  'doodh': 'Milk',
  'dudh': 'Milk',
  'दूध': 'Milk',
  'amul': 'Milk',

  'soap': 'Soap',
  'sabun': 'Soap',
  'saabun': 'Soap',
  'साबुन': 'Soap',
  'lifebuoy': 'Soap',
  'lux': 'Soap',
  'dettol': 'Soap',

  'sugar': 'Sugar',
  'cheeni': 'Sugar',
  'chini': 'Sugar',
  'shakkar': 'Sugar',
  'चीनी': 'Sugar',
  'शक्कर': 'Sugar',

  'tea': 'Tea',
  'chai': 'Tea',
  'chay': 'Tea',
  'chai patti': 'Tea',
  'चाय': 'Tea',
  'चाय पत्ती': 'Tea',

  'oil': 'Cooking Oil',
  'cooking oil': 'Cooking Oil',
  'tel': 'Cooking Oil',
  'mustard oil': 'Cooking Oil',
  'sunflower oil': 'Cooking Oil',
  'तेल': 'Cooking Oil',
  'सरसों तेल': 'Cooking Oil',

  'wheat': 'Wheat',
  'gehu': 'Wheat',
  'gehun': 'Wheat',
  'गेहूं': 'Wheat',
  'गेहूँ': 'Wheat',
  'atta': 'Wheat',
  'आटा': 'Wheat'
};

function normalizeText(text) {
  let normalized = text.trim();
  normalized = normalized.replace(/[०-९]/g, (digit) => DEVANAGARI_DIGITS[digit] || digit);
  normalized = normalized.replace(/[₹$]/g, ' rupees ');
  normalized = normalized.replace(/[,.?!;:–—\-_]/g, ' ');
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
}

function detectLanguage(text) {
  if (/[\u0900-\u097F]/.test(text)) {
    return 'hi';
  }
  return 'en';
}

function extractNumber(text) {
  const digitMatch = text.match(/\b\d+(\.\d+)?\b/);
  if (digitMatch) {
    return parseFloat(digitMatch[0]);
  }

  const words = text.toLowerCase().split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    if (i < words.length - 1) {
      const twoWords = `${words[i]} ${words[i + 1]}`;
      if (WORD_TO_NUMBER[twoWords] !== undefined) {
        return WORD_TO_NUMBER[twoWords];
      }
    }
    if (WORD_TO_NUMBER[words[i]] !== undefined) {
      return WORD_TO_NUMBER[words[i]];
    }
  }
  return undefined;
}

function extractProduct(text) {
  const lower = text.toLowerCase();
  const sortedKeys = Object.keys(PRODUCT_ALIASES).sort((a, b) => b.length - a.length);
  for (const alias of sortedKeys) {
    const regex = new RegExp(`\\b${alias}\\b`, 'i');
    if (regex.test(lower) || lower.includes(alias)) {
      return {
        productName: PRODUCT_ALIASES[alias],
        matchedText: alias
      };
    }
  }
  return undefined;
}

function extractUnit(text) {
  const lower = text.toLowerCase();
  for (const [key, unit] of Object.entries(UNIT_MAP)) {
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(lower)) {
      return unit;
    }
  }
  return undefined;
}

function parseIntent(rawInput) {
  const clean = normalizeText(rawInput);
  const lower = clean.toLowerCase();
  const lang = detectLanguage(rawInput);

  // 1. CHECK EARNINGS
  const earningsKeywords = /(earn[a-z]*|income|sale[s]?|revenue|profit|kamai|kamaya|bikri|कमाई|बिक्री|कमाया|मुनाफा)/i;
  const isEarningsContext = (
    lower.includes('today') || 
    lower.includes('aaj') || 
    lower.includes('how much') || 
    lower.includes('check') || 
    lower.includes('show') || 
    lower.includes('कितनी') || 
    lower.includes('दिखाओ') || 
    lower.includes('kitni') || 
    lower.includes('kitna') || 
    lower.includes('कितना') ||
    lower.includes('मैंने') ||
    lower.includes('maine') ||
    lower === 'check earnings' || 
    lower === 'earnings' ||
    lower === 'आज की कमाई'
  );

  if (earningsKeywords.test(lower) && (isEarningsContext || lower.includes('earn') || lower.includes('कमाई') || lower.includes('कमाया'))) {
    return {
      intent: 'CHECK_EARNINGS',
      confidence: 0.95,
      rawText: rawInput,
      language: lang,
      entities: {}
    };
  }

  // 2. LOW STOCK
  const lowStockRegex = /(low\s*stock|running\s*low|running\s*out|need\s*to\s*buy|reorder|out\s*of\s*stock|kam\s*stock|kaun\s*sa\s*saman\s*kam|khatam\s*hone\s*wala|कम\s*स्टॉक|कौन\s*सा\s*सामान\s*कम|खत्म\s*होने\s*वाला|कम\s*सामान|क्या\s*खरीदना)/i;
  if (lowStockRegex.test(lower)) {
    return {
      intent: 'LOW_STOCK',
      confidence: 0.95,
      rawText: rawInput,
      language: lang,
      entities: {}
    };
  }

  // 3. RECORD SALE
  const isSalePattern = /(sold|sale|sell|becha|bechi|bika|bech\s*diya|बेचा|बेची|बिका|बिक्री\s*की)/i.test(lower);
  const productInfo = extractProduct(lower);

  if (isSalePattern) {
    const allNumbers = [];
    const tokens = lower.split(/\s+/);
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (/^\d+(\.\d+)?$/.test(token)) {
        allNumbers.push(parseFloat(token));
      } else if (WORD_TO_NUMBER[token] !== undefined) {
        allNumbers.push(WORD_TO_NUMBER[token]);
      }
    }

    let amount;
    const amountMatchEn = lower.match(/for\s+(\d+|[a-z]+)\s*(rupees|rs|inr)?/i);
    const amountMatchHi = lower.match(/(\d+|[a-z\u0900-\u097F]+)\s*(रुपये|रुपए|rupaye|rupees|rs)?\s*(में|me|mein)\s*(बेचा|becha)/i);

    if (amountMatchEn) {
      amount = extractNumber(amountMatchEn[1]);
    } else if (amountMatchHi) {
      amount = extractNumber(amountMatchHi[1]);
    }

    let quantity;
    if (amount !== undefined) {
      const remainingNumbers = allNumbers.filter(n => n !== amount);
      if (remainingNumbers.length > 0) {
        quantity = remainingNumbers[0];
      }
    } else {
      if (allNumbers.length >= 2) {
        quantity = allNumbers[0];
        amount = allNumbers[1];
      } else if (allNumbers.length === 1) {
        quantity = allNumbers[0];
      }
    }

    const unit = extractUnit(lower);

    if (!quantity && allNumbers.length > 0) {
      quantity = allNumbers[0];
    }

    return {
      intent: 'RECORD_SALE',
      confidence: 0.9,
      rawText: rawInput,
      language: lang,
      entities: {
        productName: productInfo?.productName,
        quantity: quantity,
        unit: unit,
        amount: amount
      },
      errorReason: !quantity ? 'MISSING_QUANTITY' : (!productInfo ? 'MISSING_PRODUCT' : undefined)
    };
  }

  // 4. ADD STOCK
  const isAddStockPattern = /(add|received|jo[d|r]o|daalo|dalo|aaya|laaya|जोड़ो|डाला|डालो|स्टॉक\s*डालो|स्टॉक\s*जोड़ो|प्राप्त\s*हुआ|आया)/i.test(lower) ||
    (/^stock\s+\d+/i.test(lower)) ||
    (/^स्टॉक\s+\d+/i.test(lower));

  const parsedQty = extractNumber(lower);
  const parsedUnit = extractUnit(lower);

  if (isAddStockPattern || (lower.startsWith('stock ') && parsedQty)) {
    return {
      intent: 'ADD_STOCK',
      confidence: 0.9,
      rawText: rawInput,
      language: lang,
      entities: {
        productName: productInfo?.productName,
        quantity: parsedQty,
        unit: parsedUnit
      },
      errorReason: !parsedQty ? 'MISSING_QUANTITY' : (!productInfo ? 'MISSING_PRODUCT' : undefined)
    };
  }

  // 5. CHECK STOCK
  const checkStockRegex = /(check\s*stock|how\s*much.*left|how\s*many.*have|show.*stock|stock\s*of|kitna\s*stock|kitna\s*bacha|स्टॉक\s*कितना|कितना\s*बचा|स्टॉक\s*दिखाओ|स्टॉक\s*चेक|कितना\s*सामान)/i;

  if (checkStockRegex.test(lower) || (productInfo && (lower.includes('stock') || lower.includes('left') || lower.includes('kitna') || lower.includes('बचा') || lower.includes('कितना')))) {
    return {
      intent: 'CHECK_STOCK',
      confidence: 0.9,
      rawText: rawInput,
      language: lang,
      entities: {
        productName: productInfo?.productName
      }
    };
  }

  const implicitQty = extractNumber(lower);
  if (implicitQty && productInfo) {
    const unit = extractUnit(lower);
    return {
      intent: 'ADD_STOCK',
      confidence: 0.75,
      rawText: rawInput,
      language: lang,
      entities: {
        productName: productInfo.productName,
        quantity: implicitQty,
        unit: unit
      }
    };
  }

  if (productInfo) {
    return {
      intent: 'CHECK_STOCK',
      confidence: 0.7,
      rawText: rawInput,
      language: lang,
      entities: {
        productName: productInfo.productName
      }
    };
  }

  return {
    intent: 'UNKNOWN',
    confidence: 0.1,
    rawText: rawInput,
    language: lang,
    entities: {},
    errorReason: 'UNKNOWN_COMMAND'
  };
}

// Test cases
const testCases = [
  { input: "Add 20 bottles of water", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water", expectedUnit: "bottles" },
  { input: "Add 10 kg rice", expectedIntent: "ADD_STOCK", expectedQty: 10, expectedProduct: "Rice", expectedUnit: "kg" },
  { input: "Add 5 packets of biscuits", expectedIntent: "ADD_STOCK", expectedQty: 5, expectedProduct: "Biscuits", expectedUnit: "packets" },
  { input: "I received 20 bottles of water", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "Stock 20 bottles of water", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "20 बोतल पानी का स्टॉक डालो", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water", expectedUnit: "bottles" },
  { input: "२० बोतल पानी का स्टॉक डालो", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Water" },
  { input: "20 किलो चावल जोड़ो", expectedIntent: "ADD_STOCK", expectedQty: 20, expectedProduct: "Rice", expectedUnit: "kg" },
  { input: "10 पैकेट बिस्कुट जोड़ो", expectedIntent: "ADD_STOCK", expectedQty: 10, expectedProduct: "Biscuits", expectedUnit: "packets" },
  { input: "Sold 3 bottles of water for 90 rupees", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedProduct: "Water", expectedAmount: 90 },
  { input: "I sold 5 kg rice for 300", expectedIntent: "RECORD_SALE", expectedQty: 5, expectedProduct: "Rice", expectedAmount: 300 },
  { input: "Sold 10 packets of biscuits for 100", expectedIntent: "RECORD_SALE", expectedQty: 10, expectedProduct: "Biscuits", expectedAmount: 100 },
  { input: "3 बोतल पानी 90 रुपये में बेचा", expectedIntent: "RECORD_SALE", expectedQty: 3, expectedProduct: "Water", expectedAmount: 90 },
  { input: "5 किलो चावल 300 रुपये में बेचा", expectedIntent: "RECORD_SALE", expectedQty: 5, expectedProduct: "Rice", expectedAmount: 300 },
  { input: "Check stock of water", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "How much water is left", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "Show rice stock", expectedIntent: "CHECK_STOCK", expectedProduct: "Rice" },
  { input: "पानी का स्टॉक कितना है", expectedIntent: "CHECK_STOCK", expectedProduct: "Water" },
  { input: "चावल कितना बचा है", expectedIntent: "CHECK_STOCK", expectedProduct: "Rice" },
  { input: "Check earnings", expectedIntent: "CHECK_EARNINGS" },
  { input: "How much did I earn today", expectedIntent: "CHECK_EARNINGS" },
  { input: "Today's earnings", expectedIntent: "CHECK_EARNINGS" },
  { input: "आज की कमाई कितनी है", expectedIntent: "CHECK_EARNINGS" },
  { input: "आज मैंने कितना कमाया", expectedIntent: "CHECK_EARNINGS" },
  { input: "Low stock", expectedIntent: "LOW_STOCK" },
  { input: "Which items are running low", expectedIntent: "LOW_STOCK" },
  { input: "Show low stock", expectedIntent: "LOW_STOCK" },
  { input: "कौन सा सामान कम है", expectedIntent: "LOW_STOCK" },
  { input: "कम स्टॉक दिखाओ", expectedIntent: "LOW_STOCK" }
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
