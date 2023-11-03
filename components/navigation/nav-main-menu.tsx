"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

type ProductProps = {
  id: string;
  name: string;
  description: string;
}[];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Harvard CS50x",
    href: "https://cs50.harvard.edu/x",
    description: "Harvard CS50x Original Course",
  },
  {
    title: "Leetcode",
    href: "https://leetcode.com",
    description: "Prep DS&A for coding interviews",
  },
  {
    title: "CodingBat",
    href: "https://codingbat.com/",
    description: "Practice Java or Python coding problems",
  },
  {
    title: "Crash Course on Python",
    href: "https://www.coursera.org/learn/python-crash-course",
    description: "Get professional certification from Google",
  },
];
export const NavMainMenu = ({ products }: { products: ProductProps }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <Logo logoType="full_brand" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Trai Code
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Elite Coding Camp (EC2)
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {products.map((product) => (
                <ListItem
                  href={`/${product.id}`}
                  title={product.name}
                  key={product.id}
                >
                  {product.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Practice</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Roadmap
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
