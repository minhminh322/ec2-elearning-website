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
import { useTheme } from "next-themes";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export const SourceCodeButton = ({ sourceCode }: { sourceCode: string }) => {
  const { resolvedTheme } = useTheme();
  let codeStyle, bgColor;

  switch (resolvedTheme) {
    case "light":
      codeStyle = oneLight;
      bgColor = "#fafafa";
      break;
    case "dark":
      codeStyle = oneDark;
      bgColor = "#282c34";
      break;
    default:
      codeStyle = oneLight;
      break;
  }

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
      <DialogContent className="max-w-5xl flex justify-center">
        <CodeGenerator sourceCode={sourceCode} language="c" style={codeStyle} />
      </DialogContent>
    </Dialog>
  );
};
``;
