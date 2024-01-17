"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export const SourceCodeButton = ({
  codeBase,
}: {
  codeBase: { [key: string]: string };
}) => {
  const { theme, setTheme } = useTheme();
  const keys = Object.keys(codeBase);
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
            {keys.map((key) => {
              return (
                <TabsTrigger key={key} value={key}>
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {keys.map((key) => {
            return (
              <TabsContent key={key} value={key}>
                <CodeGenerator
                  sourceCode={codeBase[key]}
                  language="python"
                  style={theme === "dark" ? oneDark : oneLight}
                  rest={undefined}
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
