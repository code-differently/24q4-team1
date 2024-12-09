import { NextRequest, NextResponse } from "next/server";
import { Item } from "@/types/item";
import { CartItem } from "@/types/cartItem";
import getDatabaseConnection from "../scripts/db";




const db = getDatabaseConnection();

export async function GET(req: NextRequest) {
  try {
    const cartItems = db.prepare("SELECT * FROM cart").all();
    if(req.body == null) {
      return NextResponse.json({error: req.body + " not allowed"}, {status: 500});
    }
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ error: "Internal Server Error "}, { status: 500 });
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