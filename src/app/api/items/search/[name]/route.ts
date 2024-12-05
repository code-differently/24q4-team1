import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = params;

  const apiUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(name)}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data = await response.json();

    return data
      ? NextResponse.json({ product: data })
      : NextResponse.json({ error: 'Item not found' }, { status: 404 });

  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}