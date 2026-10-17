// Test price update regex and logic
const REGIONAL_DIGITS = {
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
  '૦': '0', '૧': '1', '૨': '2', '૩': '3', '૪': '4', '૫': '5', '૬': '6', '૭': '7', '૮': '8', '૯': '9'
};

function normalizeText(text) {
  let normalized = text.trim();
  for (const [reg, std] of Object.entries(REGIONAL_DIGITS)) {
    normalized = normalized.split(reg).join(std);
  }
  normalized = normalized.replace(/[₹$]/g, ' rupees ');
  normalized = normalized.replace(/[,.?!;:–—\-_।॥]/g, ' ');
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
}

const PRODUCT_ALIASES = {
  'biscuit': 'Biscuits', 'biscuits': 'Biscuits', 'बिस्कुट': 'Biscuits', 'बिस्किट': 'Biscuits', 'બિસ્કિટ': 'Biscuits',
  'rice': 'Rice', 'chawal': 'Rice', 'चावल': 'Rice', 'ચોખા': 'Rice',
  'water': 'Water', 'pani': 'Water', 'पानी': 'Water', 'પાણી': 'Water'
};

function parsePriceIntent(rawInput) {
  const lower = normalizeText(rawInput).toLowerCase();
  let productInfo;
  for (const [alias, prod] of Object.entries(PRODUCT_ALIASES)) {
    if (lower.includes(alias)) {
      productInfo = { productName: prod };
      break;
    }
  }

  const isPriceKeyword = /(price|rate|cost|rupees|rs|bhaav|keemat|daam|kimm?at|भाव|कीमत|रेट|दाम|दर|விலை|ధర|দাম|ಬೆಲೆ|വില|ભાવ|કિંમત|રૂપિયા|रुपये)/i.test(lower);
  const isPriceAction = /(change|set|update|make|increase|decrease|karo|kar\s*do|kara|badlo|badla|aakku|maatru|cheyandi|cheyi|korun|bodo|maadi|badalisi|aakkuka|maattuka|બદલો|કરો|बदलो|करो|करा|is\s*now)/i.test(lower);

  if ((isPriceKeyword && isPriceAction) || (productInfo && isPriceKeyword && /\d+/.test(lower))) {
    let targetPrice;
    const priceMatch = lower.match(/(?:to|is|now|at|for|₹|रुपये|રૂપિયા|भाव|कीमत|रेट|விலை|ధర|দাম|ಬೆಲೆ|വില)\s*(\d+(?:\.\d+)?)/i) ||
      lower.match(/(\d+(?:\.\d+)?)\s*(?:rupees|rs|रुपये|રૂપિયા|karo|kar\s*do|kara|badlo|aakku|maatru|cheyandi|korun|maadi|aakkuka|કરો|बदलो|करो)/i) ||
      lower.match(/\b(\d+(?:\.\d+)?)\b/);

    if (priceMatch && priceMatch[1]) targetPrice = parseFloat(priceMatch[1]);

    if (targetPrice && targetPrice > 0) {
      return { intent: 'UPDATE_PRICE', productName: productInfo?.productName, price: targetPrice };
    }
  }
  return { intent: 'UNKNOWN' };
}

const tests = [
  { text: "Change price of biscuit to 15", expected: { intent: "UPDATE_PRICE", prod: "Biscuits", price: 15 } },
  { text: "Set biscuit price to 15", expected: { intent: "UPDATE_PRICE", prod: "Biscuits", price: 15 } },
  { text: "Biscuit price is now 15 rupees", expected: { intent: "UPDATE_PRICE", prod: "Biscuits", price: 15 } },
  { text: "बिस्किट का भाव 15 रुपये करो", expected: { intent: "UPDATE_PRICE", prod: "Biscuits", price: 15 } },
  { text: "बिस्किट की कीमत 15 कर दो", expected: { intent: "UPDATE_PRICE", prod: "Biscuits", price: 15 } },
  { text: "બિસ્કિટનો ભાવ 15 કરો", expected: { intent: "UPDATE_PRICE", prod: "Biscuits", price: 15 } },
  { text: "ચોખાનો ભાવ 70 રૂપિયા કરો", expected: { intent: "UPDATE_PRICE", prod: "Rice", price: 70 } }
];

let passed = 0;
for (const t of tests) {
  const res = parsePriceIntent(t.text);
  if (res.intent === t.expected.intent && res.productName === t.expected.prod && res.price === t.expected.price) {
    console.log(`✓ PASS: "${t.text}" -> ${res.productName} updated to ₹${res.price}`);
    passed++;
  } else {
    console.error(`✗ FAIL: "${t.text}"`, res);
  }
}

console.log(`\nResults: ${passed}/${tests.length} passed.`);
