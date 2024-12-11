import { NextRequest, NextResponse } from "next/server";
import { Item } from "@/types/item";
import { CartItem } from "@/types/cartItem";
import getDatabaseConnection from "../scripts/db";




const db = getDatabaseConnection();

export async function GET(req: NextRequest) {
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

    return NextResponse.json({ message: "Item added to cart." }, { status: 200 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: "itemId is required." }, { status: 400 });
    }
    
    const cartItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(id) as CartItem | undefined;
    
    if (!cartItem) {
      return NextResponse.json({ error: "Item is not in the cart." }, { status: 400 });
    }
    
    db.prepare("UPDATE cart SET quantity = quantity - 1 WHERE id = ?").run(id);
    const newItem = db.prepare("SELECT * FROM cart WHERE id = ?").get(id) as CartItem;
    if(newItem?.quantity <= 0){
      db.prepare(`DELETE FROM cart WHERE id = ?`).run(id);
    }
    db.prepare("UPDATE items SET stock = stock + 1 WHERE id = ?").run(id);

    return NextResponse.json({ message: "Item removed from cart." }, { status: 200 });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}