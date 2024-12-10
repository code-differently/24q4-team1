/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Fetch all items in the cart.
 *     description: Retrieve a list of all items currently in the cart.
 *     responses:
 *       200:
 *         description: A list of items in the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Product Title"
 *                   description:
 *                     type: string
 *                     example: "Product description here."
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 99.99
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Add an item to the cart.
 *     description: Add a specified quantity of an item to the cart. Updates the cart if the item already exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the item to add.
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the item to add.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item added to cart."
 *       400:
 *         description: Bad request. Missing or invalid `id` or `quantity`.
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Remove an item or reduce its quantity in the cart.
 *     description: Removes a specified quantity of an item from the cart. Deletes the item entirely if the quantity becomes zero or less.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the item to remove.
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the item to remove.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Item removed from the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item removed from cart."
 *       400:
 *         description: Bad request. Missing or invalid `id` or `quantity`.
 *       500:
 *         description: Internal server error.
 */

import { NextRequest, NextResponse } from "next/server";
import { Item } from "@/types/item";
import { CartItem } from "@/types/cartItem";
import getDatabaseConnection from "../scripts/db";




const db = getDatabaseConnection();

export async function GET() {
  try {
    const cartItems = db.prepare("SELECT * FROM cart").all();
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, quantity } = await req.json();

    if (!id || !quantity) {
      return NextResponse.json({ error: "id and quantity are required." }, { status: 400 });
    }

    const item = db.prepare("SELECT * FROM items WHERE id = ?").get(id) as Item | undefined;
    if (!item) {
      return NextResponse.json({ error: "Item does not exist." }, { status: 400 });
    }

    if (item.stock < quantity) {
      return NextResponse.json({ error: "Insufficient stock." }, { status: 400 });
    }

    const cartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(id);
    if (cartItem) {
      db.prepare("UPDATE cart SET quantity = quantity + ? WHERE id = ?").run(quantity, id);
    } else {
      db.prepare(`
        INSERT INTO cart (id, title, description, price, quantity)
        VALUES (?, ?, ?, ?, ?)
      `).run(id, item.title, item.description, item.price, quantity);
    }

    db.prepare("UPDATE items SET stock = stock - ? WHERE id = ?").run(quantity, id);

    return NextResponse.json({ message: "Item added to cart." }, { status: 200 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id, quantity } = await req.json();

    if (!id || !quantity) {
      return NextResponse.json({ error: "itemId and quantity are required." }, { status: 400 });
    }

    const cartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(id) as CartItem | undefined;
    if (!cartItem) {
      return NextResponse.json({ error: "Item is not in the cart." }, { status: 400 });
    }

    if (quantity >= cartItem.quantity) {
      db.prepare("DELETE FROM cart WHERE id = ?").run(id);
    } else {
      db.prepare("UPDATE cart SET quantity = quantity - ? WHERE id = ?").run(quantity, id);
    }

    db.prepare("UPDATE items SET stock = stock + ? WHERE id = ?").run(quantity, id);

    return NextResponse.json({ message: "Item removed from cart." }, { status: 200 });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}