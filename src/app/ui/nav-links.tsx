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
        <div className="flex-grow content-center absolute z-10 translate-y-[7px] lg:translate-x-[1590px]">
            <ul className="flex justify-end gap-4 font-medium text-white">
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:text-teal-800"
                 href="/cart">View Cart</Link>
            </li>
            <li>
                <Link className="rounded-full border border-solid border-transparent dark:hover:text-teal-800"
                 href="/products">Purchase History</Link>
            </li>
            <li>
            <ClerkProvider>
              <SignedOut>
                <SignInButton className="pr-[7px] rounded-full border border-solid border-transparent dark:hover:text-teal-800"/>
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