"use client";

import { CodeGenerator } from "@/components/code-generator";
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

export const SourceCodeButton = ({ sourceCode }: { sourceCode: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <Button variant="destructive">
            Source Code
            <Code className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px]">
        <CodeGenerator sourceCode={sourceCode} language="c" style="" />
      </DialogContent>
    </Dialog>
  );
};
