import getSession from "@/actions/getSession";
import Loading from "@/app/(dashboard)/loading";
import { Navbar } from "@/components/navigation/navbar";
import { db } from "@/lib/db";
import { User } from "@/lib/interface";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
      <Suspense fallback={<Loading />}>
        <main>{children}</main>
      </Suspense>
    </div>
  );
};

export default ProductLayout;
