import { Product, ShopkeeperUser, WholesaleOrderItem } from '../types';

export interface DistributorContact {
  id: string;
  name: string;
  phone: string;
  category: string;
}

export const PRESET_DISTRIBUTORS: DistributorContact[] = [
  {
    id: 'dist-1',
    name: 'Shree Ganesh FMCG & Grocery Wholesalers',
    phone: '9820011223',
    category: 'Groceries, Biscuits & FMCG'
  },
  {
    id: 'dist-2',
    name: 'City Grain, Rice & Oil Depot',
    phone: '9811223344',
    category: 'Rice, Wheat, Oil & Grains'
  },
  {
    id: 'dist-3',
    name: 'Balaji Dairy & Beverages Distributor',
    phone: '9876501234',
    category: 'Water, Milk & Beverages'
  }
];

export function buildLowStockOrderItems(products: Product[]): WholesaleOrderItem[] {
  const lowStock = products.filter(p => p.quantity <= p.lowStockThreshold);
  return lowStock.map(p => {
    // Recommend restock quantity: 5x threshold or minimum 10
    const suggestedQty = Math.max(10, p.lowStockThreshold * 4);
    return {
      productId: p.id,
      productName: p.name,
      hindiName: p.hindiName,
      quantity: suggestedQty,
      unit: p.unit,
      currentStock: p.quantity
    };
  });
}

export function formatWhatsAppOrderMessage(params: {
  shopName: string;
  ownerName: string;
  ownerPhone: string;
  distributorName: string;
  items: WholesaleOrderItem[];
  notes?: string;
}): string {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const lines: string[] = [];

  lines.push(`🛒 *WHOLESALE PURCHASE ORDER / सामान ऑर्डर*`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`🏬 *Store:* ${params.shopName || 'Kirana Store'}`);
  lines.push(`👤 *Owner:* ${params.ownerName || 'Store Manager'} (📞 +91 ${params.ownerPhone || ''})`);
  lines.push(`🏢 *To Wholesaler:* ${params.distributorName || 'Supplier'}`);
  lines.push(`📅 *Date:* ${dateStr}`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`📋 *REQUIRED ITEMS / सामान की सूची:*`);

  if (params.items.length === 0) {
    lines.push(`_(No items selected)_`);
  } else {
    params.items.forEach((item, idx) => {
      const displayName = item.hindiName ? `${item.productName} (${item.hindiName})` : item.productName;
      lines.push(`${idx + 1}. *${displayName}* : *${item.quantity} ${item.unit}*  _(Stock left: ${item.currentStock} ${item.unit})_`);
    });
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`📦 *Total Varieties:* ${params.items.length} items`);

  if (params.notes && params.notes.trim()) {
    lines.push(`📝 *Note:* ${params.notes.trim()}`);
  }

  lines.push(`📍 *Delivery Address:* Shop Counter / Urgent Delivery Required`);
  lines.push(``);
  lines.push(`⚡ _Generated via Sahayak AI - Offline Kirana Voice POS_`);

  return lines.join('\n');
}

export function getWhatsAppShareUrl(phone: string, message: string): string {
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  
  // If 10 digits without country code, prepend 91 for India
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }

  const encodedMsg = encodeURIComponent(message);
  
  if (cleanPhone.length >= 10) {
    return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
  }
  
  // Generic WhatsApp share link if no phone specified
  return `https://api.whatsapp.com/send?text=${encodedMsg}`;
}
