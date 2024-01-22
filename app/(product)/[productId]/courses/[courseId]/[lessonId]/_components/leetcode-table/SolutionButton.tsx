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
import { useTheme } from "next-themes";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect } from "react";

export const SolutionButton = ({ sourceCode }: { sourceCode: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <Button variant="ghost">
            <Code className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className=" max-w-5xl flex justify-center">
        <div className="w-full h-full max-h-80vh">
          <CodeGenerator
            sourceCode={sourceCode}
            language="python"
            style={theme === "dark" ? oneDark : oneLight}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
``;
