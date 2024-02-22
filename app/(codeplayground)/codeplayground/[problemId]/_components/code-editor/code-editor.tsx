import React, { useEffect, useRef, useState } from "react";

import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defineTheme } from "@/lib/defineTheme";
import { SettingDialog } from "./code-setting-dialog";
import {
  CheckCircle,
  Code,
  DownloadCloud,
  DownloadCloudIcon,
  RotateCcw,
  Save,
} from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
export interface CodeEditorProps {
  problemId: string;
  sc: SourceFile[];
  language: string;
  onChange: (action: string, data: any) => void;
  handleCompile: () => void;
  handleSubmission: () => void;
  processing: boolean;
}

interface SourceFile {
  fileName: string;
  language: string;
  executeFile: boolean;
  code: string;
}

interface SavedCode {
  problemId: string;
  sourceCode: string;
}
export const CodeEditor = ({
  problemId,
  sc,
  language,
  onChange,
  handleCompile,
  handleSubmission,
  processing,
}: CodeEditorProps) => {
  const executeFile = sc.find((file: SourceFile) => file.executeFile);
  if (!executeFile) {
    throw new Error("No file to execute");
  }

  // Reformat source code files to toggle between files
  const sourceCodeFiles = sc.reduce((acc: any, file: SourceFile) => {
    acc[file.fileName] = file;
    return acc;
  }, {});

  const [currentFile, setCurrentFile] = useState(
    Object.entries(sourceCodeFiles)[0][0]
  );

  const curr = sourceCodeFiles[currentFile];

  const [theme, setTheme] = useState("nord");
  const [fontSize, setFontSize] = useState(14);
  const [value, setValue] = useState(executeFile.code || "");
  const [isSaved, setIsSaved] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  useEffect(() => {
    editorRef.current?.focus();
  }, [curr.fileName]);

  useEffect(() => {
    defineTheme(theme).then((_) => setTheme(theme));
  }, []);
  const handleThemeChange = (th: string) => {
    // console.log(th);
    if (["light", "vs-dark"].includes(th)) {
      setTheme(th);
    } else {
      defineTheme(th).then((_) => setTheme(th));
    }
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  const handleEditorChange = (value: any) => {
    setValue(value);
    onChange("sourceCode", value);
  };

  const handleSaveLocal = (e: React.MouseEvent) => {
    e.preventDefault();
    const savedCode = localStorage.getItem("savedCode") as unknown as SavedCode;
    if (savedCode && savedCode.problemId === problemId) {
      localStorage.removeItem("savedCode");
    }
    localStorage.setItem(
      "savedCode",
      JSON.stringify({
        problemId: problemId,
        sourceCode: value,
      } as SavedCode)
    );
    if (localStorage.getItem("savedCode")) {
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }
  };

  const handleLoadLastSubmission = (e: React.MouseEvent) => {
    // e.preventDefault();
    // console.log("Load last submission");
    const savedCodeString = localStorage.getItem("savedCode");
    if (savedCodeString) {
      const savedCode = JSON.parse(savedCodeString) as SavedCode;
      if (savedCode && savedCode.problemId === problemId) {
        setValue(savedCode.sourceCode);
      }
    } else {
      toast({
        description: "No previous code found.",
      });
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center bg-[#2E3440] rounded-lg border">
      <div className="inline-flex h-10 w-full items-center justify-between rounded-md bg-muted p-1 text-muted-foreground">
        <div>
          <Select
            defaultValue={executeFile.fileName}
            onValueChange={(value: string) => setCurrentFile(value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="File" />
            </SelectTrigger>
            <SelectContent>
              {sc.map((file: SourceFile) => {
                return (
                  <SelectItem value={file.fileName} key={file.fileName}>
                    {file.executeFile
                      ? "main"
                      : file.fileName.split(".")[0].split("_").join(" ")}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"ghost"}
                size={"smallIcon"}
                title="Load Last Submission"
              >
                <Code className="h-4 w-4" />
                <span className="sr-only">Load Last Submission</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Your code will be replaced with your last saved's code in
                  local!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleLoadLastSubmission}>Confirm</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"ghost"}
                size={"smallIcon"}
                title="Revert Source Code"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Revert Source Code</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Your code will be replaced with our default code!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={() => setValue(executeFile.code)}>
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <SettingDialog
            theme={theme}
            handleThemeChange={handleThemeChange}
            fontSize={fontSize}
            handleFontSizeChange={handleFontSizeChange}
          />
        </div>
      </div>
      <div className="overflow-hidden w-full h-full">
        <Editor
          height="100%"
          width="100%"
          path={curr.fileName}
          defaultLanguage={curr.language}
          defaultValue={curr.code}
          value={value}
          theme={theme}
          options={{
            readOnly: false,
            minimap: { enabled: false },
            fontSize: fontSize,
          }}
          onChange={handleEditorChange}
          // @ts-ignore TODO: fix type later
          onMount={(editor) => (editorRef.current = editor)}
        />
      </div>
      {/* Submission buttons */}
      <div className="flex justify-between w-full h-12  bg-[#2E3440] text-muted-foreground">
        <div className="flex w-full items-center justify-start p-3">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={handleSaveLocal}
            disabled={processing}
            className="space-x-2"
          >
            {isSaved ? (
              <CheckCircle className="m-1 text-green-500 h-6 w-6" />
            ) : (
              <DownloadCloud className="h-6 w-6" />
            )}
            <span>{`${isSaved ? "Saved" : "Save"} Local`}</span>
          </Button>
        </div>

        <div className="inline-flex w-full p-3 items-center justify-end space-x-2 ">
          <Button
            variant={"default"}
            size={"sm"}
            onClick={handleCompile}
            disabled={processing}
          >
            Run
          </Button>
          <Button
            variant={"success"}
            size={"sm"}
            onClick={handleSubmission}
            disabled={processing}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
