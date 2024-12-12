'use client'
import { CartItem } from "@/types/cartItem";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react"
import Image from "next/image";
import Card from "@mui/joy/Card";
import NavLinks from "../ui/nav-links";

export default function Page(){
    const [data, setData] = useState<CartItem[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch("api/history");
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data:CartItem[] = await response.json();
            setData(data);
          } catch (error){
            return NextResponse.json(error);
          }
        };

        fetchUsers();
      }, []);
    return(
        <div className="bg-black">
        <NavLinks/>
        <div>
          <h1>Purchase History</h1>
            {data.map((item) => {
            let imageSrc = null;
            try {
              const parsedImage = JSON.parse(item.image[0]);
              imageSrc = parsedImage[0];
            } catch (error) {
              console.error('Error parsing image:', error);
            }
            return (

              <Card key={item.id} sx={{
                width:350,
                height:1,
              }}>
                <p>{item.title}</p>
                <p>{item.description.split('').slice(0, 150)}...</p>
                <p>${item.price} each</p>
                <p>you bought: {item.quantity}</p>
                <p>total bought: ${(item.price * item.quantity).toFixed(2)}</p>
                <a href={`/history/${item.id}`}>View in Cart</a>

                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={item.title}
                    width={100}
                    height={100}
                    layout='responsive'
                  />
                ) : (
                  <p>No image available</p>
                )}
              </Card>
              );
            })}
        </div>
        </div>
    )
}