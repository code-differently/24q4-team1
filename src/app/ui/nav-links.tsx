import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavLinks() {
    return (
        <div className="flex-grow content-center sticky">
            <ul className="flex justify-end gap-4 font-medium text-white">
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:bg-[#004c4c] h-10 sm:h-12 px-4"
                 href="/">Home</Link>
            </li>
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:bg-[#004c4c] h-10 sm:h-12 px-4"
                 href="/cartpage">View Cart</Link>
            </li>
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:bg-[#004c4c] h-10 sm:h-12 px-4"
                 href="/history">Purchase History</Link>
            </li>
            <li className="rounded-full border border-solid border-transparent dark:hover:bg-[#004c4c] h-10 sm:h-12 px-4">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </li>
        </ul>
        </div>
    );
}