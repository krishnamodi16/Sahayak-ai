import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Product, SaleTransaction, ActivityLog, AppSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SALES, INITIAL_ACTIVITIES, DEFAULT_SETTINGS } from '../data/demoData';

interface SahayakDBSchema extends DBSchema {
  products: {
    key: string;
    value: Product;
    indexes: { 'by-name': string; 'by-category': string };
  };
  sales: {
    key: string;
    value: SaleTransaction;
    indexes: { 'by-timestamp': number; 'by-product': string };
  };
  activities: {
    key: string;
    value: ActivityLog;
    indexes: { 'by-timestamp': number };
  };
  settings: {
    key: string;
    value: { key: string; data: any };
  };
}

const DB_NAME = 'SahayakAI_Offline_DB';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<SahayakDBSchema>> | null = null;

export function getDB(): Promise<IDBPDatabase<SahayakDBSchema>> {
  if (!dbPromise) {
    dbPromise = openDB<SahayakDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Products store
        if (!db.objectStoreNames.contains('products')) {
          const productStore = db.createObjectStore('products', { keyPath: 'id' });
          productStore.createIndex('by-name', 'name');
          productStore.createIndex('by-category', 'category');
        }

        // Sales store
        if (!db.objectStoreNames.contains('sales')) {
          const salesStore = db.createObjectStore('sales', { keyPath: 'id' });
          salesStore.createIndex('by-timestamp', 'timestamp');
          salesStore.createIndex('by-product', 'productId');
        }

        // Activities store
        if (!db.objectStoreNames.contains('activities')) {
          const activityStore = db.createObjectStore('activities', { keyPath: 'id' });
          activityStore.createIndex('by-timestamp', 'timestamp');
        }

        // Settings store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      },
    });
  }
  return dbPromise;
}

/**
 * Initialize DB and populate initial demo data if empty
 */
export async function initDatabase(): Promise<void> {
  const db = await getDB();
  const productCount = await db.count('products');
  
  if (productCount === 0) {
    console.log('[SahayakDB] First-time setup: Seeding realistic MSME demo data...');
    const tx = db.transaction(['products', 'sales', 'activities', 'settings'], 'readwrite');
    
    for (const p of INITIAL_PRODUCTS) {
      await tx.objectStore('products').put(p);
    }
    for (const s of INITIAL_SALES) {
      await tx.objectStore('sales').put(s);
    }
    for (const a of INITIAL_ACTIVITIES) {
      await tx.objectStore('activities').put(a);
    }
    await tx.objectStore('settings').put({ key: 'app_settings', data: DEFAULT_SETTINGS });
    
    await tx.done;
  }
}

// ---------------- Product Operations ----------------

export async function getAllProducts(): Promise<Product[]> {
  const db = await getDB();
  return db.getAll('products');
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const db = await getDB();
  return db.get('products', id);
}

export async function findProductByName(searchTerm: string): Promise<Product | undefined> {
  const db = await getDB();
  const allProducts = await db.getAll('products');
  const normalized = searchTerm.trim().toLowerCase();
  
  if (!normalized) return undefined;

  // 1. Direct match on name or hindiName
  const directMatch = allProducts.find(
    p => p.name.toLowerCase() === normalized || 
         (p.hindiName && p.hindiName.toLowerCase() === normalized)
  );
  if (directMatch) return directMatch;

  // 2. Match against aliases
  const aliasMatch = allProducts.find(
    p => p.aliases && p.aliases.some(alias => alias.toLowerCase() === normalized || normalized.includes(alias.toLowerCase()))
  );
  if (aliasMatch) return aliasMatch;

  // 3. Partial substring match
  const partialMatch = allProducts.find(
    p => p.name.toLowerCase().includes(normalized) || 
         normalized.includes(p.name.toLowerCase()) ||
         (p.hindiName && normalized.includes(p.hindiName.toLowerCase()))
  );
  return partialMatch;
}

type DataChangeListener = (type: 'product' | 'sale' | 'activity', item: any) => void;
let dataChangeListener: DataChangeListener | null = null;

export function setDataChangeListener(listener: DataChangeListener) {
  dataChangeListener = listener;
}

export async function saveProduct(product: Product): Promise<void> {
  const db = await getDB();
  const updatedProduct = {
    ...product,
    updatedAt: Date.now()
  };
  await db.put('products', updatedProduct);
  if (dataChangeListener) {
    dataChangeListener('product', updatedProduct);
  }
}

export async function updateProductStock(id: string, deltaQuantity: number): Promise<Product> {
  const db = await getDB();
  const tx = db.transaction('products', 'readwrite');
  const store = tx.objectStore('products');
  const product = await store.get(id);
  
  if (!product) {
    throw new Error(`Product with ID ${id} not found.`);
  }

  const newQty = Math.max(0, product.quantity + deltaQuantity);
  product.quantity = newQty;
  product.updatedAt = Date.now();
  
  await store.put(product);
  await tx.done;
  if (dataChangeListener) {
    dataChangeListener('product', product);
  }
  return product;
}

export async function deleteProduct(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('products', id);
}

// ---------------- Sales Operations ----------------

export async function getAllSales(): Promise<SaleTransaction[]> {
  const db = await getDB();
  const sales = await db.getAllFromIndex('sales', 'by-timestamp');
  return sales.reverse(); // Most recent first
}

export async function recordSale(sale: Omit<SaleTransaction, 'id' | 'timestamp'>): Promise<SaleTransaction> {
  const db = await getDB();
  const newSale: SaleTransaction = {
    ...sale,
    id: `sale-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: Date.now()
  };
  await db.put('sales', newSale);
  if (dataChangeListener) {
    dataChangeListener('sale', newSale);
  }
  return newSale;
}

// ---------------- Activity Operations ----------------

export async function getAllActivities(): Promise<ActivityLog[]> {
  const db = await getDB();
  const activities = await db.getAllFromIndex('activities', 'by-timestamp');
  return activities.reverse(); // Most recent first
}

export async function logActivity(type: ActivityLog['type'], message: string, hindiMessage?: string): Promise<ActivityLog> {
  const db = await getDB();
  const activity: ActivityLog = {
    id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type,
    message,
    hindiMessage: hindiMessage || message,
    timestamp: Date.now()
  };
  await db.put('activities', activity);
  if (dataChangeListener) {
    dataChangeListener('activity', activity);
  }
  return activity;
}

// ---------------- Settings Operations ----------------

export async function getSettings(): Promise<AppSettings> {
  const db = await getDB();
  const record = await db.get('settings', 'app_settings');
  return record ? record.data : DEFAULT_SETTINGS;
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  const db = await getDB();
  await db.put('settings', { key: 'app_settings', data: settings });
}

// ---------------- Reset & Management ----------------

export async function resetDatabaseToDemo(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(['products', 'sales', 'activities', 'settings'], 'readwrite');
  
  await tx.objectStore('products').clear();
  await tx.objectStore('sales').clear();
  await tx.objectStore('activities').clear();
  
  for (const p of INITIAL_PRODUCTS) {
    await tx.objectStore('products').put(p);
  }
  for (const s of INITIAL_SALES) {
    await tx.objectStore('sales').put(s);
  }
  for (const a of INITIAL_ACTIVITIES) {
    await tx.objectStore('activities').put(a);
  }
  await tx.objectStore('settings').put({ key: 'app_settings', data: DEFAULT_SETTINGS });
  
  await tx.done;
}

export async function clearAllUserData(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(['products', 'sales', 'activities'], 'readwrite');
  await tx.objectStore('products').clear();
  await tx.objectStore('sales').clear();
  await tx.objectStore('activities').clear();
  await tx.done;
}

export async function exportDatabaseBackup(): Promise<string> {
  const db = await getDB();
  const products = await db.getAll('products');
  const sales = await db.getAll('sales');
  const activities = await db.getAll('activities');
  const settings = await getSettings();

  const backupData = {
    exportedAt: new Date().toISOString(),
    appName: 'SahayakAI',
    version: '1.0.0',
    products,
    sales,
    activities,
    settings
  };

  return JSON.stringify(backupData, null, 2);
}
