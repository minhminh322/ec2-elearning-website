"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { CSSProperties } from "react";

export const SourceCodeButton = ({
  codeBase,
}: {
  codeBase: { [key: string]: string };
}) => {
  const { resolvedTheme } = useTheme();
  let codeStyle: { [x: string]: CSSProperties }, bgColor;

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
        <Tabs defaultValue={Object.keys(codeBase)[0]} className="max-w-4xl">
          <TabsList className={`grid w-full grid-cols-3`}>
            {Object.keys(codeBase).map((key) => {
              return <TabsTrigger value={key}>{key}</TabsTrigger>;
            })}
          </TabsList>
          {Object.keys(codeBase).map((key) => {
            return (
              <TabsContent value={key}>
                <CodeGenerator
                  sourceCode={codeBase[key]}
                  language="python"
                  style={codeStyle}
                />
              </TabsContent>
            );
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
``;
