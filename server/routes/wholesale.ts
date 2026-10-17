import { Router, Request, Response } from 'express';
import { db } from '../db';

export const wholesaleRouter = Router();

// GET all distributors
wholesaleRouter.get('/distributors', (req: Request, res: Response) => {
  try {
    const distributors = db.prepare('SELECT * FROM distributors ORDER BY name ASC').all();
    res.json({ success: true, count: distributors.length, data: distributors });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST add new distributor
wholesaleRouter.post('/distributors', (req: Request, res: Response) => {
  try {
    const { id = `dist-${Date.now()}`, name, phone, category = 'General FMCG Wholesaler' } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and Phone are required' });
    }

    db.prepare('INSERT INTO distributors (id, name, phone, category) VALUES (?, ?, ?, ?)').run(
      id,
      name.trim(),
      phone.toString().trim(),
      category.trim()
    );

    const created = db.prepare('SELECT * FROM distributors WHERE id = ?').get(id);
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET wholesale orders history
wholesaleRouter.get('/orders', (req: Request, res: Response) => {
  try {
    const rows = db.prepare('SELECT * FROM wholesale_orders ORDER BY createdAt DESC').all();
    const orders = rows.map((r: any) => ({
      ...r,
      items: r.items ? JSON.parse(r.items) : []
    }));
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST save wholesale order
wholesaleRouter.post('/orders', (req: Request, res: Response) => {
  try {
    const {
      id = `order-${Date.now()}`,
      distributorName,
      distributorPhone,
      items = [],
      notes = '',
      createdAt = Date.now()
    } = req.body;

    if (!distributorName || !distributorPhone) {
      return res.status(400).json({ success: false, error: 'distributorName and distributorPhone are required' });
    }

    const itemsJson = typeof items === 'string' ? items : JSON.stringify(items);

    db.prepare(`
      INSERT INTO wholesale_orders (id, distributorName, distributorPhone, items, notes, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      id,
      distributorName.trim(),
      distributorPhone.toString().trim(),
      itemsJson,
      notes ? notes.trim() : '',
      createdAt
    );

    // Log wholesale activity
    const actId = `act-${Date.now()}`;
    const itemCount = Array.isArray(items) ? items.length : 0;
    db.prepare(`
      INSERT INTO activities (id, type, message, hindiMessage, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      actId,
      'WHOLESALE_ORDER',
      `Wholesale order generated for ${distributorName} (${itemCount} items)`,
      `थोक ऑर्डर तैयार: ${distributorName} (${itemCount} वस्तुएं)`,
      Date.now()
    );

    const created = db.prepare('SELECT * FROM wholesale_orders WHERE id = ?').get(id) as any;
    res.status(201).json({
      success: true,
      data: { ...created, items: JSON.parse(created.items) }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
