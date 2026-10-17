import { ParsedIntent, ExecutionResult, Product, SupportedLanguage, UnitType } from '../types/index';
import * as db from './database';
import { getLocalizedProductName, getLocalizedUnitName } from './translations';

/**
 * Format Indian Rupee currency with standard Indian numbering system (Lakhs / Crores)
 */
export function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

/**
 * Generates localized messages, native spoken responses, and phonetic fallback strings for all 9 Indian languages
 */
export function getLocalizedResponse(
  lang: SupportedLanguage,
  intent: string,
  data: any
): { text: string; spoken: string; phonetic: string } {
  // ----------------------------------------------------
  // 1. ADD_STOCK
  // ----------------------------------------------------
  if (intent === 'ADD_STOCK') {
    const { rawName, quantity, unit: rawUnit, totalStock } = data;
    const name = getLocalizedProductName(rawName, lang);
    const unit = getLocalizedUnitName(rawUnit, lang);

    switch (lang) {
      case 'gu':
        return {
          text: `✅ ${quantity} ${unit} ${name} સ્ટોક ઉમેરાયો છે. કુલ સ્ટોક: ${totalStock} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} સ્ટોક ઉમેરાયો છે. હવે કુલ સ્ટોક ${totalStock} ${unit} છે.`,
          phonetic: `${quantity} ${unit} ${name} stock umeraayo chhe. Have kul stock ${totalStock} ${unit} chhe.`
        };
      case 'hi':
        return {
          text: `✅ ${quantity} ${unit} ${name} का स्टॉक जोड़ दिया गया है। कुल स्टॉक: ${totalStock} ${unit}।`,
          spoken: `${quantity} ${unit} ${name} का स्टॉक जोड़ दिया गया है। कुल स्टॉक ${totalStock} ${unit} है।`,
          phonetic: `${quantity} ${unit} ${name} ka stock jod diya gaya hai. Kul stock ${totalStock} ${unit} hai.`
        };
      case 'mr':
        return {
          text: `✅ ${quantity} ${unit} ${name} साठा जोडला गेला आहे. एकूण साठा: ${totalStock} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} साठा जोडला. एकूण साठा ${totalStock} ${unit} आहे.`,
          phonetic: `${quantity} ${unit} ${name} saatha jodlaa. Ekun saatha ${totalStock} ${unit} aahe.`
        };
      case 'ta':
        return {
          text: `✅ ${quantity} ${unit} ${name} சேர்க்கப்பட்டது. தற்போதைய இருப்பு: ${totalStock} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} சேர்க்கப்பட்டது. மொத்த இருப்பு ${totalStock} ${unit}.`,
          phonetic: `${quantity} ${unit} ${name} serkkappattadhu. Moththa iruppu ${totalStock} ${unit}.`
        };
      case 'te':
        return {
          text: `✅ ${quantity} ${unit} ${name} జోడించబడింది. ప్రస్తుత స్టాక్: ${totalStock} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} జోడించబడింది. మొత్తం స్టాక్ ${totalStock} ${unit}.`,
          phonetic: `${quantity} ${unit} ${name} jodinchabadindi. Moththam stock ${totalStock} ${unit}.`
        };
      case 'bn':
        return {
          text: `✅ ${quantity} ${unit} ${name} যোগ করা হয়েছে। বর্তমান স্টক: ${totalStock} ${unit}।`,
          spoken: `${quantity} ${unit} ${name} যোগ করা হয়েছে। মোট স্টক ${totalStock} ${unit}।`,
          phonetic: `${quantity} ${unit} ${name} jog kora hoyechhe. Mot stock ${totalStock} ${unit}.`
        };
      case 'kn':
        return {
          text: `✅ ${quantity} ${unit} ${name} ಸೇರಿಸಲಾಗಿದೆ. ಪ್ರಸ್ತುತ ದಾಸ್ತಾನು: ${totalStock} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} ಸೇರಿಸಲಾಗಿದೆ. ಒಟ್ಟು ದಾಸ್ತಾನು ${totalStock} ${unit}.`,
          phonetic: `${quantity} ${unit} ${name} serisalaagide. Ottu daasthaanu ${totalStock} ${unit}.`
        };
      case 'ml':
        return {
          text: `✅ ${quantity} ${unit} ${name} ചേർത്തു. നിലവിലെ സ്റ്റോക്ക്: ${totalStock} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} ചേർത്തു. ആകെ സ്റ്റോക്ക് ${totalStock} ${unit}.`,
          phonetic: `${quantity} ${unit} ${name} cherthu. Aake stock ${totalStock} ${unit}.`
        };
      case 'en':
      default:
        return {
          text: `✅ Added ${quantity} ${unit} of ${name}. Current stock: ${totalStock} ${unit}.`,
          spoken: `Added ${quantity} ${unit} of ${name}. Current stock is ${totalStock} ${unit}.`,
          phonetic: `Added ${quantity} ${unit} of ${name}. Current stock is ${totalStock} ${unit}.`
        };
    }
  }

  // ----------------------------------------------------
  // 2. RECORD_SALE
  // ----------------------------------------------------
  if (intent === 'RECORD_SALE') {
    const { rawName, quantity, unit: rawUnit, amount, stockLeft } = data;
    const name = getLocalizedProductName(rawName, lang);
    const unit = getLocalizedUnitName(rawUnit, lang);

    switch (lang) {
      case 'gu':
        return {
          text: `✅ ${quantity} ${unit} ${name} ₹${amount} માં વેચાયા. બાકી સ્ટોક: ${stockLeft} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} ${amount} રૂપિયામાં વેચાયા. હવે બાકી સ્ટોક ${stockLeft} ${unit} છે.`,
          phonetic: `${quantity} ${unit} ${name} ${amount} rupiya ma vechya. Have baaki stock ${stockLeft} ${unit} chhe.`
        };
      case 'hi':
        return {
          text: `✅ ${quantity} ${unit} ${name} ₹${amount} में बिका। शेष स्टॉक: ${stockLeft} ${unit}।`,
          spoken: `${quantity} ${unit} ${name} ${amount} रुपये में बिक गया। अब ${stockLeft} ${unit} स्टॉक बचा है।`,
          phonetic: `${quantity} ${unit} ${name} ${amount} rupaye mein bik gaya. Ab ${stockLeft} ${unit} bacha hai.`
        };
      case 'mr':
        return {
          text: `✅ ${quantity} ${unit} ${name} ₹${amount} मध्ये विकले. शिल्लक साठा: ${stockLeft} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} ${amount} रुपयांत विकले. शिल्लक साठा ${stockLeft} ${unit} आहे.`,
          phonetic: `${quantity} ${unit} ${name} ${amount} rupayat vikale. Shillak saatha ${stockLeft} ${unit} aahe.`
        };
      case 'ta':
        return {
          text: `✅ ${quantity} ${unit} ${name} ₹${amount}க்கு விற்றது. மீதமுள்ள இருப்பு: ${stockLeft} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} ${amount} ரூபாய்க்கு விற்றது. மீதமுள்ள இருப்பு ${stockLeft} ${unit}.`,
          phonetic: `${quantity} ${unit} ${name} ${amount} roobaykku vittradhu. Meedhamulla iruppu ${stockLeft} ${unit}.`
        };
      case 'te':
        return {
          text: `✅ ${quantity} ${unit} ${name} ₹${amount}కు అమ్మాము. మిగిలిన స్టాక్: ${stockLeft} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} ${amount} రూపాయలకు అమ్మాము. మిగిలిన స్టాక్ ${stockLeft} ${unit}.`,
          phonetic: `${quantity} ${unit} ${name} ${amount} roopaayalaku ammamu. Migilina stock ${stockLeft} ${unit}.`
        };
      case 'bn':
        return {
          text: `✅ ${quantity} ${unit} ${name} ₹${amount} টাকায় বিক্রি হয়েছে। অবশিষ্ট স্টক: ${stockLeft} ${unit}।`,
          spoken: `${quantity} ${unit} ${name} ${amount} টাকায় বিক্রি হয়েছে। অবশিষ্ট স্টক ${stockLeft} ${unit}।`,
          phonetic: `${quantity} ${unit} ${name} ${amount} taakay bikri hoyechhe. Oboshishto stock ${stockLeft} ${unit}.`
        };
      case 'kn':
        return {
          text: `✅ ${quantity} ${unit} ${name} ₹${amount} ಗೆ ಮಾರಾಟವಾಗಿದೆ. ಉಳಿದ ದಾಸ್ತಾನು: ${stockLeft} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} ${amount} ರೂಪಾಯಿಗೆ ಮಾರಾಟವಾಗಿದೆ. ಉಳಿದ ದಾಸ್ತಾನು ${stockLeft} ${unit}.`,
          phonetic: `${quantity} ${unit} ${name} ${amount} roopaayige maaratavaagide. Ulida daasthaanu ${stockLeft} ${unit}.`
        };
      case 'ml':
        return {
          text: `✅ ${quantity} ${unit} ${name} ₹${amount} രൂപയ്ക്ക് വിറ്റു. ബാക്കി സ്റ്റോക്ക്: ${stockLeft} ${unit}.`,
          spoken: `${quantity} ${unit} ${name} ${amount} രൂപയ്ക്ക് വിറ്റു. ബാക്കി സ്റ്റോക്ക് ${stockLeft} ${unit}.`,
          phonetic: `${quantity} ${unit} ${name} ${amount} roopaykku vittu. Baakki stock ${stockLeft} ${unit}.`
        };
      case 'en':
      default:
        return {
          text: `✅ Sold ${quantity} ${unit} of ${name} for ₹${amount}. Remaining stock: ${stockLeft} ${unit}.`,
          spoken: `Sold ${quantity} ${unit} of ${name} for ${amount} rupees. ${stockLeft} ${unit} remaining.`,
          phonetic: `Sold ${quantity} ${unit} of ${name} for ${amount} rupees. ${stockLeft} ${unit} remaining.`
        };
    }
  }

  // ----------------------------------------------------
  // 3. CHECK_STOCK (Single Item)
  // ----------------------------------------------------
  if (intent === 'CHECK_STOCK') {
    const { rawName, quantity, unit: rawUnit, isLow } = data;
    const name = getLocalizedProductName(rawName, lang);
    const unit = getLocalizedUnitName(rawUnit, lang);

    switch (lang) {
      case 'gu':
        return {
          text: `તમારી પાસે ${name} નો ${quantity} ${unit} સ્ટોક છે.${isLow ? ' (ઓછા સ્ટોકની ચેતવણી!)' : ''}`,
          spoken: `${name} નો ${quantity} ${unit} સ્ટોક બાકી છે.${isLow ? ' સ્ટોક ઓછો છે.' : ''}`,
          phonetic: `${name} no ${quantity} ${unit} stock baaki chhe.`
        };
      case 'hi':
        return {
          text: `आपके पास ${name} का ${quantity} ${unit} स्टॉक उपलब्ध है।${isLow ? ' (कम स्टॉक चेतावनी!)' : ''}`,
          spoken: `${name} की ${quantity} ${unit} बाकी हैं।${isLow ? ' सामान कम है।' : ''}`,
          phonetic: `Aapke paas ${name} ka ${quantity} ${unit} stock uplabdh hai.`
        };
      case 'mr':
        return {
          text: `तुमच्याकडे ${name} चा ${quantity} ${unit} साठा उपलब्ध आहे.${isLow ? ' (कमी साठा इशारा!)' : ''}`,
          spoken: `${name} चा ${quantity} ${unit} साठा शिल्लक आहे.${isLow ? ' साठा कमी आहे.' : ''}`,
          phonetic: `Tumchyakade ${name} chaa ${quantity} ${unit} saatha shillak aahe.`
        };
      case 'ta':
        return {
          text: `உங்களிடம் ${name} ${quantity} ${unit} இருப்பு உள்ளது.${isLow ? ' (குறைந்த இருப்பு எச்சரிக்கை!)' : ''}`,
          spoken: `${name} ${quantity} ${unit} இருப்பு உள்ளது.${isLow ? ' இருப்பு குறைவாக உள்ளது.' : ''}`,
          phonetic: `Ungalidam ${name} ${quantity} ${unit} iruppu ulladhu.`
        };
      case 'te':
        return {
          text: `మీ వద్ద ${name} ${quantity} ${unit} స్టాక్ ఉంది.${isLow ? ' (తక్కువ స్టాక్ హెచ్చరిక!)' : ''}`,
          spoken: `${name} ${quantity} ${unit} మిగిలింది.${isLow ? ' స్టాక్ తక్కువగా ఉంది.' : ''}`,
          phonetic: `Mee vadda ${name} ${quantity} ${unit} stock undi.`
        };
      case 'bn':
        return {
          text: `আপনার কাছে ${name}-এর ${quantity} ${unit} স্টক রয়েছে।${isLow ? ' (কম স্টক সতর্কতা!)' : ''}`,
          spoken: `${name}-এর ${quantity} ${unit} বাকি রয়েছে।${isLow ? ' স্টক কম রয়েছে।' : ''}`,
          phonetic: `Aapnaar kaachhe ${name} ${quantity} ${unit} stock royechhe.`
        };
      case 'kn':
        return {
          text: `ನಿಮ್ಮ ಬಳಿ ${name} ನ ${quantity} ${unit} ದಾಸ್ತಾನು ಇದೆ.${isLow ? ' (ಕಡಿಮೆ ದಾಸ್ತಾನು ಎಚ್ಚರಿಕೆ!)' : ''}`,
          spoken: `${name} ನ ${quantity} ${unit} ಉಳಿದಿದೆ.${isLow ? ' ದಾಸ್ತಾನು ಕಡಿಮೆಯಾಗಿದೆ.' : ''}`,
          phonetic: `Nimma bali ${name} na ${quantity} ${unit} daasthaanu ide.`
        };
      case 'ml':
        return {
          text: `നിങ്ങളുടെ പക്കൽ ${name} ${quantity} ${unit} സ്റ്റോക്ക് ഉണ്ട്.${isLow ? ' (കുറഞ്ഞ സ്റ്റോക്ക് മുന്നറിയിപ്പ്!)' : ''}`,
          spoken: `${name} ${quantity} ${unit} ബാക്കിയുണ്ട്.${isLow ? ' സ്റ്റോക്ക് കുറവാണ്.' : ''}`,
          phonetic: `Ningalude pakkal ${name} ${quantity} ${unit} stock undu.`
        };
      case 'en':
      default:
        return {
          text: `You have ${quantity} ${unit} of ${name} in stock.${isLow ? ' (Low Stock Alert!)' : ''}`,
          spoken: `You have ${quantity} ${unit} of ${name} remaining.${isLow ? ' Low stock warning.' : ''}`,
          phonetic: `You have ${quantity} ${unit} of ${name} remaining in stock.`
        };
    }
  }

  // ----------------------------------------------------
  // 4. CHECK_STOCK_ALL (Store Overview)
  // ----------------------------------------------------
  if (intent === 'CHECK_STOCK_ALL') {
    const { totalItems, lowStockCount } = data;
    switch (lang) {
      case 'gu':
        return {
          text: `દુકાનમાં કુલ ${totalItems} ઉત્પાદનો છે.${lowStockCount > 0 ? ` ${lowStockCount} સામાનમાં સ્ટોક ઓછો છે.` : ' બધો સ્ટોક પૂરતો છે.'}`,
          spoken: `દુકાનમાં કુલ ${totalItems} વસ્તુઓ છે.${lowStockCount > 0 ? ` ${lowStockCount} વસ્તુઓમાં સ્ટોક ઓછો છે.` : ' બધો સ્ટોક પૂરતો છે.'}`,
          phonetic: `Dukaan ma kul ${totalItems} vastuo chhe.${lowStockCount > 0 ? ` ${lowStockCount} vastu ma stock ochho chhe.` : ' Badho stock poor-to chhe.'}`
        };
      case 'hi':
        return {
          text: `दुकान में कुल ${totalItems} उत्पाद हैं।${lowStockCount > 0 ? ` ${lowStockCount} सामान में कम स्टॉक है।` : ' सभी सामान का पर्याप्त स्टॉक है।'}`,
          spoken: `दुकान में कुल ${totalItems} उत्पाद हैं।${lowStockCount > 0 ? ` ${lowStockCount} सामान में स्टॉक कम है।` : ' सभी सामान पर्याप्त हैं।'}`,
          phonetic: `Dukaan mein kul ${totalItems} utpaad hain.${lowStockCount > 0 ? ` ${lowStockCount} samaan mein stock kam hai.` : ' Sabhi samaan paryapt hain.'}`
        };
      case 'mr':
        return {
          text: `दुकानात एकूण ${totalItems} उत्पादने आहेत.${lowStockCount > 0 ? ` ${lowStockCount} वस्तूंमध्ये साठा कमी आहे.` : ' सर्व साठा पुरेसा आहे.'}`,
          spoken: `दुकानात एकूण ${totalItems} वस्तू आहेत.${lowStockCount > 0 ? ` ${lowStockCount} वस्तूंमध्ये साठा कमी आहे.` : ' सर्व साठा पुरेसा आहे.'}`,
          phonetic: `Dukaanaat ekun ${totalItems} vastu aahet.${lowStockCount > 0 ? ` ${lowStockCount} vastu kami aahet.` : ' Sarva saatha puresaa aahe.'}`
        };
      case 'ta':
        return {
          text: `கடையில் மொத்தம் ${totalItems} பொருட்கள் உள்ளன.${lowStockCount > 0 ? ` ${lowStockCount} பொருட்கள் குறைவாக உள்ளன.` : ' அனைத்து பொருட்களும் போதுமான அளவில் உள்ளன.'}`,
          spoken: `கடையில் மொத்தம் ${totalItems} பொருட்கள் உள்ளன.${lowStockCount > 0 ? ` ${lowStockCount} பொருட்கள் குறைவாக உள்ளன.` : ' இருப்பு போதுமானது.'}`,
          phonetic: `Kadayil moththam ${totalItems} porutkal ullana.${lowStockCount > 0 ? ` ${lowStockCount} porutkal kuraivaaga ullana.` : ' Iruppu podhumana alavil ulladhu.'}`
        };
      case 'te':
        return {
          text: `దుకాణంలో మొత్తం ${totalItems} ఉత్పత్తులు ఉన్నాయి.${lowStockCount > 0 ? ` ${lowStockCount} వస్తువులు తక్కువగా ఉన్నాయి.` : ' అన్ని స్టాక్ తగినంతగా ఉంది.'}`,
          spoken: `దుకాణంలో మొత్తం ${totalItems} ఉత్పత్తులు ఉన్నాయి.${lowStockCount > 0 ? ` ${lowStockCount} వస్తువులు తక్కువగా ఉన్నాయి.` : ' స్టాక్ బాగుంది.'}`,
          phonetic: `Dukaanam lo moththam ${totalItems} uthpathulu unnaayi.${lowStockCount > 0 ? ` ${lowStockCount} vasthuvulu thakkuvaga unnaayi.` : ' Stock baagundi.'}`
        };
      case 'bn':
        return {
          text: `দোকানে মোট ${totalItems}টি পণ্য রয়েছে।${lowStockCount > 0 ? ` ${lowStockCount}টি পণ্যে কম স্টক রয়েছে।` : ' সব পণ্যের পর্যাপ্ত স্টক রয়েছে।'}`,
          spoken: `দোকানে মোট ${totalItems}টি পণ্য রয়েছে।${lowStockCount > 0 ? ` ${lowStockCount}টি পণ্য কম রয়েছে।` : ' স্টক পর্যাপ্ত আছে।'}`,
          phonetic: `Dokaane mot ${totalItems}ti ponnyo royechhe.${lowStockCount > 0 ? ` ${lowStockCount}ti ponnyo kom royechhe.` : ' Stock porjapto aachhe.'}`
        };
      case 'kn':
        return {
          text: `ಅಂಗಡಿಯಲ್ಲಿ ಒಟ್ಟು ${totalItems} ಉತ್ಪನ್ನಗಳಿವೆ.${lowStockCount > 0 ? ` ${lowStockCount} ವಸ್ತುಗಳು ಕಡಿಮೆಯಾಗಿವೆ.` : ' ಎಲ್ಲಾ ದಾಸ್ತಾನು ಸಾಕಷ್ಟಿದೆ.'}`,
          spoken: `ಅಂಗಡಿಯಲ್ಲಿ ಒಟ್ಟು ${totalItems} ಉತ್ಪನ್ನಗಳಿವೆ.${lowStockCount > 0 ? ` ${lowStockCount} ವಸ್ತುಗಳು ಕಡಿಮೆಯಾಗಿವೆ.` : ' ದಾಸ್ತಾನು ಸಾಕಷ್ಟಿದೆ.'}`,
          phonetic: `Angadiyalli ottu ${totalItems} utpannagalive.${lowStockCount > 0 ? ` ${lowStockCount} vastugalu kadimeyaagive.` : ' Daasthaanu saakashtide.'}`
        };
      case 'ml':
        return {
          text: `കടയിൽ ആകെ ${totalItems} ഉൽപ്പന്നങ്ങളുണ്ട്.${lowStockCount > 0 ? ` ${lowStockCount} സാധനങ്ങൾ കുറവാണ്.` : ' ആവശ്യത്തിന് സ്റ്റോക്ക് ഉണ്ട്.'}`,
          spoken: `കടയിൽ ആകെ ${totalItems} ഉൽപ്പന്നങ്ങളുണ്ട്.${lowStockCount > 0 ? ` ${lowStockCount} സാധനങ്ങൾ കുറവാണ്.` : ' സ്റ്റോക്ക് തൃപ്തികരം.'}`,
          phonetic: `Kadayil aake ${totalItems} ulpannangalundu.${lowStockCount > 0 ? ` ${lowStockCount} saadhangal kuravaanu.` : ' Aavashyathinu stock undu.'}`
        };
      case 'en':
      default:
        return {
          text: `You have ${totalItems} products in store inventory.${lowStockCount > 0 ? ` ${lowStockCount} items are running low.` : ' All items are well-stocked.'}`,
          spoken: `You have ${totalItems} products in inventory.${lowStockCount > 0 ? ` ${lowStockCount} items need reordering.` : ' All items well-stocked.'}`,
          phonetic: `You have ${totalItems} products in inventory.${lowStockCount > 0 ? ` ${lowStockCount} items need reordering.` : ' All items well-stocked.'}`
        };
    }
  }

  // ----------------------------------------------------
  // 5. CHECK_EARNINGS
  // ----------------------------------------------------
  if (intent === 'CHECK_EARNINGS') {
    const { totalEarnings, txCount } = data;
    switch (lang) {
      case 'gu':
        return {
          text: `આજની કુલ કમાણી: ${formatINR(totalEarnings)} (${txCount} વેચાણ).`,
          spoken: `આજની કુલ કમાણી ${totalEarnings} રૂપિયા થઈ છે. કુલ ${txCount} વેચાણ થયા છે.`,
          phonetic: `Aajni kul kamaani ${totalEarnings} rupiya thai chhe. Kul ${txCount} vechan thaya chhe.`
        };
      case 'hi':
        return {
          text: `आज की कुल कमाई: ${formatINR(totalEarnings)} (${txCount} बिक्री)।`,
          spoken: `आज की कुल कमाई ${totalEarnings} रुपये है, कुल ${txCount} बिक्री हुई हैं।`,
          phonetic: `Aaj ki kul kamaai ${totalEarnings} rupaye hai, kul ${txCount} bikri hui hain.`
        };
      case 'mr':
        return {
          text: `आजची एकूण कमाई: ${formatINR(totalEarnings)} (${txCount} व्यवहार).`,
          spoken: `आजची एकूण कमाई ${totalEarnings} रुपये झाली आहे.`,
          phonetic: `Aajchi ekun kamaai ${totalEarnings} rupaye jhaali aahe.`
        };
      case 'ta':
        return {
          text: `இன்றைய மொத்த வருமானம்: ${formatINR(totalEarnings)} (${txCount} விற்பனைகள்).`,
          spoken: `இன்றைய மொத்த வருமானம் ${totalEarnings} ரூபாய்.`,
          phonetic: `Indraiya moththa varumaanam ${totalEarnings} roobai.`
        };
      case 'te':
        return {
          text: `ఈరోజు మొత్తం సంపాదన: ${formatINR(totalEarnings)} (${txCount} అమ్మకాలు).`,
          spoken: `ఈరోజు మొత్తం సంపాదన ${totalEarnings} రూపాయలు.`,
          phonetic: `Eeroju motham sampaadana ${totalEarnings} roopaayalu.`
        };
      case 'bn':
        return {
          text: `আজকের মোট আয়: ${formatINR(totalEarnings)} (${txCount}টি বিক্রি)।`,
          spoken: `আজকের মোট আয় ${totalEarnings} টাকা।`,
          phonetic: `Aajker mot aay ${totalEarnings} taaka.`
        };
      case 'kn':
        return {
          text: `ಇಂದಿನ ಒಟ್ಟು ಗಳಿಕೆ: ${formatINR(totalEarnings)} (${txCount} ಮಾರಾಟಗಳು).`,
          spoken: `ಇಂದಿನ ಒಟ್ಟು ಗಳಿಕೆ ${totalEarnings} ರೂಪಾಯಿ.`,
          phonetic: `Indina ottu galike ${totalEarnings} roopaayi.`
        };
      case 'ml':
        return {
          text: `ഇന്നത്തെ ആകെ വരുമാനം: ${formatINR(totalEarnings)} (${txCount} ഇടപാടുകൾ).`,
          spoken: `ഇന്നത്തെ ആകെ വരുമാനം ${totalEarnings} രൂപയാണ്.`,
          phonetic: `Innathe aake varumaanam ${totalEarnings} roopayaan.`
        };
      case 'en':
      default:
        return {
          text: `Today's total earnings: ${formatINR(totalEarnings)} across ${txCount} sales.`,
          spoken: `You earned ${totalEarnings} rupees today across ${txCount} transactions.`,
          phonetic: `Today's total earnings: ${totalEarnings} rupees across ${txCount} sales.`
        };
    }
  }

  // ----------------------------------------------------
  // 6. LOW_STOCK
  // ----------------------------------------------------
  if (intent === 'LOW_STOCK') {
    const { count, list } = data;
    if (count === 0) {
      switch (lang) {
        case 'gu':
          return {
            text: 'બધા ઉત્પાદનોનો પૂરતો સ્ટોક છે. કોઈ સામાન ઓછો નથી.',
            spoken: 'દુકાનમાં બધો સ્ટોક પૂરતો છે. કોઈ સામાન ઓછો નથી.',
            phonetic: 'Dukaan ma badho stock poor-to chhe. Koi saamaan ochho nathi.'
          };
        case 'hi':
          return {
            text: 'सभी उत्पादों का पर्याप्त स्टॉक है। कोई भी सामान कम नहीं है।',
            spoken: 'सभी सामान का पर्याप्त स्टॉक है। कोई कमी नहीं है।',
            phonetic: 'Sabhi samaan ka paryapt stock hai. Koi kami nahi hai.'
          };
        case 'mr':
          return {
            text: 'सर्व उत्पादनांचा पुरेसा साठा आहे. कोणतेही सामान कमी नाही.',
            spoken: 'सर्व साठा पुरेसा आहे. कोणतीही वस्तू कमी नाही.',
            phonetic: 'Sarva saatha puresaa aahe. Kontehi saamaan kami naahi.'
          };
        case 'ta':
          return {
            text: 'அனைத்துப் பொருட்களும் போதுமான அளவில் உள்ளன.',
            spoken: 'அனைத்துப் பொருட்களும் போதுமான அளவில் உள்ளன.',
            phonetic: 'Anaithu porutkalum podhumana alavil ullana.'
          };
        case 'te':
          return {
            text: 'అన్ని ఉత్పత్తులు తగినంత స్టాక్‌లో ఉన్నాయి.',
            spoken: 'అన్ని ఉత్పత్తులు తగినంత స్టాక్‌లో ఉన్నాయి.',
            phonetic: 'Anni uthpathulu thaginantha stock lo unnaayi.'
          };
        case 'bn':
          return {
            text: 'সমস্ত পণ্যের পর্যাপ্ত স্টক রয়েছে।',
            spoken: 'সমস্ত পণ্যের পর্যাপ্ত স্টক রয়েছে। কোনো পণ্য কম নেই।',
            phonetic: 'Shomosto ponnyer porjapto stock royechhe.'
          };
        case 'kn':
          return {
            text: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು ಸಾಕಷ್ಟು ದಾಸ್ತಾನಿನಲ್ಲಿವೆ.',
            spoken: 'ಎಲ್ಲಾ ದಾಸ್ತಾನು ಸಾಕಷ್ಟಿದೆ. ಯಾವುದೇ ವಸ್ತು ಕಡಿಮೆಯಾಗಿಲ್ಲ.',
            phonetic: 'Yella utpannagalu saakashtu daasthaaninallive.'
          };
        case 'ml':
          return {
            text: 'എല്ലാ ഉൽപ്പന്നങ്ങളും ആവശ്യത്തിനുണ്ട്.',
            spoken: 'എല്ലാ ഉൽപ്പന്നങ്ങളും ആവശ്യത്തിനുണ്ട്.',
            phonetic: 'Ella ulpannangalum aavashyathinu-undu.'
          };
        default:
          return {
            text: 'All products are sufficiently stocked. No items running low.',
            spoken: 'All products are well stocked. No items running low.',
            phonetic: 'All products are sufficiently stocked.'
          };
      }
    } else {
      switch (lang) {
        case 'gu':
          return {
            text: `ઓછા સ્ટોકની ચેતવણી: ${count} વસ્તુઓ ઓછી છે: ${list}।`,
            spoken: `${count} વસ્તુઓમાં સ્ટોક ઓછો છે: ${list}।`,
            phonetic: `Ochha stock ni chetavani: ${count} vastu ochhi chhe: ${list}.`
          };
        case 'hi':
          return {
            text: `कम स्टॉक चेतावनी: ${count} सामान कम हैं: ${list}।`,
            spoken: `${count} सामान में स्टॉक कम है: ${list}।`,
            phonetic: `Kam stock chetavani: ${count} samaan kam hain: ${list}.`
          };
        case 'mr':
          return {
            text: `कमी साठा इशारा: ${count} वस्तू कमी आहेत: ${list}.`,
            spoken: `${count} वस्तूंचा साठा कमी आहे: ${list}.`,
            phonetic: `Kami saatha ishaara: ${count} vastu kami aahet: ${list}.`
          };
        case 'ta':
          return {
            text: `குறைந்த இருப்பு எச்சரிக்கை: ${count} பொருட்கள் குறைவாக உள்ளன: ${list}.`,
            spoken: `${count} பொருட்கள் குறைவாக உள்ளன: ${list}.`,
            phonetic: `Kuraivaana iruppu echcharikkai: ${count} porutkal kuraivaaga ullana: ${list}.`
          };
        case 'te':
          return {
            text: `తక్కువ స్టాక్ హెచ్చరిక: ${count} వస్తువులు తక్కువగా ఉన్నాయి: ${list}.`,
            spoken: `${count} వస్తువులు తక్కువగా ఉన్నాయి: ${list}.`,
            phonetic: `Thakkuva stock hechcharika: ${count} vasthuvulu thakkuvaga unnaayi: ${list}.`
          };
        case 'bn':
          return {
            text: `কম স্টক সতর্কতা: ${count}টি পণ্য কম রয়েছে: ${list}।`,
            spoken: `${count}টি পণ্য কম রয়েছে: ${list}।`,
            phonetic: `Kom stock shotorkota: ${count}ti ponnyo kom royechhe: ${list}.`
          };
        case 'kn':
          return {
            text: `ಕಡಿಮೆ ದಾಸ್ತಾನು ಎಚ್ಚರಿಕೆ: ${count} ವಸ್ತುಗಳು ಕಡಿಮೆಯಾಗಿವೆ: ${list}.`,
            spoken: `${count} ವಸ್ತುಗಳು ಕಡಿಮೆಯಾಗಿವೆ: ${list}.`,
            phonetic: `Kadime daasthaanu echcharike: ${count} vastugalu kadimeyaagive: ${list}.`
          };
        case 'ml':
          return {
            text: `കുറഞ്ഞ സ്റ്റോക്ക് മുന്നറിയിപ്പ്: ${count} സാധനങ്ങൾ കുറവാണ്: ${list}.`,
            spoken: `${count} സാധനങ്ങൾ കുറവാണ്: ${list}.`,
            phonetic: `Kuranna stock munnariyippu: ${count} saadhangal kuravaanu: ${list}.`
          };
        default:
          return {
            text: `Low stock alert: ${count} items need attention: ${list}.`,
            spoken: `${count} items are running low: ${list}.`,
            phonetic: `Low stock alert: ${count} items need attention: ${list}.`
          };
      }
    }
  }

  // ----------------------------------------------------
  // 7. UPDATE_PRICE
  // ----------------------------------------------------
  if (intent === 'UPDATE_PRICE') {
    const { rawName, price, unit } = data;
    const localizedName = getLocalizedProductName(rawName, lang);
    const localizedUnit = getLocalizedUnitName(unit, lang);
    switch (lang) {
      case 'gu':
        return {
          text: `${localizedName} નો નવો ભાવ ₹${price}/${localizedUnit} કરી દેવાયો છે.`,
          spoken: `${localizedName} નો નવો ભાવ ${price} રૂપિયા કરી દેવાયો છે.`,
          phonetic: `${localizedName} no navo bhaav ${price} rupiya kari devayo chhe.`
        };
      case 'hi':
        return {
          text: `${localizedName} का नया भाव ₹${price}/${localizedUnit} कर दिया गया है।`,
          spoken: `${localizedName} का नया भाव ${price} रुपये कर दिया गया है।`,
          phonetic: `${localizedName} ka naya bhaav ${price} rupaye kar diya gaya hai.`
        };
      case 'mr':
        return {
          text: `${localizedName} चा नवीन भाव ₹${price}/${localizedUnit} केला गेला आहे.`,
          spoken: `${localizedName} चा नवीन भाव ${price} रुपये केला आहे.`,
          phonetic: `${localizedName} cha naveen bhaav ${price} rupaye kelaa aahe.`
        };
      case 'ta':
        return {
          text: `${localizedName} புதிய விலை ₹${price}/${localizedUnit} என மாற்றப்பட்டது.`,
          spoken: `${localizedName} புதிய விலை ${price} ரூபாய் என மாற்றப்பட்டது.`,
          phonetic: `${localizedName} pudhiya vilai ${price} roobai ena maattrappattadhu.`
        };
      case 'te':
        return {
          text: `${localizedName} కొత్త ధర ₹${price}/${localizedUnit} గా మార్చబడింది.`,
          spoken: `${localizedName} కొత్త ధర ${price} రూపాయలు చేయబడింది.`,
          phonetic: `${localizedName} kottha dhara ${price} roopaayalu cheyabadindi.`
        };
      case 'bn':
        return {
          text: `${localizedName}-এর নতুন দাম ₹${price}/${localizedUnit} করা হয়েছে।`,
          spoken: `${localizedName}-এর নতুন দাম ${price} টাকা করা হয়েছে।`,
          phonetic: `${localizedName}-er notun daam ${price} taka kora hoyechhe.`
        };
      case 'kn':
        return {
          text: `${localizedName} ಹೊಸ ದರ ₹${price}/${localizedUnit} ಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.`,
          spoken: `${localizedName} ಹೊಸ ದರ ${price} ರೂಪಾಯಿಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.`,
          phonetic: `${localizedName} hosa dara ${price} roopaayige badalaayisalaagide.`
        };
      case 'ml':
        return {
          text: `${localizedName} പുതിയ വില ₹${price}/${localizedUnit} ആക്കി മാറ്റി.`,
          spoken: `${localizedName} പുതിയ വില ${price} രൂപയാക്കി മാറ്റി.`,
          phonetic: `${localizedName} puthiya vila ${price} roopayaakki maatti.`
        };
      case 'en':
      default:
        return {
          text: `Updated ${rawName} price to ₹${price}/${unit}.`,
          spoken: `Updated ${rawName} price to ${price} rupees per ${unit}.`,
          phonetic: `Updated ${rawName} price to ${price} rupees per ${unit}.`
        };
    }
  }

  // ----------------------------------------------------
  // 6. WHOLESALE_ORDER
  // ----------------------------------------------------
  if (intent === 'WHOLESALE_ORDER') {
    const { count } = data || { count: 0 };
    switch (lang) {
      case 'gu':
        return {
          text: `📦 વોટ્સએપ હોલસેલ ઓર્ડર ફોર્મ ખોલ્યું (${count} સામાન).`,
          spoken: `વોટ્સએપ હોલસેલ ઓર્ડર ફોર્મ તૈયાર છે.`,
          phonetic: `WhatsApp wholesale order form tayar chhe.`
        };
      case 'hi':
        return {
          text: `📦 व्हाट्सएप होलसेल ऑर्डर फॉर्म तैयार है (${count} सामान)।`,
          spoken: `व्हाट्सएप होलसेल ऑर्डर फॉर्म खोला जा रहा है।`,
          phonetic: `WhatsApp wholesale order form khola ja raha hai.`
        };
      case 'mr':
        return {
          text: `📦 व्हॉट्सॲप होलसेल ऑर्डर फॉर्म उघडला (${count} वस्तू).`,
          spoken: `व्हॉट्सॲप होलसेल ऑर्डर फॉर्म तयार आहे.`,
          phonetic: `WhatsApp wholesale order form tayar aahe.`
        };
      case 'ta':
        return {
          text: `📦 வாட்ஸ்அப் மொத்த ஆர்டர் படிவம் திறக்கப்பட்டது (${count} பொருட்கள்).`,
          spoken: `வாட்ஸ்அப் மொத்த ஆர்டர் தயாராக உள்ளது.`,
          phonetic: `WhatsApp moththa order thayaraga ulladhu.`
        };
      case 'te':
        return {
          text: `📦 వాట్సాప్ హోల్‌సేల్ ఆర్డర్ ఫారమ్ తెరవబడింది (${count} వస్తువులు).`,
          spoken: `వాట్సాప్ హోల్‌సేల్ ఆర్డర్ సిద్ధంగా ఉంది.`,
          phonetic: `WhatsApp wholesale order siddhanga undi.`
        };
      case 'bn':
        return {
          text: `📦 পাইকারি হোয়াটসঅ্যাপ অর্ডার ফর্ম খোলা হয়েছে (${count}টি পণ্য)।`,
          spoken: `পাইকারি হোয়াটসঅ্যাপ অর্ডার প্রস্তুত।`,
          phonetic: `Wholesale WhatsApp order prostut.`
        };
      case 'kn':
        return {
          text: `📦 ಸಗಟು ವಾಟ್ಸಾಪ್ ಆರ್ಡರ್ ಫಾರ್ಮ್ ತೆರೆಯಲಾಗಿದೆ (${count} ವಸ್ತುಗಳು).`,
          spoken: `ಸಗಟು ವಾಟ್ಸಾಪ್ ಆರ್ಡರ್ ಸಿದ್ಧವಾಗಿದೆ.`,
          phonetic: `Wholesale WhatsApp order siddhavaagide.`
        };
      case 'ml':
        return {
          text: `📦 മൊത്ത വാട്ട്‌സ്ആപ്പ് ഓർഡർ ഫോം തുറന്നു (${count} ഇനങ്ങൾ).`,
          spoken: `മൊത്ത വാട്ട്‌സ്ആപ്പ് ഓർഡർ തയ്യാറാണ്.`,
          phonetic: `Wholesale WhatsApp order thayyaraanu.`
        };
      case 'en':
      default:
        return {
          text: `📦 Opened WhatsApp Wholesale Purchase Order form (${count} items).`,
          spoken: `Opening Wholesale WhatsApp Order form for ${count} items.`,
          phonetic: `Opening Wholesale WhatsApp Order form for ${count} items.`
        };
    }
  }

  return { text: 'Done', spoken: 'Done', phonetic: 'Done' };
}

/**
 * Human error response helper for unrecognized commands in all 9 languages
 */
export function getHumanErrorResponse(lang: SupportedLanguage): { text: string; spoken: string; phonetic: string } {
  switch (lang) {
    case 'gu':
      return {
        text: 'મને સમજાયું નથી. કૃપા કરીને ફરીથી બોલો.',
        spoken: 'મને સમજાયું નથી. કૃપા કરીને ફરીથી બોલો.',
        phonetic: 'Mane samjaayu nathi. Krupya phari thi bolo.'
      };
    case 'hi':
      return {
        text: 'मुझे समझ नहीं आया। कृपया दोबारा बोलें।',
        spoken: 'मुझे समझ नहीं आया। कृपया दोबारा बोलें।',
        phonetic: 'Mujhe samajh nahi aaya. Kripya dobara bolein.'
      };
    case 'mr':
      return {
        text: 'मला समजले नाही. कृपया पुन्हा सांगा.',
        spoken: 'मला समजले नाही. कृपया पुन्हा सांगा.',
        phonetic: 'Mala samajle naahi. Krupya punha saanga.'
      };
    case 'ta':
      return {
        text: 'எனக்கு புரியவில்லை. மீண்டும் சொல்லுங்கள்.',
        spoken: 'எனக்கு புரியவில்லை. மீண்டும் சொல்லுங்கள்.',
        phonetic: 'Enakku puriyavillai. Meendum sollungal.'
      };
    case 'te':
      return {
        text: 'నాకు అర్థం కాలేదు. దయచేసి మళ్ళీ చెప్పండి.',
        spoken: 'నాకు అర్థం కాలేదు. దయచేసి మళ్ళీ చెప్పండి.',
        phonetic: 'Naaku ardham kaaledu. Dayachesi marlaa cheppandi.'
      };
    case 'bn':
      return {
        text: 'আমি বুঝতে পারিনি। দয়া করে আবার বলুন।',
        spoken: 'আমি বুঝতে পারিনি। দয়া করে আবার বলুন।',
        phonetic: 'Aami bujhte paarini. Doya kore aabaar bolun.'
      };
    case 'kn':
      return {
        text: 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.',
        spoken: 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.',
        phonetic: 'Nanage arthavaagalilla. Dayavittu mattomme heli.'
      };
    case 'ml':
      return {
        text: 'എനിക്ക് മനസ്സിലായില്ല. ദയവായി വീണ്ടും പറയൂ.',
        spoken: 'എനിക്ക് മനസ്സിലായില്ല. ദയവായി വീണ്ടും പറയൂ.',
        phonetic: 'Enikku manassilaayilla. Dayavaayi veendum parayoo.'
      };
    case 'en':
    default:
      return {
        text: 'Sorry, I did not understand. Please say again.',
        spoken: 'Sorry, I did not understand. Please say again.',
        phonetic: 'Sorry, I did not understand. Please say again.'
      };
  }
}

/**
 * Executes a parsed intent against the local IndexedDB database and returns confirmation responses
 */
export async function executeIntent(
  parsed: ParsedIntent,
  currentLanguage: SupportedLanguage = 'en'
): Promise<ExecutionResult> {
  const { intent, entities, errorReason } = parsed;
  const lang = currentLanguage || parsed.language || 'en';
  const settings = await db.getSettings();
  const lowStockThreshold = settings.lowStockThreshold || 5;

  // ----------------------------------------------------
  // Handle explicit parsing errors / unrecognized speech
  // ----------------------------------------------------
  if (errorReason === 'UNKNOWN_COMMAND' || intent === 'UNKNOWN') {
    const errObj = getHumanErrorResponse(lang);
    return {
      success: false,
      intent: 'UNKNOWN',
      message: errObj.text,
      spokenResponseEn: getHumanErrorResponse('en').spoken,
      spokenResponseHi: getHumanErrorResponse('hi').spoken,
      spokenResponse: errObj.spoken,
      phoneticSpoken: errObj.phonetic
    };
  }

  if (errorReason === 'MISSING_PRODUCT') {
    const msgs: Record<SupportedLanguage, { text: string; spoken: string; phonetic: string }> = {
      gu: { text: 'કૃપા કરીને સામાનનું નામ જણાવો.', spoken: 'કયો સામાન છે?', phonetic: 'Kripya saamaan nu naam janavo.' },
      hi: { text: 'कृपया सामान का नाम बताएं।', spoken: 'कौन सा सामान है?', phonetic: 'Kripya samaan ka naam batayein.' },
      mr: { text: 'कृपया वस्तूचे नाव सांगा.', spoken: 'कोणती वस्तू आहे?', phonetic: 'Krupya vastuche naav saanga.' },
      ta: { text: 'பொருளின் பெயரைக் குறிப்பிடவும்.', spoken: 'எந்த பொருள்?', phonetic: 'Porulin peyarai kuripidavum.' },
      te: { text: 'దయచేసి వస్తువు పేరు చెప్పండి.', spoken: 'ఏ వస్తువు?', phonetic: 'Dayachesi vasthuvu peru cheppandi.' },
      bn: { text: 'দয়া করে পণ্যের নাম বলুন।', spoken: 'কোন পণ্য?', phonetic: 'Doya kore ponnyer naam bolun.' },
      kn: { text: 'ದಯವಿಟ್ಟು ವಸ್ತುವಿನ ಹೆಸರು ತಿಳಿಸಿ.', spoken: 'ಯಾವ ವಸ್ತು?', phonetic: 'Dayavittu vastuvina hesaru thilisi.' },
      ml: { text: 'ദയവായി ഉൽപ്പന്നത്തിന്റെ പേര് പറയൂ.', spoken: 'ഏത് സാധനം?', phonetic: 'Dayavaayi ulpannathinte peru parayoo.' },
      en: { text: 'Please mention which product.', spoken: 'Which product?', phonetic: 'Please mention which product.' }
    };
    const prodMsg = msgs[lang] || msgs.en;
    return {
      success: false,
      intent,
      message: prodMsg.text,
      spokenResponseEn: msgs.en.spoken,
      spokenResponseHi: msgs.hi.spoken,
      spokenResponse: prodMsg.spoken,
      phoneticSpoken: prodMsg.phonetic
    };
  }

  if (errorReason === 'MISSING_QUANTITY') {
    const msgs: Record<SupportedLanguage, { text: string; spoken: string; phonetic: string }> = {
      gu: { text: 'કૃપા કરીને જથ્થો (માત્રા) જણાવો.', spoken: 'કેટલો જથ્થો છે?', phonetic: 'Kripya jaththo janavo.' },
      hi: { text: 'कृपया मात्रा बताएं।', spoken: 'कितनी मात्रा है?', phonetic: 'Kripya maatra batayein.' },
      mr: { text: 'कृपया प्रमाण सांगा.', spoken: 'किती प्रमाण आहे?', phonetic: 'Krupya pramaan saanga.' },
      ta: { text: 'அளவைக் குறிப்பிடவும்.', spoken: 'எவ்வளவு அளவு?', phonetic: 'Alavai kuripidavum.' },
      te: { text: 'దయచేసి పరిమాణం చెప్పండి.', spoken: 'ఎంత పరిమాణం?', phonetic: 'Dayachesi parimaanam cheppandi.' },
      bn: { text: 'দয়া করে পরিমাণ বলুন।', spoken: 'কত পরিমাণ?', phonetic: 'Doya kore porimaan bolun.' },
      kn: { text: 'ದಯವಿಟ್ಟು ಪ್ರಮಾಣ ತಿಳಿಸಿ.', spoken: 'ಎಷ್ಟು ಪ್ರಮಾಣ?', phonetic: 'Dayavittu pramaana thilisi.' },
      ml: { text: 'ദയവായി അളവ് പറയൂ.', spoken: 'എത്ര അളവ്?', phonetic: 'Dayavaayi alavu parayoo.' },
      en: { text: 'Please mention the quantity.', spoken: 'How much quantity?', phonetic: 'Please mention the quantity.' }
    };
    const qtyMsg = msgs[lang] || msgs.en;
    return {
      success: false,
      intent,
      message: qtyMsg.text,
      spokenResponseEn: msgs.en.spoken,
      spokenResponseHi: msgs.hi.spoken,
      spokenResponse: qtyMsg.spoken,
      phoneticSpoken: qtyMsg.phonetic
    };
  }

  // ----------------------------------------------------
  // 1. ADD STOCK
  // ----------------------------------------------------
  if (intent === 'ADD_STOCK') {
    const productName = entities.productName;
    const quantity = entities.quantity || 1;
    const unit: UnitType = entities.unit || 'pieces';

    if (!productName) {
      const err = getHumanErrorResponse(lang);
      return {
        success: false,
        intent: 'ADD_STOCK',
        message: err.text,
        spokenResponseEn: getHumanErrorResponse('en').spoken,
        spokenResponseHi: getHumanErrorResponse('hi').spoken,
        spokenResponse: err.spoken,
        phoneticSpoken: err.phonetic
      };
    }

    let product = await db.findProductByName(productName);

    if (!product) {
      product = {
        id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: productName,
        quantity: quantity,
        unit: unit,
        price: 50,
        lowStockThreshold: lowStockThreshold,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      await db.saveProduct(product);
    } else {
      await db.updateProductStock(product.id, quantity);
      product.quantity += quantity;
    }

    const localized = getLocalizedResponse(lang, 'ADD_STOCK', {
      rawName: product.name,
      quantity,
      unit: product.unit,
      totalStock: product.quantity
    });

    await db.logActivity('ADD_STOCK', `Added ${quantity} ${product.unit} of ${product.name}`, `${quantity} ${product.unit} ${product.hindiName || product.name} का स्टॉक जोड़ा`);

    return {
      success: true,
      intent: 'ADD_STOCK',
      message: localized.text,
      hindiMessage: `${quantity} ${product.unit} ${product.name} का स्टॉक जोड़ा गया।`,
      spokenResponseEn: `Added ${quantity} ${product.unit} of ${product.name}. Current stock is ${product.quantity} ${product.unit}.`,
      spokenResponseHi: `${quantity} ${product.unit} ${product.name} का स्टॉक जोड़ा गया।`,
      spokenResponse: localized.spoken,
      phoneticSpoken: localized.phonetic,
      data: product
    };
  }

  // ----------------------------------------------------
  // 2. RECORD SALE
  // ----------------------------------------------------
  if (intent === 'RECORD_SALE') {
    const productName = entities.productName;
    if (!productName) {
      const err = getHumanErrorResponse(lang);
      return {
        success: false,
        intent: 'RECORD_SALE',
        message: err.text,
        spokenResponseEn: getHumanErrorResponse('en').spoken,
        spokenResponseHi: getHumanErrorResponse('hi').spoken,
        spokenResponse: err.spoken,
        phoneticSpoken: err.phonetic
      };
    }

    const product = await db.findProductByName(productName);
    if (!product) {
      const notFoundMsgs: Record<SupportedLanguage, { text: string; spoken: string; phonetic: string }> = {
        gu: { text: `તમારી દુકાનમાં "${productName}" મળ્યું નથી.`, spoken: `ઇન્વેન્ટરીમાં ${productName} મળ્યું નથી.`, phonetic: `Inventory ma ${productName} malyu nathi.` },
        hi: { text: `आपकी इन्वेंट्री में "${productName}" नहीं मिला।`, spoken: `इन्वेंट्री में ${productName} नहीं मिला।`, phonetic: `Aapki inventory mein ${productName} nahi mila.` },
        mr: { text: `तुमच्या साठ्यात "${productName}" आढळले नाही.`, spoken: `साठ्यात ${productName} आढळले नाही.`, phonetic: `Saathyaat ${productName} aadhalle naahi.` },
        ta: { text: `கடை இருப்பில் "${productName}" கிடைக்கவில்லை.`, spoken: `இருப்பில் ${productName} கிடைக்கவில்லை.`, phonetic: `Iruppil ${productName} kidaikkavillai.` },
        te: { text: `మీ స్టాక్‌లో "${productName}" దొరకలేదు.`, spoken: `స్టాక్‌లో ${productName} దొరకలేదు.`, phonetic: `Stock lo ${productName} dorakaledu.` },
        bn: { text: `আপনার দোকানে "${productName}" পাওয়া যায়নি।`, spoken: `দোকানে ${productName} পাওয়া যায়নি।`, phonetic: `Dokaane ${productName} paawa jaayni.` },
        kn: { text: `ನಿಮ್ಮ ದಾಸ್ತಾನಿನಲ್ಲಿ "${productName}" ಕಂಡುಬಂದಿಲ್ಲ.`, spoken: `ದಾಸ್ತಾನಿನಲ್ಲಿ ${productName} ಕಂಡುಬಂದಿಲ್ಲ.`, phonetic: `Daasthaaninalli ${productName} kandubandilla.` },
        ml: { text: `നിങ്ങളുടെ സ്റ്റോക്കിൽ "${productName}" കണ്ടെത്തിയില്ല.`, spoken: `സ്റ്റോക്കിൽ ${productName} കണ്ടെത്തിയില്ല.`, phonetic: `Stockil ${productName} kandethiyilla.` },
        en: { text: `I couldn't find "${productName}" in your inventory.`, spoken: `I couldn't find ${productName} in inventory.`, phonetic: `I couldn't find ${productName} in inventory.` }
      };
      const nf = notFoundMsgs[lang] || notFoundMsgs.en;
      return {
        success: false,
        intent: 'RECORD_SALE',
        message: nf.text,
        spokenResponseEn: notFoundMsgs.en.spoken,
        spokenResponseHi: notFoundMsgs.hi.spoken,
        spokenResponse: nf.spoken,
        phoneticSpoken: nf.phonetic
      };
    }

    const quantity = entities.quantity || 1;

    // Check stock availability
    if (product.quantity < quantity) {
      const insMsgs: Record<SupportedLanguage, { text: string; spoken: string; phonetic: string }> = {
        gu: { text: `અપૂરતો સ્ટોક! તમારી પાસે માત્ર ${product.quantity} ${product.unit} ${product.name} છે.`, spoken: `સ્ટોકમાં માત્ર ${product.quantity} ${product.unit} છે.`, phonetic: `Stock ma maatra ${product.quantity} ${product.unit} chhe.` },
        hi: { text: `अपर्याप्त स्टॉक! आपके पास केवल ${product.quantity} ${product.unit} ${product.name} है।`, spoken: `आपके पास केवल ${product.quantity} ${product.unit} बाकी है।`, phonetic: `Aapke paas keval ${product.quantity} ${product.unit} bacha hai.` },
        mr: { text: `अपुरा साठा! तुमच्याकडे फक्त ${product.quantity} ${product.unit} ${product.name} शिल्लक आहे.`, spoken: `फक्त ${product.quantity} ${product.unit} शिल्लक आहे.`, phonetic: `Fakta ${product.quantity} ${product.unit} shillak aahe.` },
        ta: { text: `போதிய இருப்பு இல்லை! உங்களிடம் ${product.quantity} ${product.unit} மட்டுமே உள்ளது.`, spoken: `உங்களிடம் ${product.quantity} ${product.unit} மட்டுமே உள்ளது.`, phonetic: `Podhiya iruppu illai! Ungalidam ${product.quantity} ${product.unit} mattume ulladhu.` },
        te: { text: `సరిపడా స్టాక్ లేదు! మీ వద్ద ${product.quantity} ${product.unit} మాత్రమే ఉంది.`, spoken: `మీ వద్ద ${product.quantity} ${product.unit} మాత్రమే ఉంది.`, phonetic: `Mee vadda ${product.quantity} ${product.unit} maathrame undi.` },
        bn: { text: `পর্যাপ্ত স্টক নেই! আপনার কাছে মাত্র ${product.quantity} ${product.unit} রয়েছে।`, spoken: `আপনার কাছে মাত্র ${product.quantity} ${product.unit} রয়েছে।`, phonetic: `Aapnaar kaachhe maatro ${product.quantity} ${product.unit} royechhe.` },
        kn: { text: `ಸಾಕಷ್ಟು ದಾಸ್ತಾನು ಇಲ್ಲ! ನಿಮ್ಮ ಬಳಿ ${product.quantity} ${product.unit} ಮಾತ್ರ ಇದೆ.`, spoken: `ನಿಮ್ಮ ಬಳಿ ${product.quantity} ${product.unit} ಮಾತ್ರ ಇದೆ.`, phonetic: `Nimma bali ${product.quantity} ${product.unit} maathra ide.` },
        ml: { text: `ആവശ്യത്തിന് സ്റ്റോക്കില്ല! നിങ്ങളുടെ പക്കൽ ${product.quantity} ${product.unit} മാത്രമേയുള്ളൂ.`, spoken: `നിങ്ങളുടെ പക്കൽ ${product.quantity} ${product.unit} മാത്രമേയുള്ളൂ.`, phonetic: `Ningalude pakkal ${product.quantity} ${product.unit} maathrameyulloo.` },
        en: { text: `Insufficient stock! You only have ${product.quantity} ${product.unit} of ${product.name}.`, spoken: `You only have ${product.quantity} ${product.unit} in stock.`, phonetic: `You only have ${product.quantity} ${product.unit} in stock.` }
      };
      const ins = insMsgs[lang] || insMsgs.en;
      return {
        success: false,
        intent: 'RECORD_SALE',
        message: ins.text,
        spokenResponseEn: insMsgs.en.spoken,
        spokenResponseHi: insMsgs.hi.spoken,
        spokenResponse: ins.spoken,
        phoneticSpoken: ins.phonetic,
        data: product
      };
    }

    const unitPrice = product.price || 0;
    const saleAmount = entities.amount !== undefined ? entities.amount : (quantity * unitPrice);

    await db.updateProductStock(product.id, -quantity);
    product.quantity -= quantity;

    const sale = await db.recordSale({
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      unit: product.unit,
      unitPrice: unitPrice,
      amount: saleAmount,
      type: 'Sale'
    });

    const localized = getLocalizedResponse(lang, 'RECORD_SALE', {
      rawName: product.name,
      quantity,
      unit: product.unit,
      amount: saleAmount,
      stockLeft: product.quantity
    });

    await db.logActivity('SALE', `Sold ${quantity} ${product.unit} of ${product.name} for ${formatINR(saleAmount)}`, `${quantity} ${product.unit} ${product.hindiName || product.name} ${formatINR(saleAmount)} में बेचा`);

    return {
      success: true,
      intent: 'RECORD_SALE',
      message: localized.text,
      hindiMessage: `✅ ${quantity} ${product.unit} ${product.hindiName || product.name} बिका। अब ${product.quantity} ${product.unit} बाकी है।`,
      spokenResponseEn: `Sold ${quantity} ${product.unit} of ${product.name} for ${saleAmount} rupees. ${product.quantity} ${product.unit} remaining.`,
      spokenResponseHi: `${quantity} ${product.unit} ${product.hindiName || product.name} बिक गया। अब ${product.quantity} ${product.unit} बाकी है।`,
      spokenResponse: localized.spoken,
      phoneticSpoken: localized.phonetic,
      data: { product, sale }
    };
  }

  // ----------------------------------------------------
  // 3. CHECK STOCK
  // ----------------------------------------------------
  if (intent === 'CHECK_STOCK') {
    const productName = entities.productName;

    if (productName) {
      const product = await db.findProductByName(productName);
      if (!product) {
        const nf = getHumanErrorResponse(lang);
        return {
          success: false,
          intent: 'CHECK_STOCK',
          message: `"${productName}" not found in inventory.`,
          spokenResponseEn: `I couldn't find ${productName} in your inventory.`,
          spokenResponseHi: `आपकी इन्वेंट्री में ${productName} नहीं मिला।`,
          spokenResponse: nf.spoken,
          phoneticSpoken: nf.phonetic
        };
      }

      const isLow = product.quantity <= product.lowStockThreshold;
      const localized = getLocalizedResponse(lang, 'CHECK_STOCK', {
        rawName: product.name,
        quantity: product.quantity,
        unit: product.unit,
        isLow
      });

      return {
        success: true,
        intent: 'CHECK_STOCK',
        message: localized.text,
        hindiMessage: `${product.name} का स्टॉक: ${product.quantity} ${product.unit}`,
        spokenResponseEn: `You have ${product.quantity} ${product.unit} of ${product.name} in stock.`,
        spokenResponseHi: `${product.name} की ${product.quantity} ${product.unit} बाकी हैं।`,
        spokenResponse: localized.spoken,
        phoneticSpoken: localized.phonetic,
        data: product
      };
    } else {
      const allProducts = await db.getAllProducts();
      const totalItems = allProducts.length;
      const lowStockItems = allProducts.filter(p => p.quantity <= p.lowStockThreshold);

      const localized = getLocalizedResponse(lang, 'CHECK_STOCK_ALL', {
        totalItems,
        lowStockCount: lowStockItems.length
      });

      return {
        success: true,
        intent: 'CHECK_STOCK',
        message: localized.text,
        hindiMessage: `दुकान में कुल ${totalItems} उत्पाद हैं।`,
        spokenResponseEn: `You have ${totalItems} products in store inventory.`,
        spokenResponseHi: `दुकान में कुल ${totalItems} उत्पाद हैं।`,
        spokenResponse: localized.spoken,
        phoneticSpoken: localized.phonetic,
        data: allProducts
      };
    }
  }

  // ----------------------------------------------------
  // 4. CHECK EARNINGS
  // ----------------------------------------------------
  if (intent === 'CHECK_EARNINGS') {
    const allSales = await db.getAllSales();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySales = allSales.filter(s => s.timestamp >= today.getTime());
    const totalEarnings = todaySales.reduce((sum, s) => sum + s.amount, 0);
    const txCount = todaySales.length;

    const localized = getLocalizedResponse(lang, 'CHECK_EARNINGS', {
      totalEarnings,
      txCount
    });

    await db.logActivity('CHECK_EARNINGS', `Checked today's earnings: ${formatINR(totalEarnings)}`, `आज की कमाई की जांच की: ${formatINR(totalEarnings)}`);

    return {
      success: true,
      intent: 'CHECK_EARNINGS',
      message: localized.text,
      hindiMessage: `आज की कुल कमाई: ${formatINR(totalEarnings)} (${txCount} बिक्री)।`,
      spokenResponseEn: `You earned ${totalEarnings} rupees today across ${txCount} sales.`,
      spokenResponseHi: `आज की कुल कमाई ${totalEarnings} रुपये है।`,
      spokenResponse: localized.spoken,
      phoneticSpoken: localized.phonetic,
      data: { totalEarnings, txCount, todaySales }
    };
  }

  // ----------------------------------------------------
  // 5. LOW STOCK
  // ----------------------------------------------------
  if (intent === 'LOW_STOCK') {
    const allProducts = await db.getAllProducts();
    const lowStockItems = allProducts.filter(p => p.quantity <= p.lowStockThreshold);
    const itemNames = lowStockItems.map(p => `${getLocalizedProductName(p.name, lang)} (${p.quantity} ${getLocalizedUnitName(p.unit, lang)})`).join(', ');

    const localized = getLocalizedResponse(lang, 'LOW_STOCK', {
      count: lowStockItems.length,
      list: itemNames
    });

    await db.logActivity('LOW_STOCK', `Identified ${lowStockItems.length} low stock items: ${itemNames}`, `${lowStockItems.length} कम स्टॉक वाले उत्पाद: ${itemNames}`);

    return {
      success: true,
      intent: 'LOW_STOCK',
      message: localized.text,
      hindiMessage: `कम स्टॉक चेतावनी: ${lowStockItems.length} सामान कम हैं।`,
      spokenResponseEn: `${lowStockItems.length} items are running low.`,
      spokenResponseHi: `${lowStockItems.length} सामान कम है।`,
      spokenResponse: localized.spoken,
      phoneticSpoken: localized.phonetic,
      data: lowStockItems
    };
  }

  // ----------------------------------------------------
  // 6. UPDATE_PRICE
  // ----------------------------------------------------
  if (intent === 'UPDATE_PRICE') {
    const { productName, pricePerUnit } = parsed.entities;
    if (!productName || !pricePerUnit) {
      const errObj = getHumanErrorResponse(lang);
      return {
        success: false,
        intent: 'UPDATE_PRICE',
        message: errObj.text,
        spokenResponseEn: getHumanErrorResponse('en').spoken,
        spokenResponseHi: getHumanErrorResponse('hi').spoken,
        spokenResponse: errObj.spoken,
        phoneticSpoken: errObj.phonetic
      };
    }

    const allProducts = await db.getAllProducts();
    const product = allProducts.find(p => 
      p.name.toLowerCase() === productName.toLowerCase() ||
      (p.hindiName && p.hindiName.toLowerCase() === productName.toLowerCase()) ||
      (p.aliases && p.aliases.some(a => a.toLowerCase() === productName.toLowerCase()))
    );

    if (!product) {
      const notFoundMsgs: Record<SupportedLanguage, { text: string; spoken: string; phonetic: string }> = {
        gu: { text: `દુકાનમાં "${productName}" નામનો સામાન મળ્યો નથી.`, spoken: `${productName} નામનો સામાન મળ્યો નથી.`, phonetic: `${productName} naam no saaman malyo nathi.` },
        hi: { text: `दुकान में "${productName}" सामान नहीं मिला।`, spoken: `${productName} सामान नहीं मिला।`, phonetic: `${productName} samaan nahi mila.` },
        mr: { text: `दुकानात "${productName}" उत्पादन सापडले नाही.`, spoken: `${productName} सापडले नाही.`, phonetic: `${productName} saapadle nahi.` },
        ta: { text: `கடையில் "${productName}" பொருள் கிடைக்கவில்லை.`, spoken: `${productName} கிடைக்கவில்லை.`, phonetic: `${productName} kidaikkavillai.` },
        te: { text: `దుకాణంలో "${productName}" వస్తువు కనుగొనబడలేదు.`, spoken: `${productName} కనుగొనబడలేదు.`, phonetic: `${productName} kanugonabadaledu.` },
        bn: { text: `দোকানে "${productName}" পণ্যটি পাওয়া যায়নি।`, spoken: `${productName} পাওয়া যায়নি।`, phonetic: `${productName} paowa jaayni.` },
        kn: { text: `ಅಂಗಡಿಯಲ್ಲಿ "${productName}" ವಸ್ತು ಕಂಡುಬಂದಿಲ್ಲ.`, spoken: `${productName} ಕಂಡುಬಂದಿಲ್ಲ.`, phonetic: `${productName} kandubandilla.` },
        ml: { text: `കടയിൽ "${productName}" സാധനം കണ്ടെത്തിയില്ല.`, spoken: `${productName} കണ്ടെത്തിയില്ല.`, phonetic: `${productName} kandethiyilla.` },
        en: { text: `Product "${productName}" was not found in store inventory.`, spoken: `Product ${productName} not found.`, phonetic: `Product ${productName} not found.` }
      };
      const nf = notFoundMsgs[lang] || notFoundMsgs.en;
      return {
        success: false,
        intent: 'UPDATE_PRICE',
        message: nf.text,
        spokenResponseEn: notFoundMsgs.en.spoken,
        spokenResponseHi: notFoundMsgs.hi.spoken,
        spokenResponse: nf.spoken,
        phoneticSpoken: nf.phonetic
      };
    }

    const oldPrice = product.price;
    product.price = pricePerUnit;
    product.updatedAt = Date.now();
    await db.saveProduct(product);

    await db.logActivity(
      'UPDATE_PRICE',
      `Updated price of ${product.name} to ${formatINR(pricePerUnit)}/${product.unit} (was ${formatINR(oldPrice)})`,
      `${product.hindiName || product.name} का नया भाव ${formatINR(pricePerUnit)}/${product.unit} कर दिया गया`
    );

    const localized = getLocalizedResponse(lang, 'UPDATE_PRICE', {
      rawName: product.name,
      price: pricePerUnit,
      unit: product.unit,
      oldPrice
    });

    return {
      success: true,
      intent: 'UPDATE_PRICE',
      message: localized.text,
      spokenResponseEn: localized.spoken || localized.text,
      spokenResponseHi: localized.spoken || localized.text,
      spokenResponse: localized.spoken,
      phoneticSpoken: localized.phonetic,
      data: { product, oldPrice, newPrice: pricePerUnit }
    };
  }

  // ----------------------------------------------------
  // 6. WHOLESALE ORDER (WhatsApp Reorder)
  // ----------------------------------------------------
  if (intent === 'WHOLESALE_ORDER') {
    const allProducts = await db.getAllProducts();
    const lowStockProducts = allProducts.filter(p => p.quantity <= p.lowStockThreshold);
    const count = lowStockProducts.length;

    await db.logActivity(
      'WHOLESALE_ORDER',
      `Opened Wholesale Purchase Order for ${count} items.`,
      `थोक खरीद आदेश खोला गया (${count} सामान)`
    );

    const localized = getLocalizedResponse(lang, 'WHOLESALE_ORDER', { count });

    return {
      success: true,
      intent: 'WHOLESALE_ORDER',
      message: localized.text,
      spokenResponseEn: localized.spoken || localized.text,
      spokenResponseHi: localized.spoken || localized.text,
      spokenResponse: localized.spoken,
      phoneticSpoken: localized.phonetic,
      data: { lowStockCount: count, lowStockProducts }
    };
  }

  const errObj = getHumanErrorResponse(lang);
  return {
    success: false,
    intent: 'UNKNOWN',
    message: errObj.text,
    spokenResponseEn: getHumanErrorResponse('en').spoken,
    spokenResponseHi: getHumanErrorResponse('hi').spoken,
    spokenResponse: errObj.spoken,
    phoneticSpoken: errObj.phonetic
  };
}
