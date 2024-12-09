import Link from "next/link";
import CustomSignInButton from "./custom-sign-in-button";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from "@clerk/nextjs";
export default function NavLinks() {
    return (
        <div className="flex-grow content-center">
            <ul className="flex justify-end gap-4 font-medium text-white">
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:bg-[#004c4c] h-10 sm:h-12 px-4"
                 href="/cart">View Cart</Link>
            </li>
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:bg-[#004c4c] h-10 sm:h-12 px-4"
                 href="/products">Purchase History</Link>
            </li>
            <li>
            <ClerkProvider>
              <SignedOut >
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
        </ClerkProvider>
            </li>
        </ul>
        </div>
    );
}