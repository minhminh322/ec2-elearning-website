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
    <div className="flex flex-col max-h-screen">
      <div className="h-[80px] w-full">
        <div className="h-full w-full flex items-center justify-between p-1">
          <div className="my-auto cursor-pointer hover:rotate-12">
            <Link href="/">
              <Logo logoType="default" size={100} />
            </Link>
          </div>
          <div className="flex items-center space-x-4 mr-3">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <main>{children}</main>
      </Suspense>
    </div>
  );
};

export default CodePlaygroundLayout;
