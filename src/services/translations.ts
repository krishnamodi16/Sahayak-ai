import { SupportedLanguage } from '../types/index';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  speechLang: string;
  sampleSuggestion: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English (India)', speechLang: 'en-IN', sampleSuggestion: 'Add 20 bottles of water' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', speechLang: 'hi-IN', sampleSuggestion: '२० बोतल पानी का स्टॉक डालो' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', speechLang: 'gu-IN', sampleSuggestion: '૨૦ બોટલ પાણી ઉમેરો' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechLang: 'mr-IN', sampleSuggestion: '२० बाटल्या पाणी जोडा' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechLang: 'ta-IN', sampleSuggestion: '20 தண்ணீர் பாட்டில்கள் சேர்க்கவும்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechLang: 'te-IN', sampleSuggestion: '20 నీళ్ల బాటిళ్లు జోడించు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechLang: 'bn-IN', sampleSuggestion: '২০ বোতল জল যোগ করুন' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechLang: 'kn-IN', sampleSuggestion: '20 ಬಾಟಲ್ ನೀರು ಸೇರಿಸಿ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', speechLang: 'ml-IN', sampleSuggestion: '20 കുപ്പി വെള്ളം ചേർക്കുക' },
];

export interface UiTranslations {
  tagline: string;
  appTitle: string;
  appSubtitle: string;
  offlineBadge: string;
  storeOpenBadge: string;
  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  assistantStatus: string;
  micTapToSpeak: string;
  micListening: string;
  micProcessing: string;
  micDone: string;
  micSpeakNow: string;
  micTryAgain: string;
  textFallbackLabel: string;
  textFallbackPlaceholder: string;
  runCommand: string;
  suggestedCommandsTitle: string;
  viewCards: string;
  viewTable: string;
  fastBillingBtn: string;
  quickActions: {
    addStock: string;
    recordSale: string;
    checkStock: string;
    checkEarnings: string;
    lowStock: string;
  };
  nav: {
    allOverview: string;
    voiceBilling: string;
    stockLedger: string;
    salesLedger: string;
    storeActivity: string;
  };
  stats: {
    totalItems: string;
    todaysSales: string;
    inventoryValue: string;
    lowStock: string;
    productsUnit: string;
    transactionsLabel: string;
    currentStockLabel: string;
    attentionLabel: string;
    itemsUnit: string;
    activeCatalog: string;
    reorderNeeded: string;
    goodStock: string;
    todayGalla: string;
  };
  inventory: {
    title: string;
    subtitle: string;
    addProduct: string;
    searchPlaceholder: string;
    filterAll: string;
    filterLowStock: string;
    filterInStock: string;
    colProduct: string;
    colQuantity: string;
    colUnit: string;
    colPrice: string;
    colValue: string;
    colStatus: string;
    colActions: string;
    statusInStock: string;
    statusLowStock: string;
    noProducts: string;
    editTooltip: string;
    deleteTooltip: string;
    quickAddTooltip: string;
    quickDeductTooltip: string;
  };
  sales: {
    title: string;
    subtitle: string;
    todaysEarningsTitle: string;
    recordSaleBtn: string;
    searchPlaceholder: string;
    colTime: string;
    colProduct: string;
    colQty: string;
    colAmount: string;
    colType: string;
    noSales: string;
    cumulativeSales: string;
    todayBadge: string;
  };
  activity: {
    title: string;
    subtitle: string;
    liveLog: string;
    noActivity: string;
    justNow: string;
    minAgo: string;
    hrAgo: string;
    daysAgo: string;
  };
  modals: {
    addNewProduct: string;
    editProduct: string;
    recordSaleTitle: string;
    productNameEn: string;
    productNameRegional: string;
    initialStock: string;
    currentStock: string;
    unit: string;
    pricePerUnit: string;
    lowStockAlert: string;
    cancel: string;
    saveProduct: string;
    updateProduct: string;
    selectProduct: string;
    soldQuantity: string;
    totalSaleAmount: string;
    recordSaleSubmit: string;
    validQuantityError: string;
    insufficientStockError: string;
  };
  settings: {
    title: string;
    langSection: string;
    thresholdTitle: string;
    thresholdDesc: string;
    voiceConfirmation: string;
    voiceDesc: string;
    demoMode: string;
    demoDesc: string;
    dbManagement: string;
    resetDemo: string;
    exportBackup: string;
    clearAll: string;
    clearWarning: string;
    confirmClear: string;
    saveChanges: string;
  };
  offlinePanel: {
    title: string;
    subtitle: string;
    badge: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
  };
  conversation: {
    you: string;
    assistant: string;
    spokenResponseLabel: string;
    replayVoice: string;
    errorApology: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    signUpTitle: string;
    signUpSubtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneOrNameLabel: string;
    phoneOrNamePlaceholder: string;
    pinLabel: string;
    pinPlaceholder: string;
    ownerNameLabel: string;
    ownerNamePlaceholder: string;
    shopNameLabel: string;
    shopNamePlaceholder: string;
    categoryLabel: string;
    categoryPlaceholder: string;
    loginBtn: string;
    signUpBtn: string;
    switchTabLogin: string;
    switchTabSignUp: string;
    demoProfilesTitle: string;
    demoProfilesDesc: string;
    switchAccount: string;
    logout: string;
    profileTitle: string;
    currentShop: string;
    loggedInAs: string;
  };
  wholesale: {
    title: string;
    subtitle: string;
    distributorLabel: string;
    distributorPhoneLabel: string;
    selectDistributorPlaceholder: string;
    orderItemsTitle: string;
    noLowStockMessage: string;
    addItemBtn: string;
    selectProductPlaceholder: string;
    orderQtyLabel: string;
    currentStockLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    previewTitle: string;
    sendWhatsAppBtn: string;
    copyTextBtn: string;
    copiedSuccess: string;
    urgentBadge: string;
  };
  suggestions: string[];
}

export const TRANSLATIONS: Record<SupportedLanguage, UiTranslations> = {
  en: {
    tagline: '100% Offline Digital Ledger & Voice Assistant',
    appTitle: 'Sahayak',
    appSubtitle: 'Offline Voice Billing & Store POS',
    offlineBadge: '100% Offline',
    storeOpenBadge: 'Store Open',
    greetingMorning: 'Good morning! Ready for today’s billing and stock.',
    greetingAfternoon: 'Good afternoon! Let’s manage your store counter.',
    greetingEvening: 'Good evening! Ready to review today’s sales.',
    assistantStatus: 'Sahayak Voice Terminal • Ready to listen',
    micTapToSpeak: 'Tap to Speak',
    micListening: 'Listening to your voice...',
    micProcessing: 'Updating accounts...',
    micDone: 'Sale Recorded ✓',
    micSpeakNow: 'Speak naturally now...',
    micTryAgain: 'Try Again',
    textFallbackLabel: 'Or type your command:',
    textFallbackPlaceholder: 'e.g., 20 kg rice sold for 1200 or Add 10 bottles of water',
    runCommand: 'Record Entry',
    suggestedCommandsTitle: 'Try saying or tap to test:',
    viewCards: 'Tiles View',
    viewTable: 'Ledger View',
    fastBillingBtn: '⚡ Quick Sale',
    quickActions: {
      addStock: 'Add Stock',
      recordSale: 'Record Sale',
      checkStock: 'Check Stock',
      checkEarnings: 'Check Earnings',
      lowStock: 'Low Stock'
    },
    nav: {
      allOverview: 'Store Counter',
      voiceBilling: 'Voice Terminal',
      stockLedger: 'Stock Inventory',
      salesLedger: 'Daily Sales Ledger',
      storeActivity: 'Live Activity'
    },
    stats: {
      totalItems: 'Total Items in Shop',
      todaysSales: "Today's Total Sales",
      inventoryValue: 'Total Stock Valuation',
      lowStock: 'Low Stock Warning',
      productsUnit: 'products',
      transactionsLabel: 'Transactions',
      currentStockLabel: 'Store Inventory',
      attentionLabel: 'Inventory Health',
      itemsUnit: 'items',
      activeCatalog: 'Active catalog',
      reorderNeeded: 'Reorder Needed',
      goodStock: 'Stock Healthy',
      todayGalla: "Today's Total Sales"
    },
    inventory: {
      title: 'Store Stock & Product Register',
      subtitle: 'Real-time inventory levels, prices and rapid +1 / -1 stock adjusters',
      addProduct: '+ New Product',
      searchPlaceholder: 'Search product by name or local name...',
      filterAll: 'All Items',
      filterLowStock: '⚠️ Low Stock',
      filterInStock: '✓ In Stock',
      colProduct: 'Item Name',
      colQuantity: 'Stock Count',
      colUnit: 'Unit',
      colPrice: 'Rate / Unit',
      colValue: 'Value',
      colStatus: 'Status',
      colActions: 'Actions',
      statusInStock: 'In Stock',
      statusLowStock: 'Low Stock',
      noProducts: 'No products in inventory yet. Tap "+ New Product" to add your first item.',
      editTooltip: 'Edit details',
      deleteTooltip: 'Delete item',
      quickAddTooltip: 'Add 1 unit',
      quickDeductTooltip: 'Deduct 1 unit'
    },
    sales: {
      title: 'Daily Sales & Transactions Ledger',
      subtitle: 'Recorded transactions, time stamps & daily revenue summary',
      todaysEarningsTitle: "TODAY'S TOTAL SALES (CASH)",
      recordSaleBtn: '+ Record Sale',
      searchPlaceholder: 'Search sales records...',
      colTime: 'Time',
      colProduct: 'Item Sold',
      colQty: 'Quantity',
      colAmount: 'Sale Amount',
      colType: 'Payment',
      noSales: 'No sales recorded today yet.',
      cumulativeSales: 'All-Time Sales',
      todayBadge: 'Today'
    },
    activity: {
      title: 'Store Live Activity Log',
      subtitle: 'Real-time ledger updates and transaction timeline',
      liveLog: 'Live Stream',
      noActivity: 'No recent activity.',
      justNow: 'just now',
      minAgo: 'min ago',
      hrAgo: 'hr ago',
      daysAgo: 'days ago'
    },
    modals: {
      addNewProduct: 'Add New Product to Store',
      editProduct: 'Edit Product Details',
      recordSaleTitle: 'Record Sale in Ledger',
      productNameEn: 'Product Name (English) *',
      productNameRegional: 'Regional / Local Name (Optional)',
      initialStock: 'Initial Stock Quantity *',
      currentStock: 'Current Stock Quantity *',
      unit: 'Unit *',
      pricePerUnit: 'Rate per Unit (₹) *',
      lowStockAlert: 'Low Stock Alert Threshold',
      cancel: 'Cancel',
      saveProduct: 'Save to Catalog',
      updateProduct: 'Save Changes',
      selectProduct: 'Select Item *',
      soldQuantity: 'Quantity Sold *',
      totalSaleAmount: 'Total Cash Collected (₹) *',
      recordSaleSubmit: 'Record Sale in Ledger',
      validQuantityError: 'Please enter a valid quantity.',
      insufficientStockError: 'Insufficient stock available in store!'
    },
    settings: {
      title: 'Store Profile & Local Settings',
      langSection: 'Primary Voice & UI Language',
      thresholdTitle: 'Low Stock Warning Threshold',
      thresholdDesc: 'Products with stock at or below this count will show warning alerts',
      voiceConfirmation: 'Voice Audio Feedback (TTS)',
      voiceDesc: 'Speaks audio confirmations after recording sales, stock, or queries',
      demoMode: 'Demo Store Catalog',
      demoDesc: 'Pre-load realistic sample grocery items for easy testing',
      dbManagement: 'Database & Device Vault',
      resetDemo: 'Reset to Demo Store',
      exportBackup: 'Download Store Backup (JSON)',
      clearAll: 'Clear All Store Data',
      clearWarning: 'This will permanently remove all store records from this device.',
      confirmClear: 'Yes, Clear All Data',
      saveChanges: 'Save Settings'
    },
    offlinePanel: {
      title: '100% Offline & Private Digital Vault',
      subtitle: 'Zero cloud latency, zero external servers. All data stays entirely inside this device.',
      badge: 'Zero Internet Needed',
      feat1Title: 'Local IndexedDB Vault',
      feat1Desc: 'All inventory, ledger entries and sales history are saved on your physical browser storage.',
      feat2Title: 'Browser Voice Engine',
      feat2Desc: 'Voice recognition and text-to-speech synthesize directly on-device without internet.',
      feat3Title: 'Instant Zero-Lag Billing',
      feat3Desc: 'Super-fast counter billing with zero network buffers or server downtime.'
    },
    conversation: {
      you: 'Merchant',
      assistant: 'Sahayak AI',
      spokenResponseLabel: 'Spoken reply:',
      replayVoice: 'Replay Voice',
      errorApology: 'I did not understand that command. Try saying "Add 10 bottles of water" or "Check earnings".'
    },
    auth: {
        "loginTitle": "Shopkeeper Login",
        "loginSubtitle": "Access your store ledger and inventory offline",
        "signUpTitle": "Register New Store",
        "signUpSubtitle": "Set up your kirana store in 10 seconds",
        "emailLabel": "Email Address (Optional for e-bills / login)",
        "emailPlaceholder": "e.g. store@gmail.com",
        "phoneOrNameLabel": "Email Address or Mobile Number",
        "phoneOrNamePlaceholder": "e.g. store@gmail.com or 9876543210",
        "pinLabel": "4-Digit Security PIN",
        "pinPlaceholder": "Enter 4-digit PIN (default: 1234)",
        "ownerNameLabel": "Store Owner Name",
        "ownerNamePlaceholder": "e.g., Ramesh Kumar",
        "shopNameLabel": "Shop / Store Name",
        "shopNamePlaceholder": "e.g., Ramesh Kirana Store",
        "categoryLabel": "Business Category",
        "categoryPlaceholder": "e.g., Grocery / Kirana / General Store",
        "loginBtn": "Login to Store",
        "signUpBtn": "Register Store",
        "switchTabLogin": "Existing Store Login",
        "switchTabSignUp": "New Store Register",
        "demoProfilesTitle": "1-Click Demo Profiles (For Judges & Testing)",
        "demoProfilesDesc": "Instantly switch shopkeeper profile without typing passwords",
        "switchAccount": "Switch Store",
        "logout": "Logout",
        "profileTitle": "Store Profile",
        "currentShop": "Active Store",
        "loggedInAs": "Logged in as"
    },
    wholesale: {
        "title": "Wholesale Order via WhatsApp",
        "subtitle": "Reorder low-stock items from your distributor in 1 click",
        "distributorLabel": "Wholesaler / Distributor Name",
        "distributorPhoneLabel": "WhatsApp Mobile Number",
        "selectDistributorPlaceholder": "Select saved distributor or type name...",
        "orderItemsTitle": "Purchase Order Items",
        "noLowStockMessage": "No low stock items! You can add products manually below.",
        "addItemBtn": "+ Add Product to Order",
        "selectProductPlaceholder": "Select item to reorder...",
        "orderQtyLabel": "Reorder Qty",
        "currentStockLabel": "In Stock",
        "notesLabel": "Special Instructions / Notes",
        "notesPlaceholder": "e.g. Please deliver by 4 PM today at store counter...",
        "previewTitle": "Live WhatsApp Message Preview",
        "sendWhatsAppBtn": "Send Order on WhatsApp",
        "copyTextBtn": "Copy Order Text",
        "copiedSuccess": "Order copied to clipboard!",
        "urgentBadge": "Low Stock"
    },


    suggestions: [
      '20 kg rice sold for 1200',
      'Change biscuit price to 15',
      '3 bottles of water sold for 90',
      'Add 20 bottles of water',
      'How much water is left',
      'Check earnings today'
    ]
  },

  gu: {
    tagline: '૧૦૦% ઓફલાઇન ડિજિટલ ખાતાવહી અને વૉઇસ સહાયક',
    appTitle: 'સહાયક',
    appSubtitle: 'ઓફલાઇન વૉઇસ બિલિંગ અને કરિયાણા સ્ટોર POS',
    offlineBadge: '૧૦૦% ઓફલાઇન',
    storeOpenBadge: 'દુકાન ચાલુ છે',
    greetingMorning: 'સુપ્રભાત શેઠજી! આજનું બિલિંગ અને સ્ટોક સંભાળવા તૈયાર છું.',
    greetingAfternoon: 'નમસ્તે શેઠજી! ચાલો દુકાનનો હિસાબ-કિતાબ આગળ વધારીએ.',
    greetingEvening: 'શુભ સાંજ શેઠજી! ચાલો આજનો ગલ્લો અને ખાતાવહી મેળવીએ.',
    assistantStatus: 'સહાયક વૉઇસ ટર્મિનલ • સાંભળવા તૈયાર',
    micTapToSpeak: 'બોલવા માટે દબાવો',
    micListening: 'ધ્યાનથી સાંભળી રહ્યો છું...',
    micProcessing: 'ખાતામાં નોંધ કરી રહ્યો છું...',
    micDone: 'ખાતામાં નોંધાઈ ગયું ✓',
    micSpeakNow: 'હવે સાફ અવાજે બોલો...',
    micTryAgain: 'ફરી પ્રયાસ કરો',
    textFallbackLabel: 'અથવા લખીને આદેશ આપો:',
    textFallbackPlaceholder: 'દા.ત., ૨૦ કિલો ચોખા ૧૨૦૦ માં વેચ્યા અથવા ૨૦ બોટલ પાણી ઉમેરો',
    runCommand: 'ખાતામાં નોંધો',
    suggestedCommandsTitle: 'આ રીતે બોલો અથવા દબાવીને જુઓ:',
    viewCards: 'ટાઇલ્સ વ્યૂ',
    viewTable: 'રજિસ્ટર વ્યૂ',
    fastBillingBtn: '⚡ ફાસ્ટ વેચાણ',
    quickActions: {
      addStock: 'સ્ટોક ઉમેરો',
      recordSale: 'વેચાણ નોંધો',
      checkStock: 'સ્ટોક તપાસો',
      checkEarnings: 'કમાણી તપાસો',
      lowStock: 'ઓછો સ્ટોક'
    },
    nav: {
      allOverview: 'દુકાન કાઉન્ટર',
      voiceBilling: 'વૉઇસ ટર્મિનલ',
      stockLedger: 'માલનો સ્ટોક',
      salesLedger: 'રોજિંદી ખાતાવહી',
      storeActivity: 'લાઈવ હિસાબ'
    },
    stats: {
      totalItems: 'દુકાનનો કુલ સામાન',
      todaysSales: 'આજનું કુલ વેચાણ',
      inventoryValue: 'કુલ સ્ટોક મૂલ્યાંકન',
      lowStock: 'ઓછા સ્ટોકની ચેતવણી',
      productsUnit: 'ઉત્પાદનો',
      transactionsLabel: 'વ્યવહારો',
      currentStockLabel: 'દુકાનનો સ્ટોક',
      attentionLabel: 'સ્ટોકની સ્થિતિ',
      itemsUnit: 'વસ્તુઓ',
      activeCatalog: 'સક્રિય સામાન',
      reorderNeeded: 'ઓર્ડર કરવો જરૂરી',
      goodStock: 'સ્ટોક યોગ્ય છે',
      todayGalla: 'આજની કુલ રોકડ આવક'
    },
    inventory: {
      title: 'માલ અને સ્ટોક રજિસ્ટર',
      subtitle: 'રીઅલ-ટાઇમ સ્ટોક, ભાવો અને સરળ +૧ / -૧ કાઉન્ટર બટનો',
      addProduct: '+ નવો સામાન',
      searchPlaceholder: 'નામ અથવા દેશી નામ દ્વારા સામાન શોધો...',
      filterAll: 'બધો સામાન',
      filterLowStock: '⚠️ ઓછો સ્ટોક',
      filterInStock: '✓ પૂરતો સ્ટોક',
      colProduct: 'સામાનનું નામ',
      colQuantity: 'સ્ટોક જથ્થો',
      colUnit: 'એકમ',
      colPrice: 'ભાવ / એકમ',
      colValue: 'કુલ કિંમત',
      colStatus: 'સ્થિતિ',
      colActions: 'ક્રિયાઓ',
      statusInStock: 'ઉપલબ્ધ',
      statusLowStock: 'ઓછો સ્ટોક',
      noProducts: 'દુકાનમાં હજુ કોઈ સામાન નથી. નવો સામાન ઉમેરવા "+ નવો સામાન" દબાવો.',
      editTooltip: 'વિગતો સુધારો',
      deleteTooltip: 'સામાન કાઢી નાખો',
      quickAddTooltip: '૧ એકમ ઉમેરો',
      quickDeductTooltip: '૧ એકમ બાદ કરો'
    },
    sales: {
      title: 'રોજિંદી વેચાણ ખાતાવહી (બહી-ખાતા)',
      subtitle: 'નોંધાયેલા વ્યવહારો, સમય, રોકડ અને દૈનિક ગલ્લો',
      todaysEarningsTitle: 'આજનો ગલ્લો (રોકડ કલેક્શન)',
      recordSaleBtn: '+ વેચાણ નોંધો',
      searchPlaceholder: 'વેચાણના રેકોર્ડ શોધો...',
      colTime: 'સમય',
      colProduct: 'વેચેલો સામાન',
      colQty: 'જથ્થો',
      colAmount: 'વેચાણ રકમ',
      colType: 'પ્રકાર',
      noSales: 'આજે હજુ સુધી કોઈ વેચાણ નોંધાયું નથી.',
      cumulativeSales: 'કુલ સંગ્રહિત વેચાણ',
      todayBadge: 'આજે'
    },
    activity: {
      title: 'દુકાનની લાઈવ પ્રવૃત્તિ લૉગ',
      subtitle: 'સ્ટોક અપડેટ, વેચાણ અને તપાસની જીવંત ટાઈમલાઈન',
      liveLog: 'લાઈવ લૉગ',
      noActivity: 'કોઈ તાજેતરની પ્રવૃત્તિ નથી.',
      justNow: 'હમણાં જ',
      minAgo: 'મિનિટ પહેલાં',
      hrAgo: 'કલાક પહેલાં',
      daysAgo: 'દિવસ પહેલાં'
    },
    modals: {
      addNewProduct: 'દુકાનમાં નવો સામાન ઉમેરો',
      editProduct: 'સામાનની વિગતો સુધારો',
      recordSaleTitle: 'ખાતાવહીમાં વેચાણ નોંધો',
      productNameEn: 'ઉત્પાદનનું નામ (અંગ્રેજી) *',
      productNameRegional: 'ગુજરાતી / દેશી નામ (વૈકલ્પિક)',
      initialStock: 'શરૂઆતનો સ્ટોક જથ્થો *',
      currentStock: 'હાલનો સ્ટોક જથ્થો *',
      unit: 'એકમ (Unit) *',
      pricePerUnit: 'કિંમત પ્રતિ એકમ (₹) *',
      lowStockAlert: 'ઓછા સ્ટોકની ચેતવણી સીમા',
      cancel: 'રદ કરો',
      saveProduct: 'સામાન સાચવો',
      updateProduct: 'સુધારો સાચવો',
      selectProduct: 'સામાન પસંદ કરો *',
      soldQuantity: 'વેચેલો જથ્થો *',
      totalSaleAmount: 'કુલ રોકડ રકમ (₹) *',
      recordSaleSubmit: 'ખાતામાં નોંધો',
      validQuantityError: 'કૃપા કરીને માન્ય જથ્થો દાખલ કરો.',
      insufficientStockError: 'દુકાનમાં પૂરતો સ્ટોક ઉપલબ્ધ નથી!'
    },
    settings: {
      title: 'દુકાન પ્રોફાઇલ અને સેટિંગ્સ',
      langSection: 'મુખ્ય વૉઇસ અને ભાષા',
      thresholdTitle: 'ઓછા સ્ટોકની ચેતવણી સીમા',
      thresholdDesc: 'આ સીમાથી ઓછો સ્ટોક થાય ત્યારે ચેતવણી બતાવવામાં આવશે',
      voiceConfirmation: 'વૉઇસ ઑડિઓ પ્રતિસાદ (TTS)',
      voiceDesc: 'વેચાણ કે સ્ટોક નોંધ્યા પછી બોલીને ખાતરી આપશે',
      demoMode: 'ડેમો કરિયાણા મોડ',
      demoDesc: 'સરળ પરીક્ષણ માટે કરિયાણાનો ડેમો સામાન લોડ કરો',
      dbManagement: 'ડેટાબેઝ અને તિજોરી',
      resetDemo: 'ડેમો ડેટા રીસેટ કરો',
      exportBackup: 'ડેટા બેકઅપ ડાઉનલોડ કરો (JSON)',
      clearAll: 'બધો ડેટા સાફ કરો',
      clearWarning: 'આ ક્રિયાથી આ ઉપકરણમાંથી દુકાનનો તમામ ડેટા કાયમ માટે હટી જશે.',
      confirmClear: 'હા, બધો ડેટા સાફ કરો',
      saveChanges: 'સેટિંગ્સ સાચવો'
    },
    offlinePanel: {
      title: '૧૦૦% ખાનગી અને સંપૂર્ણ ઓફલાઇન ડિજિટલ તિજોરી',
      subtitle: 'તમારા બ્રાઉઝરમાં સંપૂર્ણપણે ચાલે છે. ઇન્ટરનેટ કે સર્વરની બિલકુલ જરૂર નથી.',
      badge: 'ઇન્ટરનેટ વિના સુરક્ષિત',
      feat1Title: 'સ્થાનિક IndexedDB તિજોરી',
      feat1Desc: 'તમામ ઉત્પાદનો, સ્ટોક લૉગ અને વેચાણ સુરક્ષિત રીતે તમારા ઉપકરણમાં જ રહે છે.',
      feat2Title: 'ઓન-ડિવાઇસ સ્પીચ એન્જિન',
      feat2Desc: 'અવાજની ઓળખ અને બોલવાની ક્ષમતા સ્થાનિક બ્રાઉઝર એપીઆઈ દ્વારા ચાલે છે.',
      feat3Title: 'ઝડપી ઝીરો-લેગ બિલિંગ',
      feat3Desc: 'ઇન્ટરનેટ ધીમું હોવા છતાં અવાજથી તુરંત જ સ્ટોક અને વેચાણ નોંધાય છે.'
    },
    conversation: {
      you: 'વેપારી',
      assistant: 'સહાયક AI',
      spokenResponseLabel: 'બોલાયેલો પ્રતિસાદ:',
      replayVoice: 'અવાજ ફરી સાંભળો',
      errorApology: 'મને બરાબર સમજાયું નથી. કૃપા કરીને "૨૦ બોટલ પાણી ઉમેરો" અથવા "આજની કમાણી કેટલી" કહી જુઓ.'
    },
    auth: {
        "loginTitle": "દુકાનદાર લૉગિન",
        "loginSubtitle": "ઓફલાઇન તમારી દુકાનનું ખાતાવહી અને સ્ટોક મેનેજ કરો",
        "signUpTitle": "નવી દુકાન નોંધણી (રજીસ્ટર)",
        "signUpSubtitle": "૧૦ સેકન્ડમાં તમારો કરિયાણા સ્ટોર શરૂ કરો",
        "emailLabel": "ઇમેઇલ સરનામું (લૉગિન અને બિલ માટે)",
        "emailPlaceholder": "દા.ત. store@gmail.com",
        "phoneOrNameLabel": "ઇમેઇલ સરનામું અથવા મોબાઇલ નંબર",
        "phoneOrNamePlaceholder": "દા.ત. store@gmail.com અથવા 9898989898",
        "pinLabel": "૪-અંકનો સુરક્ષા પિન (PIN)",
        "pinPlaceholder": "૪ અંકનો પિન દાખલ કરો (ડિફોલ્ટ: 1234)",
        "ownerNameLabel": "દુકાનદારનું નામ",
        "ownerNamePlaceholder": "દા.ત. સુરેશભાઈ પટેલ",
        "shopNameLabel": "દુકાનનું નામ",
        "shopNamePlaceholder": "દા.ત. પટેલ પ્રોવિઝન સ્ટોર",
        "categoryLabel": "વેપાર પ્રકાર",
        "categoryPlaceholder": "કરિયાણું / જનરલ સ્ટોર / સુપરમાર્કેટ",
        "loginBtn": "દુકાનમાં લૉગિન કરો",
        "signUpBtn": "દુકાન રજીસ્ટર કરો",
        "switchTabLogin": "લૉગિન",
        "switchTabSignUp": "નવું રજીસ્ટ્રેશન",
        "demoProfilesTitle": "૧-ક્લિક ડેમો પ્રોફાઇલ્સ (જજ અને ટેસ્ટિંગ માટે)",
        "demoProfilesDesc": "પાસવર્ડ વગર તરત દુકાનદાર બદલો",
        "switchAccount": "દુકાન બદલો",
        "logout": "લૉગઆઉટ",
        "profileTitle": "દુકાન પ્રોફાઇલ",
        "currentShop": "સક્રિય દુકાન",
        "loggedInAs": "લૉગિન થયેલ:"
    },
    wholesale: {
        "title": "વોટ્સએપ દ્વારા હોલસેલ ઓર્ડર",
        "subtitle": "ઓછા સ્ટોકનો ઓર્ડર ડિસ્ટ્રીબ્યુટરને ૧-ક્લિકમાં મોકલો",
        "distributorLabel": "હોલસેલર / સપ્લાયરનું નામ",
        "distributorPhoneLabel": "વોટ્સએપ મોબાઈલ નંબર",
        "selectDistributorPlaceholder": "સપ્લાયર પસંદ કરો અથવા નામ લખો...",
        "orderItemsTitle": "ઓર્ડર કરવાનો સામાન",
        "noLowStockMessage": "બધો સ્ટોક પૂરતો છે! તમે નીચેથી સામાન ઉમેરી શકો છો.",
        "addItemBtn": "+ ઓર્ડરમાં સામાન ઉમેરો",
        "selectProductPlaceholder": "સામાન પસંદ કરો...",
        "orderQtyLabel": "ઓર્ડર જથ્થો",
        "currentStockLabel": "દુકાનમાં સ્ટોક",
        "notesLabel": "ડિલિવરી નોંધ",
        "notesPlaceholder": "દા.ત. આજે સાંજ સુધીમાં ડિલિવરી કરો...",
        "previewTitle": "વોટ્સએપ મેસેજ પ્રિવ્યુ",
        "sendWhatsAppBtn": "વોટ્સએપ પર ઓર્ડર મોકલો",
        "copyTextBtn": "ઓર્ડર કોપી કરો",
        "copiedSuccess": "ઓર્ડર કોપી થઈ ગયો!",
        "urgentBadge": "ઓછો સ્ટોક"
    },


    suggestions: [
      '૨૦ કિલો ચોખા ૧૨૦૦ માં વેચ્યા',
      'બિસ્કિટનો ભાવ ૧૫ કરો',
      '૩ બોટલ પાણી ૯૦ માં વેચ્યું',
      '૨૦ બોટલ પાણી ઉમેરો',
      'પાણીનો કેટલો સ્ટોક છે',
      'આજની કમાણી કેટલી થઈ'
    ]
  },

  hi: {
    tagline: '१००% ऑफलाइन डिजिटल बही-खाता एवं वॉयस असिस्टेंट',
    appTitle: 'सहायक',
    appSubtitle: 'ऑफलाइन वॉयस बिलिंग और किराना स्टोर POS',
    offlineBadge: '१००% ऑफलाइन',
    storeOpenBadge: 'दुकान खुली है',
    greetingMorning: 'शुभ प्रभात सेठ जी! आज का बिलिंग और गल्ला संभालने को तैयार हूँ।',
    greetingAfternoon: 'नमस्ते सेठ जी! चलिए दुकान का हिसाब-किताब आगे बढ़ाते हैं।',
    greetingEvening: 'शुभ संध्या सेठ जी! चलिए आज का गल्ला और बही-खाता मिलाते हैं।',
    assistantStatus: 'सहायक वॉयस टर्मिनल • सुनने को तैयार',
    micTapToSpeak: 'बोलने के लिए दबाएं',
    micListening: 'ध्यान से सुन रहा हूँ...',
    micProcessing: 'खाते में दर्ज कर रहा हूँ...',
    micDone: 'खाते में दर्ज हुआ ✓',
    micSpeakNow: 'अब साफ़ आवाज़ में बोलें...',
    micTryAgain: 'पुनः प्रयास करें',
    textFallbackLabel: 'या लिखकर आदेश दें:',
    textFallbackPlaceholder: 'उदा. २० किलो चावल १२०० में बिका या २० बोतल पानी जोड़ो',
    runCommand: 'खाते में दर्ज करें',
    suggestedCommandsTitle: 'इस तरह बोलें या दबाकर देखें:',
    viewCards: 'टाइल्स व्यू',
    viewTable: 'रजिस्टर व्यू',
    fastBillingBtn: '⚡ तुरंत बिक्री',
    quickActions: {
      addStock: 'स्टॉक जोड़ें',
      recordSale: 'बिक्री दर्ज करें',
      checkStock: 'स्टॉक जांचें',
      checkEarnings: 'कमाई देखें',
      lowStock: 'कम स्टॉक'
    },
    nav: {
      allOverview: 'दुकान काउंटर',
      voiceBilling: 'वॉयस टर्मिनल',
      stockLedger: 'दुकान का माल',
      salesLedger: 'दैनिक बही-खाता',
      storeActivity: 'लाइव हिसाब'
    },
    stats: {
      totalItems: 'दुकान का कुल सामान',
      todaysSales: 'आज की कुल बिक्री',
      inventoryValue: 'कुल स्टॉक का मूल्य',
      lowStock: 'कम स्टॉक चेतावनी',
      productsUnit: 'उत्पाद',
      transactionsLabel: 'लेनदेन',
      currentStockLabel: 'दुकान का स्टॉक',
      attentionLabel: 'स्टॉक की स्थिति',
      itemsUnit: 'सामान',
      activeCatalog: 'सक्रिय सामान',
      reorderNeeded: 'ऑर्डर जरूरी',
      goodStock: 'स्टॉक पर्याप्त',
      todayGalla: 'आज की कुल नकद कमाई'
    },
    inventory: {
      title: 'दुकान का माल एवं स्टॉक रजिस्टर',
      subtitle: 'वास्तविक समय स्टॉक, भाव और आसान +१ / -१ काउंटर बटन',
      addProduct: '+ नया सामान',
      searchPlaceholder: 'सामान का नाम या देसी नाम खोजें...',
      filterAll: 'सभी सामान',
      filterLowStock: '⚠️ कम स्टॉक',
      filterInStock: '✓ उपलब्ध स्टॉक',
      colProduct: 'सामान का नाम',
      colQuantity: 'स्टॉक मात्रा',
      colUnit: 'इकाई',
      colPrice: 'भाव / इकाई',
      colValue: 'कुल मूल्य',
      colStatus: 'स्थिति',
      colActions: 'कार्रवाई',
      statusInStock: 'उपलब्ध',
      statusLowStock: 'कम स्टॉक',
      noProducts: 'दुकान में अभी कोई सामान नहीं है। नया सामान जोड़ने के लिए "+ नया सामान" दबाएं।',
      editTooltip: 'विवरण बदलें',
      deleteTooltip: 'सामान हटाएं',
      quickAddTooltip: '१ इकाई जोड़ें',
      quickDeductTooltip: '१ इकाई घटाएं'
    },
    sales: {
      title: 'दैनिक बही-खाता एवं बिक्री रजिस्टर',
      subtitle: 'दर्ज लेनदेन, समय, नकद राशि और दैनिक गल्ला',
      todaysEarningsTitle: 'आज का गल्ला (नकद कलेक्शन)',
      recordSaleBtn: '+ बिक्री दर्ज करें',
      searchPlaceholder: 'बिक्री रिकॉर्ड खोजें...',
      colTime: 'समय',
      colProduct: 'बिका सामान',
      colQty: 'मात्रा',
      colAmount: 'बिक्री राशि',
      colType: 'प्रकार',
      noSales: 'आज अभी तक कोई बिक्री दर्ज नहीं हुई है।',
      cumulativeSales: 'कुल संचयी बिक्री',
      todayBadge: 'आज'
    },
    activity: {
      title: 'दुकान की लाइव गतिविधि',
      subtitle: 'स्टॉक अपडेट, बिक्री और जांच की लाइव टाइमलाइन',
      liveLog: 'लाइव लॉग',
      noActivity: 'कोई हालिया गतिविधि नहीं।',
      justNow: 'अभी-अभी',
      minAgo: 'मिनट पहले',
      hrAgo: 'घंटे पहले',
      daysAgo: 'दिन पहले'
    },
    modals: {
      addNewProduct: 'दुकान में नया सामान जोड़ें',
      editProduct: 'सामान का विवरण बदलें',
      recordSaleTitle: 'बही-खाते में बिक्री दर्ज करें',
      productNameEn: 'सामान का नाम (अंग्रेज़ी) *',
      productNameRegional: 'हिंदी / देसी नाम (वैकल्पिक)',
      initialStock: 'प्रारंभिक स्टॉक मात्रा *',
      currentStock: 'वर्तमान स्टॉक मात्रा *',
      unit: 'इकाई (Unit) *',
      pricePerUnit: 'भाव प्रति इकाई (₹) *',
      lowStockAlert: 'कम स्टॉक अलर्ट सीमा',
      cancel: 'रद्द करें',
      saveProduct: 'कैटलॉग में सहेजें',
      updateProduct: 'बदलाव सहेजें',
      selectProduct: 'सामान चुनें *',
      soldQuantity: 'बिक्री मात्रा *',
      totalSaleAmount: 'कुल नकद राशि (₹) *',
      recordSaleSubmit: 'खाते में दर्ज करें',
      validQuantityError: 'कृपया मान्य मात्रा दर्ज करें।',
      insufficientStockError: 'दुकान में पर्याप्त सामान उपलब्ध नहीं है!'
    },
    settings: {
      title: 'दुकान प्रोफ़ाइल एवं सेटिंग्स',
      langSection: 'मुख्य वॉयस एवं भाषा',
      thresholdTitle: 'कम स्टॉक चेतावनी सीमा',
      thresholdDesc: 'इस संख्या से कम स्टॉक होने पर चेतावनी दिखाई जाएगी',
      voiceConfirmation: 'वॉयस ऑडियो पुष्टिकरण (TTS)',
      voiceDesc: 'बिक्री या स्टॉक दर्ज करने के बाद बोलकर पुष्टि करेगा',
      demoMode: 'डेमो किराना स्टोर',
      demoDesc: 'परीक्षण के लिए किराना सामान का डेमो डेटा लोड करें',
      dbManagement: 'डेटाबेस एवं डिजिटल तिजोरी',
      resetDemo: 'डेमो स्टोर रीसेट करें',
      exportBackup: 'स्टोर बैकअप डाउनलोड करें (JSON)',
      clearAll: 'सारा डेटा साफ़ करें',
      clearWarning: 'यह डिवाइस से दुकान का सारा डेटा हमेशा के लिए हटा देगा।',
      confirmClear: 'हाँ, सारा डेटा साफ़ करें',
      saveChanges: 'सेटिंग्स सहेजें'
    },
    offlinePanel: {
      title: '१००% निजी और पूर्णतः ऑफलाइन डिजिटल तिजोरी',
      subtitle: 'पूरी तरह आपके ब्राउज़र में चलता है। किसी इंटरनेट या सर्वर की आवश्यकता नहीं।',
      badge: 'इंटरनेट रहित सुरक्षित',
      feat1Title: 'लोकल IndexedDB तिजोरी',
      feat1Desc: 'सभी उत्पाद, स्टॉक लॉग और बिक्री रिकॉर्ड सुरक्षित रूप से आपके डिवाइस पर रहते हैं।',
      feat2Title: 'डिवाइस स्पीच इंजन',
      feat2Desc: 'आवाज की पहचान और बोलने की क्षमता स्थानीय ब्राउज़र तकनीक द्वारा चलती है।',
      feat3Title: 'बिना रुकावट तुरंत बिलिंग',
      feat3Desc: 'नेटवर्क न होने पर भी आवाज से तुरंत स्टॉक और बिक्री दर्ज होती है।'
    },
    conversation: {
      you: 'व्यापारी',
      assistant: 'सहायक AI',
      spokenResponseLabel: 'बोला गया उत्तर:',
      replayVoice: 'आवाज दोबारा सुनें',
      errorApology: 'मुझे ठीक से समझ नहीं आया। कृपया "२० बोतल पानी का स्टॉक डालो" या "आज की कमाई दिखाओ" बोलकर देखें।'
    },
    auth: {
        "loginTitle": "दुकानदार लॉगिन",
        "loginSubtitle": "ऑफ़लाइन अपने स्टोर का खाता और स्टॉक प्रबंधित करें",
        "signUpTitle": "नई दुकान रजिस्टर करें",
        "signUpSubtitle": "१० सेकंड में अपना किराना स्टोर शुरू करें",
        "emailLabel": "ईमेल पता (लॉगिन और बिल के लिए)",
        "emailPlaceholder": "जैसे store@gmail.com",
        "phoneOrNameLabel": "ईमेल पता या मोबाइल नंबर",
        "phoneOrNamePlaceholder": "जैसे store@gmail.com या 9876543210",
        "pinLabel": "४-अंकों का सुरक्षा पिन (PIN)",
        "pinPlaceholder": "४ अंकों का पिन दर्ज करें (डिफ़ॉल्ट: 1234)",
        "ownerNameLabel": "दुकानदार का नाम",
        "ownerNamePlaceholder": "जैसे रमेश कुमार",
        "shopNameLabel": "दुकान का नाम",
        "shopNamePlaceholder": "जैसे रमेश किराना एवं जनरल स्टोर",
        "categoryLabel": "दुकान का प्रकार",
        "categoryPlaceholder": "किराना / जनरल स्टोर / डेयरी",
        "loginBtn": "दुकान में लॉगिन करें",
        "signUpBtn": "दुकान रजिस्टर करें",
        "switchTabLogin": "लॉगिन करें",
        "switchTabSignUp": "नया खाता बनाएं",
        "demoProfilesTitle": "१-क्लिक डेमो प्रोफाइल (जजों और टेस्टिंग के लिए)",
        "demoProfilesDesc": "बिना पासवर्ड टाइप किए तुरंत दुकानदार प्रोफाइल बदलें",
        "switchAccount": "दुकान बदलें",
        "logout": "लॉगआउट",
        "profileTitle": "दुकान प्रोफाइल",
        "currentShop": "सक्रिय दुकान",
        "loggedInAs": "लॉगिन किया गया:"
    },
    wholesale: {
        "title": "व्हाट्सएप से होलसेल ऑर्डर",
        "subtitle": "कम स्टॉक वाले सामान का ऑर्डर सप्लायर को १-क्लिक में भेजें",
        "distributorLabel": "होलसेलर / सप्लायर का नाम",
        "distributorPhoneLabel": "व्हाट्सएप मोबाइल नंबर",
        "selectDistributorPlaceholder": "सप्लायर चुनें या नाम लिखें...",
        "orderItemsTitle": "ऑर्डर किए जाने वाले सामान",
        "noLowStockMessage": "कोई भी सामान कम नहीं है! आप नीचे से नया सामान जोड़ सकते हैं।",
        "addItemBtn": "+ ऑर्डर में सामान जोड़ें",
        "selectProductPlaceholder": "सामान चुनें...",
        "orderQtyLabel": "मंगवाने की मात्रा",
        "currentStockLabel": "दुकान में स्टॉक",
        "notesLabel": "डिलीवरी निर्देश / नोट",
        "notesPlaceholder": "जैसे आज शाम ४ बजे तक दुकान पर पहुंचाएं...",
        "previewTitle": "व्हाट्सएप संदेश पूर्वावलोकन",
        "sendWhatsAppBtn": "व्हाट्सएप पर ऑर्डर भेजें",
        "copyTextBtn": "ऑर्डर टेक्स्ट कॉपी करें",
        "copiedSuccess": "ऑर्डर टेक्स्ट कॉपी हो गया!",
        "urgentBadge": "कम स्टॉक"
    },


    suggestions: [
      '२० किलो चावल १२०० में बिका',
      '३ बोतल पानी ९० में बेचा',
      '२० बोतल पानी का स्टॉक डालो',
      'पानी का कितना स्टॉक बचा है',
      'आज की कुल कमाई कितनी है',
      'कम स्टॉक'
    ]
  },

  mr: {
    tagline: '१००% ऑफलाइन व्यवसाय सहाय्यक आणि डिजिटल वही-खाते',
    appTitle: 'सहायक',
    appSubtitle: 'ऑफलाइन व्हॉईस बिलिंग आणि किराणा दुकान POS',
    offlineBadge: '१००% ऑफलाइन',
    storeOpenBadge: 'दुकान सुरू आहे',
    greetingMorning: 'शुभ सकाळ शेठजी! आजचे बिलिंग आणि साठा सांभाळण्यासाठी सज्ज आहे.',
    greetingAfternoon: 'शुभ दुपार शेठजी! चला दुकानाचे हिशोब पुढे नेऊया.',
    greetingEvening: 'शुभ संध्याकाळ शेठजी! चला आजचा गल्ला आणि वही-खाते जुळवूया.',
    assistantStatus: 'सहायक व्हॉईस टर्मिनल • ऐकण्यासाठी सज्ज',
    micTapToSpeak: 'बोलण्यासाठी दाबा',
    micListening: 'ऐकत आहे...',
    micProcessing: 'खात्यात नोंद होत आहे...',
    micDone: 'खात्यात नोंद झाली ✓',
    micSpeakNow: 'आता स्पष्ट बोला...',
    micTryAgain: 'पुन्हा प्रयत्न करा',
    textFallbackLabel: 'किंवा लिहून आज्ञा द्या:',
    textFallbackPlaceholder: 'उदा. २० किलो तांदूळ १२०० मध्ये विकले किंवा २० बाटल्या पाणी जोडा',
    runCommand: 'नोंद करा',
    suggestedCommandsTitle: 'असे बोला किंवा दाबून पहा:',
    viewCards: 'टाइल्स व्ह्यू',
    viewTable: 'रजिस्टर व्ह्यू',
    fastBillingBtn: '⚡ जलद विक्री',
    quickActions: {
      addStock: 'साठा जोडा',
      recordSale: 'विक्री नोंदवा',
      checkStock: 'साठा तपासा',
      checkEarnings: 'कमाई तपासा',
      lowStock: 'कमी साठा'
    },
    nav: {
      allOverview: 'दुकान काउंटर',
      voiceBilling: 'व्हॉईस टर्मिनल',
      stockLedger: 'दुकान साठा',
      salesLedger: 'दैनिक वही-खाते',
      storeActivity: 'थेट घडामोडी'
    },
    stats: {
      totalItems: 'एकूण उत्पादने',
      todaysSales: 'आजची एकूण विक्री',
      inventoryValue: 'साठ्याचे मूल्य',
      lowStock: 'कमी साठा इशारा',
      productsUnit: 'उत्पादने',
      transactionsLabel: 'व्यवहार',
      currentStockLabel: 'दुकान साठा',
      attentionLabel: 'साठा स्थिती',
      itemsUnit: 'वस्तू',
      activeCatalog: 'सक्रिय यादी',
      reorderNeeded: 'मागणी आवश्यक',
      goodStock: 'साठा उत्तम',
      todayGalla: 'आजची एकूण रोख कमाई'
    },
    inventory: {
      title: 'दुकान साठा नोंदवही',
      subtitle: 'उत्पादने, युनिट्स, दर आणि प्रत्यक्ष साठा व्यवस्थापित करा',
      addProduct: '+ वस्तू जोडा',
      searchPlaceholder: 'नावाने किंवा प्रकाराने शोधा...',
      filterAll: 'सर्व उत्पादने',
      filterLowStock: '⚠️ कमी साठा',
      filterInStock: '✓ शिल्लक साठा',
      colProduct: 'उत्पादनाचे नाव',
      colQuantity: 'साठा प्रमाण',
      colUnit: 'युनिट',
      colPrice: 'दर / युनिट',
      colValue: 'एकूण मूल्य',
      colStatus: 'स्थिती',
      colActions: 'कृती',
      statusInStock: 'उपलब्ध',
      statusLowStock: 'कमी साठा',
      noProducts: 'कोणतेही उत्पादन सापडले नाही. नवीन जोडण्यासाठी "+ वस्तू जोडा" दाबा.',
      editTooltip: 'माहिती बदला',
      deleteTooltip: 'वस्तू हटवा',
      quickAddTooltip: '१ युनिट जोडा',
      quickDeductTooltip: '१ युनिट कमी करा'
    },
    sales: {
      title: 'दैनिक विक्री व वही-खाते',
      subtitle: 'नोंदवलेले व्यवहार, वेळ आणि दैनिक कमाईचा सारांश',
      todaysEarningsTitle: 'आजचा गल्ला (रोख रक्कम)',
      recordSaleBtn: '+ विक्री नोंदवा',
      searchPlaceholder: 'विक्री नोंदी शोधा...',
      colTime: 'वेळ',
      colProduct: 'विकलेली वस्तू',
      colQty: 'प्रमाण',
      colAmount: 'विक्री रक्कम',
      colType: 'प्रकार',
      noSales: 'आज अजून कोणतीही विक्री झालेली नाही.',
      cumulativeSales: 'एकूण विक्री',
      todayBadge: 'आज'
    },
    activity: {
      title: 'दुकान घडामोडी टाइमलाइन',
      subtitle: 'साठा, विक्री व तपासणीचा थेट लॉग',
      liveLog: 'थेट लॉग',
      noActivity: 'कोणतीही ताजी नोंद नाही.',
      justNow: 'आत्ताच',
      minAgo: 'मि. पूर्वी',
      hrAgo: 'ता. पूर्वी',
      daysAgo: 'दिवसांपूर्वी'
    },
    modals: {
      addNewProduct: 'दुकानात नवीन वस्तू जोडा',
      editProduct: 'उत्पादनाची माहिती बदला',
      recordSaleTitle: 'विक्री व्यवहार नोंदवा',
      productNameEn: 'उत्पादनाचे नाव (इंग्रजी) *',
      productNameRegional: 'मराठी / स्थानिक नाव (पर्यायी)',
      initialStock: 'प्रारंभिक साठा *',
      currentStock: 'सध्याचा साठा *',
      unit: 'युनिट *',
      pricePerUnit: 'किंमत प्रति युनिट (₹) *',
      lowStockAlert: 'कमी साठा इशारा मर्यादा',
      cancel: 'रद्द करा',
      saveProduct: 'वस्तू जतन करा',
      updateProduct: 'बदल जतन करा',
      selectProduct: 'वस्तू निवडा *',
      soldQuantity: 'विक्री प्रमाण *',
      totalSaleAmount: 'एकूण विक्री रक्कम (₹) *',
      recordSaleSubmit: 'विक्री नोंदवा',
      validQuantityError: 'कृपया योग्य प्रमाण प्रविष्ट करा.',
      insufficientStockError: 'साठ्यामध्ये पुरेसा माल उपलब्ध नाही!'
    },
    settings: {
      title: 'दुकान सेटिंग्ज व स्थानिक मेमरी',
      langSection: 'मुख्य व्हॉईस व भाषा',
      thresholdTitle: 'कमी साठा इशारा मर्यादा',
      thresholdDesc: 'या संख्येपेक्षा कमी साठा झाल्यास इशारा दाखवला जाईल',
      voiceConfirmation: 'व्हॉईस ऑडिओ प्रतिसाद (TTS)',
      voiceDesc: 'नोंदी झाल्यावर आवाजाद्वारे पुष्टी करेल',
      demoMode: 'डेमो दुकान मोड',
      demoDesc: 'चाचणीसाठी किराणा मालाचा नमुना डेटा लोड करा',
      dbManagement: 'डेटाबेस आणि बॅकअप',
      resetDemo: 'डेमो डेटा रीसेट करा',
      exportBackup: 'डेटा बॅकअप डाउनलोड करा (JSON)',
      clearAll: 'सर्व डेटा पुसून टाका',
      clearWarning: 'या डिव्हाइसवरील सर्व दुकान नोंदी कायमच्या हटवल्या जातील.',
      confirmClear: 'होय, सर्व डेटा पुसा',
      saveChanges: 'सेटिंग्ज जतन करा'
    },
    offlinePanel: {
      title: '१००% खाजगी आणि संपूर्ण ऑफलाइन तंत्रज्ञान',
      subtitle: 'इंटरनेट किंवा सर्व्हरशिवाय थेट तुमच्या ब्राउझरमध्ये सुरक्षित कार्य करते.',
      badge: 'इंटरनेटशिवाय सुरक्षित',
      feat1Title: 'स्थानिक IndexedDB स्टोरेज',
      feat1Desc: 'सर्व उत्पादने व विक्री नोंदी तुमच्याच डिव्हाइसवर सुरक्षित राहतात.',
      feat2Title: 'ब्राउझर स्पीच इंजिन',
      feat2Desc: 'आवाज ओळखणे आणि बोलणे स्थानिक ब्राउझरद्वारे होते.',
      feat3Title: 'झटपट जलद बिलिंग',
      feat3Desc: 'नेटवर्क नसतानाही आवाजाद्वारे त्वरित साठा व विक्री नोंदवली जाते.'
    },
    conversation: {
      you: 'व्यापारी',
      assistant: 'सहायक AI',
      spokenResponseLabel: 'आवाजातील उत्तर:',
      replayVoice: 'आवाज पुन्हा ऐका',
      errorApology: 'मला नीट समजले नाही. कृपया "२० बाटल्या पाणी जोडा" किंवा "आजची कमाई किती" असे बोलून पहा.'
    },
    auth: {
        "loginTitle": "दुकानदार लॉगिन",
        "loginSubtitle": "ऑफलाइन आपल्या दुकानाचे खातेवही आणि साठा व्यवस्थापित करा",
        "signUpTitle": "नवीन दुकान नोंदणी",
        "signUpSubtitle": "१० सेकंदात आपले किराणा दुकान सुरू करा",
        "emailLabel": "ईमेल पत्ता (लॉगिन आणि बिलांसाठी)",
        "emailPlaceholder": "उदा. store@gmail.com",
        "phoneOrNameLabel": "ईमेल पत्ता किंवा मोबाईल नंबर",
        "phoneOrNamePlaceholder": "उदा. store@gmail.com किंवा 9876543210",
        "pinLabel": "४-अंकी सुरक्षा पिन (PIN)",
        "pinPlaceholder": "४ अंकी पिन टाका (डिफॉल्ट: 1234)",
        "ownerNameLabel": "दुकानदाराचे नाव",
        "ownerNamePlaceholder": "उदा. रमेश कुमार",
        "shopNameLabel": "दुकानाचे नाव",
        "shopNamePlaceholder": "उदा. रमेश किराणा स्टोअर",
        "categoryLabel": "दुकानाचा प्रकार",
        "categoryPlaceholder": "किराणा / जनरल स्टोअर",
        "loginBtn": "लॉगिन करा",
        "signUpBtn": "नोंदणी करा",
        "switchTabLogin": "लॉगिन",
        "switchTabSignUp": "नवीन नोंदणी",
        "demoProfilesTitle": "१-क्लिक डेमो प्रोफाइल्स",
        "demoProfilesDesc": "पासवर्डशिवाय त्वरित दुकानदार बदला",
        "switchAccount": "दुकान बदला",
        "logout": "लॉगआउट",
        "profileTitle": "दुकान प्रोफाइल",
        "currentShop": "सक्रिय दुकान",
        "loggedInAs": "लॉगिन:"
    },
    wholesale: {
        "title": "व्हॉट्सॲप होलसेल ऑर्डर",
        "subtitle": "कमी साठ्याचा ऑर्डर सप्लायरला १-क्लिकमध्ये पाठवा",
        "distributorLabel": "होलसेलर / पुरवठादाराचे नाव",
        "distributorPhoneLabel": "व्हॉट्सॲप मोबाईल नंबर",
        "selectDistributorPlaceholder": "पुरवठादार निवडा...",
        "orderItemsTitle": "ऑर्डर करावयाच्या वस्तू",
        "noLowStockMessage": "साठा पुरेसा आहे! आपण नवीन वस्तू जोडू शकता.",
        "addItemBtn": "+ ऑर्डरमध्ये वस्तू जोडा",
        "selectProductPlaceholder": "वस्तू निवडा...",
        "orderQtyLabel": "मागणी प्रमाण",
        "currentStockLabel": "सध्याचा साठा",
        "notesLabel": "सूचना / टीप",
        "notesPlaceholder": "उदा. आज संध्याकाळपर्यंत पाठवा...",
        "previewTitle": "व्हॉट्सॲप मेसेज प्रिव्ह्यू",
        "sendWhatsAppBtn": "व्हॉट्सॲपवर ऑर्डर पाठवा",
        "copyTextBtn": "ऑर्डर कॉपी करा",
        "copiedSuccess": "ऑर्डर कॉपी झाला!",
        "urgentBadge": "कमी साठा"
    },


    suggestions: [
      '२० किलो तांदूळ १२०० मध्ये विकले',
      '३ बाटल्या पाणी ९० मध्ये विकले',
      '२० बाटल्या पाणी जोडा',
      'पाणी किती शिल्लक आहे',
      'आजची कमाई किती झाली',
      'कमी साठा'
    ]
  },

  ta: {
    tagline: '100% ஆஃப்லைன் டிஜிட்டல் கணக்கு புத்தகம் & குரல் உதவியாளர்',
    appTitle: 'சஹாயக்',
    appSubtitle: 'ஆஃப்லைன் குரல் பில்லிங் & மளிகைக் கடை POS',
    offlineBadge: '100% ஆஃப்லைன்',
    storeOpenBadge: 'கடை திறந்துள்ளது',
    greetingMorning: 'காலை வணக்கம் அண்ணா! இன்றைய பில்லிங் மற்றும் இருப்புக்கு தயார்.',
    greetingAfternoon: 'மதிய வணக்கம்! கடை கணக்குகளைத் தொடர்வோம்.',
    greetingEvening: 'மாலை வணக்கம்! இன்றைய கல்லா மற்றும் கணக்குகளை முடிப்போம்.',
    assistantStatus: 'சஹாயக் குரல் முனையம் • கேட்க தயார்',
    micTapToSpeak: 'பேச தட்டவும்',
    micListening: 'கேட்கிறது...',
    micProcessing: 'செயலாக்குகிறது...',
    micDone: 'பதிவு செய்யப்பட்டது ✓',
    micSpeakNow: 'இப்போது பேசுங்கள்...',
    micTryAgain: 'மீண்டும் முயற்சிக்கவும்',
    textFallbackLabel: 'அல்லது கட்டளையை தட்டச்சு செய்யவும்:',
    textFallbackPlaceholder: 'எ.கா., 20 கிலோ அரிசி 1200க்கு விற்றது அல்லது 20 தண்ணீர் பாட்டில்கள் சேர்க்கவும்',
    runCommand: 'செயல்படுத்து',
    suggestedCommandsTitle: 'இவ்வாறு பேசுங்கள் அல்லது தட்டிப் பாருங்கள்:',
    viewCards: 'கார்டுகள்',
    viewTable: 'பட்டியல்',
    fastBillingBtn: '⚡ விரைவு விற்பனை',
    quickActions: {
      addStock: 'இருப்பு சேர்க்க',
      recordSale: 'விற்பனை பதிவு',
      checkStock: 'இருப்பு பார்க்க',
      checkEarnings: 'வருமானம் பார்க்க',
      lowStock: 'குறைந்த இருப்பு'
    },
    nav: {
      allOverview: 'கடை கவுண்டர்',
      voiceBilling: 'குரல் முனையம்',
      stockLedger: 'பொருட்கள் இருப்பு',
      salesLedger: 'தினசரி கணக்கு',
      storeActivity: 'கடை பதிவுகள்'
    },
    stats: {
      totalItems: 'மொத்த பொருட்கள்',
      todaysSales: 'இன்றைய விற்பனை',
      inventoryValue: 'இருப்பு மதிப்பு',
      lowStock: 'குறைந்த இருப்பு எச்சரிக்கை',
      productsUnit: 'பொருட்கள்',
      transactionsLabel: 'பரிவர்த்தனைகள்',
      currentStockLabel: 'கடை இருப்பு',
      attentionLabel: 'இருப்பு நிலை',
      itemsUnit: 'பொருட்கள்',
      activeCatalog: 'செயலில் உள்ள பட்டியல்',
      reorderNeeded: 'ஆர்டர் தேவை',
      goodStock: 'இருப்பு போதுமானது',
      todayGalla: 'இன்றைய மொத்த ரொக்கம்'
    },
    inventory: {
      title: 'கடை இருப்பு பதிவேடு',
      subtitle: 'பொருட்கள், அலகுகள், விலைகள் மற்றும் நேரடி இருப்பை நிர்வகிக்கவும்',
      addProduct: '+ புதிய பொருள்',
      searchPlaceholder: 'பெயர் அல்லது வகை மூலம் தேடவும்...',
      filterAll: 'அனைத்து பொருட்கள்',
      filterLowStock: '⚠️ குறைந்த இருப்பு',
      filterInStock: '✓ போதுமான இருப்பு',
      colProduct: 'பொருளின் பெயர்',
      colQuantity: 'இருப்பு அளவு',
      colUnit: 'அலகு',
      colPrice: 'விலை / அலகு',
      colValue: 'மொத்த மதிப்பு',
      colStatus: 'நிலை',
      colActions: 'செயல்கள்',
      statusInStock: 'இருப்பு உள்ளது',
      statusLowStock: 'குறைவான இருப்பு',
      noProducts: 'எந்தப் பொருளும் இல்லை. "+ புதிய பொருள்" தட்டவும்.',
      editTooltip: 'திருத்து',
      deleteTooltip: 'நீக்கு',
      quickAddTooltip: '1 அலகு சேர்',
      quickDeductTooltip: '1 அலகு குறை'
    },
    sales: {
      title: 'தினசரி விற்பனை கணக்கு பதிவேடு',
      subtitle: 'பதிவு செய்யப்பட்ட விற்பனைகள், நேரம் மற்றும் தினசரி வருமானம்',
      todaysEarningsTitle: 'இன்றைய கல்லா (ரொக்கம்)',
      recordSaleBtn: '+ விற்பனை பதிவு',
      searchPlaceholder: 'விற்பனை பதிவுகளைத் தேடுங்கள்...',
      colTime: 'நேரம்',
      colProduct: 'விற்ற பொருள்',
      colQty: 'அளவு',
      colAmount: 'விற்பனைத் தொகை',
      colType: 'வகை',
      noSales: 'இன்று இதுவரை விற்பனை எதுவும் பதிவு செய்யப்படவில்லை.',
      cumulativeSales: 'மொத்த விற்பனை',
      todayBadge: 'இன்று'
    },
    activity: {
      title: 'கடை செயல்பாடு காலவரிசை',
      subtitle: 'இருப்பு மற்றும் விற்பனை மாற்றங்களின் நேரடி பதிவு',
      liveLog: 'நேரடி பதிவு',
      noActivity: 'சமீபத்திய செயல்பாடு இல்லை.',
      justNow: 'சற்று முன்',
      minAgo: 'நிமிடம் முன்',
      hrAgo: 'மணி முன்',
      daysAgo: 'நாட்கள் முன்'
    },
    modals: {
      addNewProduct: 'புதிய பொருளை சேர்க்கவும்',
      editProduct: 'பொருள் தகவலை மாற்றவும்',
      recordSaleTitle: 'விற்பனை பரிவர்த்தனையை பதிவு செய்யவும்',
      productNameEn: 'பொருளின் பெயர் (ஆங்கிலம்) *',
      productNameRegional: 'தமிழ் / உள்ளூர் பெயர் (விருப்பத்திற்குரியது)',
      initialStock: 'தொடக்க இருப்பு அளவு *',
      currentStock: 'தற்போதைய இருப்பு *',
      unit: 'அலகு *',
      pricePerUnit: 'அலகு விலை (₹) *',
      lowStockAlert: 'குறைந்த இருப்பு எச்சரிக்கை வரம்பு',
      cancel: 'ரத்து செய்',
      saveProduct: 'பொருளை சேமி',
      updateProduct: 'புதுப்பிக்கவும்',
      selectProduct: 'பொருளைத் தேர்ந்தெடுக்கவும் *',
      soldQuantity: 'விற்ற அளவு *',
      totalSaleAmount: 'மொத்த விற்பனைத் தொகை (₹) *',
      recordSaleSubmit: 'விற்பனை பதிவு செய்',
      validQuantityError: 'சரியான அளவை உள்ளிடவும்.',
      insufficientStockError: 'இருப்பில் போதுமான அளவு இல்லை!'
    },
    settings: {
      title: 'கடை அமைப்புகள் மற்றும் உள்ளமைவு சேமிப்பு',
      langSection: 'முதன்மை குரல் மற்றும் மொழி',
      thresholdTitle: 'குறைந்த இருப்பு எச்சரிக்கை வரம்பு',
      thresholdDesc: 'இந்த அளவுக்கு குறைவாக இருந்தால் எச்சரிக்கை காட்டப்படும்',
      voiceConfirmation: 'குரல் ஆடியோ பின்னூட்டம் (TTS)',
      voiceDesc: 'விற்பனை அல்லது இருப்பு மாற்றங்களை குரல் மூலம் உறுதிப்படுத்தும்',
      demoMode: 'மாதிரி கடை பயன்முறை',
      demoDesc: 'சோதனைக்காக மாதிரி மளிகைப் பொருட்களை ஏற்றவும்',
      dbManagement: 'தரவுத்தளம் மற்றும் காப்புப்பிரதி',
      resetDemo: 'மாதிரி தரவை மீட்டமை',
      exportBackup: 'காப்புப்பிரதி பதிவிறக்கு (JSON)',
      clearAll: 'அனைத்து தரவையும் அழிக்கவும்',
      clearWarning: 'இது இந்த சாதனத்திலிருந்து அனைத்து பதிவுகளையும் நிரந்தரமாக நீக்கும்.',
      confirmClear: 'ஆம், அனைத்தையும் அழி',
      saveChanges: 'அமைப்புகளைச் சேமி'
    },
    offlinePanel: {
      title: '100% பாதுகாப்பான மற்றும் முழுமையான ஆஃப்லைன் தொழில்நுட்பம்',
      subtitle: 'முழுமையாக உங்கள் உலாவியிலேயே இயங்குகிறது. இணையம் தேவையில்லை.',
      badge: 'இணையம் தேவையில்லை',
      feat1Title: 'உள்ளூர் IndexedDB சேமிப்பு',
      feat1Desc: 'அனைத்து பொருட்களும் உங்கள் சாதனத்திலேயே பாதுகாப்பாக இருக்கும்.',
      feat2Title: 'உலவி குரல் இயந்திரம்',
      feat2Desc: 'குரல் அறிதல் மற்றும் பேச்சு உலாவி மூலம் நேரடியாக நடைபெறுகிறது.',
      feat3Title: 'விரைவான தாமதமில்லா பில்லிங்',
      feat3Desc: 'நெட்வொர்க் இல்லாமலும் குரல் மூலம் உடனுக்குடன் கணக்கு பதிவாகிறது.'
    },
    conversation: {
      you: 'வணிகர்',
      assistant: 'சஹாயக் AI',
      spokenResponseLabel: 'குரல் பதில்:',
      replayVoice: 'குரலை மீண்டும் கேட்க',
      errorApology: 'எனக்கு சரியாகப் புரியவில்லை. தயவுசெய்து "20 தண்ணீர் பாட்டில்கள் சேர்க்கவும்" என்று சொல்லுங்கள்.'
    },
    auth: {
        "loginTitle": "கடைக்காரர் உள்நுழைவு",
        "loginSubtitle": "ஆஃப்லைனில் உங்கள் கணக்கு மற்றும் இருப்பை நிர்வகிக்கவும்",
        "signUpTitle": "புதிய கடை பதிவு",
        "signUpSubtitle": "10 வினாடிகளில் உங்கள் மளிகைக் கடையைத் தொடங்குங்கள்",
        "emailLabel": "மின்னஞ்சல் முகவரி (உள்நுழைவு மற்றும் பில்களுக்கு)",
        "emailPlaceholder": "எ.கா. store@gmail.com",
        "phoneOrNameLabel": "மின்னஞ்சல் முகவரி அல்லது தொலைபேசி எண்",
        "phoneOrNamePlaceholder": "எ.கா. store@gmail.com அல்லது 9765432109",
        "pinLabel": "4-இலக்க பாதுகாப்பு பின் (PIN)",
        "pinPlaceholder": "4-இலக்க பின்னை உள்ளிடவும் (இயல்புநிலை: 1234)",
        "ownerNameLabel": "உரிமையாளர் பெயர்",
        "ownerNamePlaceholder": "எ.கா. எஸ். முருகன்",
        "shopNameLabel": "கடையின் பெயர்",
        "shopNamePlaceholder": "எ.கா. முருகன் மளிகைக் கடை",
        "categoryLabel": "வணிக வகை",
        "categoryPlaceholder": "மளிகை / மொத்த & சில்லறை",
        "loginBtn": "உள்நுழைக",
        "signUpBtn": "பதிவு செய்க",
        "switchTabLogin": "உள்நுழைவு",
        "switchTabSignUp": "புதிய பதிவு",
        "demoProfilesTitle": "1-கிளிக் டெமோ சுயவிவரங்கள்",
        "demoProfilesDesc": "கடவுச்சொல் இல்லாமல் உடனடியாக மாற்றவும்",
        "switchAccount": "கடை மாற்றுக",
        "logout": "வெளியேறு",
        "profileTitle": "கடை சுயவிவரம்",
        "currentShop": "செயலில் உள்ள கடை",
        "loggedInAs": "உள்நுழைந்தவர்:"
    },
    wholesale: {
        "title": "வாட்ஸ்அப் மொத்த ஆர்டர்",
        "subtitle": "குறைந்த இருப்பு பொருட்களை சப்ளையருக்கு 1-கிளிக்கில் ஆர்டர் செய்க",
        "distributorLabel": "மொத்த வியாபாரி பெயர்",
        "distributorPhoneLabel": "வாட்ஸ்அப் மொபைல் எண்",
        "selectDistributorPlaceholder": "சப்ளையரைத் தேர்வு செய்க...",
        "orderItemsTitle": "ஆர்டர் பொருட்கள்",
        "noLowStockMessage": "இருப்பு போதுமானது! நீங்கள் கைமுறையாக பொருட்களைச் சேர்க்கலாம்.",
        "addItemBtn": "+ பொருளைச் சேர்க்கவும்",
        "selectProductPlaceholder": "பொருளைத் தேர்ந்தெடுக்கவும்...",
        "orderQtyLabel": "தேவையான அளவு",
        "currentStockLabel": "தற்போதைய இருப்பு",
        "notesLabel": "குறிப்பு",
        "notesPlaceholder": "எ.கா. இன்று மாலைக்குள் டெலிவரி செய்க...",
        "previewTitle": "வாட்ஸ்அப் செய்தி முன்னோட்டம்",
        "sendWhatsAppBtn": "வாட்ஸ்அப்பில் ஆர்டர் அனுப்புக",
        "copyTextBtn": "உரையை நகலெடு",
        "copiedSuccess": "நகலெடுக்கப்பட்டது!",
        "urgentBadge": "குறைந்த இருப்பு"
    },


    suggestions: [
      '20 கிலோ அரிசி 1200க்கு விற்றது',
      '3 தண்ணீர் பாட்டில்கள் 90க்கு விற்றது',
      '20 தண்ணீர் பாட்டில்கள் சேர்க்கவும்',
      'தண்ணீர் இருப்பு எவ்வளவு உள்ளது',
      'இன்றைய வருமானம் என்ன',
      'குறைந்த இருப்பு'
    ]
  },

  te: {
    tagline: '100% ఆఫ్‌లైన్ డిజిటల్ ఖాతా పుస్తకం & వాయిస్ అసిస్టెంట్',
    appTitle: 'సహాయక్',
    appSubtitle: 'ఆఫ్‌లైన్ వాయిస్ బిల్లింగ్ & కిరాణా స్టోర్ POS',
    offlineBadge: '100% ఆఫ్‌లైన్',
    storeOpenBadge: 'దుకాణం తెరిచి ఉంది',
    greetingMorning: 'శుభోదయం సేఠ్ జీ! నేటి బిల్లింగ్ మరియు స్టాక్ కోసం సిద్ధంగా ఉన్నాను.',
    greetingAfternoon: 'నమస్కారం! దుకాణ ఖాతాలను కొనసాగిద్దాం.',
    greetingEvening: 'శుభ సాయంత్రం! నేటి గల్లా మరియు లెక్కలను ముగిద్దాం.',
    assistantStatus: 'సహాయక్ వాయిస్ టెర్మినల్ • వినడానికి సిద్ధం',
    micTapToSpeak: 'మాట్లాడటానికి నొక్కండి',
    micListening: 'వింటున్నాను...',
    micProcessing: 'ప్రాసెస్ అవుతోంది...',
    micDone: 'నమోదైంది ✓',
    micSpeakNow: 'ఇప్పుడు మాట్లాడండి...',
    micTryAgain: 'మళ్ళీ ప్రయత్నించండి',
    textFallbackLabel: 'లేదా టైప్ చేసి ఆదేశించండి:',
    textFallbackPlaceholder: 'ఉదా., 20 కిలోల బియ్యం 1200కు అమ్మాము లేదా 20 నీళ్ల బాటిళ్లు జోడించు',
    runCommand: 'నమోదు చేయి',
    suggestedCommandsTitle: 'ఇలా చెప్పండి లేదా నొక్కి చూడండి:',
    viewCards: 'కార్డుల వీక్షణ',
    viewTable: 'రిజిస్టర్ వీక్షణ',
    fastBillingBtn: '⚡ త్వరిత అమ్మకం',
    quickActions: {
      addStock: 'స్టాక్ జోడించు',
      recordSale: 'అమ్మకం నమోదు',
      checkStock: 'స్టాక్ చూడు',
      checkEarnings: 'సంపాదన చూడు',
      lowStock: 'తక్కువ స్టాక్'
    },
    nav: {
      allOverview: 'దుకాణం కౌంటర్',
      voiceBilling: 'వాయిస్ టెర్మినల్',
      stockLedger: 'స్టాక్ ఇన్వెంటరీ',
      salesLedger: 'రోజువారీ ఖాతా',
      storeActivity: 'ప్రత్యక్ష లావాదేవీలు'
    },
    stats: {
      totalItems: 'మొత్తం ఉత్పత్తులు',
      todaysSales: 'నేటి అమ్మకాలు',
      inventoryValue: 'స్టాక్ విలువ',
      lowStock: 'తక్కువ స్టాక్ హెచ్చరిక',
      productsUnit: 'ఉత్పత్తులు',
      transactionsLabel: 'లావాదేవీలు',
      currentStockLabel: 'దుకాణ స్టాక్',
      attentionLabel: 'స్టాక్ స్థితి',
      itemsUnit: 'వస్తువులు',
      activeCatalog: 'యాక్టివ్ లిస్ట్',
      reorderNeeded: 'ఆర్డర్ అవసరం',
      goodStock: 'స్టాక్ బాగుంది',
      todayGalla: 'నేటి మొత్తం నగదు రాబడి'
    },
    inventory: {
      title: 'దుకాణ స్టాక్ రిజిస్టర్',
      subtitle: 'వస్తువులు, యూనిట్లు, ధరలు మరియు నిజ-సమయ స్టాక్ నిర్వహణ',
      addProduct: '+ కొత్త వస్తువు',
      searchPlaceholder: 'పేరు లేదా రకం ద్వారా వెతకండి...',
      filterAll: 'అన్ని ఉత్పత్తులు',
      filterLowStock: '⚠️ తక్కువ స్టాక్',
      filterInStock: '✓ తగినంత స్టాక్',
      colProduct: 'ఉత్పత్తి పేరు',
      colQuantity: 'స్టాక్ పరిమాణం',
      colUnit: 'యూనిట్',
      colPrice: 'ధర / యూనిట్',
      colValue: 'మొత్తం విలువ',
      colStatus: 'స్థితి',
      colActions: 'చర్యలు',
      statusInStock: 'అందుబాటులో ఉంది',
      statusLowStock: 'తక్కువ స్టాక్',
      noProducts: 'ఉత్పత్తులు ఏవీ లేవు. "+ కొత్త వస్తువు" నొక్కండి.',
      editTooltip: 'సవరించు',
      deleteTooltip: 'తొలగించు',
      quickAddTooltip: '1 యూనిట్ జోడించు',
      quickDeductTooltip: '1 యూనిట్ తగ్గించు'
    },
    sales: {
      title: 'రోజువారీ అమ్మకాల ఖాతా రిజిస్టర్',
      subtitle: 'నమోదైన లావాదేవీలు, సమయం మరియు రోజువారీ రాబడి సారాంశం',
      todaysEarningsTitle: 'నేటి మొత్తం అమ్మకాలు (నగదు సేకరణ)',
      recordSaleBtn: '+ అమ్మకం నమోదు చేయి',
      searchPlaceholder: 'అమ్మకాల రికార్డులను వెతకండి...',
      colTime: 'సమయం',
      colProduct: 'అమ్మిన వస్తువు',
      colQty: 'పరిమాణం',
      colAmount: 'అమ్మకం మొత్తం',
      colType: 'రకం',
      noSales: 'ఈరోజు ఇంకా ఎటువంటి అమ్మకాలు నమోదు కాలేదు.',
      cumulativeSales: 'మొత్తం అమ్మకాలు',
      todayBadge: 'ఈరోజు'
    },
    activity: {
      title: 'దుకాణ కార్యకలాపాల కాలక్రమం',
      subtitle: 'స్టాక్ మార్పులు మరియు అమ్మకాల ప్రత్యక్ష రికార్డు',
      liveLog: 'లైవ్ లాగ్',
      noActivity: 'ఇటీవలి కార్యకలాపాలు లేవు.',
      justNow: 'ఇప్పుడే',
      minAgo: 'నిమి. క్రితం',
      hrAgo: 'గంటల క్రితం',
      daysAgo: 'రోజుల క్రితం'
    },
    modals: {
      addNewProduct: 'కొత్త ఉత్పత్తిని జోడించండి',
      editProduct: 'ఉత్పత్తి వివరాలను మార్చండి',
      recordSaleTitle: 'అమ్మకం లావాదేవీని నమోదు చేయండి',
      productNameEn: 'ఉత్పత్తి పేరు (ఇంగ్లీష్) *',
      productNameRegional: 'తెలుగు / స్థానిక పేరు (ఐచ్ఛికం)',
      initialStock: 'ప్రారంభ స్టాక్ పరిమాణం *',
      currentStock: 'ప్రస్తుత స్టాక్ *',
      unit: 'యూనిట్ *',
      pricePerUnit: 'యూనిట్ ధర (₹) *',
      lowStockAlert: 'తక్కువ స్టాక్ హెచ్చరిక పరిమితి',
      cancel: 'రద్దు చేయి',
      saveProduct: 'ఉత్పత్తిని సేవ్ చేయి',
      updateProduct: 'నవీకరించు',
      selectProduct: 'ఉత్పత్తిని ఎంచుకోండి *',
      soldQuantity: 'అమ్మిన పరిమాణం *',
      totalSaleAmount: 'మొత్తం అమ్మకం మొత్తం (₹) *',
      recordSaleSubmit: 'అమ్మకం నమోదు చేయి',
      validQuantityError: 'దయచేసి సరైన పరిమాణాన్ని నమోదు చేయండి.',
      insufficientStockError: 'స్టాక్‌లో సరిపడా సరుకు లేదు!'
    },
    settings: {
      title: 'దుకాణ సెట్టింగ్‌లు & స్థానిక నిల్వ',
      langSection: 'ప్రధాన వాయిస్ & భాష',
      thresholdTitle: 'తక్కువ స్టాక్ హెచ్చరిక పరిమితి',
      thresholdDesc: 'ఈ పరిమాణం కంటే తగ్గితే హెచ్చరిక చూపబడుతుంది',
      voiceConfirmation: 'వాయిస్ ఆడియో నిర్ధారణ (TTS)',
      voiceDesc: 'అమ్మకం లేదా స్టాక్ నమోదయ్యాక వాయిస్ ద్వారా నిర్ధారిస్తుంది',
      demoMode: 'డెమో స్టోర్ మోడ్',
      demoDesc: 'పరీక్ష కోసం డెమో కిరాణా సరుకులను లోడ్ చేయండి',
      dbManagement: 'డేటాబేస్ & బ్యాకప్',
      resetDemo: 'డెమో డేటాను రీసెట్ చేయి',
      exportBackup: 'డేటా బ్యాకప్ డౌన్‌లోడ్ చేయి (JSON)',
      clearAll: 'మొత్తం డేటాను క్లియర్ చేయి',
      clearWarning: 'ఇది ఈ పరికరం నుండి దుకాణం రికార్డులను శాశ్వతంగా తొలగిస్తుంది.',
      confirmClear: 'అవును, మొత్తం క్లియర్ చేయి',
      saveChanges: 'సెట్టింగ్‌లను సేవ్ చేయి'
    },
    offlinePanel: {
      title: '100% ప్రైవేట్ & పూర్తి ఆఫ్‌లైన్ టెక్నాలజీ',
      subtitle: 'పూర్తిగా మీ బ్రౌజర్‌లోనే పనిచేస్తుంది. ఇంటర్నెట్ లేదా సర్వర్ అవసరం లేదు.',
      badge: 'ఇంటర్నెట్ అవసరం లేదు',
      feat1Title: 'స్థానిక IndexedDB స్టోరేజ్',
      feat1Desc: 'అన్ని ఉత్పత్తులు మరియు లావాదేవీలు మీ పరికరంలోనే సురక్షితంగా ఉంటాయి.',
      feat2Title: 'బ్రౌజర్ స్పీచ్ ఇంజిన్',
      feat2Desc: 'వాయిస్ గుర్తింపు మరియు సమాధానాలు బ్రౌజర్ ద్వారానే పనిచేస్తాయి.',
      feat3Title: 'వేగవంతమైన తక్షణ బిల్లింగ్',
      feat3Desc: 'నెట్‌వర్క్ లేకపోయినా వాయిస్ ద్వారా వెంటనే స్టాక్ తగ్గుతుంది.'
    },
    conversation: {
      you: 'వ్యాపారి',
      assistant: 'సహాయక్ AI',
      spokenResponseLabel: 'వాయిస్ సమాధానం:',
      replayVoice: 'వాయిస్ మళ్ళీ వినండి',
      errorApology: 'నాకు అర్థం కాలేదు. దయచేసి "20 నీళ్ల బాటిళ్లు జోడించు" లేదా "ఈరోజు సంపాదన ఎంత" అని చెప్పండి.'
    },
    auth: {
        "loginTitle": "దుకాణదారుడు లాగిన్",
        "loginSubtitle": "ఆఫ్‌లైన్‌లో మీ స్టోర్ ఖాతాలు మరియు నిల్వలను నిర్వహించండి",
        "signUpTitle": "కొత్త దుకాణం నమోదు",
        "signUpSubtitle": "10 సెకన్లలో మీ కిరాణా దుకాణాన్ని ప్రారంభించండి",
        "emailLabel": "ఇమెయిల్ చిరునామా (లాగిన్ మరియు బిల్లుల కోసం)",
        "emailPlaceholder": "ఉదా. store@gmail.com",
        "phoneOrNameLabel": "ఇమెయిల్ లేదా మొబైల్ నంబర్",
        "phoneOrNamePlaceholder": "ఉదా. store@gmail.com లేదా 9876543210",
        "pinLabel": "4-అంకెల సెక్యూరిటీ పిన్ (PIN)",
        "pinPlaceholder": "4 అంకెల పిన్ నమోదు చేయండి (డిఫాల్ట్: 1234)",
        "ownerNameLabel": "యజమాని పేరు",
        "ownerNamePlaceholder": "ఉదా. రమేష్ కుమార్",
        "shopNameLabel": "దుకాణం పేరు",
        "shopNamePlaceholder": "ఉదా. రమేష్ కిరాణా స్టోర్",
        "categoryLabel": "వ్యాపార విభాగం",
        "categoryPlaceholder": "కిరాణా / జనరల్ స్టోర్",
        "loginBtn": "లాగిన్ అవ్వండి",
        "signUpBtn": "నమోదు చేయండి",
        "switchTabLogin": "లాగిన్",
        "switchTabSignUp": "కొత్త నమోదు",
        "demoProfilesTitle": "1-క్లిక్ డెమో ప్రొఫైల్స్",
        "demoProfilesDesc": "పాస్‌వర్డ్ లేకుండా వెంటనే ప్రొఫైల్ మార్చండి",
        "switchAccount": "దుకాణం మార్చండి",
        "logout": "లాగౌట్",
        "profileTitle": "దుకాణం ప్రೊఫైల్",
        "currentShop": "యాక్టివ్ దుకాణం",
        "loggedInAs": "లాగిన్ అయ్యారు:"
    },
    wholesale: {
        "title": "వాట్సాప్ హోల్‌సేల్ ఆర్డర్",
        "subtitle": "తక్కువ స్టాక్ వస్తువులను డిస్ట్రిబ్యూటర్‌కు 1-క్లిక్‌తో ఆర్డర్ చేయండి",
        "distributorLabel": "హోల్‌సేలర్ పేరు",
        "distributorPhoneLabel": "వాట్సాప్ మొబైల్ నంబర్",
        "selectDistributorPlaceholder": "సప్లయర్‌ను ఎంచుకోండి...",
        "orderItemsTitle": "ఆర్డర్ వస్తువులు",
        "noLowStockMessage": "స్టాక్ తగినంతగా ఉంది! మీరు వస్తువులను జోడించవచ్చు.",
        "addItemBtn": "+ వస్తువును జోడించు",
        "selectProductPlaceholder": "వస్తువును ఎంచుకోండి...",
        "orderQtyLabel": "ఆర్డర్ పరిమాణం",
        "currentStockLabel": "ప్రస్తుత స్టాక్",
        "notesLabel": "డెలివరీ గమనిక",
        "notesPlaceholder": "ఉదా. ఈ సాయంత్రం లోపు డెలివరీ చేయండి...",
        "previewTitle": "వాట్సాప్ సందేశ ప్రివ్యూ",
        "sendWhatsAppBtn": "వాట్సాప్‌లో ఆర్డర్ పంపండి",
        "copyTextBtn": "టెక్స్ట్ కాపీ చేయండి",
        "copiedSuccess": "కాపీ చేయబడింది!",
        "urgentBadge": "తక్కువ స్టాక్"
    },


    suggestions: [
      '20 కిలోల బియ్యం 1200కు అమ్మాము',
      '3 నీళ్ల బాటిళ్లు 90కు అమ్మాము',
      '20 నీళ్ల బాటిళ్లు జోడించు',
      'నీళ్లు ఎంత స్టాక్ మిగిలింది',
      'ఈరోజు మొత్తం సంపాదన ఎంత',
      'తక్కువ స్టాక్'
    ]
  },

  bn: {
    tagline: '১০০% অফলাইন ব্যবসায়িক খাতা ও ভয়েস সহকারী',
    appTitle: 'সহায়ক',
    appSubtitle: 'অফলাইন ভয়েস বিলিং ও মুদি স্টোর POS',
    offlineBadge: '১০০% অফলাইন',
    storeOpenBadge: 'দোকান খোলা আছে',
    greetingMorning: 'সুপ্রভাত শেঠজি! আজকের বিলিং ও স্টক দেখার জন্য প্রস্তুত।',
    greetingAfternoon: 'নমস্কার! আসুন দোকানের হিসাব এগিয়ে নেওয়া যাক।',
    greetingEvening: 'শুভ সন্ধ্যা! আসুন আজকের ক্যাশ ও খাতা মিলিয়ে নিই।',
    assistantStatus: 'সহায়ক ভয়েস টার্মিনাল • প্রস্তুত',
    micTapToSpeak: 'কথা বলতে চাপুন',
    micListening: 'শুনছি...',
    micProcessing: 'হিসাব হচ্ছে...',
    micDone: 'নথিভুক্ত হয়েছে ✓',
    micSpeakNow: 'এখন পরিষ্কারভাবে বলুন...',
    micTryAgain: 'আবার চেষ্টা করুন',
    textFallbackLabel: 'অথবা টাইপ করে নির্দেশ দিন:',
    textFallbackPlaceholder: 'যেমন, ২০ কেজি চাল ১২০০ টাকায় বিক্রি বা ২০ বোতল জল যোগ করুন',
    runCommand: 'সম্পন্ন করুন',
    suggestedCommandsTitle: 'এভাবে বলুন বা ক্লিক করে পরীক্ষা করুন:',
    viewCards: 'কার্ড ভিউ',
    viewTable: 'রেজিস্টার ভিউ',
    fastBillingBtn: '⚡ দ্রুত বিক্রি',
    quickActions: {
      addStock: 'স্টক যোগ করুন',
      recordSale: 'বিক্রি রেকর্ড',
      checkStock: 'স্টক দেখুন',
      checkEarnings: 'আয় দেখুন',
      lowStock: 'কম স্টক'
    },
    nav: {
      allOverview: 'দোকান কাউন্টার',
      voiceBilling: 'ভয়েস টার্মিনাল',
      stockLedger: 'দোকানের স্টক',
      salesLedger: 'দৈনিক খাতা',
      storeActivity: 'লাইভ হিসাব'
    },
    stats: {
      totalItems: 'মোট পণ্য',
      todaysSales: 'আজকের মোট বিক্রি',
      inventoryValue: 'স্টকের মূল্য',
      lowStock: 'কম স্টক সতর্কতা',
      productsUnit: 'পণ্য',
      transactionsLabel: 'লেনদেন',
      currentStockLabel: 'দোকানের স্টক',
      attentionLabel: 'স্টকের অবস্থা',
      itemsUnit: 'পণ্য',
      activeCatalog: 'সক্রিয় তালিকা',
      reorderNeeded: 'অর্ডার দরকার',
      goodStock: 'পর্যাপ্ত স্টক',
      todayGalla: 'আজকের মোট নগদ আয়'
    },
    inventory: {
      title: 'দোকানের স্টক রেজিস্টার',
      subtitle: 'পণ্য, একক, মূল্য এবং রিয়েল-টাইম স্টক পরিচালনা করুন',
      addProduct: '+ নতুন পণ্য',
      searchPlaceholder: 'নাম বা বিভাগ দিয়ে খুঁজুন...',
      filterAll: 'সমস্ত পণ্য',
      filterLowStock: '⚠️ কম স্টক',
      filterInStock: '✓ পর্যাপ্ত স্টক',
      colProduct: 'পণ্যের নাম',
      colQuantity: 'পরিমাণ',
      colUnit: 'একক',
      colPrice: 'দাম / একক',
      colValue: 'মোট মূল্য',
      colStatus: 'অবস্থা',
      colActions: 'পদক্ষেপ',
      statusInStock: 'উপলব্ধ',
      statusLowStock: 'কম স্টক',
      noProducts: 'দোকানে কোনো পণ্য নেই। "+ নতুন পণ্য" চাপুন।',
      editTooltip: 'সম্পাদনা করুন',
      deleteTooltip: 'মুছে ফেলুন',
      quickAddTooltip: '১ একক যোগ করুন',
      quickDeductTooltip: '১ একক কমান'
    },
    sales: {
      title: 'দৈনিক বিক্রি ও খাতা রেজিস্টার',
      subtitle: 'নথিভুক্ত লেনদেন, সময় এবং দৈনিক আয়ের সংক্ষিপ্ত বিবরণ',
      todaysEarningsTitle: 'আজকের ক্যাশ বক্স (গल्ला)',
      recordSaleBtn: '+ বিক্রি রেকর্ড করুন',
      searchPlaceholder: 'বিক্রির রেকর্ড খুঁজুন...',
      colTime: 'সময়',
      colProduct: 'বিক্রি হওয়া পণ্য',
      colQty: 'পরিমাণ',
      colAmount: 'বিক্রির পরিমাণ',
      colType: 'ধরন',
      noSales: 'আজ এখনও কোনো বিক্রি নথিভুক্ত হয়নি।',
      cumulativeSales: 'মোট বিক্রি',
      todayBadge: 'আজ'
    },
    activity: {
      title: 'দোকানের কার্যকলাপ টাইমলাইন',
      subtitle: 'স্টক এবং বিক্রির লাইভ লগ',
      liveLog: 'লাইভ লগ',
      noActivity: 'সাম্প্রতিক কোনো কার্যকলাপ নেই।',
      justNow: 'এইমাত্র',
      minAgo: 'মিনিট আগে',
      hrAgo: 'ঘণ্টা আগে',
      daysAgo: 'দিন আগে'
    },
    modals: {
      addNewProduct: 'দোকানে নতুন পণ্য যোগ করুন',
      editProduct: 'পণ্যের বিবরণ পরিবর্তন করুন',
      recordSaleTitle: 'বিক্রি লেনদেন নথিভুক্ত করুন',
      productNameEn: 'পণ্যের নাম (ইংরেজি) *',
      productNameRegional: 'বাংলা / স্থানীয় নাম (ঐচ্ছিক)',
      initialStock: 'প্রাথমিক স্টক পরিমাণ *',
      currentStock: 'বর্তমান স্টক *',
      unit: 'একক *',
      pricePerUnit: 'প্রতি একক মূল্য (₹) *',
      lowStockAlert: 'কম স্টক সতর্কতা সীমা',
      cancel: 'বাতিল',
      saveProduct: 'পণ্য সংরক্ষণ করুন',
      updateProduct: 'আপডেট করুন',
      selectProduct: 'পণ্য নির্বাচন করুন *',
      soldQuantity: 'বিক্রি হওয়া পরিমাণ *',
      totalSaleAmount: 'মোট বিক্রির টাকা (₹) *',
      recordSaleSubmit: 'বিক্রি রেকর্ড করুন',
      validQuantityError: 'অনুগ্রহ করে সঠিক পরিমাণ লিখুন।',
      insufficientStockError: 'স্টকে পর্যাপ্ত পণ্য নেই!'
    },
    settings: {
      title: 'দোকান সেটিংস এবং লোকাল স্টোরেজ',
      langSection: 'প্রধান ভয়েস এবং ভাষা',
      thresholdTitle: 'কম স্টক সতর্কতা সীমা',
      thresholdDesc: 'এই পরিমাণের নিচে নামলে সতর্কতা দেখানো হবে',
      voiceConfirmation: 'ভয়েস অডিও নিশ্চিতকরণ (TTS)',
      voiceDesc: 'বিক্রি বা স্টক নথিভুক্ত করার পর ভয়েসে নিশ্চিত করবে',
      demoMode: 'ডেমো স্টোর মোড',
      demoDesc: 'পরীক্ষার জন্য ডেমো মুদি পণ্য লোড করুন',
      dbManagement: 'ডাটাবেস এবং ব্যাকআপ',
      resetDemo: 'ডেমো ডাটা রিসেট করুন',
      exportBackup: 'ডাটা ব্যাকআপ ডাউনলোড করুন (JSON)',
      clearAll: 'সমস্ত ডাটা মুছুন',
      clearWarning: 'এটি এই ডিভাইস থেকে সমস্ত দোকানের রেকর্ড স্থায়ীভাবে মুছে ফেলবে।',
      confirmClear: 'হ্যাঁ, সব মুছুন',
      saveChanges: 'সেটিংস সংরক্ষণ করুন'
    },
    offlinePanel: {
      title: '১০০% ব্যক্তিগত ও সম্পূর্ণ অফলাইন প্রযুক্তি',
      subtitle: 'সম্পূর্ণরূপে আপনার ব্রাউজারে চলে। কোনো ইন্টারনেট বা সার্ভার প্রয়োজন নেই।',
      badge: 'ইন্টারনেট ছাড়াই সুরক্ষিত',
      feat1Title: 'স্থানীয় IndexedDB স্টোরেজ',
      feat1Desc: 'সমস্ত পণ্য ও বিক্রির তথ্য আপনার ডিভাইসেই নিরাপদ থাকে।',
      feat2Title: 'ব্রাউজার স্পিচ ইঞ্জিন',
      feat2Desc: 'ভয়েস শনাক্তকরণ এবং কথা বলা ব্রাউজারের মাধ্যমেই পরিচালিত হয়।',
      feat3Title: 'তাত্ক্ষণিক দ্রুত বিলিং',
      feat3Desc: 'ইন্টারনেট না থাকলেও ভয়েসের মাধ্যমে সাথে সাথে স্টক আপডেট হয়।'
    },
    conversation: {
      you: 'ব্যবসায়ী',
      assistant: 'সহায়ক AI',
      spokenResponseLabel: 'ভয়েস উত্তর:',
      replayVoice: 'ভয়েস আবার শুনুন',
      errorApology: 'আমি বুঝতে পারিনি। অনুগ্রহ করে "২০ বোতল জল যোগ করুন" বা "আজকের আয় কত" বলে দেখুন।'
    },
    auth: {
        "loginTitle": "দোকানদার লগইন",
        "loginSubtitle": "অফলাইনে আপনার দোকানের খাতা ও স্টক পরিচালনা করুন",
        "signUpTitle": "নতুন দোকান নিবন্ধন",
        "signUpSubtitle": "১০ সেকেন্ডে আপনার মুদি দোকান শুরু করুন",
        "emailLabel": "ইমেল ঠিকানা (লগইন এবং বিলের জন্য)",
        "emailPlaceholder": "যেমন store@gmail.com",
        "phoneOrNameLabel": "ইমেল ঠিকানা বা মোবাইল নম্বর",
        "phoneOrNamePlaceholder": "যেমন store@gmail.com বা 9876543210",
        "pinLabel": "৪-সংখ্যার নিরাপত্তা পিন (PIN)",
        "pinPlaceholder": "৪ সংখ্যার পিন লিখুন (ডিফল্ট: 1234)",
        "ownerNameLabel": "দোকানদারের নাম",
        "ownerNamePlaceholder": "যেমন: রমেশ কুমার",
        "shopNameLabel": "দোকানের নাম",
        "shopNamePlaceholder": "যেমন: রমেশ মুদি ভান্ডার",
        "categoryLabel": "ব্যবসার ধরন",
        "categoryPlaceholder": "মুদি / জেনারেল স্টোর",
        "loginBtn": "লগইন করুন",
        "signUpBtn": "নিবন্ধন করুন",
        "switchTabLogin": "লগইন",
        "switchTabSignUp": "নতুন নিবন্ধন",
        "demoProfilesTitle": "১-ক্লিক ডেমো প্রোফাইল",
        "demoProfilesDesc": "পাসওয়ার্ড ছাড়া অবিলম্বে প্রোফাইল পরিবর্তন করুন",
        "switchAccount": "দোকান পরিবর্তন",
        "logout": "লগআউট",
        "profileTitle": "দোকান প্রোফাইল",
        "currentShop": "বর্তমান দোকান",
        "loggedInAs": "লগইন করেছেন:"
    },
    wholesale: {
        "title": "হোয়াটসঅ্যাপ পাইকারি অর্ডার",
        "subtitle": "কম স্টক পণ্য ডিস্ট্রিবিউটরকে ১-ক্লিকে অর্ডার করুন",
        "distributorLabel": "পাইকারি বিক্রেতার নাম",
        "distributorPhoneLabel": "হোয়াটসঅ্যাপ মোবাইল নম্বর",
        "selectDistributorPlaceholder": "সরবরাহকারী নির্বাচন করুন...",
        "orderItemsTitle": "অর্ডারের পণ্যসমূহ",
        "noLowStockMessage": "পর্যাপ্ত স্টক রয়েছে! আপনি নিচে পণ্য যোগ করতে পারেন।",
        "addItemBtn": "+ পণ্য যোগ করুন",
        "selectProductPlaceholder": "পণ্য নির্বাচন করুন...",
        "orderQtyLabel": "অর্ডারের পরিমাণ",
        "currentStockLabel": "বর্তমান স্টক",
        "notesLabel": "ডেলিভারি নির্দেশিকা",
        "notesPlaceholder": "যেমন: আজ বিকালের মধ্যে ডেলিভারি দিন...",
        "previewTitle": "হোয়াটসঅ্যাপ বার্তা প্রিভিউ",
        "sendWhatsAppBtn": "হোয়াটসঅ্যাপে অর্ডার পাঠান",
        "copyTextBtn": "টেক্সট কপি করুন",
        "copiedSuccess": "কপি করা হয়েছে!",
        "urgentBadge": "কম স্টক"
    },


    suggestions: [
      '২০ কেজি চাল ১২০০ টাকায় বিক্রি',
      '৩ বোতল জল ৯০ টাকায় বিক্রি',
      '২০ বোতল জল যোগ করুন',
      'জল কতটুকু বাকি আছে',
      'আজকের আয় কত হয়েছে',
      'কম স্টক'
    ]
  },

  kn: {
    tagline: '100% ಆಫ್‌ಲೈನ್ ಡಿಜಿಟಲ್ ಖಾತೆ & ವಾಯ್ಸ್ ಸಹಾಯಕ',
    appTitle: 'ಸಹಾಯಕ್',
    appSubtitle: 'ಆಫ್‌ಲೈನ್ ವಾಯ್ಸ್ ಬಿಲ್ಲಿಂಗ್ & ಕಿರಾಣಿ ಅಂಗಡಿ POS',
    offlineBadge: '100% ಆಫ್‌ಲೈನ್',
    storeOpenBadge: 'ಅಂಗಡಿ ತೆರೆದಿದೆ',
    greetingMorning: 'ಶುಭೋದಯ ಸೇಠ್‌ಜೀ! ಇಂದಿನ ಬಿಲ್ಲಿಂಗ್ ಮತ್ತು ದಾಸ್ತಾನಿಗೆ ಸಿದ್ಧ.',
    greetingAfternoon: 'ನಮಸ್ಕಾರ! ಅಂಗಡಿ ಲೆಕ್ಕಪತ್ರವನ್ನು ಮುಂದುವರಿಸೋಣ.',
    greetingEvening: 'ಶುಭ ಸಂಜೆ! ಇಂದಿನ ಗಲ್ಲಾ ಮತ್ತು ಲೆಕ್ಕ ಮುಗಿಸೋಣ.',
    assistantStatus: 'ಸಹಾಯಕ್ ವಾಯ್ಸ್ ಟರ್ಮಿನಲ್ • ಸಿದ್ಧವಾಗಿದೆ',
    micTapToSpeak: 'ಮಾತನಾಡಲು ಒತ್ತಿ',
    micListening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...',
    micProcessing: 'ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
    micDone: 'ದಾಖಲಾಗಿದೆ ✓',
    micSpeakNow: 'ಈಗ ಮಾತನಾಡಿ...',
    micTryAgain: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    textFallbackLabel: 'ಅಥವಾ ಟೈಪ್ ಮಾಡಿ:',
    textFallbackPlaceholder: 'ಉದಾ., 20 ಕೆಜಿ ಅಕ್ಕಿ 1200 ಕ್ಕೆ ಮಾರಾಟ ಅಥವಾ 20 ಬಾಟಲ್ ನೀರು ಸೇರಿಸಿ',
    runCommand: 'ದಾಖಲಿಸಿ',
    suggestedCommandsTitle: 'ಹೀಗೆ ಹೇಳಿ ಅಥವಾ ಒತ್ತಿ ನೋಡಿ:',
    viewCards: 'ಕಾರ್ಡ್ಸ್',
    viewTable: 'ರಿಜಿಸ್ಟರ್',
    fastBillingBtn: '⚡ ತ್ವರಿತ ಮಾರಾಟ',
    quickActions: {
      addStock: 'ದಾಸ್ತಾನು ಸೇರಿಸಿ',
      recordSale: 'ಮಾರಾಟ ದಾಖಲಿಸಿ',
      checkStock: 'ದಾಸ್ತಾನು ನೋಡಿ',
      checkEarnings: 'ಗಳಿಕೆ ನೋಡಿ',
      lowStock: 'ಕಡಿಮೆ ದಾಸ್ತಾನು'
    },
    nav: {
      allOverview: 'ಅಂಗಡಿ ಕೌಂಟರ್',
      voiceBilling: 'ವಾಯ್ಸ್ ಟರ್ಮಿನಲ್',
      stockLedger: 'ದಾಸ್ತಾನು ಇನ್ವೆಂಟರಿ',
      salesLedger: 'ದೈನಂದಿನ ಖಾತೆ',
      storeActivity: 'ಲೈವ್ ಚಟುವಟಿಕೆ'
    },
    stats: {
      totalItems: 'ಒಟ್ಟು ಉತ್ಪನ್ನಗಳು',
      todaysSales: 'ಇಂದಿನ ಒಟ್ಟು ಮಾರಾಟ',
      inventoryValue: 'ದಾಸ್ತಾನು ಮೌಲ್ಯ',
      lowStock: 'ಕಡಿಮೆ ದಾಸ್ತಾನು ಎಚ್ಚರಿಕೆ',
      productsUnit: 'ಉತ್ಪನ್ನಗಳು',
      transactionsLabel: 'ವಹಿವಾಟುಗಳು',
      currentStockLabel: 'ಅಂಗಡಿ ದಾಸ್ತಾನು',
      attentionLabel: 'ದಾಸ್ತಾನು ಸ್ಥಿತಿ',
      itemsUnit: 'ವಸ್ತುಗಳು',
      activeCatalog: 'ಸಕ್ರಿಯ ಪಟ್ಟಿ',
      reorderNeeded: 'ಆರ್ಡರ್ ಅಗತ್ಯವಿದೆ',
      goodStock: 'ದಾಸ್ತಾನು ಸಾಕಷ್ಟಿದೆ',
      todayGalla: 'ಇಂದಿನ ಒಟ್ಟು ನಗದು ಗಳಿಕೆ'
    },
    inventory: {
      title: 'ಅಂಗಡಿ ದಾಸ್ತಾನು ರಿಜಿಸ್ಟರ್',
      subtitle: 'ಉತ್ಪನ್ನಗಳು, ಯೂನಿಟ್‌ಗಳು, ದರಗಳು ಮತ್ತು ಲೈವ್ ದಾಸ್ತಾನು ನಿರ್ವಹಿಸಿ',
      addProduct: '+ ಹೊಸ ವಸ್ತು',
      searchPlaceholder: 'ಹೆಸರು ಅಥವಾ ವರ್ಗದ ಮೂಲಕ ಹುಡುಕಿ...',
      filterAll: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು',
      filterLowStock: '⚠️ ಕಡಿಮೆ ದಾಸ್ತಾನು',
      filterInStock: '✓ ಸಾಕಷ್ಟು ದಾಸ್ತಾನು',
      colProduct: 'ಉತ್ಪನ್ನದ ಹೆಸರು',
      colQuantity: 'ದಾಸ್ತಾನು ಪ್ರಮಾಣ',
      colUnit: 'ಯೂನಿಟ್',
      colPrice: 'ದರ / ಯೂನಿಟ್',
      colValue: 'ಒಟ್ಟು ಮೌಲ್ಯ',
      colStatus: 'ಸ್ಥಿತಿ',
      colActions: 'ಕ್ರಮಗಳು',
      statusInStock: 'ಲಭ್ಯವಿದೆ',
      statusLowStock: 'ಕಡಿಮೆ ದಾಸ್ತಾನು',
      noProducts: 'ಯಾವುದೇ ಉತ್ಪನ್ನಗಳಿಲ್ಲ. "+ ಹೊಸ ವಸ್ತು" ಒತ್ತಿರಿ.',
      editTooltip: 'ತಿದ್ದುಪಡಿ',
      deleteTooltip: 'ತೆಗೆದುಹಾಕಿ',
      quickAddTooltip: '1 ಯೂನಿಟ್ ಸೇರಿಸಿ',
      quickDeductTooltip: '1 ಯೂನಿಟ್ ಕಡಿತಗೊಳಿಸಿ'
    },
    sales: {
      title: 'ದೈನಂದಿನ ಮಾರಾಟ ಖಾತೆ ರಿಜಿಸ್ಟರ್',
      subtitle: 'ದಾಖಲಾದ ವಹಿವಾಟುಗಳು, ಸಮಯ ಮತ್ತು ದಿನದ ಆದಾಯದ ವಿವರ',
      todaysEarningsTitle: 'ಇಂದಿನ ಒಟ್ಟು ಮಾರಾಟ (ನಗದು ಕಲೆಕ್ಷನ್)',
      recordSaleBtn: '+ ಮಾರಾಟ ದಾಖಲಿಸಿ',
      searchPlaceholder: 'ಮಾರಾಟ ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಿ...',
      colTime: 'ಸಮಯ',
      colProduct: 'ಮಾರಾಟವಾದ ವಸ್ತು',
      colQty: 'ಪ್ರಮಾಣ',
      colAmount: 'ಮಾರಾಟದ ಮೊತ್ತ',
      colType: 'ರೀತಿ',
      noSales: 'ಇಂದು ಇನ್ನೂ ಯಾವುದೇ ಮಾರಾಟ ದಾಖಲಾಗಿಲ್ಲ.',
      cumulativeSales: 'ಒಟ್ಟು ಮಾರಾಟ',
      todayBadge: 'ಇಂದು'
    },
    activity: {
      title: 'ಅಂಗಡಿ ಚಟುವಟಿಕೆ ಟೈಮ್‌ಲೈನ್',
      subtitle: 'ದಾಸ್ತಾನು ಮತ್ತು ಮಾರಾಟದ ಲೈವ್ ಲಾಗ್',
      liveLog: 'ಲೈವ್ ಲಾಗ್',
      noActivity: 'ಯಾವುದೇ ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ ಇಲ್ಲ.',
      justNow: 'ಈಗಷ್ಟೇ',
      minAgo: 'ನಿಮಿಷದ ಹಿಂದೆ',
      hrAgo: 'ಗಂಟೆಗಳ ಹಿಂದೆ',
      daysAgo: 'ದಿನಗಳ ಹಿಂದೆ'
    },
    modals: {
      addNewProduct: 'ಅಂಗಡಿಗೆ ಹೊಸ ವಸ್ತು ಸೇರಿಸಿ',
      editProduct: 'ಉತ್ಪನ್ನದ ವಿವರ ಬದಲಾಯಿಸಿ',
      recordSaleTitle: 'ಮಾರಾಟ ವಹಿವಾಟು ದಾಖಲಿಸಿ',
      productNameEn: 'ಉತ್ಪನ್ನದ ಹೆಸರು (ಇಂಗ್ಲಿಷ್) *',
      productNameRegional: 'ಕನ್ನಡ / ಸ್ಥಳೀಯ ಹೆಸರು (ಐಚ್ಛಿಕ)',
      initialStock: 'ಪ್ರಾರಂಭಿಕ ದಾಸ್ತಾನು *',
      currentStock: 'ಪ್ರಸ್ತುತ ದಾಸ್ತಾನು *',
      unit: 'ಯೂನಿಟ್ *',
      pricePerUnit: 'ಯೂನಿಟ್ ದರ (₹) *',
      lowStockAlert: 'ಕಡಿಮೆ ದಾಸ್ತಾನು ಎಚ್ಚರಿಕೆ ಮಿತಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      saveProduct: 'ಉತ್ಪನ್ನ ಉಳಿಸಿ',
      updateProduct: 'ಅಪ್ಡೇಟ್ ಮಾಡಿ',
      selectProduct: 'ವಸ್ತು ಆಯ್ಕೆಮಾಡಿ *',
      soldQuantity: 'ಮಾರಾಟವಾದ ಪ್ರಮಾಣ *',
      totalSaleAmount: 'ಒಟ್ಟು ಮಾರಾಟದ ಮೊತ್ತ (₹) *',
      recordSaleSubmit: 'ಮಾರಾಟ ದಾಖಲಿಸಿ',
      validQuantityError: 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಪ್ರಮಾಣ ನಮೂದಿಸಿ.',
      insufficientStockError: 'ದಾಸ್ತಾನಿನಲ್ಲಿ ಸಾಕಷ್ಟು ಸರಕು ಲಭ್ಯವಿಲ್ಲ!'
    },
    settings: {
      title: 'ಅಂಗಡಿ ಸೆಟ್ಟಿಂಗ್ಸ್ & ಲೋಕಲ್ ಸ್ಟೋರೇಜ್',
      langSection: 'ಮುಖ್ಯ ವಾಯ್ಸ್ & ಭಾಷೆ',
      thresholdTitle: 'ಕಡಿಮೆ ದಾಸ್ತಾನು ಎಚ್ಚರಿಕೆ ಮಿತಿ',
      thresholdDesc: 'ಈ ಮಿತಿಗಿಂತ ಕಡಿಮೆಯಾದರೆ ಎಚ್ಚರಿಕೆ ತೋರಿಸಲಾಗುತ್ತದೆ',
      voiceConfirmation: 'ವಾಯ್ಸ್ ಆಡಿಯೋ ಪ್ರತಿಕ್ರಿಯೆ (TTS)',
      voiceDesc: 'ದಾಖಲಾತಿಗಳ ನಂತರ ಧ್ವನಿ ಮೂಲಕ ಖಚಿತಪಡಿಸುತ್ತದೆ',
      demoMode: 'ಡೆಮೊ ಅಂಗಡಿ ಮೋಡ್',
      demoDesc: 'ಪರೀಕ್ಷೆಗಾಗಿ ಮಾದರಿ ದಿನಸಿ ಸಾಮಗ್ರಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಿ',
      dbManagement: 'ಡೇಟಾಬೇಸ್ ಮತ್ತು ಬ್ಯಾಕಪ್',
      resetDemo: 'ಡೆಮೊ ಡೇಟಾ ಮರುಹೊಂದಿಸಿ',
      exportBackup: 'ಡೇಟಾ ಬ್ಯಾಕಪ್ ಡೌನ್‌ಲೋಡ್ (JSON)',
      clearAll: 'ಎಲ್ಲಾ ಡೇಟಾ ಅಳಿಸಿ',
      clearWarning: 'ಇದು ಈ ಸಾಧನದಿಂದ ಎಲ್ಲಾ ಅಂಗಡಿ ದಾಖಲೆಗಳನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸುತ್ತದೆ.',
      confirmClear: 'ಹೌದು, ಎಲ್ಲವನ್ನೂ ಅಳಿಸಿ',
      saveChanges: 'ಸೆಟ್ಟಿಂಗ್ಸ್ ಉಳಿಸಿ'
    },
    offlinePanel: {
      title: '100% ಖಾಸಗಿ & ಸಂಪೂರ್ಣ ಆಫ್‌ಲೈನ್ ತಂತ್ರಜ್ಞಾನ',
      subtitle: 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲೇ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ಇಂಟರ್ನೆಟ್ ಅಗತ್ಯವಿಲ್ಲ.',
      badge: 'ಇಂಟರ್ನೆಟ್ ರಹಿತ ಸುರಕ್ಷಿತ',
      feat1Title: 'ಸ್ಥಳೀಯ IndexedDB ಸ್ಟೋರೇಜ್',
      feat1Desc: 'ಎಲ್ಲಾ ಸರಕುಗಳು ಮತ್ತು ಲೆಕ್ಕಗಳು ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತವೆ.',
      feat2Title: 'ಬ್ರೌಸರ್ ಸ್ಪೀಚ್ ಎಂಜಿನ್',
      feat2Desc: 'ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಬ್ರೌಸರ್ ಮೂಲಕವೇ ನಡೆಯುತ್ತದೆ.',
      feat3Title: 'ತ್ವರಿತ ಬಿಲ್ಲಿಂಗ್',
      feat3Desc: 'ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲದಿದ್ದರೂ ಧ್ವನಿ ಮೂಲಕ ತಕ್ಷಣ ದಾಸ್ತಾನು ನವೀಕರಣವಾಗುತ್ತದೆ.'
    },
    conversation: {
      you: 'ವ್ಯಾಪಾರಿ',
      assistant: 'ಸಹಾಯಕ್ AI',
      spokenResponseLabel: 'ಧ್ವನಿ ಉತ್ತರ:',
      replayVoice: 'ಧ್ವನಿ ಮತ್ತೆ ಕೇಳಿ',
      errorApology: 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು "20 ಬಾಟಲ್ ನೀರು ಸೇರಿಸಿ" ಅಥವಾ "ಇಂದಿನ ಗಳಿಕೆ ಎಷ್ಟು" ಎಂದು ಹೇಳಿ ನೋಡಿ.'
    },
    auth: {
        "loginTitle": "ಅಂಗಡಿಯವರ ಲಾಗಿನ್",
        "loginSubtitle": "ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ದಾಸ್ತಾನು ನಿರ್ವಹಿಸಿ",
        "signUpTitle": "ಹೊಸ ಅಂಗಡಿ ನೋಂದಣಿ",
        "signUpSubtitle": "10 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ನಿಮ್ಮ ಕಿರಾಣಿ ಅಂಗಡಿ ಪ್ರಾರಂಭಿಸಿ",
        "emailLabel": "ಇಮೇಲ್ ವಿಳಾಸ (ಲಾಗಿನ್ ಮತ್ತು ಬಿಲ್‌ಗಳಿಗಾಗಿ)",
        "emailPlaceholder": "ಉದಾ. store@gmail.com",
        "phoneOrNameLabel": "ಇಮೇಲ್ ವಿಳಾಸ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
        "phoneOrNamePlaceholder": "ಉದಾ. store@gmail.com ಅಥವಾ 9876543210",
        "pinLabel": "4-ಅಂಕಿಯ ಭದ್ರತಾ ಪಿನ್ (PIN)",
        "pinPlaceholder": "4 ಅಂಕಿಯ ಪಿನ್ ನಮೂದಿಸಿ (ಡೀಫಾಲ್ಟ್: 1234)",
        "ownerNameLabel": "ಮಾಲೀಕರ ಹೆಸರು",
        "ownerNamePlaceholder": "ಉದಾ. ರಮೇಶ್ ಕುಮಾರ್",
        "shopNameLabel": "ಅಂಗಡಿಯ ಹೆಸರು",
        "shopNamePlaceholder": "ಉದಾ. ರಮೇಶ್ ಕಿರಾಣಿ ಸ್ಟೋರ್",
        "categoryLabel": "ವ್ಯಾಪಾರ ವರ್ಗ",
        "categoryPlaceholder": "ಕಿರಾಣಿ / ಜನರಲ್ ಸ್ಟೋರ್",
        "loginBtn": "ಲಾಗಿನ್ ಮಾಡಿ",
        "signUpBtn": "ನೋಂದಾಯಿಸಿ",
        "switchTabLogin": "ಲಾಗಿನ್",
        "switchTabSignUp": "ಹೊಸ ನೋಂದಣಿ",
        "demoProfilesTitle": "1-ಕ್ಲಿಕ್ ಡೆಮೊ ಪ್ರೊಫೈಲ್‌ಗಳು",
        "demoProfilesDesc": "ಪಾಸ್‌ವರ್ಡ್ ಇಲ್ಲದೆ ತ್ವರಿತವಾಗಿ ಬದಲಾಯಿಸಿ",
        "switchAccount": "ಅಂಗಡಿ ಬದಲಾಯಿಸಿ",
        "logout": "ಲಾಗ್‌ಔಟ್",
        "profileTitle": "ಅಂಗಡಿ ಪ್ರೊಫೈಲ್",
        "currentShop": "ಸಕ್ರಿಯ ಅಂಗಡಿ",
        "loggedInAs": "ಲಾಗಿನ್ ಆಗಿದ್ದಾರೆ:"
    },
    wholesale: {
        "title": "ವಾಟ್ಸಾಪ್ ಸಗಟು ಆರ್ಡರ್",
        "subtitle": "ಕಡಿಮೆ ದಾಸ್ತಾನು ವಸ್ತುಗಳನ್ನು 1-ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಸಪ್ಲೈಯರ್‌ಗೆ ಆರ್ಡರ್ ಮಾಡಿ",
        "distributorLabel": "ಸಗಟು ವ್ಯಾಪಾರಿಯ ಹೆಸರು",
        "distributorPhoneLabel": "ವಾಟ್ಸಾಪ್ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
        "selectDistributorPlaceholder": "ವಿತರಕರನ್ನು ಆಯ್ಕೆಮಾಡಿ...",
        "orderItemsTitle": "ಆರ್ಡರ್ ವಸ್ತುಗಳು",
        "noLowStockMessage": "ದಾಸ್ತಾನು ಸಾಕಷ್ಟಿದೆ! ನೀವು ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಬಹುದು.",
        "addItemBtn": "+ ವಸ್ತುವನ್ನು ಸೇರಿಸಿ",
        "selectProductPlaceholder": "ವಸ್ತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ...",
        "orderQtyLabel": "ಆರ್ಡರ್ ಪ್ರಮಾಣ",
        "currentStockLabel": "ಪ್ರಸ್ತುತ ದಾಸ್ತಾನು",
        "notesLabel": "ಸೂಚನೆ",
        "notesPlaceholder": "ಉದಾ. ಇಂದು ಸಂಜೆಯೊಳಗೆ ತಲುಪಿಸಿ...",
        "previewTitle": "ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಪೂರ್ವವೀಕ್ಷಣೆ",
        "sendWhatsAppBtn": "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಕಳುಹಿಸಿ",
        "copyTextBtn": "ಪಠ್ಯವನ್ನು ನಕಲಿಸಿ",
        "copiedSuccess": "ನಕಲಿಸಲಾಗಿದೆ!",
        "urgentBadge": "ಕಡಿಮೆ ದಾಸ್ತಾನು"
    },


    suggestions: [
      '20 ಕೆಜಿ ಅಕ್ಕಿ 1200 ಕ್ಕೆ ಮಾರಾಟ',
      '3 ಬಾಟಲ್ ನೀರು 90 ಕ್ಕೆ ಮಾರಾಟ',
      '20 ಬಾಟಲ್ ನೀರು ಸೇರಿಸಿ',
      'ನೀರು ಎಷ್ಟು ದಾಸ್ತಾನು ಉಳಿದಿದೆ',
      'ಇಂದಿನ ಒಟ್ಟು ಗಳಿಕೆ ಎಷ್ಟು',
      'ಕಡಿಮೆ ದಾಸ್ತಾನು'
    ]
  },

  ml: {
    tagline: '100% ഓഫ്‌ലൈൻ ഡിജിറ്റൽ കണക്കുപുസ്തകം & വോയ്‌സ് അസിസ്റ്റന്റ്',
    appTitle: 'സഹായക്',
    appSubtitle: 'ഓഫ്‌ലൈൻ വോയ്‌സ് ബില്ലിംഗ് & പലചരക്ക് കട POS',
    offlineBadge: '100% ഓഫ്‌ലൈൻ',
    storeOpenBadge: 'കട തുറന്നിരിക്കുന്നു',
    greetingMorning: 'സുപ്രഭാതം സേഠ് ജീ! ഇന്നത്തെ ബില്ലിംഗിനായി ഞാൻ തയ്യാറാണ്.',
    greetingAfternoon: 'നമസ്കാരം! കടയിലെ കണക്കുകൾ തുടരാം.',
    greetingEvening: 'ശുഭ സായാഹ്നം! ഇന്നത്തെ ഗല്ല കണക്കുകൾ പരിശോധിക്കാം.',
    assistantStatus: 'സഹായക് വോയ്‌സ് ടെർമിനൽ • തയ്യാറാണ്',
    micTapToSpeak: 'സംസാരിക്കാൻ അമർത്തുക',
    micListening: 'കേൾക്കുന്നു...',
    micProcessing: 'പ്രോസസ്സ് ചെയ്യുന്നു...',
    micDone: 'രേഖപ്പെടുത്തി ✓',
    micSpeakNow: 'ഇപ്പോൾ സംസാരിക്കൂ...',
    micTryAgain: 'വീണ്ടും ശ്രമിക്കുക',
    textFallbackLabel: 'അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക:',
    textFallbackPlaceholder: 'ഉദാ., 20 കിലോ അരി 1200 രൂപയ്ക്ക് വിറ്റു അല്ലെങ്കിൽ 20 കുപ്പി വെള്ളം ചേർക്കുക',
    runCommand: 'രേഖപ്പെടുത്തുക',
    suggestedCommandsTitle: 'ഇങ്ങനെ പറയൂ അല്ലെങ്കിൽ അമർത്തി നോക്കൂ:',
    viewCards: 'കാർഡുകൾ',
    viewTable: 'രജിസ്റ്റർ',
    fastBillingBtn: '⚡ വേഗത്തിലുള്ള വിൽപ്പന',
    quickActions: {
      addStock: 'സ്റ്റോക്ക് ചേർക്കുക',
      recordSale: 'വിൽപ്പന രേഖപ്പെടുത്തുക',
      checkStock: 'സ്റ്റോക്ക് പരിശോധിക്കുക',
      checkEarnings: 'വരുമാനം പരിശോധിക്കുക',
      lowStock: 'കുറഞ്ഞ സ്റ്റോക്ക്'
    },
    nav: {
      allOverview: 'കട കൗണ്ടർ',
      voiceBilling: 'വോയ്‌സ് ടെർമിനൽ',
      stockLedger: 'സ്റ്റോക്ക് ഇൻവെന്ററി',
      salesLedger: 'ദൈനംദിന കണക്ക്',
      storeActivity: 'തത്സമയ പ്രവർത്തനങ്ങൾ'
    },
    stats: {
      totalItems: 'ആകെ സാധനങ്ങൾ',
      todaysSales: 'ഇന്നത്തെ ആകെ വിൽപ്പന',
      inventoryValue: 'സ്റ്റോക്ക് മൂല്യം',
      lowStock: 'കുറഞ്ഞ സ്റ്റോക്ക് മുന്നറിയിപ്പ്',
      productsUnit: 'ഉൽപ്പന്നങ്ങൾ',
      transactionsLabel: 'ഇടപാടുകൾ',
      currentStockLabel: 'കടയിലെ സ്റ്റോക്ക്',
      attentionLabel: 'സ്റ്റോക്ക് നില',
      itemsUnit: 'ഇനങ്ങൾ',
      activeCatalog: 'സജീവ ലിസ്റ്റ്',
      reorderNeeded: 'ഓർഡർ ആവശ്യമാണ്',
      goodStock: 'സ്റ്റോക്ക് തൃപ്തികരം',
      todayGalla: 'ഇന്നത്തെ ആകെ വരുമാനം'
    },
    inventory: {
      title: 'കടയിലെ സ്റ്റോക്ക് രജിസ്റ്റർ',
      subtitle: 'ഉൽപ്പന്നങ്ങൾ, യൂണിറ്റുകൾ, വിലകൾ എന്നിവ കൈകാര്യം ചെയ്യുക',
      addProduct: '+ പുതിയ സാധനം',
      searchPlaceholder: 'പേരോ വിഭാഗമോ ഉപയോഗിച്ച് തിരയുക...',
      filterAll: 'എല്ലാ ഉൽപ്പന്നങ്ങളും',
      filterLowStock: '⚠️ കുറഞ്ഞ സ്റ്റോക്ക്',
      filterInStock: '✓ ആവശ്യത്തിന് സ്റ്റോക്ക്',
      colProduct: 'ഉൽപ്പന്നത്തിന്റെ പേര്',
      colQuantity: 'സ്റ്റോക്ക് അളവ്',
      colUnit: 'യൂണിറ്റ്',
      colPrice: 'വില / യൂണിറ്റ്',
      colValue: 'ആകെ മൂല്യം',
      colStatus: 'നില',
      colActions: 'നടപടികൾ',
      statusInStock: 'ലഭ്യമാണ്',
      statusLowStock: 'കുറഞ്ഞ സ്റ്റോക്ക്',
      noProducts: 'ഉൽപ്പന്നങ്ങളൊന്നും കണ്ടെത്തിയില്ല. "+ പുതിയ സാധനം" അമർത്തുക.',
      editTooltip: 'മാറ്റം വരുത്തുക',
      deleteTooltip: 'ഒഴിവാക്കുക',
      quickAddTooltip: '1 യൂണിറ്റ് ചേർക്കുക',
      quickDeductTooltip: '1 യൂണിറ്റ് കുറയ്ക്കുക'
    },
    sales: {
      title: 'ദൈനംദിന വിൽപ്പന കണക്ക് രജിസ്റ്റർ',
      subtitle: 'രേഖപ്പെടുത്തിയ ഇടപാടുകൾ, സമയം, ദിവസ വരുമാനം',
      todaysEarningsTitle: 'ഇന്നത്തെ ആകെ വിൽപ്പന (പണശേഖരണം)',
      recordSaleBtn: '+ വിൽപ്പന രേഖപ്പെടുത്തുക',
      searchPlaceholder: 'വിൽപ്പന രേഖകൾ തിരയുക...',
      colTime: 'സമയം',
      colProduct: 'വിറ്റ സാധനം',
      colQty: 'അളവ്',
      colAmount: 'വിൽപ്പന തുക',
      colType: 'തരം',
      noSales: 'ഇന്ന് ഇതുവരെ വിൽപ്പനയൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.',
      cumulativeSales: 'ആകെ വിൽപ്പന',
      todayBadge: 'ഇന്ന്'
    },
    activity: {
      title: 'കടയിലെ പ്രവർത്തനങ്ങളുടെ ടൈംലൈൻ',
      subtitle: 'സ്റ്റോക്ക്, വിൽപ്പന മാറ്റങ്ങളുടെ തത്സമയ ലോഗ്',
      liveLog: 'തത്സമയ ലോഗ്',
      noActivity: 'സമീപകാല പ്രവർത്തനങ്ങളൊന്നുമില്ല.',
      justNow: 'ഇപ്പോൾ',
      minAgo: 'മിനിറ്റ് മുൻപ്',
      hrAgo: 'മണിക്കൂർ മുൻപ്',
      daysAgo: 'ദിവസം മുൻപ്'
    },
    modals: {
      addNewProduct: 'പുതിയ സാധനം ചേർക്കുക',
      editProduct: 'ഉൽപ്പന്ന വിവരങ്ങൾ മാറ്റുക',
      recordSaleTitle: 'വിൽപ്പന ഇടപാട് രേഖപ്പെടുത്തുക',
      productNameEn: 'ഉൽപ്പന്നത്തിന്റെ പേര് (ഇംഗ്ലീഷ്) *',
      productNameRegional: 'മലയാളം / പ്രാദേശിക പേര് (ഓപ്ഷണൽ)',
      initialStock: 'പ്രാരംഭ സ്റ്റോക്ക് അളവ് *',
      currentStock: 'നിലവിലെ സ്റ്റോക്ക് *',
      unit: 'യൂണിറ്റ് *',
      pricePerUnit: 'യൂണിറ്റ് വില (₹) *',
      lowStockAlert: 'കുറഞ്ഞ സ്റ്റോക്ക് മുന്നറിയിപ്പ് പരിധി',
      cancel: 'റദ്ദാക്കുക',
      saveProduct: 'സാധനം സൂക്ഷിക്കുക',
      updateProduct: 'അപ്ഡേറ്റ് ചെയ്യുക',
      selectProduct: 'സാധനം തിരഞ്ഞെടുക്കുക *',
      soldQuantity: 'വിറ്റ അളവ് *',
      totalSaleAmount: 'ആകെ വിൽപ്പന തുക (₹) *',
      recordSaleSubmit: 'വിൽപ്പന രേഖപ്പെടുത്തുക',
      validQuantityError: 'സാധുവായ അളവ് രേഖപ്പെടുത്തുക.',
      insufficientStockError: 'സ്റ്റോക്കിൽ ആവശ്യത്തിന് സാധനമില്ല!'
    },
    settings: {
      title: 'കടയുടെ ക്രമീകരണങ്ങളും പ്രാദേശിക സംഭരണവും',
      langSection: 'പ്രധാന വോയ്‌സ് & ഭാഷ',
      thresholdTitle: 'കുറഞ്ഞ സ്റ്റോക്ക് മുന്നറിയിപ്പ് പരിധി',
      thresholdDesc: 'ഇതിൽ താഴെയായാൽ മുന്നറിയിപ്പ് കാണിക്കും',
      voiceConfirmation: 'വോയ്‌സ് ഓഡിയോ പ്രതികരണം (TTS)',
      voiceDesc: 'വിൽപ്പന അല്ലെങ്കിൽ സ്റ്റോക്ക് മാറ്റങ്ങൾ ശബ്ദത്തിലൂടെ സ്ഥിരീകരിക്കും',
      demoMode: 'ഡെമോ സ്റ്റോർ മോഡ്',
      demoDesc: 'പരിശോധനയ്ക്കായി ഡെമോ പലചരക്ക് സാധനങ്ങൾ ലോഡ് ചെയ്യുക',
      dbManagement: 'ഡാറ്റാബേസും ബാക്കപ്പും',
      resetDemo: 'ഡെമോ ഡാറ്റ പുനഃസ്ഥാപിക്കുക',
      exportBackup: 'ഡാറ്റ ബാക്കപ്പ് ഡൗൺലോഡ് ചെയ്യുക (JSON)',
      clearAll: 'എല്ലാ ഡാറ്റയും മായ്ക്കുക',
      clearWarning: 'ഇത് ഈ ഉപകരണത്തിൽ നിന്ന് എല്ലാ വിവരങ്ങളും ശാശ്വതമായി ഇല്ലാതാക്കും.',
      confirmClear: 'അതെ, എല്ലാം മായ്ക്കുക',
      saveChanges: 'ക്രമീകരണങ്ങൾ സൂക്ഷിക്കുക'
    },
    offlinePanel: {
      title: '100% സ്വകാര്യവും പൂർണ്ണമായും ഓഫ്‌ലൈനുമായ സാങ്കേതികവിദ്യ',
      subtitle: 'നിങ്ങളുടെ ബ്രൗസറിൽ തന്നെ പൂർണ്ണമായി പ്രവർത്തിക്കുന്നു. ഇന്റർനെറ്റ് ആവശ്യമില്ല.',
      badge: 'ഇന്റർനെറ്റ് ആവശ്യമില്ല',
      feat1Title: 'ലോക്കൽ IndexedDB സംഭരണം',
      feat1Desc: 'എല്ലാ ഉൽപ്പന്നങ്ങളും വിൽപ്പന രേഖകളും നിങ്ങളുടെ ഫോണിൽ തന്നെ സുരക്ഷിതമായിരിക്കും.',
      feat2Title: 'ബ്രൗസർ സ്പീച്ച് എഞ്ചിൻ',
      feat2Desc: 'ശബ്ദം തിരിച്ചറിയുന്നതും സംസാരിക്കുന്നതും ബ്രൗസർ വഴിയാണ്.',
      feat3Title: 'തടസ്സമില്ലാത്ത തത്സമയ ബില്ലിംഗ്',
      feat3Desc: 'ഇന്റർനെറ്റ് ഇല്ലാതെയും ശബ്ദത്തിലൂടെ പെട്ടെന്ന് സ്റ്റോക്ക് അപ്ഡേറ്റ് ചെയ്യാം.'
    },
    conversation: {
      you: 'വ്യാപാരി',
      assistant: 'സഹായക് AI',
      spokenResponseLabel: 'വോയ്‌സ് മറുപടി:',
      replayVoice: 'വോയ്‌സ് വീണ്ടും കേൾക്കുക',
      errorApology: 'എനിക്ക് മനസ്സിലായില്ല. ദയവായി "20 കുപ്പി വെള്ളം ചേർക്കുക" അല്ലെങ്കിൽ "ഇന്നത്തെ വരുമാനം എത്ര" എന്ന് പറയൂ.'
    },
    auth: {
        "loginTitle": "കടയുടമ ലോഗിൻ",
        "loginSubtitle": "ഓഫ്‌ലൈനായി നിങ്ങളുടെ സ്റ്റോർ അക്കൗണ്ടുകളും സ്റ്റോക്കും കൈകാര്യം ചെയ്യുക",
        "signUpTitle": "പുതിയ കട രജിസ്ട്രേഷൻ",
        "signUpSubtitle": "10 സെക്കൻഡിൽ നിങ്ങളുടെ പലചരക്ക് കട ആരംഭിക്കുക",
        "emailLabel": "ഇമെയിൽ വിലാസം (ലോഗിനും ബില്ലുകൾക്കും)",
        "emailPlaceholder": "ഉദാ. store@gmail.com",
        "phoneOrNameLabel": "ഇമെയിൽ വിലാസം അല്ലെങ്കിൽ മൊബൈൽ നമ്പർ",
        "phoneOrNamePlaceholder": "ഉദാ. store@gmail.com അല്ലെങ്കിൽ 9876543210",
        "pinLabel": "4-അക്ക സെക്യൂരിറ്റി പിൻ (PIN)",
        "pinPlaceholder": "4 അക്ക പിൻ നൽകുക (സ്ഥിരസ്ഥിതി: 1234)",
        "ownerNameLabel": "ഉടമയുടെ പേര്",
        "ownerNamePlaceholder": "ഉദാ. രമേഷ് കുമാർ",
        "shopNameLabel": "കടയുടെ പേര്",
        "shopNamePlaceholder": "ഉദാ. രമേഷ് പലചരക്ക് കട",
        "categoryLabel": "ബിസിനസ്സ് വിഭാഗം",
        "categoryPlaceholder": "പലചരക്ക് / ജനറൽ സ്റ്റോർ",
        "loginBtn": "ലോഗിൻ ചെയ്യുക",
        "signUpBtn": "രജിസ്റ്റർ ചെയ്യുക",
        "switchTabLogin": "ലോഗിൻ",
        "switchTabSignUp": "പുതിയ രജിസ്ട്രേഷൻ",
        "demoProfilesTitle": "1-ക്ലിക്ക് ഡെമോ പ്രൊഫൈലുകൾ",
        "demoProfilesDesc": "പാസ്‌വേഡ് ഇല്ലാതെ തൽക്ഷണം മാറ്റുക",
        "switchAccount": "കട മാറ്റുക",
        "logout": "ലോഗൗട്ട്",
        "profileTitle": "കട പ്രൊഫൈൽ",
        "currentShop": "സജീവ കട",
        "loggedInAs": "ലോഗിൻ ചെയ്തത്:"
    },
    wholesale: {
        "title": "വാട്ട്‌സ്ആപ്പ് മൊത്ത ഓർഡർ",
        "subtitle": "കുറഞ്ഞ സ്റ്റോക്ക് സാധനങ്ങൾ 1-ക്ലിക്കിൽ വിതരണക്കാരന് ഓർഡർ ചെയ്യുക",
        "distributorLabel": "മൊത്ത വ്യാപാരിയുടെ പേര്",
        "distributorPhoneLabel": "വാട്ട്‌സ്ആപ്പ് മൊബൈൽ നമ്പർ",
        "selectDistributorPlaceholder": "വിതരണക്കാരനെ തിരഞ്ഞെടുക്കുക...",
        "orderItemsTitle": "ഓർഡർ ഇനങ്ങൾ",
        "noLowStockMessage": "സ്റ്റോക്ക് ലഭ്യമാണ്! നിങ്ങൾക്ക് ഇനങ്ങൾ ചേർക്കാം.",
        "addItemBtn": "+ ഇനം ചേർക്കുക",
        "selectProductPlaceholder": "ഉൽപ്പന്നം തിരഞ്ഞെടുക്കുക...",
        "orderQtyLabel": "ഓർഡർ അളവ്",
        "currentStockLabel": "നിലവിലെ സ്റ്റോക്ക്",
        "notesLabel": "കുറിപ്പ്",
        "notesPlaceholder": "ഉദാ. ഇന്ന് വൈകുന്നേരത്തിനകം എത്തിക്കുക...",
        "previewTitle": "വാട്ട്‌സ്ആപ്പ് സന്ദേശ പ്രിവ്യൂ",
        "sendWhatsAppBtn": "വാട്ട്‌സ്ആപ്പിൽ ഓർഡർ അയക്കുക",
        "copyTextBtn": "ടെക്സ്റ്റ് പകർത്തുക",
        "copiedSuccess": "പകർത്തി!",
        "urgentBadge": "കുറഞ്ഞ സ്റ്റോക്ക്"
    },


    suggestions: [
      '20 കിലോ അരി 1200 രൂപയ്ക്ക് വിറ്റു',
      '3 കുപ്പി വെള്ളം 90 രൂപയ്ക്ക് വിറ്റു',
      '20 കുപ്പി വെള്ളം ചേർക്കുക',
      'വെള്ളം എത്ര സ്റ്റോക്ക് ബാക്കിയുണ്ട്',
      'ഇന്നത്തെ ആകെ വരുമാനം എത്ര',
      'കുറഞ്ഞ സ്റ്റോക്ക്'
    ]
  }
};

/**
 * Localized Product Names Dictionary
 */
export const PRODUCT_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    'Water': 'Water',
    'Rice': 'Rice',
    'Biscuits': 'Biscuits',
    'Milk': 'Milk',
    'Soap': 'Soap',
    'Sugar': 'Sugar',
    'Tea': 'Tea',
    'Cooking Oil': 'Cooking Oil',
    'Wheat': 'Wheat'
  },
  gu: {
    'Water': 'પાણી',
    'Rice': 'ચોખા',
    'Biscuits': 'બિસ્કિટ',
    'Milk': 'દૂધ',
    'Soap': 'સાબુ',
    'Sugar': 'ખાંડ',
    'Tea': 'ચા',
    'Cooking Oil': 'તેલ',
    'Wheat': 'ઘઉં'
  },
  hi: {
    'Water': 'पानी',
    'Rice': 'चावल',
    'Biscuits': 'बिस्कुट',
    'Milk': 'दूध',
    'Soap': 'साबुन',
    'Sugar': 'चीनी',
    'Tea': 'चाय',
    'Cooking Oil': 'तेल',
    'Wheat': 'गेहूं'
  },
  mr: {
    'Water': 'पाणी',
    'Rice': 'तांदूळ',
    'Biscuits': 'बिस्किट',
    'Milk': 'दूध',
    'Soap': 'साबण',
    'Sugar': 'साखर',
    'Tea': 'चहा',
    'Cooking Oil': 'तेल',
    'Wheat': 'गहू'
  },
  ta: {
    'Water': 'தண்ணீர்',
    'Rice': 'அரிசி',
    'Biscuits': 'பிஸ்கட்',
    'Milk': 'பால்',
    'Soap': 'சோப்',
    'Sugar': 'சர்க்கரை',
    'Tea': 'தேநீர்',
    'Cooking Oil': 'எண்ணெய்',
    'Wheat': 'கோதுமை'
  },
  te: {
    'Water': 'నీళ్లు',
    'Rice': 'బియ్యం',
    'Biscuits': 'బిస్కెట్లు',
    'Milk': 'పాలు',
    'Soap': 'సబ్బు',
    'Sugar': 'పంచదార',
    'Tea': 'టీ',
    'Cooking Oil': 'నూనె',
    'Wheat': 'గోధుమలు'
  },
  bn: {
    'Water': 'জল',
    'Rice': 'চাল',
    'Biscuits': 'বিস্কুট',
    'Milk': 'দুধ',
    'Soap': 'সাবান',
    'Sugar': 'চিনি',
    'Tea': 'চা',
    'Cooking Oil': 'তেল',
    'Wheat': 'গম'
  },
  kn: {
    'Water': 'ನೀರು',
    'Rice': 'ಅಕ್ಕಿ',
    'Biscuits': 'ಬಿಸ್ಕತ್ತು',
    'Milk': 'ಹಾಲು',
    'Soap': 'ಸೋಪ್',
    'Sugar': 'ಸಕ್ಕರೆ',
    'Tea': 'ಟೀ',
    'Cooking Oil': 'ಎಣ್ಣೆ',
    'Wheat': 'ಗೋಧಿ'
  },
  ml: {
    'Water': 'വെള്ളം',
    'Rice': 'അരി',
    'Biscuits': 'ബിസ്കറ്റ്',
    'Milk': 'പാൽ',
    'Soap': 'സോപ്പ്',
    'Sugar': 'പഞ്ചസാര',
    'Tea': 'ചായ',
    'Cooking Oil': 'എണ്ണ',
    'Wheat': 'ഗോതമ്പ്'
  }
};

/**
 * Localized Unit Names Dictionary
 */
export const UNIT_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: { kg: 'kg', bottles: 'bottles', packets: 'packets', bars: 'bars', liters: 'liters', pieces: 'pieces', g: 'g', boxes: 'boxes' },
  gu: { kg: 'કિલો', bottles: 'બોટલ', packets: 'પેકેટ', bars: 'સાબુ', liters: 'લિટર', pieces: 'નંગ', g: 'ગ્રામ', boxes: 'પેટી' },
  hi: { kg: 'किलो', bottles: 'बोतल', packets: 'पैकेट', bars: 'बार', liters: 'लीटर', pieces: 'पीस', g: 'ग्राम', boxes: 'डिब्बा' },
  mr: { kg: 'किलो', bottles: 'बाटली', packets: 'पाकीट', bars: 'बार', liters: 'लिटर', pieces: 'नग', g: 'ग्रॅम', boxes: 'पेटी' },
  ta: { kg: 'கிலோ', bottles: 'பாட்டில்', packets: 'பாக்கெட்', bars: 'சோப்', liters: 'லிட்டர்', pieces: 'துண்டு', g: 'கிராம்', boxes: 'பெட்டி' },
  te: { kg: 'కిలో', bottles: 'బాటిల్', packets: 'ప్యాకెట్', bars: 'బార్', liters: 'లీటర్', pieces: 'ముక్క', g: 'గ్రాము', boxes: 'పెట్టె' },
  bn: { kg: 'কেজি', bottles: 'বোতল', packets: 'প্যাকেট', bars: 'বার', liters: 'লিটার', pieces: 'পিস', g: 'গ্রাম', boxes: 'বাক্স' },
  kn: { kg: 'ಕೆಜಿ', bottles: 'ಬಾಟಲ್', packets: 'ಪ್ಯಾಕೆಟ್', bars: 'ಬಾರ್', liters: 'ಲೀಟರ್', pieces: 'ತುಂಡು', g: 'ಗ್ರಾಂ', boxes: 'ಪೆಟ್ಟಿಗೆ' },
  ml: { kg: 'കിലോ', bottles: 'കുപ്പി', packets: 'പാക്കറ്റ്', bars: 'ബാർ', liters: 'ലിറ്റർ', pieces: 'കഷണം', g: 'ഗ്രാം', boxes: 'പെട്ടി' }
};

/**
 * Helper to get localized product name
 */
export function getLocalizedProductName(name: string, lang: SupportedLanguage): string {
  const dict = PRODUCT_TRANSLATIONS[lang] || PRODUCT_TRANSLATIONS.en;
  return dict[name] || name;
}

/**
 * Helper to get localized unit name
 */
export function getLocalizedUnitName(unit: string, lang: SupportedLanguage): string {
  const dict = UNIT_TRANSLATIONS[lang] || UNIT_TRANSLATIONS.en;
  return dict[unit] || unit;
}

/**
 * Helper to localize activity messages
 */
export function getLocalizedActivityMessage(
  act: { type: string; message: string; hindiMessage?: string },
  lang: SupportedLanguage
): string {
  if (lang === 'en') return act.message;
  if (lang === 'hi' && act.hindiMessage) return act.hindiMessage;

  const msg = act.message;

  // 1. ADD_STOCK: e.g. "Added 20 bottles of Water"
  const addMatch = msg.match(/(?:Added|Adjusted stock for)\s+(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?\s+(?:of\s+)?([a-zA-Z\s]+)/i);
  if (addMatch) {
    const qty = addMatch[1];
    const unitRaw = addMatch[2] || '';
    const prodRaw = addMatch[3].trim();
    const prod = getLocalizedProductName(prodRaw, lang);
    const unit = getLocalizedUnitName(unitRaw, lang);

    switch (lang) {
      case 'gu': return `${qty} ${unit} ${prod} સ્ટોક ઉમેરાયો`;
      case 'hi': return `${qty} ${unit} ${prod} का स्टॉक जोड़ा गया`;
      case 'mr': return `${qty} ${unit} ${prod} साठा जोडला`;
      case 'ta': return `${qty} ${unit} ${prod} சேர்க்கப்பட்டது`;
      case 'te': return `${qty} ${unit} ${prod} జోడించబడింది`;
      case 'bn': return `${qty} ${unit} ${prod} যোগ করা হয়েছে`;
      case 'kn': return `${qty} ${unit} ${prod} ಸೇರಿಸಲಾಗಿದೆ`;
      case 'ml': return `${qty} ${unit} ${prod} ചേർത്തു`;
    }
  }

  // 2. SALE: e.g. "Sold 20 kg of Rice for ₹1200"
  const saleMatch = msg.match(/Sold\s+(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?\s+(?:of\s+)?([a-zA-Z\s]+?)\s+for\s+[₹$](\d+(?:\.\d+)?)/i);
  if (saleMatch) {
    const qty = saleMatch[1];
    const unitRaw = saleMatch[2] || '';
    const prodRaw = saleMatch[3].trim();
    const amt = saleMatch[4];
    const prod = getLocalizedProductName(prodRaw, lang);
    const unit = getLocalizedUnitName(unitRaw, lang);

    switch (lang) {
      case 'gu': return `${qty} ${unit} ${prod} ₹${amt} માં વેચ્યું`;
      case 'hi': return `${qty} ${unit} ${prod} ₹${amt} में बेचा`;
      case 'mr': return `${qty} ${unit} ${prod} ₹${amt} मध्ये विकले`;
      case 'ta': return `${qty} ${unit} ${prod} ₹${amt}க்கு விற்றது`;
      case 'te': return `${qty} ${unit} ${prod} ₹${amt}కు அమ్మాము`;
      case 'bn': return `${qty} ${unit} ${prod} ₹${amt} টাকায় বিক্রি`;
      case 'kn': return `${qty} ${unit} ${prod} ₹${amt} ಗೆ ಮಾರಾಟ`;
      case 'ml': return `${qty} ${unit} ${prod} ₹${amt} രൂപയ്ക്ക് വിറ്റു`;
    }
  }

  // 3. CHECK_EARNINGS
  if (act.type === 'CHECK_EARNINGS') {
    switch (lang) {
      case 'gu': return 'આજની કમાણી તપાસી';
      case 'hi': return 'आज की कमाई की जांच की';
      case 'mr': return 'आजच्या कमाईचा आढावा घेतला';
      case 'ta': return 'இன்றைய வருமானம் பார்க்கப்பட்டது';
      case 'te': return 'నేటి సంపాదన తనిఖీ చేయబడింది';
      case 'bn': return 'আজকের আয় পরীক্ষা করা হয়েছে';
      case 'kn': return 'ಇಂದಿನ ಗಳಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ';
      case 'ml': return 'ഇന്നത്തെ വരുമാനം പരിശോധിച്ചു';
    }
  }

  // 4. LOW_STOCK
  if (act.type === 'LOW_STOCK') {
    switch (lang) {
      case 'gu': return 'ઓછા સ્ટોકની ચેતવણી તપાસી';
      case 'hi': return 'कम स्टॉक वाले उत्पाद पहचाने गए';
      case 'mr': return 'कमी साठा असलेल्या वस्तू तपासल्या';
      case 'ta': return 'குறைந்த இருப்பு எச்சரிக்கை சரிபார்க்கப்பட்டது';
      case 'te': return 'తక్కువ స్టాక్ హెచ్చరిక తనిఖీ చేయబడింది';
      case 'bn': return 'কম স্টকের সতর্কতা পরীক্ষা করা হয়েছে';
      case 'kn': return 'ಕಡಿಮೆ ದಾಸ್ತಾನು ಎಚ್ಚರಿಕೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ';
      case 'ml': return 'കുറഞ്ഞ സ്റ്റോക്ക് മുന്നറിയിപ്പ് പരിശോധിച്ചു';
    }
  }

  return act.hindiMessage || act.message;
}
