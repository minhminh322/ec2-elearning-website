import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { AuthMenu } from "./auth-menu";
import getSession from "@/actions/getSession";
import SignOut from "../authentication/sign-out";
import { AuthDialog } from "./auth-dialog";
export const AuthButton = async () => {
  const session = await getSession();
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
