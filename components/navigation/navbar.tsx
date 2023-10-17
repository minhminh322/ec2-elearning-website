import Link from "next/link";

import { AuthButton } from "./auth-button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { NavMainMenu } from "./nav-main-menu";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex justify-between shadow-sm">
      <div className="ml-3 my-auto cursor-pointer ">
        <Link href="/">
          <Logo logoType="default" />
        </Link>
      </div>
      <div>
        <NavMainMenu />
      </div>
      <div className="flex items-center space-x-4 mr-3">
        <ThemeToggle />
        <AuthButton />
      </div>
    </div>
  );
};
