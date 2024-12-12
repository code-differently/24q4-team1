import {Database as SQLiteDatabase} from 'better-sqlite3';
import getDatabaseConnection from './db.ts';

const db: SQLiteDatabase = getDatabaseConnection();
try {
  db.exec('DROP TABLE IF EXISTS items');
  db.exec('DROP TABLE IF EXISTS cart');
  db.exec('DROP TABLE IF EXISTS history');
  console.log('Database cleared successfully.');
} catch (error) {
  console.error('Error clearing the database:', error);
} finally {
  db.close();
}