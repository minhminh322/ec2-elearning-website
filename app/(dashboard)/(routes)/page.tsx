import { Button } from "@/components/ui/button";
import getSession from "@/actions/getSession";
import { redirect } from "next/navigation";
import { getDashboard } from "@/actions/getDashboard";
import { CourseList } from "@/components/courses-list";
import { User } from "@/lib/interface";
export default async function Dashboard() {
  const session = await getSession();
  // if (!session) {
  //   return redirect("/api/auth/signin");
  // }

  const { completedCourse, inProgressCourse } = session
    ? await getDashboard((session?.user as User).id)
    : { completedCourse: [], inProgressCourse: [] };

  return (
    <div className="p-6 space-y-4">
      {/* <h1>Hello, {session?.user?.name}</h1> */}
      {/* <Button>Click me</Button> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
      {session && (
        <CourseList courses={[...inProgressCourse, ...completedCourse]} />
      )}
    </div>
  );
}
