import { getPracticeProblem } from "@/actions/getPracticeProblem";
import getUserId from "@/actions/getUserId";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PracticeProblemTable } from "./_components/practice-problem-table";
import { cn } from "@/lib/utils";

const CodePlaygroundPage = async () => {
  const userId = await getUserId();
  if (!userId) {
    return redirect("/");
  }

  const { problems } = await getPracticeProblem({ userId });

  return (
    <div className="flex justify-center w-full h-full">
      {/* <div className="basis-1/2"> */}
      <PracticeProblemTable problems={problems} />
      {/* </div> */}
    </div>
  );
};

export default CodePlaygroundPage;
