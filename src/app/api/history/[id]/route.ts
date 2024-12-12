
/**
 * @swagger
 * /api/history/{id}:
 *   get:
 *     summary: Fetch the product with the given ID from history.
 *     description: Retrieve the product with the given ID from history.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve from history.
 *     responses:
 *       200:
 *         description: The requested product.
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
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 4.5
 *                       title:
 *                         type: string
 *                         example: "Review Title"
 *                       body:
 *                         type: string
 *                         example: "Review body here."
 *                 stock:
 *                   type: integer
 *                   example: 5
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["electronics", "phone"]
 *                 brand:
 *                   type: string
 *                   example: "Apple"
 *                 sku:
 *                   type: string
 *                   example: "1234567890"
 *                 weight:
 *                   type: number
 *                   example: 3
 *                 dimensions:
 *                   type: object
 *                   properties:
 *                     width:
 *                       type: number
 *                       example: 12.42
 *                     height:
 *                       type: number
 *                       example: 8.63
 *                     depth:
 *                       type: number
 *                       example: 29.13
 *                 warrantyInformation:
 *                   type: string
 *                   example: "1 year warranty"
 *                 shippingInformation:
 *                   type: string
 *                   example: "Shipping information here."
 *       400:
 *         description: The `id` parameter is missing or invalid.
 *       404:
 *         description: The product is not found in history.
 *       500:
 *         description: Internal server error.
 */

import { NextResponse } from "next/server";
import  getDatabaseConnection  from "../../scripts/db";
import { CartItem } from "@/types/cartItem";
export async function GET(request: Request) {
    const db = getDatabaseConnection();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); 

    if (!id) {
        return NextResponse.json({ error: "id parameter is missing" }, { status: 400 });
    }

    try {

        const item = db.prepare(`SELECT * FROM history WHERE id = ?`).get(id) as CartItem | undefined;
        if (!item) {
            return NextResponse.json({ error: "item does not exist" }, { status: 404 });
        }

        return NextResponse.json(item, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
}