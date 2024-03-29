import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import getSession from "@/actions/getSession";
import { Separator } from "@/components/ui/separator";
import { getLesson } from "@/actions/getLesson";
import { User } from "@/lib/interface";
import { CourseProgressButton } from "./_components/course-progress-button";
import { getVimeoVideo } from "@/actions/getVimeoVideo";
import { SourceCodeButton } from "./_components/source-code-button";
import { NextButton } from "./_components/next-button";
import { formatTime } from "@/lib/format";
import { Clock10, Code } from "lucide-react";
import { getSourceCode } from "@/actions/getSourceCode";
import { getLessonNote } from "@/actions/getLessonNote";
import { getLeetcodeProblem } from "@/actions/getLeetcodeProblem";
import { MarkdownNote } from "../../../../../../components/markdown-note";
import { LeetcodeTable } from "./_components/leetcode-table/leetcode-table";
import getUserId from "@/actions/getUserId";

const lessonPage = async ({
  params,
}: {
  params: {
    productId: string;
    courseId: string;
    lessonId: string;
  };
}) => {
  const userId = await getUserId();
  if (!userId) {
    return redirect("/");
  }

  const { product, course, lesson, video, nextLesson, UserProgress, purchase } =
    await getLesson({
      userId,
      lessonId: params.lessonId,
      courseId: params.courseId,
      productId: params.productId,
    });

  if (!lesson || !course || !purchase) {
    return redirect("/");
  }
  // Default video "Available Soon"
  const videoMeta = await getVimeoVideo(video?.playbackId ?? "");

  const { problems } = await getLeetcodeProblem({
    userId,
    product: product!,
    lesson,
  });

  const codeBase = await getSourceCode("DSA-Course", lesson);

  const note = await getLessonNote("DSA-Course", lesson);

  // const delay = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));
  // await delay(5000); // delay for 5 seconds

  return (
    <div className="flex flex-col items-center overflow-y-auto">
      <div className="w-full p-7">
        <div className="flex justify-between my-5">
          <h1 className="text-4xl font-bold">{lesson?.title}</h1>
          {videoMeta && (
            <div className="flex items-center">
              <Clock10 className="h-6 w-6 mr-2" />
              <h1>{formatTime(videoMeta.duration)} mins</h1>
            </div>
          )}
        </div>
        <div className="max-w-5xl mx-auto">
          <VideoPlayer
            videoMeta={videoMeta!}
            lessonId={params.lessonId}
            courseId={params.courseId}
            isCompleted={!!UserProgress?.isCompleted}
            nextLessonId={nextLesson?.id ?? null}
          />
        </div>

        <div className="flex items-center justify-between my-5 mx-auto">
          <div className="flex space-x-3">
            <CourseProgressButton
              lessonId={params.lessonId}
              courseId={params.courseId}
              isCompleted={!!UserProgress?.isCompleted}
              nextLessonId={nextLesson?.id ?? null}
            />
            {codeBase && <SourceCodeButton codeBase={codeBase} />}
          </div>
          <div className="">
            <NextButton nextLessonId={nextLesson?.id ?? null} />
          </div>
        </div>
        <Separator />
        {problems.length > 0 && (
          <>
            <div className="text-2xl font-semibold my-3">Practice Problems</div>
            <LeetcodeTable problems={problems} />
          </>
        )}
        <div className="my-3">
          <MarkdownNote value={note!} />
        </div>
      </div>
    </div>
  );
};
export default lessonPage;
