import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import Database from "better-sqlite3";
import fs from "fs";
import { Item } from "@/types/item";
import { CartItem } from "@/types/cartItem";


const dbPath = path.resolve("src/app/api/scripts", "../../../../data/database.db");

const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(dbPath);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  try {
    switch (method) {
      case "GET": {
        
        const cartItems = db.prepare("SELECT * FROM cart").all();
        res.status(200).json(cartItems);
        break;
      }

      case "POST": {
        
        const { itemId, quantity } = body;

        if (!itemId || !quantity) {
          res.status(400).json({ error: "itemId and quantity are required." });
          return;
        }

        
        const item = db.prepare("SELECT * FROM items WHERE id = ?").get(itemId) as Item|undefined;
        if (!item) {
          res.status(400).json({ error: "Item does not exist." });
          return;
        }

        if (item.stock < quantity) {
          res.status(400).json({ error: "Insufficient stock." });
          return;
        }

        
        const cartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(itemId);
        if (cartItem) {
          
          db.prepare("UPDATE cart SET quantity = quantity + ? WHERE id = ?").run(quantity, itemId);
        } else {
          
          db.prepare(`
            INSERT INTO cart (id, title, description, price, quantity)
            VALUES (?, ?, ?, ?, ?)
          `).run(itemId, item.title, item.description, item.price, quantity);
        }

        
        db.prepare("UPDATE items SET stock = stock - ? WHERE id = ?").run(quantity, itemId);

        res.status(200).json({ message: "Item added to cart." });
        break;
      }

      case "DELETE": {
        
        const { itemId, quantity } = body;

        if (!itemId || !quantity) {
          res.status(400).json({ error: "itemId and quantity are required." });
          return;
        }

        
        const cartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(itemId) as CartItem|undefined;
        if (!cartItem) {
          res.status(400).json({ error: "Item is not in the cart." });
          return;
        }

        
        if (quantity >= cartItem.quantity) {
          db.prepare("DELETE FROM cart WHERE id = ?").run(itemId);
        } else {
          
          db.prepare("UPDATE cart SET quantity = quantity - ? WHERE id = ?").run(quantity, itemId);
        }

        
        db.prepare("UPDATE items SET stock = stock + ? WHERE id = ?").run(quantity, itemId);

        res.status(200).json({ message: "Item removed from cart." });
        break;
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    db.close(); 
  }
} 