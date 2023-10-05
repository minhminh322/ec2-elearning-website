"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Authentication from "./sign-in";
import { useSession } from "next-auth/react";
import SignOut from "./sign-out";

export const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="flex gap-x-2 ml-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              {status === "authenticated" ? "Sign out" : "Sign In"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {status === "authenticated" ? <SignOut /> : <Authentication />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
