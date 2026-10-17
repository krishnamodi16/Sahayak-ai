import { Product, SaleTransaction, ActivityLog, AppSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-rice',
    name: 'Rice',
    hindiName: 'चावल',
    aliases: ['chawal', 'chaawal', 'rice', 'चावल', 'basmati', 'kolam'],
    quantity: 25,
    unit: 'kg',
    price: 60,
    lowStockThreshold: 5,
    category: 'Grains & Pulses',
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 3600000
  },
  {
    id: 'prod-water',
    name: 'Water',
    hindiName: 'पानी',
    aliases: ['pani', 'water', 'paani', 'पानी', 'bisleri', 'aquafina', 'water bottle', 'bottle'],
    quantity: 8,
    unit: 'bottles',
    price: 20,
    lowStockThreshold: 5,
    category: 'Beverages',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 1800000
  },
  {
    id: 'prod-biscuits',
    name: 'Biscuits',
    hindiName: 'बिस्कुट',
    aliases: ['biscuit', 'biscuits', 'parle g', 'good day', 'बिस्कुट', 'बिस्कुट पैकेट'],
    quantity: 3,
    unit: 'packets',
    price: 10,
    lowStockThreshold: 5,
    category: 'Snacks',
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 5400000
  },
  {
    id: 'prod-milk',
    name: 'Milk',
    hindiName: 'दूध',
    aliases: ['milk', 'doodh', 'dudh', 'दूध', 'amul', 'mother dairy'],
    quantity: 12,
    unit: 'packets',
    price: 30,
    lowStockThreshold: 5,
    category: 'Dairy',
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 7200000
  },
  {
    id: 'prod-soap',
    name: 'Soap',
    hindiName: 'साबुन',
    aliases: ['soap', 'sabun', 'saabun', 'साबुन', 'lifebuoy', 'dettol', 'lux'],
    quantity: 15,
    unit: 'bars',
    price: 35,
    lowStockThreshold: 5,
    category: 'Personal Care',
    createdAt: Date.now() - 86400000 * 8,
    updatedAt: Date.now() - 14400000
  },
  {
    id: 'prod-sugar',
    name: 'Sugar',
    hindiName: 'चीनी',
    aliases: ['sugar', 'cheeni', 'chini', 'shakkar', 'चीनी', 'शक्कर'],
    quantity: 10,
    unit: 'kg',
    price: 44,
    lowStockThreshold: 5,
    category: 'Grains & Pulses',
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 9000000
  },
  {
    id: 'prod-tea',
    name: 'Tea',
    hindiName: 'चाय पत्ती',
    aliases: ['tea', 'chai', 'chay', 'chai patti', 'चाय', 'चाय पत्ती', 'taj mahal', 'tata tea'],
    quantity: 6,
    unit: 'packets',
    price: 120,
    lowStockThreshold: 5,
    category: 'Beverages',
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 10800000
  },
  {
    id: 'prod-oil',
    name: 'Cooking Oil',
    hindiName: 'तेल',
    aliases: ['oil', 'cooking oil', 'tel', 'mustard oil', 'sunflower oil', 'तेल', 'सरसों तेल'],
    quantity: 4,
    unit: 'liters',
    price: 145,
    lowStockThreshold: 5,
    category: 'Cooking Essentials',
    createdAt: Date.now() - 86400000 * 9,
    updatedAt: Date.now() - 3600000
  }
];

export const INITIAL_SALES: SaleTransaction[] = [
  {
    id: 'sale-101',
    productId: 'prod-water',
    productName: 'Water',
    quantity: 3,
    unit: 'bottles',
    unitPrice: 30,
    amount: 90,
    type: 'Sale',
    timestamp: Date.now() - 1000 * 60 * 25 // 25 mins ago
  },
  {
    id: 'sale-102',
    productId: 'prod-rice',
    productName: 'Rice',
    quantity: 5,
    unit: 'kg',
    unitPrice: 60,
    amount: 300,
    type: 'Sale',
    timestamp: Date.now() - 1000 * 60 * 55 // 55 mins ago
  },
  {
    id: 'sale-103',
    productId: 'prod-biscuits',
    productName: 'Biscuits',
    quantity: 10,
    unit: 'packets',
    unitPrice: 10,
    amount: 100,
    type: 'Sale',
    timestamp: Date.now() - 1000 * 60 * 110 // ~2 hours ago
  },
  {
    id: 'sale-104',
    productId: 'prod-oil',
    productName: 'Cooking Oil',
    quantity: 10,
    unit: 'liters',
    unitPrice: 145,
    amount: 1450,
    type: 'Sale',
    timestamp: Date.now() - 1000 * 60 * 180 // ~3 hours ago
  },
  {
    id: 'sale-105',
    productId: 'prod-tea',
    productName: 'Tea',
    quantity: 12,
    unit: 'packets',
    unitPrice: 120,
    amount: 1440,
    type: 'Sale',
    timestamp: Date.now() - 1000 * 60 * 240 // ~4 hours ago
  },
  {
    id: 'sale-106',
    productId: 'prod-sugar',
    productName: 'Sugar',
    quantity: 15,
    unit: 'kg',
    unitPrice: 44,
    amount: 660,
    type: 'Sale',
    timestamp: Date.now() - 1000 * 60 * 300 // ~5 hours ago
  },
  {
    id: 'sale-107',
    productId: 'prod-milk',
    productName: 'Milk',
    quantity: 7,
    unit: 'packets',
    unitPrice: 30,
    amount: 210,
    type: 'Sale',
    timestamp: Date.now() - 1000 * 60 * 360 // ~6 hours ago
  }
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    type: 'SALE',
    message: 'Sold 3 bottles of Water for ₹90',
    hindiMessage: '3 बोतल पानी ₹90 में बेचा',
    timestamp: Date.now() - 1000 * 60 * 25
  },
  {
    id: 'act-2',
    type: 'SALE',
    message: 'Sold 5 kg Rice for ₹300',
    hindiMessage: '5 किलो चावल ₹300 में बेचा',
    timestamp: Date.now() - 1000 * 60 * 55
  },
  {
    id: 'act-3',
    type: 'ADD_STOCK',
    message: 'Added 20 kg Rice to inventory',
    hindiMessage: '20 किलो चावल का स्टॉक जोड़ा',
    timestamp: Date.now() - 1000 * 60 * 90
  },
  {
    id: 'act-4',
    type: 'SALE',
    message: 'Sold 10 packets of Biscuits for ₹100',
    hindiMessage: '10 पैकेट बिस्कुट ₹100 में बेचा',
    timestamp: Date.now() - 1000 * 60 * 110
  },
  {
    id: 'act-5',
    type: 'CHECK_STOCK',
    message: 'Checked stock of Water (8 bottles remaining)',
    hindiMessage: 'पानी का स्टॉक चेक किया (8 बोतल शेष)',
    timestamp: Date.now() - 1000 * 60 * 150
  },
  {
    id: 'act-6',
    type: 'CHECK_EARNINGS',
    message: 'Checked today\'s earnings',
    hindiMessage: 'आज की कमाई की जांच की',
    timestamp: Date.now() - 1000 * 60 * 200
  },
  {
    id: 'act-7',
    type: 'LOW_STOCK',
    message: 'Identified 2 low-stock products (Biscuits, Cooking Oil)',
    hindiMessage: '2 कम स्टॉक वाले उत्पाद पाए गए (बिस्कुट, तेल)',
    timestamp: Date.now() - 1000 * 60 * 260
  },
  {
    id: 'act-8',
    type: 'SYSTEM',
    message: 'SahayakAI initialized in 100% Offline Mode',
    hindiMessage: 'सहायक AI 100% ऑफलाइन मोड में सक्रिय',
    timestamp: Date.now() - 1000 * 60 * 360
  }
];

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  lowStockThreshold: 5,
  voiceFeedbackEnabled: true,
  speechRate: 1.0,
  demoMode: true,
  sttEngine: 'browser'
};
