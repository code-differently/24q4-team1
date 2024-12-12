'use client';
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { Item } from "../../types/item";
import NavLinks from "../ui/nav-links";

export default function Page() {
    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("api/items");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setData(data);
            } catch (error){
                return NextResponse.json(error);
            }
        };

        fetchProducts();
    }, [])

    return (
        <>
        <NavLinks/>
            {data.map((item) => {
                function buyNow(id: number) {
                    if(item.stock <= 0) {
                        fetch(`/api/items/`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({id:item.id}),
                        })
                        window.location.reload();
                    }
                    fetch(`/api/cart`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({id:id}),
                    })

                }
                // const img = item.images = JSON.parse(item.images);
                return (

                    <div className="flex flex-col bg-black text-white gap-2" key={item.id}>
                        <h1>{item.id}</h1>
                        <h1>{item.name}</h1>
                        <p>{item.price}</p>
                        <p>{item.description}</p>
                        <p>there are {item.stock} of this item</p>
                        {/* <img className="w-96 h-96" src={img[0]} alt={item.name} /> */}
                        <button onClick={() => {buyNow(item.id)}}>Buy Now</button>
                    </div>

                );
            })}
        </>
    );
}