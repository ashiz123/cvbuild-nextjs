// lib/db.js
import mysql from 'mysql2/promise';

const MYSQL_HOST = 'localhost';
const MYSQL_USER = 'root';
const MYSQL_PASSWORD = '';
const MYSQL_DATABASE = 'express-app';

if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DATABASE) {
  throw new Error('Please define the MYSQL environment variables inside .env.local');
}

let connection;

async function db() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    });
  }
  return connection;
}

export default db;
