"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { AuthMenu } from "./auth-menu";
import { AuthDialog } from "./auth-dialog";
import { useSession } from "next-auth/react";
export const AuthButton = () => {
  const { data: session, status } = useSession();
  const profileButton = (
    <Avatar>
      <AvatarImage src={session?.user?.image ?? ""} />
      <AvatarFallback>?</AvatarFallback>
    </Avatar>
  );

  const signInButton = <Button variant="outline">Sign in</Button>;

  return (
    <div>
      {session ? (
        <AuthMenu session={session} triggerButton={profileButton} />
      ) : (
        <AuthDialog triggerButton={signInButton} />
      )}
    </div>
  );
};
