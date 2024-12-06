import { NextRequest, NextResponse } from "next/server";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  [key: string]: string | number | string[] | undefined; // Allow additional fields
}

const EXTERNAL_API_URL = "https://dummyjson.com/products?limit=0";

async function fetchExternalProducts(): Promise<Product[]> {
  const response = await fetch(EXTERNAL_API_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.products;
}

const products: Product[] = [];

export async function GET() {
  try {
    const externalProducts = await fetchExternalProducts();
    const allProducts = [...externalProducts, ...products];

    return NextResponse.json({ products: allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    if (
      !productData.title ||
      !productData.description ||
      !productData.price ||
      !productData.images?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const externalProducts = await fetchExternalProducts();
    const externalMaxId = Math.max(...externalProducts.map((p) => p.id), 0);
    const internalMaxId = Math.max(...products.map((p) => p.id), 0);
    const newId = Math.max(externalMaxId, internalMaxId) + 1;

    const newProduct: Product = {
      id: newId,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      images: productData.images,
      ...productData,
    };

    products.push(newProduct);

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
