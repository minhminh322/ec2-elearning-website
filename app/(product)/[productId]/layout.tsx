import getSession from "@/actions/getSession";
import { Navbar } from "@/components/navigation/navbar";
import { db } from "@/lib/db";
import { User } from "@/lib/interface";
import { redirect } from "next/navigation";

const ProductLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { productId: string };
}) => {
  // const session = await getSession();

  // if (!session) {
  //   return redirect("/");
  // }

  return (
    <div className="flex flex-col max-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default ProductLayout;
