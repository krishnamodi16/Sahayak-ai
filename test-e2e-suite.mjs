import { TRANSLATIONS, SUPPORTED_LANGUAGES, getLocalizedProductName, getLocalizedUnitName, getLocalizedActivityMessage } from './src/services/translations.ts';
import { parseIntent } from './src/services/intentParser.ts';
import { getLocalizedResponse, getHumanErrorResponse } from './src/services/businessLogic.ts';

console.log('======================================================');
console.log('SAHAYAK DUKAAN — MULTILINGUAL & VOICE VERIFICATION');
console.log('======================================================\n');

// 1. Language metadata verification
console.log('1. Supported Languages:');
SUPPORTED_LANGUAGES.forEach(l => {
  console.log(`  - [${l.code}] ${l.name} (${l.nativeName}) - sample: "${l.sampleSuggestion}"`);
});

if (SUPPORTED_LANGUAGES.length !== 9) {
  throw new Error(`Expected 9 languages, found ${SUPPORTED_LANGUAGES.length}`);
}
console.log('✓ All 9 languages configured.\n');

// 2. Translations completeness verification
console.log('2. Section Verification across all 9 languages:');
const requiredSections = ['nav', 'stats', 'inventory', 'sales', 'activity', 'modals', 'settings', 'offlinePanel', 'conversation', 'quickActions'];
for (const lang of SUPPORTED_LANGUAGES) {
  const t = TRANSLATIONS[lang.code];
  if (!t) throw new Error(`Missing translations for language ${lang.code}`);
  for (const sec of requiredSections) {
    if (!t[sec]) throw new Error(`Missing section ${sec} in ${lang.code}`);
  }
  console.log(`  ✓ ${lang.name} (${lang.code}): all ${requiredSections.length} sections validated.`);
}

// 3. Gujarati Spoken Responses Verification
console.log('\n3. Gujarati Voice & Response Verification:');
const guRecordSale = getLocalizedResponse('gu', 'RECORD_SALE', {
  rawName: 'Rice',
  quantity: 20,
  unit: 'kg',
  amount: 1200,
  stockLeft: 30
});
console.log('  RECORD_SALE in Gujarati:');
console.log('    Display text:', guRecordSale.text);
console.log('    Spoken text:', guRecordSale.spoken);
console.log('    Phonetic fallback:', guRecordSale.phonetic);
if (!guRecordSale.spoken.includes('ચોખા') || !guRecordSale.spoken.includes('૧૨૦૦') && !guRecordSale.spoken.includes('1200')) {
  throw new Error('Gujarati RECORD_SALE text missing product name or amount');
}

const guAddStock = getLocalizedResponse('gu', 'ADD_STOCK', {
  rawName: 'Water',
  quantity: 20,
  unit: 'bottles',
  totalStock: 50
});
console.log('  ADD_STOCK in Gujarati:');
console.log('    Display text:', guAddStock.text);
console.log('    Spoken text:', guAddStock.spoken);
console.log('    Phonetic fallback:', guAddStock.phonetic);

const guCheckStockAll = getLocalizedResponse('gu', 'CHECK_STOCK_ALL', {
  totalItems: 8,
  lowStockCount: 2
});
console.log('  CHECK_STOCK_ALL in Gujarati:');
console.log('    Display text:', guCheckStockAll.text);
console.log('    Spoken text:', guCheckStockAll.spoken);
console.log('    Phonetic fallback:', guCheckStockAll.phonetic);

const guCheckEarnings = getLocalizedResponse('gu', 'CHECK_EARNINGS', {
  totalEarnings: 3500,
  txCount: 14
});
console.log('  CHECK_EARNINGS in Gujarati:');
console.log('    Display text:', guCheckEarnings.text);
console.log('    Spoken text:', guCheckEarnings.spoken);
console.log('    Phonetic fallback:', guCheckEarnings.phonetic);

const guLowStock = getLocalizedResponse('gu', 'LOW_STOCK', {
  count: 2,
  list: 'પાણી (૨ બોટલ), ચોખા (૫ કિલો)'
});
console.log('  LOW_STOCK in Gujarati:');
console.log('    Display text:', guLowStock.text);
console.log('    Spoken text:', guLowStock.spoken);
console.log('    Phonetic fallback:', guLowStock.phonetic);

// 4. Human Error Handling for Unrecognized Speech
console.log('\n4. Human Error Handling (Unrecognized Speech):');
for (const lang of SUPPORTED_LANGUAGES) {
  const err = getHumanErrorResponse(lang.code);
  console.log(`  [${lang.code}] ${lang.name}:`);
  console.log(`    "${err.text}"`);
  console.log(`    Spoken: "${err.spoken}"`);
  console.log(`    Phonetic: "${err.phonetic}"`);
  if (!err.spoken || !err.text) {
    throw new Error(`Missing error response for ${lang.code}`);
  }
}

// 5. Activity Log Localization Test
console.log('\n5. Activity Log Localization:');
const act1 = { type: 'ADD_STOCK', message: 'Added 20 bottles of Water' };
const act2 = { type: 'SALE', message: 'Sold 5 kg of Rice for ₹300' };
console.log('  ADD_STOCK in Gujarati:', getLocalizedActivityMessage(act1, 'gu'));
console.log('  SALE in Gujarati:', getLocalizedActivityMessage(act2, 'gu'));
console.log('  ADD_STOCK in Hindi:', getLocalizedActivityMessage(act1, 'hi'));
console.log('  SALE in Tamil:', getLocalizedActivityMessage(act2, 'ta'));

console.log('\n======================================================');
console.log('ALL VERIFICATION TESTS PASSED SUCCESSFULLY! (100% OK)');
console.log('======================================================');
