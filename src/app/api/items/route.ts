import { NextResponse } from 'next/server';
import '@/types/item'

const items = [
  { id: 1, name: "Item A", description: "Description of Item A", price: 20.99 },
  { id: 2, name: "Item B", description: "Description of Item B", price: 15.49 },
  { id: 3, name: "Item C", description: "Description of Item C", price: 10.00 },
];

export async function GET() {
  return NextResponse.json({ items });
}