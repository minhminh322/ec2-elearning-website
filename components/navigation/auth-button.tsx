"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Authentication from "@/components/authentication/authentication";
import { useSession } from "next-auth/react";
import SignOut from "../authentication/sign-out";
import { Button } from "../ui/button";
export const AuthButton = () => {
  const { data: session, status } = useSession();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          {status === "authenticated" ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="outline">Sign in</Button>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {status === "authenticated" ? <SignOut /> : <Authentication />}
      </DialogContent>
    </Dialog>
  );
};
