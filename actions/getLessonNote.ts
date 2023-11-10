import { Lesson } from "@prisma/client";
import { sanitize, isSupported } from "isomorphic-dompurify";

function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}
export const getLessonNote = async (lesson: Lesson) => {
  const base_path =
    "https://api.github.com/repos/minhminh322/CS50x-Solution/contents";

  try {
    if (!lesson.pathName) {
      return null;
    }
    const file = lesson.pathName.split("/")[1];
    const response = await fetch(
      `${base_path}/${lesson.pathName}/${file}.html`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (!data || !data.content) {
      return null;
    }
    // Decode utf-8 instead of atob base64 string
    const htmlString = b64DecodeUnicode(data.content);

    // Sanitize html string
    const sanitizedHtmlString = sanitize(htmlString);

    return sanitizedHtmlString;
  } catch (error) {
    throw new Error(`Could not get note: ${error}`);
  }
};
