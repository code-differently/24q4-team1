import { NextRequest, NextResponse } from 'next/server';
import getDatabaseConnection from '../../scripts/db';

type RouteHandler = (
  request: NextRequest
) => Promise<NextResponse> | NextResponse;

export const GET: RouteHandler = async (request) => {
    const db = getDatabaseConnection();

    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop(); // Extract id from the URL path

        if (!id) {
            return NextResponse.json({ error: "id parameter is missing" }, { status: 400 });
        }

        const item = db.prepare(`SELECT * FROM cart WHERE id = ?`).get(id);

        if (!item) {
            return NextResponse.json({ error: "item does not exist" }, { status: 404 });
        }

        return NextResponse.json(item, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
};