import { Lesson } from "@prisma/client";

export const getSourceCode = async (lesson: Lesson) => {
  const base_path =
    "https://api.github.com/repos/minhminh322/CS50x-Solution/contents";

  try {
    if (!lesson.pathName) {
      return null;
    }
    const file = lesson.pathName.split("/")[1];
    const response = await fetch(`${base_path}/${lesson.pathName}/${file}.py`, {
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
      throw new Error("Source code is broken");
    }

    return codeString;
  } catch (error) {
    throw new Error(`Could not get source code: ${error}`);
  }
};
