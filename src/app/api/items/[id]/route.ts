/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     description: Retrieve items by ID or search query
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID or search term
 *     responses:
 *       200:
 *         description: Successful item retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     title:
 *                       type: string
 *                       example: "Eyeshadow Palette with Mirror"
 *                     description:
 *                       type: string
 *                       example: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application."
 *                     category:
 *                       type: string
 *                       example: "beauty"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 19.99
 *                     discountPercentage:
 *                       type: number
 *                       format: float
 *                       example: 5.5
 *                     rating:
 *                       type: number
 *                       format: float
 *                       example: 3.28
 *                     stock:
 *                       type: integer
 *                       example: 44
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["beauty", "eyeshadow"]
 *                     brand:
 *                       type: string
 *                       example: "Glamour Beauty"
 *                     sku:
 *                       type: string
 *                       example: "MVCFH27F"
 *                     weight:
 *                       type: number
 *                       example: 3
 *                     dimensions:
 *                       type: object
 *                       properties:
 *                         width:
 *                           type: number
 *                           example: 12.42
 *                         height:
 *                           type: number
 *                           example: 8.63
 *                         depth:
 *                           type: number
 *                           example: 29.13
 *                     warrantyInformation:
 *                       type: string
 *                       example: "1 year warranty"
 *                     shippingInformation:
 *                       type: string
 *                       example: "Ships in 2 weeks"
 *                     availabilityStatus:
 *                       type: string
 *                       example: "In Stock"
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           rating:
 *                             type: integer
 *                             example: 4
 *                           comment:
 *                             type: string
 *                             example: "Very satisfied!"
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-05-23T08:56:21.618Z"
 *                           reviewerName:
 *                             type: string
 *                             example: "Liam Garcia"
 *                           reviewerEmail:
 *                             type: string
 *                             example: "liam.garcia@x.dummyjson.com"
 *                     returnPolicy:
 *                       type: string
 *                       example: "30 days return policy"
 *                     minimumOrderQuantity:
 *                       type: integer
 *                       example: 32
 *                     meta:
 *                       type: object
 *                       properties:
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-05-23T08:56:21.618Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-05-23T08:56:21.618Z"
 *                         barcode:
 *                           type: string
 *                           example: "2817839095220"
 *                         qrCode:
 *                           type: string
 *                           example: "https://assets.dummyjson.com/public/qr-code.png"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png"
 *                     thumbnail:
 *                       type: string
 *                       example: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */

import { NextRequest, NextResponse } from "next/server";
import getDatabaseConnection from "../../scripts/db";
import { Item } from "@/types/item";
import { RawItem } from "@/types/rawItem";

const db = getDatabaseConnection();


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  const { id } = params; // Retrieve the `id` parameter from the request

  try {
    // Query the database for the item and define its type
    const rawItem = db
      .prepare("SELECT * FROM items WHERE id = ?")
      .get(id) as RawItem | undefined;

    if (rawItem) {
      // "Un-stringify" JSON fields
      const item: Item = {
        ...rawItem,
        images: rawItem.images ? JSON.parse(rawItem.images) : [],
        reviews: rawItem.reviews ? JSON.parse(rawItem.reviews) : [],
      };

      // Return the un-stringified item as JSON
      return NextResponse.json({ product: item });
    } else {
      // Return a 404 response if the item is not found
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }
  } catch (error: unknown) {
    console.error("Error fetching product:", error);

    // Return a 500 response if there is a server error
    return NextResponse.json(
      { error: "Failed to fetch product", details: error },
      { status: 500 }
    );
  }
}
