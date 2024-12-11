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
 *     summary: Remove an item entirely from the cart.
 *     description: Removes an item from the cart and restores its stock.
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
 *         description: Bad request. Missing or invalid `id`.
 *       500:
 *         description: Internal server error.
 *   patch:
 *     summary: Update the quantity of an item in the cart.
 *     description: Adjust the quantity of an item in the cart. If the resulting quantity is less than 1, the item is removed from the cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the item to update.
 *                 example: 1
 *               quantityChange:
 *                 type: integer
 *                 description: The amount to adjust the quantity by. Positive to increase, negative to decrease.
 *                 example: -1
 *     responses:
 *       200:
 *         description: Cart item quantity updated successfully or item removed if quantity drops below 1.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart item quantity updated."
 *       400:
 *         description: Bad request. Missing or invalid `id` or `quantityChange`.
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
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: "id is required." }, { status: 400 });
    }

    const item = db.prepare("SELECT * FROM items WHERE id = ?").get(id) as Item | undefined;
    if (!item) {
      return NextResponse.json({ error: "Item does not exist." }, { status: 400 });
    }

    if (item.stock <= 0) {
      return NextResponse.json({ error: "Insufficient stock." }, { status: 400 });
    }

    const cartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(id);
    if (cartItem) {
      db.prepare("UPDATE cart SET quantity = quantity + 1 WHERE id = ?").run(id);
    } else {
      db.prepare(`
        INSERT INTO cart (id, title, description, price, quantity, image)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(id, item.title, item.description, item.price, 1, item.images);
    }
    db.prepare("UPDATE items SET stock = stock - 1 WHERE id = ?").run(id);
    const updatedCartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(id);
    return NextResponse.json({ message: "Item added to cart.", cartItem: updatedCartItem }, { status: 200 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Item ID is required." }, { status: 400 });
    }

    const cartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(id) as CartItem | undefined;
    if (!cartItem) {
      return NextResponse.json({ error: "Item is not in the cart." }, { status: 400 });
    }

    db.prepare("DELETE FROM cart WHERE id = ?").run(id);
    db.prepare("UPDATE items SET stock = stock + ? WHERE id = ?").run(cartItem.quantity, id);

    return NextResponse.json({ message: "Item removed from cart." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, quantityChange } = await req.json(); 

    if (!id || typeof quantityChange !== "number") {
      return NextResponse.json({ error: "Item ID and quantityChange are required." }, { status: 400 });
    }
    
    const cartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(id) as CartItem | undefined;
    
    if (!cartItem) {
      return NextResponse.json({ error: "Item is not in the cart." }, { status: 400 });
    }

    const newQuantity = cartItem.quantity + quantityChange;

    if (newQuantity < 1) {
      db.prepare("DELETE FROM cart WHERE id = ?").run(id);
      db.prepare("UPDATE items SET stock = stock + ? WHERE id = ?").run(cartItem.quantity, id);

      return NextResponse.json({ message: "Item removed from cart." }, { status: 200 });
    } else {
      db.prepare("UPDATE cart SET quantity = ? WHERE id = ?").run(newQuantity, id);

      if (quantityChange > 0) {
        db.prepare("UPDATE items SET stock = stock - ? WHERE id = ?").run(quantityChange, id);
      } else {
        db.prepare("UPDATE items SET stock = stock + ? WHERE id = ?").run(-quantityChange, id);
      }

      const updatedCartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(id);

      return NextResponse.json({ message: "Cart item quantity updated.", cartItem: updatedCartItem }, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}