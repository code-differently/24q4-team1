import { ClerkProvider} from "@clerk/nextjs";

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function CustomSignInButton() {
    return (
        <ClerkProvider>
              <SignedOut >
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
        </ClerkProvider>
      );
}


