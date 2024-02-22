import { Submission } from "@prisma/client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { CodeGenerator } from "@/components/code-generator/code-generator";

export const CodeSubmissions = ({
  submissions,
}: {
  submissions: Submission[];
}) => {
  const [isOpenList, setIsOpenList] = useState(
    Array(submissions.length).fill(false)
  );

  const toggleCollapsible = (value: number) => {
    setIsOpenList((prev) => {
      const newList = [...prev];
      newList[value] = !newList[value];
      return newList;
    });
  };

  return (
    <div className="p-3 divide-y divide-gray-200 dark:divide-gray-700">
      <div className="flex items-center text-center w-full py-4 gap-x-2 rounded-r-lg text-slate-500 dark:text-white text-base font-[500]">
        <div className="basis-1/4">Status</div>
        <div className="basis-1/4">Language</div>
        <div className="basis-1/4">Time</div>
        <div className="basis-1/4">Memory</div>
      </div>
      {submissions.map((submission, index) => {
        return (
          <Collapsible
            key={index}
            open={isOpenList[index]}
            onOpenChange={() => toggleCollapsible(index)}
          >
            <CollapsibleTrigger className="flex flex-1 items-center w-full gap-x-2 rounded-r-lg text-slate-500 dark:text-white text-base font-[500] hover:text-slate-600 hover:bg-slate-300/20 transform transition-transform duration-200 hover:translate-x-[10px] hover:scale-105">
              <div className="flex items-center w-full text-center gap-x-2 py-4 overflow-hidden">
                <div className="basis-1/4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {submission.status === "Accepted" ? (
                    <span className="text-green-500">Accepted</span>
                  ) : (
                    <span className="text-red-500">{submission.status}</span>
                  )}
                  <div>
                    {new Date(submission.createdAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </div>
                </div>
                {/** TODO: create mapping languageId later */}
                <div className="basis-1/4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  Python
                </div>
                <div className="basis-1/4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {submission.timeExecuted
                    ? `${Math.round(
                        parseFloat(submission.timeExecuted) * 100
                      )} ms`
                    : "N/A"}
                </div>
                <div className="basis-1/4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {submission.memoryUsed
                    ? `${parseFloat(
                        (submission.memoryUsed / 1000).toFixed(2)
                      )} MB`
                    : "N/A"}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3">
                <CodeGenerator
                  sourceCode={submission.sourceCode || ""}
                  language="python"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};
