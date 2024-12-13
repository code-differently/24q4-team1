'use client';
import { useEffect, useState } from "react";
import { Item } from "../../types/item";
import NavLinks from "../ui/nav-links";

export default function Page() {
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);  // Add a loading state
    const [error, setError] = useState<string | null>(null); // Add an error state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("api/items");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                // Ensure that the data is an array before setting the state
                if (Array.isArray(data.products)) {
                    setData(data.products);
                } else {
                    throw new Error("Data is not an array");
                }
            } catch (error: unknown) {
                console.log(error);
                setError("not an array"); // Set error state
            } finally {
                setLoading(false); // Set loading to false after the request is complete
            }
        };

        fetchProducts();
    }, []);

    // Loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-gradient-to-br from-teal-300 to-teal-600 grid grid-cols-4 overflow-auto">
            <NavLinks/>
            {data.map((item) => {
                function buyNow(id: number) {
                    if (item.stock <= 0) {
                        fetch(`/api/items/`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id: item.id }),
                        });
                        window.location.reload();
                    }
                    fetch(`/api/cart`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: id }),
                    });
                    location.reload();
                }

                // Check if item.images is an array, otherwise parse it as a JSON string
                let img = [];
                try {
                    img = Array.isArray(item.images) ? item.images : JSON.parse(item.images);
                } catch (e) {
                    console.error("Error parsing item images", e);
                    img = [];
                }
                
                return (
                    <div className="pt-20 px-4 " key={item.id}>
                        <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
                        <h1>{item.id}</h1>
                        <h1 className="text-lg font-semibold">{item.name}</h1>
                        <p className="text-lg text-gray-600 font-bold">${item.price} each</p>
                        <p className="text-gray-500">{item.description}</p>
                        <p className="text-gray-500">There are {item.stock} of this item</p>
                        <img className="w-96 h-96" src={img[0]} alt={item.name} />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:text-gray-300" onClick={() => {buyNow(item.id)}}>Buy Now</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}