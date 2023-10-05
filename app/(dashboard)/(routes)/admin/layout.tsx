import getSession from "@/actions/getSession";
import { adminCheck } from "@/lib/adminCheck";
import { User } from "@/lib/interface";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!adminCheck((session?.user as User).id)) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default AdminLayout;
