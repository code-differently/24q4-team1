import React, { useEffect, useState} from 'react'
import { CartItem } from '@/types/cartItem';
import { NextResponse } from 'next/server';
import Image from 'next/image';
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
            if(Array.isArray(item.image)) {
                console.error("item.image is an array:", item.image);
                return null
            }
            const img = JSON.parse(item.image);
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
                        <Image src={img} alt="item" width={100} height={100} />
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