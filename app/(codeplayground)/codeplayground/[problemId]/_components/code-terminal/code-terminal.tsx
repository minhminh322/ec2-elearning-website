import { TestCase } from "../../page";
import { ResultDataProps } from "../code-playground";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { arrayToString } from "@/lib/format";
import { CheckCircle, XCircle, Circle } from "lucide-react";

export const CodeTerminal = ({ testData, processing }: { testData: TestCase[], processing: boolean }) => {
  const testStatus = (status: string) => {
    if (status === "success") {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (status === "failure") {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
    return <Circle className="h-5 w-5 text-gray-500" />;
  }
  const formatTestMessage = (status: string, message: string) => {
    if (status === "success") {
      return <pre className="p-4 text-green-500 break-words whitespace-pre-wrap">
        {message}
      </pre>
    }

    if (status === "failure") {
      return <pre className="p-4 text-red-500 break-words whitespace-pre-wrap">
        {message}
      </pre>
    }
    // console.log(result);
    return <pre className="whitespace-pre-wrap px-2 py-1 text-gray-500">
      {message}
    </pre>;
  }

  return (
    <div className="flex flex-col h-full w-full items-center justify-center rounded-lg border">
      <div className="inline-flex h-10 w-full items-center justify-between rounded-md bg-muted p-1 text-muted-foreground">
        <div>
          <span className="text-sm font-light">Test Cases</span>
        </div>
        {processing && <UseAnimations
          animation={activity}
          size={50}
          strokeColor={"#0081FB"}
          fillColor="transparent"
        // wrapperStyle={{ stroke: "#1c87c9" }}
        />}
      </div>
      <div className="h-full w-full overflow-y-auto p-1">
        <Accordion type="multiple" className="">
          {testData.map((data: TestCase, index: number) => {
            return (
              <AccordionItem key={data.testName} value={data.testName}>
                <AccordionTrigger className="px-4">
                  <div className="inline-flex w-full items-center space-x-2 transform transition-transform duration-200 hover:translate-x-[10px] hover:scale-105">
                    <div className="">
                      {testStatus(data?.result?.status)}
                    </div>
                    <div className="space-x-2">
                      <span>Test Case {index + 1}</span>
                      <Badge variant="outline">{data.testName}</Badge>
                    </div>

                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="space-y-2" key={data.testName}>
                      {data?.result?.message.length > 0 && (
                        <div>
                          <Label htmlFor="testcase-result">Result</Label>
                          {/* <Textarea
                            id="testcase-result"
                            style={{ resize: "none" }}
                            value={formatTestMessage(data.result.message)}
                            readOnly
                          /> */}
                          <div className="w-full min-h-[50px] bg-[#1e293b] rounded-md text-white font-normal text-xs overflow-y-auto">
                            {formatTestMessage(data.result.status, data.result.message)}
                          </div>
                        </div>
                      )}
                      {data?.result?.stdout.length > 0 && (
                        <div>
                          <Label htmlFor="testcase-output">Stdout</Label>
                          <Textarea id="testcase-output"
                            className="resize-none mt-2"
                            value={data.result.stdout}
                            readOnly />
                        </div>)}
                      <div>
                        <Label htmlFor="testcase-input">Input</Label>
                        <Textarea
                          className="resize-none mt-2"
                          placeholder="Not Available"
                          id="testcase-input"
                          rows={1}
                          value={arrayToString(data.input)}
                          readOnly
                        />
                      </div>
                      <div>
                        <Label htmlFor="testcase-output">Expected Output</Label>
                        <Textarea
                          className="mt-2"
                          placeholder="Not Available"
                          id="testcase-output"
                          style={{ resize: "none" }}
                          rows={1}
                          value={data.expectedOutput}
                          readOnly
                        />
                      </div>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};
