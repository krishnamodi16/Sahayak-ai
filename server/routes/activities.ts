import { Router, Request, Response } from 'express';
import { db } from '../db';

export const activitiesRouter = Router();

// GET all activities
activitiesRouter.get('/', (req: Request, res: Response) => {
  try {
    const { limit = 50 } = req.query;
    const activities = db.prepare('SELECT * FROM activities ORDER BY timestamp DESC LIMIT ?').all(Number(limit));
    res.json({ success: true, count: activities.length, data: activities });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new activity
activitiesRouter.post('/', (req: Request, res: Response) => {
  try {
    const {
      id = `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type = 'SYSTEM',
      message,
      hindiMessage = '',
      timestamp = Date.now()
    } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Activity message is required' });
    }

    db.prepare(`
      INSERT INTO activities (id, type, message, hindiMessage, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, type, message, hindiMessage, timestamp);

    const created = db.prepare('SELECT * FROM activities WHERE id = ?').get(id);
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
