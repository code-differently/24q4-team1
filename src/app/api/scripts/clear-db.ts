import { createClient } from "@libsql/client";

// Replace with your Turso database connection URL
const db = createClient({ url: "libsql://my-db-xaviercruz5106.turso.io"});

async function clearDatabase() {
  try {
    await db.execute({
      sql: "DROP TABLE IF EXISTS items",
      args: [], // Provide an empty array for queries without arguments
    });
    await db.execute({
      sql: "DROP TABLE IF EXISTS cart",
      args: [], // Provide an empty array for queries without arguments
    });
    await db.execute({
      sql: "DROP TABLE IF EXISTS history",
      args: [], // Provide an empty array for queries without arguments
    });
    console.log("Database cleared successfully.");
  } catch (error) {
    console.error("Error clearing the database:", error);
  }
}

// Execute the function to clear the database
clearDatabase();