import { Router, Request, Response } from 'express';
import { db } from '../db';

export const authRouter = Router();

// GET all shopkeeper accounts (for switching accounts or listing)
authRouter.get('/users', (req: Request, res: Response) => {
  try {
    const users = db.prepare('SELECT id, ownerName, shopName, email, phone, category, language, createdAt, lastLoginAt FROM users').all();
    res.json({ success: true, data: users });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single user profile
authRouter.get('/users/:id', (req: Request, res: Response) => {
  try {
    const user = db.prepare('SELECT id, ownerName, shopName, email, phone, category, language, createdAt, lastLoginAt FROM users WHERE id = ?').get(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Login with Phone and PIN
authRouter.post('/login', (req: Request, res: Response) => {
  try {
    const { phone, pin } = req.body;
    if (!phone || !pin) {
      return res.status(400).json({ success: false, error: 'Phone and 4-digit PIN are required' });
    }

    const cleanPhone = phone.toString().replace(/[^0-9]/g, '').slice(-10);
    const user = db.prepare('SELECT * FROM users WHERE phone LIKE ?').get(`%${cleanPhone}`) as any;

    if (!user) {
      return res.status(404).json({ success: false, error: 'No account found with this phone number' });
    }

    if (user.pin !== pin.toString().trim()) {
      return res.status(401).json({ success: false, error: 'Invalid 4-digit security PIN' });
    }

    // Update lastLoginAt
    const now = Date.now();
    db.prepare('UPDATE users SET lastLoginAt = ? WHERE id = ?').run(now, user.id);

    const { pin: _pin, ...safeUser } = user;
    res.json({
      success: true,
      message: `Welcome back, ${user.ownerName}!`,
      data: { ...safeUser, lastLoginAt: now }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Register new shopkeeper
authRouter.post('/register', (req: Request, res: Response) => {
  try {
    const {
      ownerName,
      shopName,
      email = '',
      phone,
      pin = '1234',
      category = 'Kirana / Grocery (किराना स्टोर)',
      language = 'hi'
    } = req.body;

    if (!ownerName || !shopName || !phone) {
      return res.status(400).json({ success: false, error: 'Owner Name, Shop Name, and Phone are required' });
    }

    const cleanPhone = phone.toString().replace(/[^0-9]/g, '').slice(-10);
    const existing = db.prepare('SELECT id FROM users WHERE phone LIKE ?').get(`%${cleanPhone}`);
    if (existing) {
      return res.status(409).json({ success: false, error: 'An account with this phone number already exists' });
    }

    const id = `user-${Date.now()}`;
    const now = Date.now();

    db.prepare(`
      INSERT INTO users (id, ownerName, shopName, email, phone, pin, category, language, createdAt, lastLoginAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      ownerName.trim(),
      shopName.trim(),
      email.trim(),
      cleanPhone,
      pin.toString().trim(),
      category,
      language,
      now,
      now
    );

    const newUser = db.prepare('SELECT id, ownerName, shopName, email, phone, category, language, createdAt, lastLoginAt FROM users WHERE id = ?').get(id);

    res.status(201).json({
      success: true,
      message: 'Shopkeeper account registered successfully',
      data: newUser
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update profile
authRouter.put('/users/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
    if (!existing) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const { ownerName, shopName, email, category, language, pin } = req.body;

    db.prepare(`
      UPDATE users SET
        ownerName = COALESCE(?, ownerName),
        shopName = COALESCE(?, shopName),
        email = COALESCE(?, email),
        category = COALESCE(?, category),
        language = COALESCE(?, language),
        pin = COALESCE(?, pin)
      WHERE id = ?
    `).run(
      ownerName ? ownerName.trim() : null,
      shopName ? shopName.trim() : null,
      email !== undefined ? email.trim() : null,
      category || null,
      language || null,
      pin ? pin.toString().trim() : null,
      id
    );

    const updated = db.prepare('SELECT id, ownerName, shopName, email, phone, category, language, createdAt, lastLoginAt FROM users WHERE id = ?').get(id);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
