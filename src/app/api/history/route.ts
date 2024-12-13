import { getDatabaseConnection } from "../scripts/db";
import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/types/cartItem";

// Initialize DB connection
const db = getDatabaseConnection();

export async function GET() {
    try {
        // Execute the query to fetch all history items
        const result = await db.execute(`SELECT * FROM history`);
        const all = result.rows; // Get the rows from the result

        if (!all || all.length === 0) {
            return NextResponse.json({ error: "No history found" }, { status: 404 });
        }

        return NextResponse.json(all);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();

        // Query for the cart item
        const cartItemResult = await db.execute(`SELECT * FROM cart WHERE id = ${id}`);
        const cartItem = cartItemResult.rows[0] as unknown as CartItem | undefined;

        if (!id || !cartItem) {
            return NextResponse.json({ error: "Invalid cart item" }, { status: 400 });
        }

        // Query for the history item
        const historyItemResult = await db.execute(`SELECT * FROM history WHERE id = ${id}`);
        const historyItem = historyItemResult.rows[0] as unknown as CartItem | undefined;

        if (!historyItem) {
            // If no history item, insert a new record into history
            await db.execute({
                sql: `
                    INSERT INTO history (id, title, description, price, quantity, image)
                    VALUES (?, ?, ?, ?, ?, ?)`,
                args: [id, cartItem.title, cartItem.description, cartItem.price, 1, cartItem.image]
            });

            // Update cart quantity
            await db.execute(`UPDATE cart SET quantity = quantity - 1 WHERE id = ${id}`);

            const updatedCartResult = await db.execute(`SELECT * FROM cart WHERE id = ${id}`);
            const updatedCart = updatedCartResult.rows[0] as unknown as CartItem;

            if (updatedCart.quantity <= 0) {
                // If quantity is 0, delete the cart item
                await db.execute(`DELETE FROM cart WHERE id = ${id}`);
            }

            return NextResponse.json({ message: "Created history item and updated cart" }, { status: 201 });
        }

        // If history item exists, update the quantities
        if (historyItem.quantity <= 0) {
            // If history item quantity is 0, delete the cart item
            await db.execute(`DELETE FROM cart WHERE id = ${id}`);
            return NextResponse.json({ message: "Cart item deleted due to zero quantity in history" }, { status: 200 });
        }

        // Update history and cart if there are items
        if (historyItem.quantity > 0) {
            await db.execute(`UPDATE history SET quantity = quantity + 1 WHERE id = ${id}`);
            await db.execute(`UPDATE cart SET quantity = quantity - 1 WHERE id = ${id}`);

            const updatedCartResult = await db.execute(`SELECT * FROM cart WHERE id = ${id}`);
            const updatedCart = updatedCartResult.rows[0] as unknown as CartItem;

            if (updatedCart.quantity <= 0) {
                // Delete from cart if quantity is zero
                await db.execute(`DELETE FROM cart WHERE id = ${id}`);
                return NextResponse.json({ message: "Cart item deleted" }, { status: 200 });
            }

            return NextResponse.json({ message: "History updated, cart adjusted" }, { status: 200 });
        }

        return NextResponse.json({ error: "Unexpected state" }, { status: 500 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        // Delete from history based on id
        const result = await db.execute(`DELETE FROM history WHERE id = ${id}`);

        return NextResponse.json({ message: `Deleted item with id ${id}` }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}