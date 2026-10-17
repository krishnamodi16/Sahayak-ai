import { IntentType, ParsedIntent, SupportedLanguage, UnitType } from '../types/index';

// Comprehensive Regional Number Mapping (Supports all 9 Indian Languages)
const MULTILINGUAL_NUMBERS: Record<string, number> = {
  // English & Transliterations
  'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
  'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
  'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
  'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20,
  'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70,
  'eighty': 80, 'ninety': 90, 'hundred': 100,

  // Hindi / Devanagari (हिंदी / मराठी)
  'एक': 1, 'दो': 2, 'तीन': 3, 'चार': 4, 'पांच': 5, 'पाँच': 5,
  'छह': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'दस': 10,
  'ग्यारह': 11, 'बारह': 12, 'तेरह': 13, 'चौदह': 14, 'पंद्रह': 15,
  'सोलह': 16, 'सत्रह': 17, 'अट्ठारह': 18, 'उन्नीस': 19, 'बीस': 20,
  'तीस': 30, 'चालीस': 40, 'पचास': 50, 'साठ': 60, 'सत्तर': 70,
  'अस्सी': 80, 'नब्बे': 90, 'सौ': 100,
  
  // Marathi specifics (मराठी)
  'दोन': 2, 'सहा': 6, 'दहा': 10, 'वीस': 20, 'पन्नास': 50, 'शंभर': 100,

  // Tamil (தமிழ்)
  'ஒன்று': 1, 'இரண்டு': 2, 'மூன்று': 3, 'நான்கு': 4, 'ஐந்து': 5,
  'ஆறு': 6, 'ஏழு': 7, 'எட்டு': 8, 'ஒன்பது': 9, 'பத்து': 10,
  'இருபது': 20, 'முப்பது': 30, 'நாற்பது': 40, 'ஐம்பது': 50, 'நூறு': 100,

  // Telugu (తెలుగు)
  'ఒకటి': 1, 'రెండు': 2, 'మూడు': 3, 'నాలుగు': 4, 'ఐదు': 5,
  'ఆరు': 6, 'ఏడు': 7, 'ఎనిమిది': 8, 'తొమ్మిది': 9, 'పది': 10,
  'ఇరవై': 20, 'ముప్పై': 30, 'నలభై': 40, 'యాభై': 50, 'వంద': 100,

  // Bengali (বাংলা)
  'এক': 1, 'দুই': 2, 'তিন': 3, 'চার': 4, 'পাঁচ': 5,
  'ছয়': 6, 'সাত': 7, 'আট': 8, 'নয়': 9, 'দশ': 10,
  'বিশ': 20, 'কুড়ি': 20, 'ত্রিশ': 30, 'চল্লিশ': 40, 'পঞ্চাশ': 50, 'একশত': 100, 'শত': 100,

  // Gujarati (ગુજરાતી)
  'એક': 1, 'બે': 2, 'ત્રણ': 3, 'ચાર': 4, 'પાંચ': 5,
  'છ': 6, 'સાત': 7, 'આઠ': 8, 'નવ': 9, 'દસ': 10,
  'વીસ': 20, 'ત્રીસ': 30, 'ચાલીસ': 40, 'પચાસ': 50, 'સો': 100,

  // Kannada (ಕನ್ನಡ)
  'ಒಂದು': 1, 'ಎರಡು': 2, 'ಮೂರು': 3, 'ನಾಲ್ಕು': 4, 'ಐದು': 5,
  'ಆರು': 6, 'ಏಳು': 7, 'ಎಂಟು': 8, 'ಒಂಬತ್ತು': 9, 'ಹತ್ತು': 10,
  'ಇಪ್ಪತ್ತು': 20, 'ಮೂವತ್ತು': 30, 'ನಲವತ್ತು': 40, 'ಐವತ್ತು': 50, 'ನೂರು': 100,

  // Malayalam (മലയാളം)
  'ഒന്ന്': 1, 'രണ്ട്': 2, 'മൂന്ന്': 3, 'നാല്': 4, 'അഞ്ച്': 5,
  'ആറ്': 6, 'ഏഴ്': 7, 'എട്ട്': 8, 'ഒൻപത്': 9, 'പത്ത്': 10,
  'ഇരുപത്': 20, 'മുപ്പത്': 30, 'നാൽപ്പത്': 40, 'അമ്പത്': 50, 'നൂറ്': 100
};

// Regional Numerals (0-9 characters across scripts)
const REGIONAL_DIGITS: Record<string, string> = {
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9', // Devanagari & Marathi
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9', // Bengali
  '૦': '0', '૧': '1', '૨': '2', '૩': '3', '૪': '4', '૫': '5', '૬': '6', '૭': '7', '૮': '8', '૯': '9', // Gujarati
  '௧': '1', '௨': '2', '௩': '3', '௪': '4', '௫': '5', '௬': '6', '௭': '7', '௮': '8', '௯': '9', // Tamil
  '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4', '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9', // Telugu
  '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4', '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9', // Kannada
  '൦': '0', '൧': '1', '൨': '2', '൩': '3', '൪': '4', '൫': '5', '൬': '6', '൭': '7', '൮': '8', '൯': '9'  // Malayalam
};

// Unit aliases across Indian languages
const UNIT_MAP: Record<string, UnitType> = {
  // kg
  'kg': 'kg', 'kgs': 'kg', 'kilo': 'kg', 'kilos': 'kg', 'kilogram': 'kg', 'kilograms': 'kg',
  'किलो': 'kg', 'किलोग्राम': 'kg', 'केलो': 'kg', 'கிலோ': 'kg', 'கி': 'kg', 'కిలో': 'kg', 'కిలోల': 'kg', 'কেজি': 'kg', 'કિલો': 'kg', 'ಕೆಜಿ': 'kg', 'കിലോ': 'kg',
  
  // g
  'g': 'g', 'gram': 'g', 'grams': 'g', 'gm': 'g', 'gms': 'g',
  'ग्राम': 'g', 'கிராம்': 'g', 'கிரா': 'g', 'గ్రాములు': 'g', 'গ্রাম': 'g', 'ગ્રામ': 'g', 'ಗ್ರಾಂ': 'g', 'ഗ്രാം': 'g',

  // bottles
  'bottle': 'bottles', 'bottles': 'bottles',
  'बोतल': 'bottles', 'बोतले': 'bottles', 'बोतलें': 'bottles', 'बाटल्या': 'bottles', 'बाटली': 'bottles',
  'பாட்டில்': 'bottles', 'பாட்டில்கள்': 'bottles', 'பா': 'bottles', 'బాటిల్': 'bottles', 'బాటిళ్లు': 'bottles',
  'বোতল': 'bottles', 'બોટલ': 'bottles', 'ಬಾಟಲ್': 'bottles', 'കുപ്പി': 'bottles',

  // packets
  'packet': 'packets', 'packets': 'packets', 'pkt': 'packets', 'pkts': 'packets',
  'पैकेट': 'packets', 'पैक': 'packets', 'पाकीट': 'packets', 'பாக்கெட்': 'packets',
  'ప్యాకెట్': 'packets', 'প্যাকেট': 'packets', 'પેકેટ': 'packets', 'ಪ್ಯಾಕೆಟ್': 'packets', 'പാക്കറ്റ്': 'packets',

  // bars
  'bar': 'bars', 'bars': 'bars', 'साबुन': 'bars', 'बार': 'bars', 'சோப்': 'bars', 'சబ్బు': 'bars',

  // liters
  'liter': 'liters', 'liters': 'liters', 'litre': 'liters', 'litres': 'liters', 'l': 'liters', 'ltr': 'liters',
  'लीटर': 'liters', 'लिटर': 'liters', 'லிட்டர்': 'liters', 'லீட்டர்': 'liters', 'লিটার': 'liters', 'લિટર': 'liters', 'ಲೀಟರ್': 'liters', 'ലിറ്റർ': 'liters',

  // pieces
  'piece': 'pieces', 'pieces': 'pieces', 'pc': 'pieces', 'pcs': 'pieces',
  'पीस': 'pieces', 'नग': 'pieces', 'துண்டு': 'pieces', 'ముక్క': 'pieces', 'টুকরো': 'pieces', 'ટુકડા': 'pieces', 'ತುಂಡು': 'pieces', 'കഷണം': 'pieces',

  // boxes
  'box': 'boxes', 'boxes': 'boxes', 'डिब्बा': 'boxes', 'पेटी': 'boxes', 'பெட்டி': 'boxes', 'ಪೆಟ್ಟಿಗೆ': 'boxes', 'പെട്ടി': 'boxes'
};

// Multilingual Product Aliases Dictionary (including loanwords and phonetic regional transliterations)
const PRODUCT_ALIASES: Record<string, string> = {
  // Water
  'water': 'Water', 'water bottle': 'Water', 'water bottles': 'Water', 'pani': 'Water', 'paani': 'Water', 'पानी': 'Water', 'वाटर': 'Water',
  'தண்ணீர்': 'Water', 'தண்ணி': 'Water', 'நீళ్లు': 'Water', 'నీళ్ల': 'Water', 'నీరు': 'Water', 'నీటి': 'Water',
  'जल': 'Water', 'पाणी': 'Water', 'પાણી': 'Water', 'ನೀರು': 'Water', 'ನೀರಿನ': 'Water', 'വെള്ളം': 'Water', 'വെള്ള': 'Water',
  'bisleri': 'Water', 'aquafina': 'Water', 'kinley': 'Water', 'jal': 'Water', 'thanneer': 'Water', 'thanni': 'Water', 'neeru': 'Water', 'neellu': 'Water', 'vellam': 'Water',

  // Rice
  'rice': 'Rice', 'chawal': 'Rice', 'chaawal': 'Rice', 'चावल': 'Rice', 'चांवल': 'Rice', 'राइस': 'Rice',
  'அரிசி': 'Rice', 'அரிசிய': 'Rice', 'அரிசியை': 'Rice', 'బియ్యం': 'Rice', 'బియ్యము': 'Rice', 'వరి': 'Rice', 'চাল': 'Rice', 'तांदूळ': 'Rice', 'तांदुळ': 'Rice', 'भात': 'Rice', 'ચોખા': 'Rice', 'ಅಕ್ಕಿ': 'Rice', 'ಅಕ್ಕಿಯ': 'Rice', 'അരി': 'Rice',
  'basmati': 'Rice', 'kolam': 'Rice', 'chokha': 'Rice', 'tandul': 'Rice', 'arisi': 'Rice', 'biyyam': 'Rice', 'akki': 'Rice', 'ari': 'Rice', 'chal': 'Rice', 'bhaat': 'Rice',

  // Biscuits
  'biscuit': 'Biscuits', 'biscuits': 'Biscuits', 'बिस्कुट': 'Biscuits', 'बिस्कुट पैकेट': 'Biscuits', 'बिस्किट': 'Biscuits', 'बिस्कूट': 'Biscuits',
  'பிஸ்கட்': 'Biscuits', 'பிஸ்கட்டுகள்': 'Biscuits', 'బిస్కెట్లు': 'Biscuits', 'বিস্কুট': 'Biscuits', 'બિસ્કિટ': 'Biscuits', 'ಬಿಸ್ಕತ್ತು': 'Biscuits', 'ಬಿಸ್ಕಟ್': 'Biscuits', 'ബിസ്കറ്റ്': 'Biscuits',
  'parle g': 'Biscuits', 'good day': 'Biscuits', 'marie': 'Biscuits', 'biskut': 'Biscuits', 'biskit': 'Biscuits',

  // Milk
  'milk': 'Milk', 'doodh': 'Milk', 'dudh': 'Milk', 'दूध': 'Milk', 'मिल्क': 'Milk',
  'பால்': 'Milk', 'பாலின்': 'Milk', 'பால': 'Milk', 'పాలు': 'Milk', 'দুধ': 'Milk', 'દૂધ': 'Milk', 'ಹಾಲು': 'Milk', 'പാൽ': 'Milk',
  'amul': 'Milk', 'mother dairy': 'Milk', 'paal': 'Milk', 'palu': 'Milk', 'haalu': 'Milk',

  // Soap
  'soap': 'Soap', 'sabun': 'Soap', 'saabun': 'Soap', 'साबुन': 'Soap', 'सोप': 'Soap',
  'சோப்': 'Soap', 'சబ్బు': 'Soap', 'সাবান': 'Soap', 'સાબુ': 'Soap', 'ಸೋಪ್': 'Soap', 'സോപ്പ്': 'Soap',
  'lifebuoy': 'Soap', 'lux': 'Soap', 'dettol': 'Soap', 'dove': 'Soap', 'savun': 'Soap',

  // Sugar
  'sugar': 'Sugar', 'cheeni': 'Sugar', 'chini': 'Sugar', 'shakkar': 'Sugar', 'चीनी': 'Sugar', 'शक्कर': 'Sugar', 'शुगर': 'Sugar',
  'சர்க்கரை': 'Sugar', 'சீனி': 'Sugar', 'పంచదార': 'Sugar', 'చక్కెర': 'Sugar', 'চিনি': 'Sugar', 'સાખર': 'Sugar', 'ખાંડ': 'Sugar', 'ಸಕ್ಕರೆ': 'Sugar', 'പഞ്ചസാര': 'Sugar',
  'sakhar': 'Sugar', 'khand': 'Sugar', 'panchadara': 'Sugar', 'sarkkarai': 'Sugar', 'panchasara': 'Sugar', 'seeni': 'Sugar',

  // Tea
  'tea': 'Tea', 'chai': 'Tea', 'chay': 'Tea', 'chai patti': 'Tea', 'चाय': 'Tea', 'टी': 'Tea', 'चाय पत्ती': 'Tea', 'चहा': 'Tea',
  'தேநீர்': 'Tea', 'டீ': 'Tea', 'టీ': 'Tea', 'চা': 'Tea', 'ચા': 'Tea', 'ಟೀ': 'Tea', 'ചായ': 'Tea',
  'taj mahal': 'Tea', 'tata tea': 'Tea', 'red label': 'Tea', 'chaha': 'Tea', 'theeneer': 'Tea',

  // Cooking Oil
  'oil': 'Cooking Oil', 'cooking oil': 'Cooking Oil', 'tel': 'Cooking Oil', 'तेल': 'Cooking Oil', 'ऑयल': 'Cooking Oil', 'कुकिंग ऑयल': 'Cooking Oil', 'सरसों तेल': 'Cooking Oil',
  'எண்ணெய்': 'Cooking Oil', 'எண்ணை': 'Cooking Oil', 'నూనె': 'Cooking Oil', 'તેલ': 'Cooking Oil', 'તેલનો': 'Cooking Oil', 'ಎಣ್ಣೆ': 'Cooking Oil', 'എണ്ണ': 'Cooking Oil',
  'fortune': 'Cooking Oil', 'saffola': 'Cooking Oil', 'ennai': 'Cooking Oil', 'noone': 'Cooking Oil', 'enne': 'Cooking Oil',

  // Wheat
  'wheat': 'Wheat', 'gehu': 'Wheat', 'gehun': 'Wheat', 'गेहूं': 'Wheat', 'गेहूँ': 'Wheat', 'atta': 'Wheat', 'आटा': 'Wheat', 'व्हीट': 'Wheat',
  'கோதுமை': 'Wheat', 'கோಧಿ': 'Wheat', 'గోధుమలు': 'Wheat', 'গম': 'Wheat', 'गहू': 'Wheat', 'ઘઉં': 'Wheat', 'ಗೋಧಿ': 'Wheat', 'ഗോതമ്പ്': 'Wheat',
  'ashirvaad': 'Wheat', 'aashirvaad': 'Wheat', 'aata': 'Wheat', 'godhumai': 'Wheat', 'godhumalu': 'Wheat', 'gahu': 'Wheat', 'ghau': 'Wheat'
};

/**
 * Normalizes input text across all Indian scripts
 */
export function normalizeText(text: string): string {
  let normalized = text.trim();

  // Replace regional numerals with 0-9
  for (const [regionalDigit, standardDigit] of Object.entries(REGIONAL_DIGITS)) {
    normalized = normalized.split(regionalDigit).join(standardDigit);
  }

  // Clean currency symbols and special punctuation
  normalized = normalized.replace(/[₹$]/g, ' rupees ');
  normalized = normalized.replace(/[,.?!;:–—\-_।॥]/g, ' ');

  // Collapse consecutive whitespace
  normalized = normalized.replace(/\s+/g, ' ').trim();

  return normalized;
}

/**
 * Detect language of the input query from script Unicode ranges
 */
export function detectLanguage(text: string): SupportedLanguage {
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
  if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn'; // Kannada
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml'; // Malayalam
  if (/[\u0900-\u097F]/.test(text)) {
    // Marathi vs Hindi keywords
    if (/(विकले|साठा|किती|दोन|पाच|सहा|दहा|वीस|पन्नास|आहे|नाही|संपले|खपले)/.test(text)) {
      return 'mr';
    }
    return 'hi'; // Devanagari Hindi
  }
  return 'en';
}

/**
 * Extract numbers (digits or regional number words) from text
 */
function extractNumber(text: string): number | undefined {
  // Check for standard digits
  const digitMatch = text.match(/\b\d+(\.\d+)?\b/);
  if (digitMatch) {
    return parseFloat(digitMatch[0]);
  }

  const words = text.toLowerCase().split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    // 2-word numbers (twenty five)
    if (i < words.length - 1) {
      const twoWords = `${words[i]} ${words[i + 1]}`;
      if (MULTILINGUAL_NUMBERS[twoWords] !== undefined) {
        return MULTILINGUAL_NUMBERS[twoWords];
      }
    }
    // 1-word number
    if (MULTILINGUAL_NUMBERS[words[i]] !== undefined) {
      return MULTILINGUAL_NUMBERS[words[i]];
    }
  }

  return undefined;
}

/**
 * Extract units (kg, liters, packets, etc.) from text
 */
function extractUnit(text: string): UnitType | undefined {
  const words = text.toLowerCase().split(/\s+/);
  for (const word of words) {
    if (UNIT_MAP[word]) {
      return UNIT_MAP[word];
    }
  }
  return undefined;
}

/**
 * Extract product name from input text
 */
function extractProduct(text: string): { productName: string; matchedText: string } | undefined {
  const lower = text.toLowerCase();

  // Try matching longest aliases first
  const sortedAliases = Object.keys(PRODUCT_ALIASES).sort((a, b) => b.length - a.length);

  for (const alias of sortedAliases) {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|\\s|[0-9])${escaped}($|\\s|[0-9]|નો|ના|ની|નું|ને|चा|चे|ची|च्या|का|के|की|யை|இன்|కు|కి|এর|র|ನ್ನು|ಗೆ|ടെ|നെ)`, 'i');
    if (regex.test(lower)) {
      return {
        productName: PRODUCT_ALIASES[alias],
        matchedText: alias
      };
    }
  }

  return undefined;
}

/**
 * Main Rule-Based Multilingual NLP Intent Parser
 * 100% Offline with zero external API calls.
 */
export function parseIntent(rawInput: string): ParsedIntent {
  const clean = normalizeText(rawInput);
  const lower = clean.toLowerCase();
  const lang = detectLanguage(rawInput);

  const productInfo = extractProduct(lower);
  const parsedQty = extractNumber(lower);
  const parsedUnit = extractUnit(lower);

  // ----------------------------------------------------
  // 0. WHOLESALE ORDER / WHATSAPP REORDER INTENT
  // ----------------------------------------------------
  const wholesaleKeywords = /(wholesale|wholesaler|distributor|supplier|reorder|होलसेल|सप्लायर|डिस्ट्रीब्यूटर|જથ્થાબંધ|घाऊक|மொத்த|ஹோல்சேல்|హోల్‌సేల్|హోల్సేల్|পাইকারি|ಸಗಟು|മൊത്ത)/i;
  const isWhatsAppOrder = /(whatsapp|व्हाट्सएप|વોટ્સએપ|व्हॉट्सॲप|வாட்ஸ்அப்|வாட்ஸாப்|হোয়াটসঅ্যাপ|ವಾಟ್ಸಾಪ್|വാട്ട്‌സ്ആപ്പ്)/i.test(lower) && /(order|ऑर्डर|ઓર્ડર|ஆர்டர்|ఆర్డర్|অর্ডার|ಆರ್ಡರ್|ഓർഡർ|bhejo|bhejna|send|dispatch|reorder)/i.test(lower);
  const isDirectOrder = /(होलसेल\s*ऑर्डर|ऑर्डर\s*भेजो|ઓર્ડર\s*મોકલો|order\s*bhejo|send\s*order|reorder\s*stock|घाऊक\s*ऑर्डर)/i.test(lower);

  if (wholesaleKeywords.test(lower) || isWhatsAppOrder || isDirectOrder) {
    return {
      intent: 'WHOLESALE_ORDER',
      confidence: 0.95,
      rawText: rawInput,
      language: lang,
      entities: {
        productName: productInfo?.productName,
        quantity: parsedQty,
        unit: parsedUnit
      }
    };
  }

  // ----------------------------------------------------
  // 1. CHECK EARNINGS INTENT (Multilingual)
  // ----------------------------------------------------
  const earningsKeywords = /(earn[a-z]*|income|sale[s]?\s*(today|total)?|revenue|profit|kamai|kamaya|bikri|कमाई|बिक्री|कमाया|வருமானம்|விற்பனை|సంపాదన|ఆదాయం|আয়|कमावले|કમાણી|ಆದಾಯ|ಗಳಿಕೆ|വരുമാനം)/i;
  const isEarningsContext = (
    lower.includes('today') || 
    lower.includes('aaj') || 
    lower.includes('how much') || 
    lower.includes('check') || 
    lower.includes('show') || 
    lower.includes('total') || 
    lower.includes('balance') || 
    lower.includes('galla') || 
    lower.includes('गल्ला') || 
    lower.includes('कितनी') || 
    lower.includes('दिखाओ') || 
    lower.includes('kitni') || 
    lower.includes('kitna') || 
    lower.includes('कितना') ||
    lower.includes('मैंने') ||
    lower.includes('இன்றைய') ||
    lower.includes('எவ்வளவு') ||
    lower.includes('என்ன') ||
    lower.includes('ఈరోజు') ||
    lower.includes('ఎంత') ||
    lower.includes('আজকের') ||
    lower.includes('কত') ||
    lower.includes('आजची') ||
    lower.includes('किती') ||
    lower.includes('આજની') ||
    lower.includes('કેટલી') ||
    lower.includes('ಇಂದಿನ') ||
    lower.includes('ಎಷ್ಟು') ||
    lower.includes('ഇന്നത്തെ') ||
    lower.includes('എത്ര') ||
    lower === 'check earnings' || 
    lower === 'earnings'
  );

  if (!parsedQty && earningsKeywords.test(lower) && (isEarningsContext || lower.includes('earn') || lower.includes('कमाई') || lower.includes('வருமானம்') || lower.includes('సంపాదన') || lower.includes('আয়') || lower.includes('કમાણી') || lower.includes('ಗಳಿಕೆ') || lower.includes('വരുമാനം'))) {
    return {
      intent: 'CHECK_EARNINGS',
      confidence: 0.95,
      rawText: rawInput,
      language: lang,
      entities: {}
    };
  }

  // ----------------------------------------------------
  // 2. RECORD SALE / SOLD / SOLD OUT / BIK GAYA INTENT
  // ----------------------------------------------------
  const isSalePattern = (
    // English & phonetic variants (sold, sole, soled, sale, sales, sell, selling, sold out, soldout, billed, bill, out of stock, finished, etc.)
    /\b(sold|soldout|sole|soled|sale|sales|sell|selling|seller|billed|billing|bill|out\s*of\s*stock|gone|finished|out\b)/i.test(lower) ||
    // Hindi / Hinglish / Urdu (बिक गया, बिक गई, बिका, बिकी, बेचा, बेची, बेच दिया, सोल्ड, सेल हुआ, bik gaya, bech diya, becha, bika, khatam, etc.)
    /(बिक\s*गया|बिक\s*गई|बिक\s*गए|बिका|बिकी|बिके|बेचा|बेची|बेचे|बेच\s*दिया|बेच\s*दी|बेच\s*दिए|बेच\s*डाला|सोल्ड|सोल्ड\s*आउट|बिक्री|बिक्री\s*हुई|खत्म|खत्म\s*हो\s*गया|सेल\s*हुआ|सेल\s*हो\s*गया|सेल\s*किया|bik\s*gaya|bik\s*gya|bik\s*gayi|bik\s*gaye|bik\s*gaya\s*hai|bikgaya|bikgya|bech\s*diya|bech\s*di|bech\s*diye|becha|bechi|beche|bika|biki|bike|khatam|khatam\s*ho\s*gaya|sale\s*ho\s*gaya|sold)/i.test(lower) ||
    // Gujarati / Gujlish (વેચ્યું, વેચાઈ ગયું, વેચ્યા, વેચી, વેચાણ, સોલ્ડ, vechyu, vechayu, vechai gayu, vechya, vechi, vechan, etc.)
    /(વેચ્યું|વેચાઈ\s*ગયું|વેચાઈ\s*ગયા|વેચાયું|વેચાયા|વેચાઈ\s*ગઈ|વેચી\s*દીધું|વેચી\s*દીધા|વેચ્યા|વેચ્યો|વેચી|વેચાણ|વેચાણ\s*થયું|પૂરું\s*થઈ\s*ગયું|પૂરા\s*થઈ\s*ગયા|ખપી\s*ગયું|આપ્યું|સોલ્ડ|vechyu|vechayu|vechai\s*gayu|vechai\s*gaya|vechya|vechan|khapi\s*gayu|aapyu)/i.test(lower) ||
    // Marathi / Marathlish (विकले, विकले गेले, विकून झाले, विकला, विकली, विक्री, संपले, संपून गेले, सोल्ड, vikle, vikun, vikla, vikli, vikri, sample, etc.)
    /(विकले|विकले\s*गेले|विकला\s*गेला|विकली\s*गेली|विकून\s*झाले|विकून\s*टाकले|विकला|विकली|विकलेत|विक्री|विक्री\s*झाली|खपले|खप\s*झाली|संपले|संपून\s*गेले|दिले|सोल्ड|vikle|vikle\s*gele|vikun|vikla|vikli|vikri|sample|dile)/i.test(lower) ||
    // Tamil / Tanglish (விற்கப்பட்டது, விற்கப்பட்டுள்ளது, விற்கப்பட்ட, விற்றது, விற்றுவிட்டது, விற்றேன், விற்பனை, தீர்ந்துவிட்டது, சோல்ட், vitrathu, vithathu, etc.)
    /(விற்கப்பட்டது|விற்கப்பட்டுள்ளது|விற்கப்பட்ட|விற்பனையானது|விற்பனையாகிவிட்டது|விற்பனை\s*செய்யப்பட்டது|விற்றது|விற்றுவிட்டது|விற்றுத்\s*தீர்ந்தது|விற்றேன்|விற்றோம்|விற்றாச்சு|வித்தாச்சு|வித்தது|வித்தேன்|விற்பனை|தீர்ந்துவிட்டது|தீர்ந்தது|முடிந்தது|முடிந்துவிட்டது|முடிஞ்சு\s*போச்சு|கொடுத்தேன்|கொடுத்தாச்சு|சோல்ட்|virkappattathu|virkappattadhu|vitrathu|vithathu|vittuvittathu|virpanai|theernthathu|mudinthathu|koduthen)/i.test(lower) ||
    // Telugu / Telugish (అమ్మబడింది, అమ్మబడ్డాయి, అమ్మాను, అమ్మాము, అమ్మకం, అమ్ముడైంది, అమ్ముడైపోయింది, అయిపోయింది, సోల్డ్, ammanu, ammamu, ammakam, ammudaindi, etc.)
    /(అమ్మబడింది|అమ్మబడ్డాయి|అమ్మాను|అమ్మాము|అమ్మకం|అమ్మకాలు|అమ్మేసాను|అమ్మేశాను|అమ్మేసాము|అమ్ముడైంది|అమ్ముడైపోయింది|అమ్ముడుపోయింది|అయిపోయింది|అమ్మేశారు|ఖర్చయింది|ఇచ్చాను|సోల్డ్|ammabadindi|ammanu|ammamu|ammakam|ammudaindi|ammudaipoindi|aipoindi|ammesaru|icchanu)/i.test(lower) ||
    // Bengali / Banglish (বিক্রি হলো, বিক্রি হয়েছে, বিক্রি হয়ে গেছে, বিক্রি করলাম, বেচলাম, সোল্ড, bikri, bikri holo, bikri hoye geche, bechlam, etc.)
    /(বিক্রি|বিক্রি\s*হলো|বিক্রি\s*হয়েছে|বিক্রি\s*হয়ে\s*গেছে|বিক্রি\s*করা\s*হয়েছে|বিক্রি\s*করলাম|বেচলাম|বেচেছি|বেচে\s*দিলাম|ফুরিয়ে\s*গেছে|শেষ\s*হয়ে\s*গেছে|দিলাম|সোল্ড|bikri|bikri\s*holo|bikri\s*hoye|bechlam|bechechi|dilam)/i.test(lower) ||
    // Kannada / Kanglish (ಮಾರಾಟ ಮಾಡಲಾಯಿತು, ಮಾರಾಟವಾಯಿತು, ಮಾರಾಟವಾಗಿದೆ, ಮಾರಿದೆ, ಖಾಲಿಯಾಗಿದೆ, ಸೋಲ್ಡ್, marata, maratavagide, maride, khaliyagide, etc.)
    /(ಮಾರಾಟ|ಮಾರಾಟ\s*ಮಾಡಲಾಯಿತು|ಮಾರಾಟವಾಯಿತು|ಮಾರಾಟವಾಗಿದೆ|ಮಾರಾಟವಾಯ್ತು|ಮಾರಿದೆ|ಮಾರಿದ್ವಿ|ಖಾಲಿಯಾಗಿದೆ|ಖಾಲಿ\s*ಆಯಿತು|ಮುಗಿದಿದೆ|ಮುಗಿದುಹೋಯಿತು|ಕೊಟ್ಟೆ|ಸೋಲ್ಡ್|marata|maratavagide|maride|maridvi|khaliyagide|mugidide|kotte)/i.test(lower) ||
    // Malayalam / Manglish (വിൽക്കപ്പെട്ടു, വിറ്റു, വിറ്റുപോയി, വിൽപ്പന, തീർന്നു, തീർന്നുപോയി, സോൾഡ്, vittu, vittupoyi, vilppana, theernnu, etc.)
    /(വിൽക്കപ്പെട്ടു|വിൽക്കപ്പെട്ടിരിക്കുന്നു|വിറ്റു|വിറ്റുപോയി|വിറ്റുകഴിഞ്ഞു|വിറ്റുതീർന്നു|വിൽപ്പന|വിൽപ്പനയായി|വിൽപ്പന\s*കഴിഞ്ഞു|തീർന്നു|തീർന്നുപോയി|കഴിഞ്ഞു|കൊടുത്തു|സോൾഡ്|vilkkappettu|vittu|vittupoyi|vilppana|theernnu|kazhinju|koduthu)/i.test(lower)
  );

  if (isSalePattern) {
    // Extract all numbers
    const allNumbers: number[] = [];
    const tokens = lower.split(/\s+/);
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (/^\d+(\.\d+)?$/.test(token)) {
        allNumbers.push(parseFloat(token));
      } else if (MULTILINGUAL_NUMBERS[token] !== undefined) {
        allNumbers.push(MULTILINGUAL_NUMBERS[token]);
      }
    }

    // Explicit amount match patterns (e.g. "for 90 rupees", "90 रुपये में", "90 ரூபாய்க்கு")
    let amount: number | undefined;
    const amountMatch = lower.match(/(?:for|में|க்கு|கு|कु|టাকায়|त|માં|गे|ക്ക്|రూపాయలకు|రూపాయలు|రూపాయల|ரூபாய்க்கு|ரூபாய்|रुपयांत|રૂપિયામાં|ರೂಪಾಯಿಗೆ|രൂപയ്ക്ക്)\s*(\d+|[a-z\u0900-\u0D7F]+)/i);

    if (amountMatch) {
      amount = extractNumber(amountMatch[1]);
    }

    let quantity: number | undefined;
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

    if (!quantity && parsedQty) {
      quantity = parsedQty;
    }

    const unit = parsedUnit || extractUnit(lower);

    return {
      intent: 'RECORD_SALE',
      confidence: 0.95,
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

  // ----------------------------------------------------
  // 3. LOW STOCK INTENT (Without quantity/sale verbs)
  // ----------------------------------------------------
  const lowStockRegex = /(low\s*stock|running\s*low|running\s*out|need\s*to\s*buy|reorder|kam\s*stock|कम\s*स्टॉक|कौन\s*सा\s*सामान\s*कम|குறைந்த\s*இருப்பு|குறைவாக|తక్కువ\s*స్టాక్|ఏది\s*తక్కువ|কম\s*স্টক|কোন\s*জিনিস\s*কম|कमी\s*साठा|कोणते\s*सामान\s*कमी|ઓછો\s*સ્ટોક|કયો\s*સામાન\s*ઓછો|ಕಡಿಮೆ\s*ದಾಸ್ತಾನು|ಯಾವ\s*ವಸ್ತು\s*ಕಡಿಮೆ|കുറഞ്ഞ\s*സ്റ്റോക്ക്|ഏതൊക്കെ\s*സാധനങ്ങൾ\s*കുറവാണ്)/i;
  if (!parsedQty && lowStockRegex.test(lower)) {
    return {
      intent: 'LOW_STOCK',
      confidence: 0.95,
      rawText: rawInput,
      language: lang,
      entities: {}
    };
  }

  // ----------------------------------------------------
  // 4. ADD STOCK INTENT (Multilingual: "Add 20 bottles of water", "20 kg rice aaya")
  // ----------------------------------------------------
  const isAddStockPattern = !isSalePattern && (
    /(add|received|bought|khareeda|khareed|aaya|laaya|jo[d|r]o|daalo|dalo|जोड़ो|डाला|डालो|आया|लाया|खरीदा|स्टॉक\s*डालो|स्टॉक\s*जोड़ो|சேர்க்கவும்|சேர்|சேர்த்தல்|சேர்க்க|சேர்க்கப்பட்டது|జోడించు|కలుపు|చేర్చు|যোগ\s*করুন|যোগ\s*করো|जोडा|टाका|ઉમેરો|નાખો|ಸೇರಿಸಿ|ಹಾಕಿ|ചേർക്കുക|ഇടുക)/i.test(lower) ||
    (/^stock\s+\d+/i.test(lower)) ||
    (/^स्टॉक\s+\d+/i.test(lower)) ||
    (/^ஸ்டாக்\s+\d+/i.test(lower)) ||
    (/^స్టాక్\s+\d+/i.test(lower))
  );

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

  // ----------------------------------------------------
  // 5. UPDATE PRICE INTENT (Multilingual)
  // ----------------------------------------------------
  const isPriceKeyword = /(price|rate|cost|rupees|rs|bhaav|keemat|daam|kimm?at|भाव|कीमत|रेट|दाम|दर|விலை|ரேட்|ధర|రేటు|দাম|দর|মূল্য|ಬೆಲೆ|ದರ|ವില|റേറ്റ്|ભાવ|કિંમત|રૂપિયા|रुपये|ரூபாய்|రూపాయలు|টাকা|ರೂಪಾಯಿ|രൂപ)/i.test(lower);
  const isPriceAction = /(change|set|update|make|increase|decrease|karo|kar\s*do|kara|badlo|badla|aakku|maatru|cheyandi|cheyi|korun|bodo|maadi|badalisi|aakkuka|maattuka|बदलो|बदला|करो|कर\s*दो|करा|बदला|மாற்று|மாற்றவும்|చేయండి|చేయి|మార్చు|করুন|বদলান|માટે|કરો|બદલો|ಮಾಡಿ|ಬದಲಾಯಿಸಿ|ആക്കുക|മാറ്റുക|is\s*now|goes\s*up\s*to|became)/i.test(lower);

  if ((isPriceKeyword && isPriceAction) || (productInfo && isPriceKeyword && /\d+/.test(lower) && !isSalePattern && !isAddStockPattern)) {
    let targetPrice: number | undefined;

    const priceMatch = lower.match(/(?:to|is|now|at|for|₹|रुपये|રૂપિયા|ரூபாய்|రూపాయలు|টাকা|ರೂಪಾಯಿ|രൂപ|भाव|कीमत|रेट|விலை|ధర|দাম|ಬೆಲೆ|ವില)\s*(\d+(?:\.\d+)?)/i) ||
      lower.match(/(\d+(?:\.\d+)?)\s*(?:rupees|rs|रुपये|રૂપિયા|ரூபாய்|రూపాయలు|টাকা|ರೂಪಾಯಿ|രൂപ|karo|kar\s*do|kara|badlo|aakku|maatru|cheyandi|korun|maadi|aakkuka|કરો|बदलो|करो)/i) ||
      lower.match(/\b(\d+(?:\.\d+)?)\b/);

    if (priceMatch && priceMatch[1]) {
      targetPrice = parseFloat(priceMatch[1]);
    } else if (parsedQty) {
      targetPrice = parsedQty;
    }

    if (targetPrice && targetPrice > 0) {
      return {
        intent: 'UPDATE_PRICE',
        confidence: 0.95,
        rawText: rawInput,
        language: lang,
        entities: {
          productName: productInfo?.productName,
          pricePerUnit: targetPrice
        },
        errorReason: !productInfo ? 'MISSING_PRODUCT' : undefined
      };
    }
  }

  // ----------------------------------------------------
  // 6. CHECK STOCK INTENT (Multilingual)
  // ----------------------------------------------------
  const checkStockRegex = /(check\s*stock|how\s*much.*left|how\s*many.*have|show.*stock|stock\s*of|kitna\s*stock|kitna\s*bacha|स्टॉक\s*कितना|कितना\s*बचा|स्टॉक\s*दिखाओ|இருப்பு\s*எவ்வளவு|எவ்வளவு\s*உள்ளது|స్టాక్\s*ఎంత|ఎంత\s*మిగిలింది|স্টক\s*কত|কতটুকু\s*বাকি|साठा\s*किती|किती\s*शिल्लक|કેટલો\s*સ્ટોક|કેટલું\s*બાકી|ದಾಸ್ತಾನು\s*ಎಷ್ಟು|ಎಷ್ಟು\s*ಉಳಿದಿದೆ|സ്റ്റോക്ക്\s*എത്ര|എത്ര\s*ബാക്കിയുണ്ട്)/i;

  if (checkStockRegex.test(lower) || (productInfo && (lower.includes('stock') || lower.includes('left') || lower.includes('kitna') || lower.includes('बचा') || lower.includes('இருப்பு') || lower.includes('స్టాక్') || lower.includes('স্টক') || lower.includes('साठा') || lower.includes('સ્ટોક') || lower.includes('ದಾಸ್ತಾನು') || lower.includes('സ്റ്റോക്ക്')))) {
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

  // Fallback implicit quantity + product -> default to ADD_STOCK only if no sale indication
  if (parsedQty && productInfo) {
    if (isSalePattern) {
      return {
        intent: 'RECORD_SALE',
        confidence: 0.85,
        rawText: rawInput,
        language: lang,
        entities: {
          productName: productInfo.productName,
          quantity: parsedQty,
          unit: parsedUnit
        }
      };
    }
    return {
      intent: 'ADD_STOCK',
      confidence: 0.75,
      rawText: rawInput,
      language: lang,
      entities: {
        productName: productInfo.productName,
        quantity: parsedQty,
        unit: parsedUnit
      }
    };
  }

  // Fallback single product query -> CHECK_STOCK
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
