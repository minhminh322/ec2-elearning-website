import { AuthButton } from "@/components/navigation/auth-button";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";

export const NavbarDashboard = () => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm">
      <div className="flex gap-x-2 ml-auto">
        <AuthButton />
      </div>
    </div>
  );
};
