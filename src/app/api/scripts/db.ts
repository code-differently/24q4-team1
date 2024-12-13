import { createClient } from "@libsql/client";
import axios from "axios";


export function getDatabaseConnection() {
  const client = createClient({
    url: "libsql://my-db-xaviercruz5106.turso.io",
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQxMDI5MTIsImlkIjoiYWM3ZjQ2ZDgtNGE0Ny00ZGJlLTlhM2EtYWRkZTI0YTdjMjVkIn0.q1geERyKE8l3Htx-CpD7VGhDNkJdxjCyaujweyh2WIn_wdnOXa9PV29TboBhoKXbBGnt7LzwAQ2gDCTSTNH4Ag'
  });
  return client;
}

const db = getDatabaseConnection();

async function initializeTables() {
  const queries = [
    `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      images TEXT,
      category TEXT,
      stock INTEGER NOT NULL,
      rating REAL,
      discountPercentage REAL,
      brand TEXT,
      sku TEXT,
      warrantyInformation TEXT,
      shippingInformation TEXT,
      reviews TEXT
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS cart(
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      image TEXT NOT NULL
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS history(
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      image TEXT NOT NULL
    )
    `
  ];

  for (const query of queries) {
    await db.execute(query);
  }
}

async function fetchDataAndStore() {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=0");
    const items = response.data.products;

    if (!Array.isArray(items)) {
      throw new Error("The 'products' field is not an array or is missing.");
    }

    for (const item of items) {
      try {
        const price = parseFloat(item.price.toString());
        if (isNaN(price)) {
          throw new Error(`Invalid price value for item with id ${item.id}`);
        }

        await db.execute({
          sql: `
            INSERT OR IGNORE INTO items (
              id, title, description, price, images, category, stock, rating,
              discountPercentage, brand, sku, warrantyInformation, shippingInformation, reviews
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
          args: [
            item.id,
            item.title,
            item.description,
            price,
            item.images ? JSON.stringify(item.images) : null,
            item.category ?? null,
            item.stock,
            item.rating ?? null,
            item.discountPercentage ?? null,
            item.brand ?? null,
            item.sku ?? null,
            item.warrantyInformation ?? null,
            item.shippingInformation ?? null,
            item.reviews ? JSON.stringify(item.reviews) : null,
          ],
        });

        console.log(`Inserted item with ID: ${item.id}`);
      } catch (err) {
        console.error(`Error inserting item with ID: ${item.id}`, err);
      }
    }

    console.log("Data fetched from API and inserted into the database successfully!");
  } catch (error) {
    console.error("Error fetching or inserting data:", error);
  }
}

// Initialize tables and fetch data on startup
(async () => {
  await initializeTables();
  await fetchDataAndStore();
})();

export default db;