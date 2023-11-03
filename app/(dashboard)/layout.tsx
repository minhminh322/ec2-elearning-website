import { Navbar } from "@/components/navigation/navbar";
import { Sidebar } from "./_components/sidebar";
import { Suspense } from "react";
import Loading from "./loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <Suspense fallback={<Loading />}>
        <main className="pt-[80px] h-full m-10">{children}</main>
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
