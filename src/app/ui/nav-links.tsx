import Link from "next/link";

export default function NavLinks() {
    return (
        <div className="flex-grow content-center">
            <ul className="flex justify-end gap-4 font-medium text-white">
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:bg-[#bfdc7f] h-10 sm:h-12 px-4"
                 href="/cart">View Cart</Link>
            </li>
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:bg-[#bfdc7f] h-10 sm:h-12 px-4"
                 href="/products">Purchase History</Link>
            </li>
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:bg-[#bfdc7f] h-10 px-4"
                 href="/account">Login/Register</Link>
            </li>
        </ul>
        </div>
    );
}