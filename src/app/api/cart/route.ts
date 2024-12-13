import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseConnection } from '../scripts/db'; // Import DB connection

// Initialize DB connection
const db = getDatabaseConnection();

// Handle GET requests to fetch all items in the cart
export async function GET() {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM cart",
      args: [],
    });
    const cartItems = result.rows; // Extract rows from the query result
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handle POST requests to add an item to the cart
export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "id is required." }, { status: 400 });
    }

    // Check if the item exists
    const itemResult = await db.execute({
      sql: "SELECT * FROM items WHERE id = ?",
      args: [id],
    });

    const item = itemResult.rows[0]; // Get the first row
    if (!item) {
      return NextResponse.json({ error: "Item does not exist." }, { status: 400 });
    }

    if (Number(item.stock) <= 0) {
      return NextResponse.json({ error: "Insufficient stock." }, { status: 400 });
    }

    // Check if item is already in the cart
    const cartItemResult = await db.execute({
      sql: "SELECT * FROM cart WHERE id = ?",
      args: [id],
    });

    const cartItem = cartItemResult.rows[0];
    if (cartItem) {
      // Update the existing cart item
      await db.execute({
        sql: "UPDATE cart SET quantity = quantity + 1 WHERE id = ?",
        args: [id],
      });
    } else {
      // Add the new item to the cart
      await db.execute({
        sql: `
          INSERT INTO cart (id, title, description, price, quantity, image)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        args: [id, item.title, item.description, item.price, 1, item.images],
      });
    }

    // Update stock of the item
    await db.execute({
      sql: "UPDATE items SET stock = stock - 1 WHERE id = ?",
      args: [id],
    });

    // Fetch updated cart item
    const updatedCartItemResult = await db.execute({
      sql: "SELECT * FROM cart WHERE id = ?",
      args: [id],
    });

    const updatedCartItem = updatedCartItemResult.rows[0];
    return NextResponse.json({ message: "Item added to cart.", cartItem: updatedCartItem }, { status: 200 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handle DELETE requests to remove an item from the cart
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Item ID is required." }, { status: 400 });
    }

    // Check if the item is in the cart
    const cartItemResult = await db.execute({
      sql: "SELECT * FROM cart WHERE id = ?",
      args: [id],
    });

    const cartItem = cartItemResult.rows[0];
    if (!cartItem) {
      return NextResponse.json({ error: "Item is not in the cart." }, { status: 400 });
    }

    // Remove item from the cart
    await db.execute({
      sql: "DELETE FROM cart WHERE id = ?",
      args: [id],
    });

    // Restore the stock
    await db.execute({
      sql: "UPDATE items SET stock = stock + ? WHERE id = ?",
      args: [cartItem.quantity, id],
    });

    return NextResponse.json({ message: "Item removed from cart." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handle PATCH requests to update the quantity of an item in the cart
export async function PATCH(req: NextRequest) {
  try {
    const { id, quantityChange } = await req.json();

    if (!id || typeof quantityChange !== "number") {
      return NextResponse.json({ error: "Item ID and quantityChange are required." }, { status: 400 });
    }

    // Check if the item exists in the cart
    const cartItemResult = await db.execute({
      sql: "SELECT * FROM cart WHERE id = ?",
      args: [id],
    });

    const cartItem = cartItemResult.rows[0];
    if (!cartItem) {
      return NextResponse.json({ error: "Item is not in the cart." }, { status: 400 });
    }

    // Calculate the new quantity
    const quantity = cartItem.quantity !== null && cartItem.quantity !== undefined ? Number(cartItem.quantity) : 0;
    const newQuantity = quantity + quantityChange;

    if (newQuantity < 1) {
      // If quantity drops below 1, remove the item from the cart
      await db.execute({
        sql: "DELETE FROM cart WHERE id = ?",
        args: [id],
      });

      // Restore the stock
      await db.execute({
        sql: "UPDATE items SET stock = stock + ? WHERE id = ?",
        args: [cartItem.quantity, id],
      });

      return NextResponse.json({ message: "Item removed from cart." }, { status: 200 });
    } else {
      // Update the cart item quantity
      await db.execute({
        sql: "UPDATE cart SET quantity = ? WHERE id = ?",
        args: [newQuantity, id],
      });

      // Adjust stock based on the change
      if (quantityChange > 0) {
        await db.execute({
          sql: "UPDATE items SET stock = stock - ? WHERE id = ?",
          args: [quantityChange, id],
        });
      } else {
        await db.execute({
          sql: "UPDATE items SET stock = stock + ? WHERE id = ?",
          args: [-quantityChange, id],
        });
      }

      // Fetch updated cart item
      const updatedCartItemResult = await db.execute({
        sql: "SELECT * FROM cart WHERE id = ?",
        args: [id],
      });

      const updatedCartItem = updatedCartItemResult.rows[0];
      return NextResponse.json({ message: "Cart item quantity updated.", cartItem: updatedCartItem }, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}