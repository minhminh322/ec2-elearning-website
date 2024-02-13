"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SetStateAction, useState } from "react";
import { CodeEditor } from "./code-editor/code-editor";
import { Button } from "@/components/ui/button";
import { set } from "zod";
import { CodeTerminal } from "./code-terminal/code-terminal";
import { MarkdownNote } from "@/components/markdown-note";
import { CodePlaygroundProps, TestCase } from "../page";
import { CodeContent } from "./code-content/code-content";
import Link from "next/link";
import { Logo } from "@/components/navigation/logo";

export interface ResultDataProps {
  status: string;
  result: {
    testName: {
      status: string
      message: string
      stdout: string
    }
  };
  output: string;
  memoryUsed: number;
  timeExecuted: string;
  token: string;
}

export interface CodeContentProps {
  problemId: string;
  content: string;
  sc: [];
  solution: [];
}
// export interface CodePlaygroundProps {
//   problemId: string;
//   content: string;
//   sc: [];
//   solution: [];
//   testCases: [];
// }


export const CodePlayground = ({
  userId,
  problemId,
  content,
  sc,
  solution,
  testCases
}: CodePlaygroundProps) => {
  const [sourceCode, setSourceCode] = useState("");

  const [language, setLanguage] = useState("python");
  const [processing, setProcessing] = useState(false);
  const [resultData, setResultData] = useState({} as ResultDataProps);
  const [testData, setTestData] = useState(testCases);

  const onChange = (action: string, data: SetStateAction<string>) => {
    switch (action) {
      case "sourceCode":
        setSourceCode(data);
        break;
      // case "theme":
      //   setTheme(data);
      //   break;
      case "language":
        setLanguage(data);
        break;
      default: {
        console.error("Invalid action");
      }
    }
  };

  const handleTestResult = (data: ResultDataProps) => {

    setResultData(data);
    const mergeData = Object.keys(data.result).map((key: string) => {
      const correspondingTest = testData.find((tc: TestCase) => tc.testName === key);
      if (correspondingTest) {
        return {
          ...correspondingTest, result: {
            status: data.result[key as keyof typeof data.result].status,
            message: data.result[key as keyof typeof data.result].message,
            stdout: data.result[key as keyof typeof data.result].stdout
          }
        };
      } else {
        return {
          testName: key,
          input: ["INVALID"], expectedOutput: "", result: {
            status: data.result[key as keyof typeof data.result].status,
            message: data.result[key as keyof typeof data.result].message,
            stdout: data.result[key as keyof typeof data.result].stdout
          }
        };
      }
    });
    setTestData(mergeData as TestCase[]);
    // setTestData((prev: TestCase[]) => {
    //   return prev.map((item: TestCase) => {
    //     if (item.testName === data.result) {
    //       return { ...item, result: data.result, message: data.status.description };
    //     }
    //     return item;
    //   });
    // });
    // if (statusId !== 3) {

    // } else {
    //   setProcessing(false);
    //   setResultData(data);
    //   return;
    // }
  }

  const handleCompile = () => {
    setProcessing(true);
    const url = `${process.env.NEXT_PUBLIC_AWS_BACKEND_BASE_URL}/submissions`;
    const formData = {
      userId,
      sourceCode: sourceCode,
      languageId: 71, // TODO: get languageId from language
      problemId,
    };

    // const options = {
    //   method: "POST",
    //   url: `${process.env.NEXT_PUBLIC_AWS_BACKEND_BASE_URL}/submissions`, // TODO: change to backend url
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: formData,
    // };

    fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(response => response.json()).then((data) => {
      handleTestResult(data);
      setProcessing(false);
    }).catch((error) => {
      console.error(error);
      setProcessing(false);
    });
  };



  return (
    <div className="flex-grow flex-shrink h-vh-minus-60 p-2">
      <ResizablePanelGroup
        direction="horizontal"
        className=""
      >
        <ResizablePanel defaultSize={50}>
          <CodeContent problemId={problemId} content={content} sc={sc} solution={solution} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <CodeEditor
                sc={sc}
                language={language}
                onChange={onChange}
                handleCompile={handleCompile}
                processing={processing}
              />

            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center rounded-lg border">
                <CodeTerminal testData={testData} processing={processing} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
