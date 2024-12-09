import React from "react";

export default function StartShoppingButton() {
    return (
        <><button className="text-white font-semibold text-3xl mt-4 mb-8 px-[100px] py-4 rounded-full bg-[#e10531] hover:bg-[#b5001a] relative translate-y-[410px] lg:translate-x-[400px]">
            <p className="translate-x-[-20px]">Start Shopping</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" fill-white w-8 h-8 absolute translate-y-[-32px] lg:translate-x-[200px]">
            <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
        </svg>
        </button></>
    );
}