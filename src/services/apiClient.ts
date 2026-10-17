import { Product, SaleTransaction, ActivityLog, ShopkeeperUser, WholesaleOrder } from '../types';

const API_BASE = '/api';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {})
        }
      });

      clearTimeout(timeout);

      if (!res.ok) {
        let errorMsg = `Server error (${res.status})`;
        try {
          const errJson = await res.json();
          if (errJson && errJson.error) errorMsg = errJson.error;
        } catch {
          // keep fallback error
        }
        throw new Error(errorMsg);
      }

      return await res.json();
    } catch (err: any) {
      clearTimeout(timeout);
      throw err;
    }
  }

  // Health
  async health(): Promise<{ status: string; database: string; timestamp: number }> {
    return this.request('/health');
  }

  // Products
  products = {
    getAll: async (params?: { category?: string; lowStock?: boolean }): Promise<{ success: boolean; data: Product[] }> => {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.lowStock) query.append('lowStock', 'true');
      const qs = query.toString() ? `?${query.toString()}` : '';
      return this.request(`/products${qs}`);
    },

    getById: async (id: string): Promise<{ success: boolean; data: Product }> => {
      return this.request(`/products/${id}`);
    },

    create: async (product: Partial<Product>): Promise<{ success: boolean; data: Product }> => {
      return this.request('/products', {
        method: 'POST',
        body: JSON.stringify(product)
      });
    },

    update: async (id: string, updates: Partial<Product>): Promise<{ success: boolean; data: Product }> => {
      return this.request(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    },

    updateStock: async (id: string, delta: number): Promise<{ success: boolean; data: Product }> => {
      return this.request(`/products/${id}/stock`, {
        method: 'PATCH',
        body: JSON.stringify({ delta })
      });
    },

    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
      return this.request(`/products/${id}`, {
        method: 'DELETE'
      });
    }
  };

  // Sales
  sales = {
    getAll: async (limit = 100): Promise<{ success: boolean; data: SaleTransaction[] }> => {
      return this.request(`/sales?limit=${limit}`);
    },

    create: async (sale: Partial<SaleTransaction>): Promise<{ success: boolean; data: SaleTransaction }> => {
      return this.request('/sales', {
        method: 'POST',
        body: JSON.stringify(sale)
      });
    },

    getStats: async (): Promise<{ success: boolean; data: any }> => {
      return this.request('/sales/stats');
    }
  };

  // Auth
  auth = {
    login: async (phone: string, pin: string): Promise<{ success: boolean; data: ShopkeeperUser; message: string }> => {
      return this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone, pin })
      });
    },

    register: async (userData: Partial<ShopkeeperUser>): Promise<{ success: boolean; data: ShopkeeperUser }> => {
      return this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    },

    getUsers: async (): Promise<{ success: boolean; data: ShopkeeperUser[] }> => {
      return this.request('/auth/users');
    },

    updateProfile: async (id: string, data: Partial<ShopkeeperUser>): Promise<{ success: boolean; data: ShopkeeperUser }> => {
      return this.request(`/auth/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    }
  };

  // Wholesale
  wholesale = {
    getDistributors: async (): Promise<{ success: boolean; data: any[] }> => {
      return this.request('/wholesale/distributors');
    },

    createOrder: async (order: Partial<WholesaleOrder>): Promise<{ success: boolean; data: WholesaleOrder }> => {
      return this.request('/wholesale/orders', {
        method: 'POST',
        body: JSON.stringify(order)
      });
    },

    getOrders: async (): Promise<{ success: boolean; data: WholesaleOrder[] }> => {
      return this.request('/wholesale/orders');
    }
  };

  // Activities
  activities = {
    getAll: async (limit = 50): Promise<{ success: boolean; data: ActivityLog[] }> => {
      return this.request(`/activities?limit=${limit}`);
    },

    create: async (activity: Partial<ActivityLog>): Promise<{ success: boolean; data: ActivityLog }> => {
      return this.request('/activities', {
        method: 'POST',
        body: JSON.stringify(activity)
      });
    }
  };

  // Sync
  sync = {
    getStatus: async (): Promise<{ success: boolean; serverTime: number; counts: any }> => {
      return this.request('/sync/status');
    },

    push: async (data: { products?: Product[]; sales?: SaleTransaction[]; activities?: ActivityLog[] }) => {
      return this.request('/sync/push', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    pull: async (since = 0): Promise<{ success: boolean; data: { products: Product[]; sales: SaleTransaction[]; activities: ActivityLog[]; distributors: any[] }; serverTime: number }> => {
      return this.request(`/sync/pull?since=${since}`);
    }
  };
}

export const apiClient = new ApiClient();
