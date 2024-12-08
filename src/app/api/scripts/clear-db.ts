import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.resolve('src/app/api/scripts', '../../../../data/database.db');

const db = new Database(dbPath);

try {
  db.exec('DROP TABLE IF EXISTS items'); 
  db.exec('DROP TABLE IF EXISTS cart')
  console.log('Database cleared successfully.');
} catch (error) {
  console.error('Error clearing the database:', error);
} finally {
  db.close();
}