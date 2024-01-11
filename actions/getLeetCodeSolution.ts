import { Lesson } from "@prisma/client";

export const getLeetCodeSolution = async (problemId: string) => {
  const base_path =
    "https://api.github.com/repos/minhminh322/Leetcode-Solution/contents";

  try {
    if (!problemId) {
      return null;
    }

    const response = await fetch(`${base_path}/${problemId}.py`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();

    if (!data || !data.content) {
      return null;
    }

    // Decode base64 string
    const codeString = atob(data.content);

    if (!codeString) {
      throw new Error("Leetcode Solution is broken");
    }

    return codeString;
  } catch (error) {
    throw new Error(`Could not get Leetcode Solution: ${error}`);
  }
};
