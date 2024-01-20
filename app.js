import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

// Create MySQL connection pool
const pool = createPool({
  host: 'localhost', // replace with your MySQL host
  user: 'root',      // replace with your MySQL user
  password: 'root123',      // replace with your MySQL password
  database: 'Dhanvantari', // replace with your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Add MySQL connection pool to the request object for use in routes
app.use((req, res, next) => {
  req.mysql = pool;
  next();
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
