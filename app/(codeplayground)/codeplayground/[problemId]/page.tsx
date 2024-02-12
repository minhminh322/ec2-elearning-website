import getUserId from "@/actions/getUserId";
import { CodePlayground } from "./_components/code-playground";
import { redirect } from "next/navigation";
import axios from "axios";

export interface CodePlaygroundProps {
  userId: string;
  problemId: string;
  content: string;
  sc: [];
  solution: [];
  testCases: TestCase[];
}
export interface TestCase {
  testName: string;
  input: [];
  expectedOutput: string;
  result: {
    status: string;
    message: string;
    stdout: string;
  }
}[]

const CodePlaygroundPage = async ({
  params,
}: {
  params: {
    problemId: string;
  };
}) => {
  const userId = await getUserId();
  if (!userId) {
    return redirect("/");
  }

  const response = await axios.get(
    `${process.env.AWS_BACKEND_BASE_URL}/code-playground?problemId=${params.problemId}`
  );

  if (!response.data) {
    throw new Error("Practice not found");
  }

  const { content, sourceCode, solution, testCases } = response.data;

  const codePlaygroundProps: CodePlaygroundProps = { userId, problemId: params.problemId, content, sc: sourceCode, solution, testCases };
  return (
    <>
      <CodePlayground
        {...codePlaygroundProps}
      />
    </>
  );
};

export default CodePlaygroundPage;
