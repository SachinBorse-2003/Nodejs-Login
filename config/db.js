import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root123',
  database: process.env.MYSQL_DATABASE || 'Dhanvantari',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const createUserTable = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);
    connection.release();
    console.log('User table created');
  } catch (error) {
    console.error('Error creating user table:', error.message);
  }
};

export { pool, createUserTable };
