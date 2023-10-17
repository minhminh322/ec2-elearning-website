import Link from "next/link";

import { AuthButton } from "./auth-button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { NavMainMenu } from "./nav-main-menu";
import { getDashboard } from "@/actions/getDashboard";

type ProductProps = {
  id: string;
  name: string;
  description: string;
}[];
export const Navbar = async () => {
  const { allProducts } = await getDashboard("");
  const products = allProducts.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
    };
  }) as ProductProps;
  console.log(products);

  return (
    <div className="p-4 border-b h-full flex justify-between shadow-sm">
      <div className="ml-3 my-auto cursor-pointer ">
        <Link href="/">
          <Logo logoType="default" />
        </Link>
      </div>
      <div>
        <NavMainMenu products={products} />
      </div>
      <div className="flex items-center space-x-4 mr-3">
        <ThemeToggle />
        <AuthButton />
      </div>
    </div>
  );
};
