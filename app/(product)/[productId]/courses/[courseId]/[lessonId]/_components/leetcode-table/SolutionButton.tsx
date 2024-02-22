"use client";

import { CodeGenerator } from "@/components/code-generator/code-generator";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const SolutionButton = ({ sourceCode }: { sourceCode: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="invisible" className="hover:text-emerald-500">
          <Code className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-w-5xl flex justify-center">
        {sourceCode ? (
          <div className="w-full h-full max-h-80vh">
            <CodeGenerator sourceCode={sourceCode} language="python" />
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <DialogDescription className="text-3xl">
              No solution found
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
``;
