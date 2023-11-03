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

  return (
    <div className="flex justify-between shadow-sm border-b p-4">
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
