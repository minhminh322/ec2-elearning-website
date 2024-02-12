import React, { useEffect, useRef, useState } from "react";

import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button, buttonVariants } from "@/components/ui/button";
import { defineTheme } from "@/lib/defineTheme";
import { SettingDialog } from "./code-setting-dialog";
import { RotateCcw } from "lucide-react";
export interface CodeEditorProps {
  sc: SourceFile[]
  language: string;
  onChange: (action: string, data: any) => void;
  handleCompile: () => void;
  processing: boolean;
}

interface SourceFile {
  fileName: string;
  language: string;
  executeFile: boolean;
  code: string;
}
export const CodeEditor = ({
  sc,
  language,
  onChange,
  handleCompile,
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
  const [value, setValue] = useState(executeFile.code || "");
  const editorRef = useRef<HTMLDivElement>(null);
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
  }
  const handleEditorChange = (value: any) => {
    setValue(value);
    onChange("sourceCode", value);
  };
  return (
    <div className="flex flex-col h-full items-center justify-center bg-[#2E3440] rounded-lg border">
      <div className="inline-flex h-10 w-full items-center justify-between rounded-md bg-muted p-1 text-muted-foreground">
        <div>
          <Select defaultValue={executeFile.fileName} onValueChange={(value: string) => setCurrentFile(value)}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="File" />
            </SelectTrigger>
            <SelectContent>
              {sc.map((file: SourceFile) => {
                return (
                  <SelectItem
                    value={file.fileName}
                    key={file.fileName}>
                    {file.executeFile ? "main" : file.fileName.split(".")[0].split("_").join(" ")}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button variant={"ghost"} size={"smallIcon"} onClick={() => setValue(executeFile.code)}>
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Revert Source Code</span>
          </Button>
          <SettingDialog theme={theme} handleThemeChange={handleThemeChange} />
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
            fontSize: 13,
          }}
          onChange={handleEditorChange}
          // @ts-ignore TODO: fix type later
          onMount={(editor) => (editorRef.current = editor)}
        />
      </div>
      {/* Submission buttons */}
      <div className="inline-flex h-12 w-full p-3 items-center justify-end space-x-2 bg-[#2E3440] text-muted-foreground">
        <Button variant={"default"}
          size={"sm"} disabled={processing} >
          Run
        </Button>
        <Button variant={"success"}
          size={"sm"} onClick={handleCompile} disabled={processing} >
          Submit
        </Button>
      </div>
    </div>
  );
};
