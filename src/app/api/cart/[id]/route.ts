import { NextResponse } from 'next/server';
import { RouteHandler } from '@/types/routeHandler';
import { getDatabaseConnection } from '../../scripts/db';

export const GET: RouteHandler = async (request) => {
    const db = getDatabaseConnection();

    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop(); // Extract id from the URL path

        if (!id) {
            return NextResponse.json({ error: "id parameter is missing" }, { status: 400 });
        }

        // Using libsql's `execute` method
        const result = await db.execute({
            sql: "SELECT * FROM cart WHERE id = ?",
            args: [id],
        });

        const item = result.rows[0]; // Access the first row from the result

        if (!item) {
            return NextResponse.json({ error: "item does not exist" }, { status: 404 });
        }

        return NextResponse.json(item, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
};

export const DELETE: RouteHandler = async (request) => {
    const db = getDatabaseConnection();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ error: "id parameter is missing" }, { status: 400 });
    }

    try {
        // Fetch item from the cart
        const result = await db.execute({
            sql: "SELECT * FROM cart WHERE id = ?",
            args: [id],
        });
        const item = result.rows[0]; // Access the first row

        if (!item) {
            return NextResponse.json({ error: "item does not exist" }, { status: 404 });
        }

        // Delete item from the cart
        await db.execute({
            sql: "DELETE FROM cart WHERE id = ?",
            args: [id],
        });

        // Update stock if necessary (adjust logic based on how stock is handled)
        await db.execute({
            sql: "UPDATE items SET stock = stock + ? WHERE id = ?",
            args: [item.quantity, id],
        });

        return NextResponse.json({ message: "Item removed from cart." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
};