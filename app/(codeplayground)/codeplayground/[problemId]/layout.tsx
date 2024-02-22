import Loading from "@/app/(dashboard)/loading";
import { AuthButton } from "@/components/navigation/auth-button";
import { Logo } from "@/components/navigation/logo";
import { Navbar } from "@/components/navigation/navbar";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import Link from "next/link";
import { Suspense } from "react";

const CodePlaygroundLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { problemId: string };
}) => {
  return (
    // <div className="flex flex-col">
    <Suspense fallback={<Loading />}>{children}</Suspense>
    // </div>
  );
};

export default CodePlaygroundLayout;
