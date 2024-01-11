import { Lesson } from "@prisma/client";

export const getSourceCode = async (courseName: string, lesson: Lesson) => {
  const base_path = `https://api.github.com/repos/minhminh322/${courseName}/contents`;

  try {
    if (!lesson.pathName) {
      return null;
    }
    const file = lesson.pathName.split("/")[1];
    const response = await fetch(`${base_path}/${lesson.pathName}/code`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();

    if (!data) {
      return null;
    }

    let result: { [key: string]: string } = {};
    for (let file of data) {
      if (!file["name"].includes(".py")) {
        continue;
      }
      await fetch(file["git_url"], {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // Decode base64 string
          const codeString = atob(res["content"]);
          result[file["name"]] = codeString;
        });
    }

    return result;
  } catch (error) {
    // throw new Error(`Could not get source code: ${error}`);
    return null;
  }
};
