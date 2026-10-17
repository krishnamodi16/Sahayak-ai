import { Router, Request, Response } from 'express';
import { db } from '../db';

export const syncRouter = Router();

// GET sync status and server time
syncRouter.get('/status', (req: Request, res: Response) => {
  try {
    const prodCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as any;
    const saleCount = db.prepare('SELECT COUNT(*) as count FROM sales').get() as any;
    const actCount = db.prepare('SELECT COUNT(*) as count FROM activities').get() as any;

    res.json({
      success: true,
      serverTime: Date.now(),
      counts: {
        products: prodCount.count,
        sales: saleCount.count,
        activities: actCount.count
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST push offline changes from client to server
syncRouter.post('/push', (req: Request, res: Response) => {
  try {
    const { products = [], sales = [], activities = [] } = req.body;

    let productsSynced = 0;
    let salesSynced = 0;
    let activitiesSynced = 0;

    // Upsert products
    const upsertProduct = db.prepare(`
      INSERT INTO products (id, name, hindiName, aliases, quantity, unit, price, lowStockThreshold, category, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        hindiName = excluded.hindiName,
        aliases = excluded.aliases,
        quantity = excluded.quantity,
        unit = excluded.unit,
        price = excluded.price,
        lowStockThreshold = excluded.lowStockThreshold,
        category = excluded.category,
        updatedAt = excluded.updatedAt
      WHERE excluded.updatedAt > products.updatedAt
    `);

    for (const p of products) {
      const aliasesJson = typeof p.aliases === 'string' ? p.aliases : JSON.stringify(p.aliases || []);
      upsertProduct.run(
        p.id,
        p.name,
        p.hindiName || null,
        aliasesJson,
        p.quantity,
        p.unit,
        p.price,
        p.lowStockThreshold || 5,
        p.category || 'General',
        p.createdAt || Date.now(),
        p.updatedAt || Date.now()
      );
      productsSynced++;
    }

    // Upsert sales
    const insertSale = db.prepare(`
      INSERT OR IGNORE INTO sales (id, productId, productName, quantity, unit, unitPrice, amount, type, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const s of sales) {
      insertSale.run(
        s.id,
        s.productId,
        s.productName,
        s.quantity,
        s.unit,
        s.unitPrice,
        s.amount,
        s.type || 'Sale',
        s.timestamp
      );
      salesSynced++;
    }

    // Upsert activities
    const insertActivity = db.prepare(`
      INSERT OR IGNORE INTO activities (id, type, message, hindiMessage, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const a of activities) {
      insertActivity.run(
        a.id,
        a.type || 'SYSTEM',
        a.message,
        a.hindiMessage || null,
        a.timestamp
      );
      activitiesSynced++;
    }

    res.json({
      success: true,
      message: 'Sync completed successfully',
      synced: {
        products: productsSynced,
        sales: salesSynced,
        activities: activitiesSynced
      },
      serverTime: Date.now()
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET pull updates from server to client
syncRouter.get('/pull', (req: Request, res: Response) => {
  try {
    const { since = 0 } = req.query;
    const sinceTimestamp = Number(since);

    const productRows = db.prepare('SELECT * FROM products WHERE updatedAt >= ?').all(sinceTimestamp);
    const products = productRows.map((r: any) => ({
      ...r,
      aliases: r.aliases ? JSON.parse(r.aliases) : []
    }));

    const sales = db.prepare('SELECT * FROM sales WHERE timestamp >= ? ORDER BY timestamp DESC').all(sinceTimestamp);
    const activities = db.prepare('SELECT * FROM activities WHERE timestamp >= ? ORDER BY timestamp DESC').all(sinceTimestamp);
    const distributors = db.prepare('SELECT * FROM distributors').all();

    res.json({
      success: true,
      serverTime: Date.now(),
      data: {
        products,
        sales,
        activities,
        distributors
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
