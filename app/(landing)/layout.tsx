import { Navbar } from "@/components/navigation/navbar";
import { Suspense } from "react";
import Loading from "../(dashboard)/loading";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col max-h-screen">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>

      <Suspense fallback={<Loading />}>
        <main className="pt-[80px] h-full m-10">{children}</main>
      </Suspense>
    </div>
  );
};

export default LandingLayout;
