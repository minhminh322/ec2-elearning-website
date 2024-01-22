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
export const Navbar = () => {
  // const { allProducts } = await getDashboard("");
  // const products = allProducts.map((product) => {
  //   return {
  //     id: product.id,
  //     name: product.name,
  //     description: product.description,
  //   };
  // }) as ProductProps;

  // MOCK DATA
  const products = [
    {
      id: "3b6cb480-eddf-4f89-a682-2266552f8d26",
      name: "Trai Code 100: Python for Beginners",
      description: "Great for absolute beginners",
    },
    {
      id: "f36eb1e8-a926-4a9a-9410-7d38a65343b3",
      name: "Trai Code 101: Introduction Course",
      description: "Great for beginners, but seriously",
    },
    {
      id: "ac3d10c7-94b8-40bc-ba61-95bca527f297",
      name: "Trai Code 200: DS&A",
      description: "Intermediate Level",
    },
    {
      id: "66cc1820-427d-4340-86f2-3793ecae159c",
      name: "Trai Code 300: Advanced Algorithms",
      description: "Prep for interview",
    },
  ] as ProductProps;

  return (
    <div className="flex justify-between shadow-sm border-b p-4">
      <div className="ml-3 my-auto cursor-pointer hover:rotate-12">
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
