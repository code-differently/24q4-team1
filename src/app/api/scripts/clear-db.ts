import {Database as SQLiteDatabase} from 'better-sqlite3';
import getDatabaseConnection from './db.ts';

let db: SQLiteDatabase = getDatabaseConnection();
try {
  db.exec('DROP TABLE IF EXISTS items'); 
  db.exec('DROP TABLE IF EXISTS cart')
  console.log('Database cleared successfully.');
} catch (error) {
  console.error('Error clearing the database:', error);
} finally {
  db.close();
}