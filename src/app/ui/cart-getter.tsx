import React, { useEffect, useState} from 'react'
import { CartItem } from '@/types/cartItem';
import { NextResponse } from 'next/server';
export default function CartGetter() {
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

    return (
        <>
            {data.map((item) => {
            let imageSrc = null;
            try {
                const parsedImage = JSON.parse(item.image[0]);
                imageSrc = parsedImage[0];
            } catch (error) {
              console.error("Error parsing image:", error);
            }
                function deleteItem(id: number) {
                    fetch(`/api/cart`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: item.id }),
                    }).then(() => {
                        setData(data.filter(item => item.id !== id));
                    });
                }

            return (
                <div key={item.id} className='flex flex-col items-left'>
                    <div className='flex align-left items-left'>
                        <img src={imageSrc} alt="item" className="w-16 h-16" />
                        <p>{item.title.toString().substring(0, 15)} {item.quantity} </p>
                        <p> x{item.price} =</p>
                        <p> ${(item.price * item.quantity).toFixed(2)}</p>
                        <button onClick={() => {deleteItem(item.id)}} className="bg-blue-500 hover:bg-blue-700 hover:pointer text-white font-bold py-2 px-4 rounded">Remove</button>
                        </div>
                </div>
            )
            })}
        </>
    )
}