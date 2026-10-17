import express, { Request, Response } from 'express';
import cors from 'cors';
import { initDatabaseSchema } from './db';
import { productsRouter } from './routes/products';
import { salesRouter } from './routes/sales';
import { authRouter } from './routes/auth';
import { wholesaleRouter } from './routes/wholesale';
import { activitiesRouter } from './routes/activities';
import { syncRouter } from './routes/sync';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database & Seed data if needed
initDatabaseSchema();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Sahayak AI Backend Server',
    database: 'SQLite (Native node:sqlite)',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// Mount modular API routes
app.use('/api/products', productsRouter);
app.use('/api/sales', salesRouter);
app.use('/api/auth', authRouter);
app.use('/api/wholesale', wholesaleRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/sync', syncRouter);

// 404 handler for API routes
app.use((req: Request, res: Response, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      error: `API route ${req.method} ${req.originalUrl} not found`
    });
  }
  next();
});

// Start listening
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🚀 Sahayak AI Backend Server running on http://localhost:${PORT}`);
  console.log(`📦 Database: SQLite (data/sahayak.sqlite)`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});
