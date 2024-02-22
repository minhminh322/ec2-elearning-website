"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SetStateAction, useState } from "react";
import { CodeEditor } from "./code-editor/code-editor";
import { CodeTerminal } from "./code-terminal/code-terminal";
import { CodePlaygroundProps, TestCase } from "../page";
import { CodeContent } from "./code-content/code-content";
import { Submission } from "@prisma/client";
import { useRouter } from "next/navigation";
import { set } from "zod";

export interface ResultDataProps {
  status: string;
  result: {
    testName: {
      status: string;
      message: string;
      stdout: string;
    };
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
  submissions: Submission[];
}

export const CodePlayground = ({
  userId,
  problemId,
  content,
  sc,
  solution,
  testCaseSimple,
  testCaseFull,
  submissions,
}: CodePlaygroundProps) => {
  const [sourceCode, setSourceCode] = useState("");

  const [language, setLanguage] = useState("python");
  const [processing, setProcessing] = useState(false);
  // const [resultData, setResultData] = useState({} as ResultDataProps);
  const [testSimpleData, setTestSimpleData] = useState(testCaseSimple);
  const [testFullData, setTestFullData] = useState(testCaseFull);
  const router = useRouter();
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

  const handleTestResult = (type: string, data: ResultDataProps) => {
    const mergeData = Object.keys(data.result).map((key: string) => {
      const correspondingTest =
        type === "simple"
          ? testCaseSimple.find((tc: TestCase) => tc.testName === key)
          : testCaseFull.find((tc: TestCase) => tc.testName === key);

      if (correspondingTest) {
        return {
          ...correspondingTest,
          result: {
            status: data.result[key as keyof typeof data.result].status,
            message: data.result[key as keyof typeof data.result].message,
            stdout: data.result[key as keyof typeof data.result].stdout,
          },
        };
      } else {
        return {
          testName: key,
          input: ["INVALID"],
          expectedOutput: "",
          result: {
            status: data.result[key as keyof typeof data.result].status,
            message: data.result[key as keyof typeof data.result].message,
            stdout: data.result[key as keyof typeof data.result].stdout,
          },
        };
      }
    });
    type === "simple"
      ? setTestSimpleData(mergeData as TestCase[])
      : setTestFullData(mergeData as TestCase[]);

    if (type === "simple") {
      setTestSimpleData(mergeData as TestCase[]);
      setTestFullData([]);
    } else {
      setTestFullData(mergeData as TestCase[]);
      setTestSimpleData([]);
    }
  };

  const handleSubmission = () => {
    setProcessing(true);
    const url = `${process.env.NEXT_PUBLIC_AWS_BACKEND_BASE_URL}/submissions`;
    const formData = {
      userId,
      sourceCode: sourceCode,
      languageId: 71, // TODO: get languageId from language
      problemId,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        handleTestResult("full", data);
        setProcessing(false);
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
        setProcessing(false);
        router.refresh();
      });
  };

  const handleCompile = () => {
    setProcessing(true);
    const url = `${process.env.NEXT_PUBLIC_AWS_BACKEND_BASE_URL}/simpleTest`;
    const formData = {
      userId,
      sourceCode: sourceCode,
      languageId: 71, // TODO: get languageId from language
      problemId,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        handleTestResult("simple", data);
        setProcessing(false);
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
        setProcessing(false);
        router.refresh();
      });
  };

  return (
    <div className="flex-grow flex-shrink h-vh-minus-80 p-2">
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel defaultSize={50}>
          <CodeContent
            problemId={problemId}
            content={content}
            sc={sc}
            solution={solution}
            submissions={submissions || []}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <CodeEditor
                problemId={problemId}
                sc={sc}
                language={language}
                onChange={onChange}
                handleCompile={handleCompile}
                handleSubmission={handleSubmission}
                processing={processing}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center rounded-lg border">
                <CodeTerminal
                  testSimpleData={testSimpleData}
                  testFullData={testFullData}
                  processing={processing}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
