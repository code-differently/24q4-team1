/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *     summary: Fetch a specific item from the cart.
 *     description: Retrieve details of a specific item in the cart by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cart item to retrieve.
 *     responses:
 *       200:
 *         description: The requested cart item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123"
 *                 title:
 *                   type: string
 *                   example: "Product Title"
 *                 description:
 *                   type: string
 *                   example: "Product description here."
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 99.99
 *                 quantity:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: The `id` parameter is missing or invalid.
 *       404:
 *         description: The cart item does not exist.
 *       500:
 *         description: Internal server error.
 */

import { NextResponse } from 'next/server';
import getDatabaseConnection from '../../scripts/db';
import { RouteHandler } from '@/types/routeHandler';

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