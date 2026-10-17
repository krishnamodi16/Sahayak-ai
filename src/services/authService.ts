import { ShopkeeperUser, SupportedLanguage } from '../types';
import { getDB, logActivity } from './database';

export const DEMO_PRESET_USERS: ShopkeeperUser[] = [
  {
    id: 'user-ramesh-01',
    ownerName: 'Ramesh Kumar',
    shopName: 'Ramesh Kirana & General Store',
    email: 'ramesh.kirana@sahayak.ai',
    phone: '9876543210',
    pin: '1234',
    category: 'Kirana / Grocery (किराना स्टोर)',
    language: 'hi',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    lastLoginAt: Date.now()
  },
  {
    id: 'user-patel-02',
    ownerName: 'Suresh Patel',
    shopName: 'Patel Provision & Super Store',
    email: 'suresh.patel@sahayak.ai',
    phone: '9898989898',
    pin: '1234',
    category: 'Supermarket / Provision (પટેલ સ્ટોર)',
    language: 'gu',
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    lastLoginAt: Date.now()
  },
  {
    id: 'user-murugan-03',
    ownerName: 'S. Murugan',
    shopName: 'Murugan Maligai Store',
    email: 'murugan.maligai@sahayak.ai',
    phone: '9765432109',
    pin: '1234',
    category: 'Retail & Wholesale (மளிகைக் கடை)',
    language: 'ta',
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    lastLoginAt: Date.now()
  }
];

const CURRENT_USER_KEY = 'sahayak_active_user_id';

export class AuthService {
  /**
   * Initializes default shopkeeper users if none exist in local storage/DB
   */
  public async initUsers(): Promise<ShopkeeperUser> {
    const users = await this.getAllUsers();
    if (users.length === 0) {
      const db = await getDB();
      const tx = db.transaction('settings', 'readwrite');
      await tx.objectStore('settings').put({
        key: 'registered_users',
        data: DEMO_PRESET_USERS
      });
      await tx.done;
    }

    const current = await this.getCurrentUser();
    if (current) {
      return current;
    }

    // Default to Ramesh Kirana
    const defaultUser = DEMO_PRESET_USERS[0];
    await this.setCurrentUser(defaultUser);
    return defaultUser;
  }

  public async getAllUsers(): Promise<ShopkeeperUser[]> {
    try {
      const db = await getDB();
      const record = await db.get('settings', 'registered_users');
      if (record && Array.isArray(record.data)) {
        return record.data;
      }
    } catch (e) {
      console.warn('[AuthService] Could not load from DB:', e);
    }
    return DEMO_PRESET_USERS;
  }

  public async getCurrentUser(): Promise<ShopkeeperUser | null> {
    try {
      const activeId = localStorage.getItem(CURRENT_USER_KEY);
      if (!activeId) return null;

      const users = await this.getAllUsers();
      const found = users.find(u => u.id === activeId);
      return found || null;
    } catch {
      return null;
    }
  }

  public async setCurrentUser(user: ShopkeeperUser): Promise<void> {
    localStorage.setItem(CURRENT_USER_KEY, user.id);
    
    // Update lastLoginAt
    const users = await this.getAllUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx].lastLoginAt = Date.now();
      const db = await getDB();
      await db.put('settings', { key: 'registered_users', data: users });
    }
  }

  /**
   * Login with Email, 10-digit Phone, or Owner/Shop Name and 4-digit Security PIN
   */
  public async login(
    emailOrPhoneOrName: string,
    pin: string
  ): Promise<{ success: boolean; user?: ShopkeeperUser; error?: string }> {
    const cleanQuery = emailOrPhoneOrName.trim().toLowerCase();
    const cleanPin = pin.trim();

    if (!cleanQuery) {
      return { success: false, error: 'Please enter your Email Address, Mobile Number, or Shop Name.' };
    }

    if (!cleanPin || cleanPin.length !== 4) {
      return { success: false, error: 'Please enter your 4-digit Security PIN.' };
    }

    const users = await this.getAllUsers();
    const user = users.find(
      u => (
        (u.email && u.email.toLowerCase() === cleanQuery) ||
        u.phone === cleanQuery ||
        u.ownerName.toLowerCase() === cleanQuery ||
        u.shopName.toLowerCase() === cleanQuery
      )
    );

    if (!user) {
      return { success: false, error: 'No store registered with this Email, Mobile Number, or Name.' };
    }

    if (user.pin !== cleanPin) {
      return { success: false, error: 'Incorrect 4-digit PIN. Please try again.' };
    }

    await this.setCurrentUser(user);
    await logActivity('AUTH', `Shopkeeper ${user.ownerName} (${user.shopName}) logged in.`);
    return { success: true, user };
  }

  /**
   * Register a new Store & Shopkeeper with Email, Phone, and Security PIN
   */
  public async register(params: {
    ownerName: string;
    shopName: string;
    email?: string;
    phone: string;
    pin: string;
    category?: string;
    language?: SupportedLanguage;
  }): Promise<{ success: boolean; user?: ShopkeeperUser; error?: string }> {
    const ownerName = params.ownerName.trim();
    const shopName = params.shopName.trim();
    const email = params.email ? params.email.trim().toLowerCase() : undefined;
    const phone = params.phone.trim();
    const pin = params.pin.trim();

    if (!ownerName) return { success: false, error: 'Owner Name is required.' };
    if (!shopName) return { success: false, error: 'Shop Name is required.' };
    if (!phone || phone.length < 10) return { success: false, error: 'Valid 10-digit mobile number is required.' };
    if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      return { success: false, error: 'Please set a 4-digit numerical PIN (e.g. 1234).' };
    }

    const users = await this.getAllUsers();
    const exists = users.some(u => 
      u.phone === phone || (email && u.email && u.email.toLowerCase() === email)
    );
    if (exists) {
      return { success: false, error: 'A store with this Mobile Number or Email is already registered. Please log in.' };
    }

    const newUser: ShopkeeperUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ownerName,
      shopName,
      email,
      phone,
      pin,
      category: params.category || 'Kirana & General Store',
      language: params.language || 'en',
      createdAt: Date.now(),
      lastLoginAt: Date.now()
    };

    users.push(newUser);

    const db = await getDB();
    await db.put('settings', { key: 'registered_users', data: users });
    await this.setCurrentUser(newUser);

    await logActivity('AUTH', `New store registered: ${newUser.shopName} (${newUser.ownerName})`);
    return { success: true, user: newUser };
  }

  /**
   * Instant 1-Click switch to a Demo Preset Shopkeeper
   */
  public async quickSwitchDemoUser(userId: string): Promise<ShopkeeperUser | null> {
    const users = await this.getAllUsers();
    const target = users.find(u => u.id === userId) || DEMO_PRESET_USERS.find(u => u.id === userId);
    if (target) {
      await this.setCurrentUser(target);
      await logActivity('AUTH', `Switched active shopkeeper to ${target.ownerName} (${target.shopName})`);
      return target;
    }
    return null;
  }

  public async logout(): Promise<void> {
    const current = await this.getCurrentUser();
    if (current) {
      await logActivity('AUTH', `Shopkeeper ${current.ownerName} logged out.`);
    }
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export const authService = new AuthService();
