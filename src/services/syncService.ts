import { apiClient } from './apiClient';
import { getDB, getAllProducts, getAllSales, getAllActivities, setDataChangeListener } from './database';
import { Product, SaleTransaction, ActivityLog } from '../types';

export type SyncState = 'connected' | 'syncing' | 'offline' | 'error';

export interface SyncStatusInfo {
  state: SyncState;
  isBackendConnected: boolean;
  isOnline: boolean;
  lastSyncTime: number | null;
  errorMessage?: string;
}

type SyncListener = (info: SyncStatusInfo) => void;

const LAST_SYNC_KEY = 'sahayak_last_sync_timestamp';

class SyncService {
  private listeners: Set<SyncListener> = new Set();
  private state: SyncState = 'offline';
  private isBackendConnected = false;
  private isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private lastSyncTime: number | null = null;
  private errorMessage?: string;
  private heartbeatTimer: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const storedLastSync = localStorage.getItem(LAST_SYNC_KEY);
      if (storedLastSync) {
        this.lastSyncTime = parseInt(storedLastSync, 10);
      }

      window.addEventListener('online', () => this.handleNetworkChange(true));
      window.addEventListener('offline', () => this.handleNetworkChange(false));

      // Start periodic health/sync check
      this.checkBackend();
      this.heartbeatTimer = setInterval(() => {
        this.checkBackend();
      }, 15000); // Check every 15 seconds
    }
  }

  public subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener);
    listener(this.getStatus());
    return () => this.listeners.delete(listener);
  }

  public getStatus(): SyncStatusInfo {
    return {
      state: this.state,
      isBackendConnected: this.isBackendConnected,
      isOnline: this.isOnline,
      lastSyncTime: this.lastSyncTime,
      errorMessage: this.errorMessage
    };
  }

  private notify() {
    const status = this.getStatus();
    this.listeners.forEach(fn => fn(status));
  }

  private handleNetworkChange(isOnline: boolean) {
    this.isOnline = isOnline;
    if (!isOnline) {
      this.state = 'offline';
      this.isBackendConnected = false;
      this.notify();
    } else {
      this.checkBackend(true);
    }
  }

  public async checkBackend(triggerSync = false): Promise<boolean> {
    try {
      await apiClient.health();
      this.isBackendConnected = true;
      if (this.state === 'offline' || this.state === 'error') {
        this.state = 'connected';
      }
      this.errorMessage = undefined;
      this.notify();

      if (triggerSync) {
        await this.syncNow();
      }
      return true;
    } catch {
      this.isBackendConnected = false;
      this.state = 'offline';
      this.notify();
      return false;
    }
  }

  /**
   * Bi-directional Full Sync:
   * 1. Push local changes to SQLite backend
   * 2. Pull newest items from SQLite backend into IndexedDB
   */
  public async syncNow(): Promise<boolean> {
    if (this.state === 'syncing') return false;

    this.state = 'syncing';
    this.notify();

    try {
      const db = await getDB();

      // Step 1: Read local data from IndexedDB
      const localProducts = await getAllProducts();
      const localSales = await getAllSales();
      const localActivities = await getAllActivities();

      // Step 2: Push local data to Backend SQLite
      await apiClient.sync.push({
        products: localProducts,
        sales: localSales,
        activities: localActivities
      });

      // Step 3: Pull latest from server
      const since = this.lastSyncTime ? Math.max(0, this.lastSyncTime - 60000) : 0; // buffer 1 min
      const pullResult = await apiClient.sync.pull(since);

      if (pullResult.success && pullResult.data) {
        const { products: remoteProducts, sales: remoteSales, activities: remoteActivities } = pullResult.data;

        // Upsert pulled products into IndexedDB
        if (remoteProducts && remoteProducts.length > 0) {
          const txProd = db.transaction('products', 'readwrite');
          for (const p of remoteProducts) {
            await txProd.objectStore('products').put(p);
          }
          await txProd.done;
        }

        // Upsert pulled sales into IndexedDB
        if (remoteSales && remoteSales.length > 0) {
          const txSales = db.transaction('sales', 'readwrite');
          for (const s of remoteSales) {
            await txSales.objectStore('sales').put(s);
          }
          await txSales.done;
        }

        // Upsert pulled activities into IndexedDB
        if (remoteActivities && remoteActivities.length > 0) {
          const txAct = db.transaction('activities', 'readwrite');
          for (const a of remoteActivities) {
            await txAct.objectStore('activities').put(a);
          }
          await txAct.done;
        }
      }

      const now = Date.now();
      this.lastSyncTime = now;
      localStorage.setItem(LAST_SYNC_KEY, now.toString());

      this.isBackendConnected = true;
      this.state = 'connected';
      this.errorMessage = undefined;
      this.notify();
      return true;
    } catch (err: any) {
      console.warn('[SyncService] Sync encountered issue:', err.message);
      this.state = this.isBackendConnected ? 'connected' : 'offline';
      this.errorMessage = err.message;
      this.notify();
      return false;
    }
  }

  /**
   * Asynchronous fire-and-forget push of a single item if online
   */
  public async pushItem(type: 'product' | 'sale' | 'activity', item: any) {
    if (!this.isBackendConnected) return;

    try {
      if (type === 'product') {
        await apiClient.products.create(item);
      } else if (type === 'sale') {
        await apiClient.sales.create(item);
      } else if (type === 'activity') {
        await apiClient.activities.create(item);
      }
    } catch (err) {
      console.warn(`[SyncService] Background push for ${type} failed, will reconcile on next full sync`);
    }
  }
}

export const syncService = new SyncService();

// Register background push listener for local changes
setDataChangeListener((type, item) => {
  syncService.pushItem(type, item);
});
