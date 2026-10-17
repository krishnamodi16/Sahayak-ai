import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { InventoryTable } from './components/InventoryTable';
import { SalesView } from './components/SalesView';
import { VoiceAssistant } from './components/VoiceAssistant';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';

import { AddProductModal, EditProductModal, RecordSaleModal } from './components/ManualActionModals';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { WholesaleOrderModal } from './components/WholesaleOrderModal';
import { InstallAppModal } from './components/InstallAppModal';
import { usePWA } from './hooks/usePWA';

import { Product, SaleTransaction, ActivityLog, AppSettings, ExecutionResult, SupportedLanguage, ShopkeeperUser } from './types/index';
import * as db from './services/database';
import { authService } from './services/authService';
import { parseIntent } from './services/intentParser';
import { executeIntent } from './services/businessLogic';
import { ttsService } from './services/textToSpeech';
import { syncService } from './services/syncService';
import { DEFAULT_SETTINGS } from './data/demoData';

export function App() {
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<SaleTransaction[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [currentUser, setCurrentUser] = useState<ShopkeeperUser | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Active navigation tab (matching screenshot default)
  const [activeTab, setActiveTab] = useState<NavTab>('reports');

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState<boolean>(false);
  const [isRecordSaleOpen, setIsRecordSaleOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isWholesaleOrderOpen, setIsWholesaleOrderOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [wholesalePreselectedProduct, setWholesalePreselectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // PWA Install State & Utilities
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWA();

  // Load all data from IndexedDB
  const refreshData = useCallback(async () => {
    try {
      const [prodList, salesList, actList, currentSettings] = await Promise.all([
        db.getAllProducts(),
        db.getAllSales(),
        db.getAllActivities(),
        db.getSettings()
      ]);
      setProducts(prodList);
      setSales(salesList);
      setActivities(actList);
      setSettings(currentSettings);
    } catch (err) {
      console.error('Failed to load local IndexedDB data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initApp = async () => {
      const user = await authService.initUsers();
      setCurrentUser(user);
      await refreshData();
      // Auto-sync with SQLite backend if online
      syncService.syncNow().then(() => {
        refreshData();
      }).catch(() => {
        // Safe offline fallback
      });
    };
    initApp();
  }, [refreshData]);

  const handleLanguageChange = async (newLang: SupportedLanguage) => {
    const updatedSettings = { ...settings, language: newLang };
    await db.saveSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  const handleOpenWholesaleOrder = (product?: Product) => {
    setWholesalePreselectedProduct(product || null);
    setIsWholesaleOrderOpen(true);
  };

  // Main Command Execution Handler
  const handleExecuteCommand = async (commandText: string): Promise<ExecutionResult> => {
    const parsed = parseIntent(commandText);
    const result = await executeIntent(parsed, settings.language);
    setLastResult(result);

    if (result.intent === 'WHOLESALE_ORDER') {
      setIsWholesaleOrderOpen(true);
    }

    if (result.success) {
      if (result.intent === 'RECORD_SALE') {
        ttsService.playCashRegisterSound();
      } else if (result.intent === 'ADD_STOCK') {
        ttsService.playStockSound();
      }
    }

    await refreshData();

    if (settings.voiceFeedbackEnabled) {
      const speechText = result.spokenResponse || result.message;
      ttsService.speak(speechText, settings.language, result.phoneticSpoken);
    }

    return result;
  };

  // Quick Action Buttons
  const handleQuickAction = async (actionType: 'add' | 'sale' | 'stock' | 'earnings' | 'low_stock') => {
    switch (actionType) {
      case 'add':
        setIsAddProductOpen(true);
        break;
      case 'sale':
        setIsRecordSaleOpen(true);
        break;
      case 'stock':
      case 'low_stock':
        setActiveTab('inventory');
        break;
      case 'earnings':
        await handleExecuteCommand('Check today earnings');
        break;
    }
  };

  // Manual Add Product
  const handleAddProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    await db.saveProduct(newProduct);
    await db.logActivity('ADD_STOCK', `Added new product ${newProduct.name}`);
    await refreshData();
  };

  // Manual Edit Product
  const handleEditProduct = async (id: string, updates: Partial<Product>) => {
    const existing = products.find(p => p.id === id);
    if (!existing) return;
    const updated = { ...existing, ...updates, updatedAt: Date.now() };
    await db.saveProduct(updated);
    await db.logActivity('EDIT_PRODUCT', `Updated product details for ${updated.name}`);
    await refreshData();
    setEditingProduct(null);
  };

  // Manual Delete Product
  const handleDeleteProduct = async (productId: string, name: string) => {
    await db.deleteProduct(productId);
    await db.logActivity('DELETE_PRODUCT', `Deleted product ${name} from inventory`);
    await refreshData();
  };

  // Quick stock adjustment from inventory table (+ / - buttons)
  const handleStockAdjust = async (productId: string, delta: number) => {
    await db.updateProductStock(productId, delta);
    const product = products.find(p => p.id === productId);
    if (product) {
      await db.logActivity('ADD_STOCK', `Stock adjusted for ${product.name} (${delta > 0 ? '+' : ''}${delta})`);
    }
    await refreshData();
  };

  // Direct manual sale record from Sales View
  const handleDirectAddSale = async (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const amount = product.price * quantity;
    await db.updateProductStock(productId, -quantity);
    await db.recordSale({
      productId: product.id,
      productName: product.name,
      quantity,
      unit: product.unit,
      unitPrice: product.price,
      amount,
      type: 'Manual Sale'
    });

    await db.logActivity('SALE', `Recorded sale of ${quantity} ${product.unit} ${product.name} for ₹${amount}`);

    ttsService.playCashRegisterSound();
    await refreshData();
  };

  const handleLogout = () => {
    localStorage.removeItem('sahayak_active_user_id');
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-gray-500">Loading Sahayak AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col antialiased text-gray-900">
      
      {/* 1. Top Header matching screenshot */}
      <Header
        language={settings.language}
        onLanguageChange={handleLanguageChange}
        currentUser={currentUser}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        isOnline={isOnline}
        onToggleOnlineMode={() => {
          setIsOnline(prev => !prev);
          ttsService.playFeedbackChime();
        }}
        onOpenWhatsAppOrder={() => handleOpenWholesaleOrder()}
        onOpenInstallApp={() => setIsInstallModalOpen(true)}
        onDataRefresh={refreshData}
      />

      {/* 2. Main Body: Left Sidebar + Right Content Area */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          onOpenInstallApp={() => setIsInstallModalOpen(true)}
        />

        {/* Right Dynamic Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          
          {/* VIEW: REPORTS */}
          {activeTab === 'reports' && (
            <ReportsView
              sales={sales}
              products={products}
            />
          )}

          {/* VIEW: SETTINGS */}
          {activeTab === 'settings' && (
            <SettingsView
              currentUser={currentUser}
              settings={settings}
              onUpdateSettings={async (newS) => {
                const updatedSettings = { ...settings, ...newS };
                await db.saveSettings(updatedSettings);
                setSettings(updatedSettings);
              }}
              onUpdateProfile={async (profile) => {
                if (currentUser) {
                  const updatedUser: ShopkeeperUser = { ...currentUser, ...profile };
                  await authService.setCurrentUser(updatedUser);
                  setCurrentUser(updatedUser);
                }
              }}
            />
          )}

          {/* VIEW: SALES */}
          {activeTab === 'sales' && (
            <SalesView
              products={products}
              sales={sales}
              onAddSale={handleDirectAddSale}
            />
          )}

          {/* VIEW: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <DashboardView
              products={products}
              sales={sales}
              language={settings.language}
              onExecuteCommand={handleExecuteCommand}
              lastResult={lastResult}
              onQuickAction={handleQuickAction}
              onOpenWholesaleOrder={() => handleOpenWholesaleOrder()}
              onNavigateTab={(t) => setActiveTab(t)}
            />
          )}

          {/* VIEW: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">Inventory</h1>
                  <p className="text-xs text-gray-500 mt-1">Manage stock items, prices and thresholds</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(true)}
                  className="px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  + Add Product
                </button>
              </div>

              <InventoryTable
                products={products}
                language={settings.language}
                onAddProduct={() => setIsAddProductOpen(true)}
                onQuickUpdateStock={handleStockAdjust}
                onEditProduct={(p) => setEditingProduct(p)}
                onDeleteProduct={handleDeleteProduct}
                onOpenWholesaleOrder={(p) => handleOpenWholesaleOrder(p)}
              />
            </div>
          )}

          {/* VIEW: VOICE ASSISTANT */}
          {activeTab === 'voice' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">Voice Assistant</h1>
                <p className="text-xs text-gray-500 mt-1">Speak your sales, inventory, or queries naturally</p>
              </div>

              <VoiceAssistant
                language={settings.language}
                onExecuteCommand={handleExecuteCommand}
                lastResult={lastResult}
                onQuickAction={handleQuickAction}
                onOpenWholesaleOrder={() => handleOpenWholesaleOrder()}
              />
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {isAddProductOpen && (
        <AddProductModal
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onAdd={handleAddProduct}
          language={settings.language}
          defaultThreshold={settings.lowStockThreshold || 5}
        />
      )}

      {editingProduct && (
        <EditProductModal
          isOpen={!!editingProduct}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleEditProduct}
          language={settings.language}
        />
      )}

      {isRecordSaleOpen && (
        <RecordSaleModal
          isOpen={isRecordSaleOpen}
          products={products}
          onClose={() => setIsRecordSaleOpen(false)}
          onRecordSale={async (productId, qty, price) => {
            const prod = products.find(p => p.id === productId);
            if (!prod) return;
            const amt = price * qty;
            await db.updateProductStock(productId, -qty);
            await db.recordSale({
              productId: prod.id,
              productName: prod.name,
              quantity: qty,
              unit: prod.unit,
              unitPrice: price,
              amount: amt,
              type: 'Manual Sale'
            });
            await refreshData();
          }}
          language={settings.language}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          language={settings.language}
          onAuthSuccess={(user: ShopkeeperUser) => {
            setCurrentUser(user);
            setIsAuthModalOpen(false);
          }}
        />
      )}

      {isProfileModalOpen && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          user={currentUser}
          language={settings.language}
          onClose={() => setIsProfileModalOpen(false)}
          onLogout={handleLogout}
          onSwitchAccount={() => {
            setIsProfileModalOpen(false);
            setIsAuthModalOpen(true);
          }}
          productCount={products.length}
          saleCount={sales.length}
        />
      )}

      {isWholesaleOrderOpen && (
        <WholesaleOrderModal
          isOpen={isWholesaleOrderOpen}
          onClose={() => setIsWholesaleOrderOpen(false)}
          products={products}
          currentUser={currentUser}
          language={settings.language}
          preselectedProduct={wholesalePreselectedProduct || undefined}
        />
      )}

      {/* Install Mobile / Desktop App Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onInstall={promptInstall}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isIOS={isIOS}
      />
    </div>
  );
}

export default App;
