/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Fetch all products, including external and internal products.
 *     responses:
 *       200:
 *         description: A list of products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Product Title"
 *                       description:
 *                         type: string
 *                         example: "Product description here."
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 99.99
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["https://example.com/product-image.jpg"]
 *                       category:
 *                         type: string
 *                         example: "electronics"
 *                       stock:
 *                         type: integer
 *                         example: 50
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 4.5
 *                       discountPercentage:
 *                         type: number
 *                         format: float
 *                         example: 10
 *                       brand:
 *                         type: string
 *                         example: "Brand Name"
 *                       sku:
 *                         type: string
 *                         example: "ABC123"
 *                       warrantyInformation:
 *                         type: string
 *                         example: "1-year warranty"
 *                       shippingInformation:
 *                         type: string
 *                         example: "Ships in 3-5 days."
 *                       reviews:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             rating:
 *                               type: integer
 *                               example: 5
 *                             comment:
 *                               type: string
 *                               example: "Excellent product!"
 *                             date:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-12-06T10:00:00Z"
 *                             reviewerName:
 *                               type: string
 *                               example: "John Doe"
 *                             reviewerEmail:
 *                               type: string
 *                               example: "johndoe@example.com"
 *   post:
 *     description: Add a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the product.
 *               description:
 *                 type: string
 *                 description: A detailed description of the product.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of image URLs for the product.
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product.
 *               brand:
 *                 type: string
 *                 description: The brand of the product.
 *               sku:
 *                 type: string
 *                 description: The SKU (Stock Keeping Unit) of the product.
 *               warrantyInformation:
 *                 type: string
 *                 description: Warranty details for the product.
 *               shippingInformation:
 *                 type: string
 *                 description: Shipping details for the product.
 *     responses:
 *       201:
 *         description: Product successfully added.
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
 *                       example: 101
 *                     title:
 *                       type: string
 *                       example: "New Product"
 *                     description:
 *                       type: string
 *                       example: "A brand new product description."
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 199.99
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["https://example.com/product-image.jpg"]
 *                     category:
 *                       type: string
 *                       example: "electronics"
 *                     stock:
 *                       type: integer
 *                       example: 30
 *                     brand:
 *                       type: string
 *                       example: "New Brand"
 *                     sku:
 *                       type: string
 *                       example: "XYZ456"
 *                     warrantyInformation:
 *                       type: string
 *                       example: "2-year warranty"
 *                     shippingInformation:
 *                       type: string
 *                       example: "Ships within 5-7 days."
 *       400:
 *         description: Bad request, missing required fields.
 *       500:
 *         description: Internal server error.
 */

import { NextRequest, NextResponse } from "next/server";
import getDatabaseConnection from "../scripts/db";
import {Item} from '@/types/item';
const db = getDatabaseConnection();

function fetchItems(){
  const items = db.prepare("SELECT * FROM items").all();
  return items
}

function addItemToDB(item: Item){

  console.log(item);

  const insertData = db.prepare(`
    INSERT OR IGNORE INTO items (
      id, title, description, price, images, category, stock, rating,
      discountPercentage, brand, sku, warrantyInformation, shippingInformation, reviews
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const values = [
    item.id,
    item.title,
    item.description,
    item.price,
    JSON.stringify(item.images), // Convert arrays or objects to a string for storage
    item.category,
    item.stock,
    item.rating,
    item.discountPercentage,
    item.brand,
    item.sku,
    item.warrantyInformation,
    item.shippingInformation,
    JSON.stringify(item.reviews) // Convert arrays or objects to a string for storage
  ];

  insertData.run(values);


}

export async function GET() {
  try {
    const items = fetchItems();
    return NextResponse.json(items, {status: 200});
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { message: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const itemData = await request.json();

    if (
      !itemData.title ||
      !itemData.description ||
      !itemData.price ||
      !itemData.images?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const items = fetchItems();
    const itemMaxId = Math.max(...(items as Item[]).map((item) => item.id), 0);

    const newItem: Item = {
      id: itemMaxId + 1,
      title: itemData.title,
      description: itemData.description,
      price: itemData.price,
      images: itemData.images,
      ...itemData,
    };

    addItemToDB(newItem);


    return NextResponse.json(newItem, { status: 200 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest){
  const {id} = await req.json();
  const del = db.prepare(`DELETE FROM items WHERE id = ?`).run(id);
  return NextResponse.json(del);
}