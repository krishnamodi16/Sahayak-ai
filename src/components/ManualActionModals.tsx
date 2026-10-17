import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Edit3, Package, AlertCircle } from 'lucide-react';
import { Product, UnitType, SupportedLanguage } from '../types/index';
import { formatINR } from '../services/businessLogic';
import { TRANSLATIONS, UNIT_TRANSLATIONS, getLocalizedProductName } from '../services/translations';

// ----------------------------------------------------------------------
// 1. ADD PRODUCT MODAL
// ----------------------------------------------------------------------
interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  language: SupportedLanguage;
  defaultThreshold: number;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  language,
  defaultThreshold
}) => {
  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [quantity, setQuantity] = useState('10');
  const [unit, setUnit] = useState<UnitType>('kg');
  const [price, setPrice] = useState('50');
  const [threshold, setThreshold] = useState(defaultThreshold.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const m = t.modals;
  const unitDict = UNIT_TRANSLATIONS[language] || UNIT_TRANSLATIONS.en;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd({
        name: name.trim(),
        hindiName: hindiName.trim() || undefined,
        quantity: parseFloat(quantity) || 0,
        unit,
        price: parseFloat(price) || 0,
        lowStockThreshold: parseInt(threshold) || 5
      });
      setName('');
      setHindiName('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {m.addNewProduct}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {m.productNameEn}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Basmati Rice, Milk, Sugar, Water"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {m.productNameRegional}
            </label>
            <input
              type="text"
              value={hindiName}
              onChange={(e) => setHindiName(e.target.value)}
              placeholder="उदा. चावल / ચોખા / அரிசி / চিনি"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.initialStock}
              </label>
              <input
                type="number"
                required
                min="0"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.unit}
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as UnitType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="kg">kg ({unitDict.kg})</option>
                <option value="bottles">bottles ({unitDict.bottles})</option>
                <option value="packets">packets ({unitDict.packets})</option>
                <option value="bars">bars ({unitDict.bars})</option>
                <option value="liters">liters ({unitDict.liters})</option>
                <option value="pieces">pieces ({unitDict.pieces})</option>
                <option value="g">g ({unitDict.g})</option>
                <option value="boxes">boxes ({unitDict.boxes})</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.pricePerUnit}
              </label>
              <input
                type="number"
                required
                min="0"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.lowStockAlert}
              </label>
              <input
                type="number"
                min="1"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {m.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              {m.saveProduct}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. EDIT PRODUCT MODAL
// ----------------------------------------------------------------------
interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onUpdate: (id: string, updates: Partial<Product>) => Promise<void>;
  language: SupportedLanguage;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onUpdate,
  language
}) => {
  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [unit, setUnit] = useState<UnitType>('kg');
  const [price, setPrice] = useState('0');
  const [threshold, setThreshold] = useState('5');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const m = t.modals;
  const unitDict = UNIT_TRANSLATIONS[language] || UNIT_TRANSLATIONS.en;

  useEffect(() => {
    if (product) {
      setName(product.name);
      setHindiName(product.hindiName || '');
      setQuantity(product.quantity.toString());
      setUnit(product.unit);
      setPrice(product.price.toString());
      setThreshold(product.lowStockThreshold.toString());
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onUpdate(product.id, {
        name: name.trim(),
        hindiName: hindiName.trim() || undefined,
        quantity: parseFloat(quantity) || 0,
        unit,
        price: parseFloat(price) || 0,
        lowStockThreshold: parseInt(threshold) || 5
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Edit3 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {m.editProduct}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {m.productNameEn}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {m.productNameRegional}
            </label>
            <input
              type="text"
              value={hindiName}
              onChange={(e) => setHindiName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.currentStock}
              </label>
              <input
                type="number"
                required
                min="0"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.unit}
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as UnitType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="kg">kg ({unitDict.kg})</option>
                <option value="bottles">bottles ({unitDict.bottles})</option>
                <option value="packets">packets ({unitDict.packets})</option>
                <option value="bars">bars ({unitDict.bars})</option>
                <option value="liters">liters ({unitDict.liters})</option>
                <option value="pieces">pieces ({unitDict.pieces})</option>
                <option value="g">g ({unitDict.g})</option>
                <option value="boxes">boxes ({unitDict.boxes})</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.pricePerUnit}
              </label>
              <input
                type="number"
                required
                min="0"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.lowStockAlert}
              </label>
              <input
                type="number"
                min="1"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {m.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              {m.updateProduct}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 3. RECORD SALE MODAL (KHATABOOK / VYAPAR FAST SALE MODAL)
// ----------------------------------------------------------------------
interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRecordSale: (productId: string, quantity: number, amount: number) => Promise<void>;
  language: SupportedLanguage;
}

export const RecordSaleModal: React.FC<RecordSaleModalProps> = ({
  isOpen,
  onClose,
  products,
  onRecordSale,
  language
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const m = t.modals;
  const unitDict = UNIT_TRANSLATIONS[language] || UNIT_TRANSLATIONS.en;

  useEffect(() => {
    if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }
  }, [products, selectedProductId]);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Auto calculate suggested amount
  const calculatedTotal = selectedProduct ? (parseFloat(quantity) || 0) * selectedProduct.price : 0;
  const effectiveAmount = customAmount !== '' ? parseFloat(customAmount) : calculatedTotal;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const qty = parseFloat(quantity) || 0;
    if (qty <= 0) {
      setError(m.validQuantityError);
      return;
    }

    if (qty > selectedProduct.quantity) {
      setError(
        language === 'gu'
          ? `સ્ટોકમાં માત્ર ${selectedProduct.quantity} ${unitDict[selectedProduct.unit] || selectedProduct.unit} ઉપલબ્ધ છે!`
          : (language === 'hi'
            ? `स्टॉक में केवल ${selectedProduct.quantity} ${unitDict[selectedProduct.unit] || selectedProduct.unit} उपलब्ध है!`
            : `Only ${selectedProduct.quantity} ${selectedProduct.unit} available in stock!`)
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await onRecordSale(selectedProduct.id, qty, effectiveAmount);
      setQuantity('1');
      setCustomAmount('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to record sale');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {m.recordSaleTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm">
          {error && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {m.selectProduct}
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                setCustomAmount('');
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
            >
              {products.map(p => {
                const localizedName = getLocalizedProductName(p.name, language);
                const localizedUnit = unitDict[p.unit] || p.unit;
                return (
                  <option key={p.id} value={p.id}>
                    {localizedName} ({p.name}) — Stock: {p.quantity} {localizedUnit} @ {formatINR(p.price)}/{localizedUnit}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.soldQuantity}
              </label>
              <input
                type="number"
                required
                min="0.1"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {m.unit}
              </label>
              <div className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-between">
                <span>{selectedProduct ? (unitDict[selectedProduct.unit] || selectedProduct.unit) : 'units'}</span>
                <span className="text-[10px] text-slate-400">Stock: {selectedProduct?.quantity || 0}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>{m.totalSaleAmount}</span>
              <span className="text-[11px] text-slate-500 font-normal">
                Suggested: {formatINR(calculatedTotal)}
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="any"
                value={customAmount !== '' ? customAmount : (calculatedTotal > 0 ? calculatedTotal.toString() : '')}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Total amount in rupees"
                className="w-full pl-3.5 pr-12 py-2 bg-emerald-50/50 border border-emerald-300 rounded-lg text-base font-bold text-emerald-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none tabular-nums font-mono"
              />
              <span className="absolute right-3 top-2.5 text-xs font-bold text-emerald-700">₹ INR</span>
            </div>

            {/* Quick Currency Presets */}
            <div className="flex flex-wrap gap-1 mt-1.5">
              {[50, 100, 200, 500].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCustomAmount(val.toString())}
                  className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 rounded cursor-pointer"
                >
                  ₹{val}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {m.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors cursor-pointer flex items-center space-x-1"
            >
              <Check className="w-4 h-4" />
              <span>{m.recordSaleSubmit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
