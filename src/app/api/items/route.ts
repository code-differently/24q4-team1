import { NextResponse } from 'next/server';


/**
 * @swagger
 * /api/items:
 *   get:
 *     description: Returns all items
 *     responses:
 *       200:
 *         description: Json Object of items!
 *       500:
 *         description: Failed to fetch
 */

export async function GET() {
  try {
    const response = await fetch('https://dummyjson.com/products');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);

    return NextResponse.json(
      { message: 'Failed to fetch products'},
      { status: 500 }
    );
  }
}