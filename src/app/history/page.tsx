'use client'
import { CartItem } from "@/types/cartItem";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react"
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
        <>
        <NavLinks/>
        <div>
            {data.map((item) => {
            let imageSrc = null;
            try {
              const parsedImage = JSON.parse(item.image); 
              if (Array.isArray(parsedImage) && parsedImage[0]) {
                imageSrc = parsedImage[0];  
              }
            } catch (error) {
              console.error('Error parsing image:', error);
            }

            console.log('Image src:', imageSrc); 
            return (
              <Card key={item.id} sx={{
                width:350,
                height:500
              }}>
                <p>{item.title}</p>
                <p>{item.description.split('').slice(0, 150)}...</p>
                <p>{item.price}</p>
                
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
        </>
    )
}