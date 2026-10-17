import { Router, Request, Response } from 'express';
import { db } from '../db';

export const productsRouter = Router();

// Helper to format product from DB row
function formatProduct(row: any) {
  if (!row) return null;
  return {
    ...row,
    aliases: row.aliases ? JSON.parse(row.aliases) : []
  };
}

// GET all products
productsRouter.get('/', (req: Request, res: Response) => {
  try {
    const { category, lowStock } = req.query;
    let query = 'SELECT * FROM products';
    const params: any[] = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY name ASC';
    const rows = db.prepare(query).all(...params);
    let products = rows.map(formatProduct);

    if (lowStock === 'true') {
      products = products.filter((p: any) => p.quantity <= p.lowStockThreshold);
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single product by ID
productsRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: formatProduct(row) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create product
productsRouter.post('/', (req: Request, res: Response) => {
  try {
    const {
      id = `prod-${Date.now()}`,
      name,
      hindiName = '',
      aliases = [],
      quantity = 0,
      unit = 'units',
      price = 0,
      lowStockThreshold = 5,
      category = 'General'
    } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, error: 'Product name is required' });
    }

    const now = Date.now();
    const aliasesJson = typeof aliases === 'string' ? aliases : JSON.stringify(aliases);

    const stmt = db.prepare(`
      INSERT INTO products (id, name, hindiName, aliases, quantity, unit, price, lowStockThreshold, category, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      name.trim(),
      hindiName.trim(),
      aliasesJson,
      Number(quantity),
      unit,
      Number(price),
      Number(lowStockThreshold),
      category,
      now,
      now
    );

    const created = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    res.status(201).json({ success: true, data: formatProduct(created) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update product
productsRouter.put('/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const {
      name,
      hindiName,
      aliases,
      quantity,
      unit,
      price,
      lowStockThreshold,
      category
    } = req.body;

    const aliasesJson = aliases !== undefined
      ? (typeof aliases === 'string' ? aliases : JSON.stringify(aliases))
      : (existing as any).aliases;

    const stmt = db.prepare(`
      UPDATE products SET
        name = COALESCE(?, name),
        hindiName = COALESCE(?, hindiName),
        aliases = ?,
        quantity = COALESCE(?, quantity),
        unit = COALESCE(?, unit),
        price = COALESCE(?, price),
        lowStockThreshold = COALESCE(?, lowStockThreshold),
        category = COALESCE(?, category),
        updatedAt = ?
      WHERE id = ?
    `);

    stmt.run(
      name !== undefined ? name.trim() : null,
      hindiName !== undefined ? hindiName.trim() : null,
      aliasesJson,
      quantity !== undefined ? Number(quantity) : null,
      unit !== undefined ? unit : null,
      price !== undefined ? Number(price) : null,
      lowStockThreshold !== undefined ? Number(lowStockThreshold) : null,
      category !== undefined ? category : null,
      Date.now(),
      id
    );

    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    res.json({ success: true, data: formatProduct(updated) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH adjust product stock (e.g. sale or restock)
productsRouter.patch('/:id/stock', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { delta } = req.body;

    if (delta === undefined || isNaN(Number(delta))) {
      return res.status(400).json({ success: false, error: 'Numeric delta is required' });
    }

    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as any;
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const newQty = Math.max(0, existing.quantity + Number(delta));
    db.prepare('UPDATE products SET quantity = ?, updatedAt = ? WHERE id = ?').run(newQty, Date.now(), id);

    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    res.json({ success: true, data: formatProduct(updated) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE product
productsRouter.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.json({ success: true, message: `Product ${id} deleted successfully` });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
