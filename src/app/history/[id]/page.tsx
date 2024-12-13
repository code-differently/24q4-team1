import { CartItem } from "@/types/cartItem";
import Image from "next/image";
import Card from "@mui/joy/Card";
import NavLinks from "../../ui/nav-links";

interface ItemDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ItemDetailsPage({ params }: ItemDetailsPageProps) {
  // Wait for the params promise to resolve
  const { id } = await params;

  // Fetch the item based on the dynamic id
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/${id}`);
  if (!response.ok) {
    return (
      <div>
        <h1>Error fetching item</h1>
        <p>Status: {response.status}</p>
      </div>
    );
  }

  const item: CartItem = await response.json();

  let imageSrc: string | null = null;
  try {
    const parsedImage = JSON.parse(item.image[0]); // Assuming item.image is a JSON string
    imageSrc = parsedImage; // If it's a single string, use it directly
  } catch (error) {
    console.error("Error parsing image:", error);
  }

  return (
    <>
      <NavLinks />
      <div className="bg-black">
        <Card
          sx={{
            width: 350,
            height: 1,
          }}
        >
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>${item.price} each</p>
          <p>Quantity bought: {item.quantity}</p>
          <p>Total spent: ${(item.price * item.quantity).toFixed(2)}</p>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={item.title}
              width={100}
              height={100}
              layout="responsive"
            />
          ) : (
            <p>No image available</p>
          )}
        </Card>
      </div>
    </>
  );
}