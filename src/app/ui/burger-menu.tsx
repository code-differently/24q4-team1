"use client";
import React, { useState } from "react";
import CartViewTab from "./cart-view-tab";

export default function BurgerMenu() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    }
    return (
        <>
        <div className="flex flex-col">
            <button className="text-white hover:text-teal-800" onClick={handleOpen}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-7 h-9 ml-2 mr-2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
            </button>
        </div>
        {open && (
            <CartViewTab />
        )}
        </>
    );
}