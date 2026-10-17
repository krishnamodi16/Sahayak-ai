import { Router, Request, Response } from 'express';
import { db } from '../db';

export const salesRouter = Router();

// GET all sales
salesRouter.get('/', (req: Request, res: Response) => {
  try {
    const { limit = 100, productId } = req.query;
    let query = 'SELECT * FROM sales';
    const params: any[] = [];

    if (productId) {
      query += ' WHERE productId = ?';
      params.push(productId);
    }

    query += ' ORDER BY timestamp DESC LIMIT ?';
    params.push(Number(limit));

    const sales = db.prepare(query).all(...params);
    res.json({ success: true, count: sales.length, data: sales });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET sales stats (daily summary, earnings)
salesRouter.get('/stats', (req: Request, res: Response) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const startTimestamp = startOfDay.getTime();

    // Today's total sales
    const todaySummary = db.prepare(`
      SELECT 
        COUNT(*) as totalTransactions,
        COALESCE(SUM(amount), 0) as totalRevenue,
        COALESCE(SUM(quantity), 0) as totalItemsSold
      FROM sales
      WHERE timestamp >= ?
    `).get(startTimestamp) as any;

    // All-time summary
    const allTimeSummary = db.prepare(`
      SELECT 
        COUNT(*) as totalTransactions,
        COALESCE(SUM(amount), 0) as totalRevenue
      FROM sales
    `).get() as any;

    // Top selling products today
    const topProducts = db.prepare(`
      SELECT 
        productName,
        SUM(quantity) as quantitySold,
        unit,
        SUM(amount) as revenue
      FROM sales
      WHERE timestamp >= ?
      GROUP BY productId, productName, unit
      ORDER BY revenue DESC
      LIMIT 5
    `).all(startTimestamp);

    res.json({
      success: true,
      data: {
        today: todaySummary,
        allTime: allTimeSummary,
        topProducts
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST record new sale
salesRouter.post('/', (req: Request, res: Response) => {
  try {
    const {
      id = `sale-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId,
      productName,
      quantity,
      unit = 'units',
      unitPrice = 0,
      amount,
      type = 'Sale',
      timestamp = Date.now()
    } = req.body;

    if (!productId || !productName || quantity === undefined) {
      return res.status(400).json({ success: false, error: 'productId, productName, and quantity are required' });
    }

    const calculatedAmount = amount !== undefined ? Number(amount) : Number(quantity) * Number(unitPrice);

    // Run in transaction: insert sale + decrement product stock if product exists
    const insertSale = db.prepare(`
      INSERT INTO sales (id, productId, productName, quantity, unit, unitPrice, amount, type, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertSale.run(
      id,
      productId,
      productName,
      Number(quantity),
      unit,
      Number(unitPrice),
      calculatedAmount,
      type,
      timestamp
    );

    // Update product stock
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId) as any;
    if (product) {
      const newStock = Math.max(0, product.quantity - Number(quantity));
      db.prepare('UPDATE products SET quantity = ?, updatedAt = ? WHERE id = ?').run(
        newStock,
        Date.now(),
        productId
      );
    }

    // Also log activity
    const actId = `act-${Date.now()}`;
    db.prepare(`
      INSERT INTO activities (id, type, message, hindiMessage, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      actId,
      'SALE',
      `Sale recorded: ${quantity} ${unit} of ${productName} for ₹${calculatedAmount}`,
      `बिक्री दर्ज: ${productName} ${quantity} ${unit} - ₹${calculatedAmount}`,
      Date.now()
    );

    const created = db.prepare('SELECT * FROM sales WHERE id = ?').get(id);
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
