"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="max-w-md w-full space-y-4 p-8">
      <h1>Are you sure you want to sign out?</h1>
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
    </div>
  );
}
