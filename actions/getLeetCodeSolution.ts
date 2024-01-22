import { Lesson, Product } from "@prisma/client";

type GetLeetCodeSolutionProps = {
  product: Product;
  lesson: Lesson;
};

export type LeetCodeSolution = {
  [problemId: string]: string;
};
// Get Leetcode solution from Github for a Lesson
export const getLeetCodeSolution = async ({
  product,
  lesson,
}: GetLeetCodeSolutionProps) => {
  const base_path = `https://api.github.com/repos/minhminh322/${product.pathName}/contents`;

  // console.log("base_path", base_path);
  try {
    const response = await fetch(
      `${base_path}/${lesson.pathName}/leetcode-problems`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    const problems = {} as LeetCodeSolution;
    for (let problem of data) {
      await fetch(problem.download_url, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      })
        .then((response) => {
          // Check if the response is successful (status code 200)
          if (!response.ok) {
            throw new Error(
              `Failed to fetch content. Status: ${response.status}`
            );
          }
          // Return the response text
          return response.text();
        })
        .then((content) => {
          const problemName = problem.name.split(".")[0];
          problems[problemName] = content;
        });
    }

    // Decode base64 string
    // const codeString = atob(data.content);
    // console.log("Github content ", problems);
    return problems;
  } catch (error) {
    throw new Error(`Could not get Leetcode Solution: ${error}`);
    return [];
  }
};
