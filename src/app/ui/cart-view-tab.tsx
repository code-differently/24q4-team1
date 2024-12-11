"use client";
import React, { useState } from "react";

export default function CartViewTab() {
    const [cartOpen, setCartOpen] = useState(true);
    const handleClose = () => {
        setCartOpen(false);
    }
    return (
        <>
        {cartOpen && (
            <div id="cart-tab" className="text-white absolute bg-gradient-to-br from-teal-300 to-teal-600 top-0 right-0 w-[400px] h-[550px] shadow-2xl z-10">
            <h1 className="text-2xl text-center">Shopping Cart</h1>
            <div id="cart-list" className="flex flex-col h-[505px]">
                <div id="btn-container" className="flex justify-evenly px-1 mt-auto">
                    <button id="close-btn" className="bg-gradient-to-br from-teal-700 to-teal-800 w-[45%] hover:text-gray-300" onClick={handleClose}>Close</button>
                    <button className="bg-gradient-to-br from-teal-700 to-teal-800 w-[45%] hover:text-gray-300">Checkout</button>
                </div>
            </div>
        </div>
        )}
    </>
    );
}