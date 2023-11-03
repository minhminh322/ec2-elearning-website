import { Button } from "@/components/ui/button";
import getSession from "@/actions/getSession";
import { redirect } from "next/navigation";
import { getDashboard } from "@/actions/getDashboard";
import getUserId from "@/actions/getUserId";
import { ProductList } from "@/components/product-list";
export default async function Dashboard() {
  const userId = await getUserId();
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const { allProducts, purchasedProducts } = await getDashboard(userId || "");

  return (
    <div className="max-h-full max-w-5xl mx-auto">
      <div className="space-y-4">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div> */}
        {/* <ProductList products={[...inProgressProducts, ...completedProducts]} /> */}{" "}
        {/** Select only purchased courses */}
        <ProductList
          products={allProducts}
          purchasedProducts={purchasedProducts}
        />
      </div>
    </div>
  );
}
