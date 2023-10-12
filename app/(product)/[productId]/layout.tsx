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
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }
  // const product = await db.product.findUnique({
  //   where: {
  //     id: params.productId,
  //   },
  //   include: {
  //     courses: {
  //       include: {
  //         lessons: {
  //           include: {
  //             userProgress: {
  //               where: {
  //                 userId: (session?.user as User).id,
  //               },
  //             },
  //           },
  //           orderBy: {
  //             position: "asc",
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // console.log(product);

  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-x-0 w-full z-50">
        <Navbar />
      </div>
      <main className="pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default ProductLayout;
