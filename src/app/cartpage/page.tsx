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
  window.location.reload();


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
        <div className='bg-black'>
        <NavLinks/>
        <button onClick={Catcher}className='text-white'>
          Click here to buy one of each item now
            </button>
        <div className='flex-1 flex-row'>
            <div className='flex-1'>
            {data.map((item) => {
            if(Array.isArray(item.image)) {
              console.error("item.image is an array:", item.image);
              return null;
            }
          const img= JSON.parse(item.image);

            console.log('Image src:', img);
            function deleteItem(id: number) {
              fetch(`/api/cart/${id}`, {
                method: 'DELETE',
              }).then(() => {
                window.location.reload();
              });
            }
            return (
              <Card key={item.id} sx={{
                width:350,
                height:600
              }}>
                <button className='bg-red-500 rounded' onClick={() => deleteItem(item.id)}>Delete Item</button>
                <p>{item.title}</p>
                <p>{item.description.split('').slice(0, 150)}...</p>
                <p>Quantity: {item.quantity}</p>
                <p>total price: {(item.price * item.quantity).toFixed(2)}</p>
                <p>${item.price} each</p>
                  <Image
                    src={img[0]}
                    alt={item.title}
                    width={100}
                    height={100}
                    layout='responsive'
                  />
              </Card>
            );
          })}
            </div>
        </div>
        </div>
    );
}
