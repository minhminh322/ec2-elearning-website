import { CodeGenerator } from "@/components/code-generator/code-generator";
import { MarkdownNote } from "@/components/markdown-note";

export const CodeSolution = ({ solution }: { solution: [] }) => {
  return (
    <div className="h-full w-full p-3">
      <div className="text-slate-500 dark:text-white text-base font-[500]">
        <CodeGenerator
          sourceCode={
            solution.length > 0 ? solution[0].code : "No solution found"
          }
          language="python"
        />
      </div>
    </div>
  );
};
