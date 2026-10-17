export type UnitType = 'kg' | 'g' | 'bottles' | 'packets' | 'bars' | 'liters' | 'pieces' | 'units' | 'boxes';

export interface ShopkeeperUser {
  id: string;
  ownerName: string;
  shopName: string;
  email?: string;
  phone: string;
  pin: string; // 4-digit PIN
  category: string;
  language: SupportedLanguage;
  createdAt: number;
  lastLoginAt: number;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  aliases?: string[];
  quantity: number;
  unit: UnitType;
  price: number; // in INR
  lowStockThreshold: number;
  category?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SaleTransaction {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: UnitType;
  unitPrice: number;
  amount: number; // in INR
  type: 'Sale' | 'Manual Sale';
  timestamp: number;
}

export interface WholesaleOrderItem {
  productId: string;
  productName: string;
  hindiName?: string;
  quantity: number;
  unit: UnitType;
  currentStock: number;
  notes?: string;
}

export interface WholesaleOrder {
  id: string;
  distributorName: string;
  distributorPhone: string;
  items: WholesaleOrderItem[];
  notes?: string;
  createdAt: number;
}

export type ActivityType = 'ADD_STOCK' | 'SALE' | 'CHECK_STOCK' | 'CHECK_EARNINGS' | 'LOW_STOCK' | 'UPDATE_PRICE' | 'EDIT_PRODUCT' | 'DELETE_PRODUCT' | 'DEMO_RESET' | 'SYSTEM' | 'AUTH' | 'WHOLESALE_ORDER';

export interface ActivityLog {
  id: string;
  type: ActivityType;
  message: string;
  hindiMessage?: string;
  timestamp: number;
}

export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu' | 'kn' | 'ml';

export type SpeechState = 'idle' | 'listening' | 'processing' | 'success' | 'error';

export interface AppSettings {
  language: SupportedLanguage;
  lowStockThreshold: number;
  voiceFeedbackEnabled: boolean;
  speechRate: number; // 0.8 to 1.2
  demoMode: boolean;
  sttEngine: 'browser' | 'offline_vosk';
}

export type IntentType = 
  | 'ADD_STOCK'
  | 'RECORD_SALE'
  | 'CHECK_STOCK'
  | 'CHECK_EARNINGS'
  | 'LOW_STOCK'
  | 'UPDATE_PRICE'
  | 'WHOLESALE_ORDER'
  | 'HELP'
  | 'UNKNOWN';

export interface ParsedIntent {
  intent: IntentType;
  confidence: number;
  rawText: string;
  language: SupportedLanguage;
  entities: {
    productName?: string;
    quantity?: number;
    unit?: UnitType;
    amount?: number;
    pricePerUnit?: number;
  };
  errorReason?: 'MISSING_QUANTITY' | 'MISSING_AMOUNT' | 'MISSING_PRODUCT' | 'UNKNOWN_COMMAND';
}

export interface ExecutionResult {
  success: boolean;
  intent: IntentType;
  message: string;
  hindiMessage?: string;
  spokenResponseEn: string;
  spokenResponseHi?: string;
  spokenResponse?: string;
  phoneticSpoken?: string;
  data?: any;
}
