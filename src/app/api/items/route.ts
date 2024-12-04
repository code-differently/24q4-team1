import { NextResponse } from 'next/server';

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const items = [
  { id: 1, name: "Item A", description: "Description of Item A", price: 20.99 },
  { id: 2, name: "Item B", description: "Description of Item B", price: 15.49 },
  { id: 3, name: "Item C", description: "Description of Item C", price: 10.00 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const itemId = parseInt(id, 10);

    if (!isNaN(itemId)) {
      const item = items.find((item) => item.id === itemId);

      if (item) {
        return NextResponse.json({ item });
      }

      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    } else {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
    }
  }

  return NextResponse.json({ items });
}