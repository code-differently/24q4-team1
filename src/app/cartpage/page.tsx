"use client"
import Card from '@mui/joy/Card';
import { CartItem } from '@/types/cartItem';
import { NextResponse } from 'next/server';
import * as React from 'react';
import { useEffect, useState } from 'react';
import NavLinks from '../ui/nav-links';
import Image from 'next/image'; 



const Catcher = async () => {
  try {
      const data = await fetch('/api/cart');
      const cart: CartItem[] = await data.json();

      const historyPromises = cart.map(async (item) => {
          const response = await fetch('/api/history', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id : item.id}),
          });

          console.log(JSON.stringify({id : item.id}))
          if (!response.ok) {
              console.error(`Failed to post item ${item.id} to history:`, await response.text());
          }
      });
      await Promise.all(historyPromises);
      console.log("All items have been processed and sent to history.");
  } catch (error) {
      console.error("Error in Catcher:", error);
  }
};
export default function Page(){
    const [data, setData] = useState<CartItem[]>([]);
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await fetch("api/cart");
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data:CartItem[] = await response.json();
            setData(data);
          } catch (error){
            return NextResponse.json(error);
          }
        };
    
        fetchItems();
      }, []);
    
    return(
        <>
        <NavLinks/> 
        <button onClick={Catcher}className='text-white'>
              button
            </button>
        <div className='flex-1 flex-row'>
            <div className='flex-1'>
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
            
        </div>
        </>
    );
} 
