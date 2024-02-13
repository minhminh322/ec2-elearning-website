import getUserId from "@/actions/getUserId";
import { CodePlayground } from "./_components/code-playground";
import { redirect } from "next/navigation";

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

async function getData(problemId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AWS_BACKEND_BASE_URL}/code-playground?problemId=${problemId}`)
  if (response.ok) {
    return response.json()
  }
  return null
}

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

  const { content, sourceCode, solution, testCases } = await getData(params.problemId);

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
