import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import getSession from "@/actions/getSession";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Description } from "@/components/description";
import { getLesson } from "@/actions/getLesson";
import { User } from "@/lib/interface";
import { CourseProgressButton } from "./_components/course-progress-button";
import { getVimeoVideo } from "@/actions/getVimeoVideo";
import { SourceCodeButton } from "./_components/source-code-button";
import { NextButton } from "./_components/next-button";
import { formatTime } from "@/lib/format";
import { Clock10 } from "lucide-react";
import { getSourceCode } from "@/actions/getSourceCode";
import { getLessonNote } from "@/actions/getLessonNote";
import LeetcodeTable from "./_components/leetcode-table";

const lessonPage = async ({
  params,
}: {
  params: {
    productId: string;
    courseId: string;
    lessonId: string;
  };
}) => {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }

  const { lesson, course, video, nextLesson, UserProgress, purchase } =
    await getLesson({
      userId: (session?.user as User).id,
      lessonId: params.lessonId,
      courseId: params.courseId,
      productId: params.productId,
    });

  const videoMeta = await getVimeoVideo(video?.playbackId ?? "");
  // console.log(videoMeta);
  if (!lesson || !course) {
    return redirect("/");
  }

  const sourceCode = await getSourceCode(lesson);

  const note = await getLessonNote(lesson);

  return (
    <div className="flex flex-col items-center justify-center overflow-y-auto">
      <div className="w-full p-7">
        <div className="flex justify-between my-5">
          <h1 className="text-4xl font-bold">{lesson?.title}</h1>
          <div className="flex items-center">
            <Clock10 className="h-6 w-6 mr-2" />
            <h1>{formatTime(videoMeta.duration)} mins</h1>
          </div>
        </div>
        <div className="">
          {video && (
            <VideoPlayer
              videoUrl={videoMeta.link}
              lessonId={params.lessonId}
              courseId={params.courseId}
              isCompleted={!!UserProgress?.isCompleted}
              nextLessonId={nextLesson?.id ?? null}
            />
          )}
        </div>

        <div className="flex items-center justify-between my-5 mx-auto">
          <div className="flex space-x-3">
            <CourseProgressButton
              lessonId={params.lessonId}
              courseId={params.courseId}
              isCompleted={!!UserProgress?.isCompleted}
              nextLessonId={nextLesson?.id ?? null}
            />
            <SourceCodeButton sourceCode={sourceCode!} />
          </div>
          <div className="">
            <NextButton nextLessonId={nextLesson?.id ?? null} />
          </div>
          {/* <Button>Mark as complete</Button> or Purchase */}
        </div>
        <Separator />
        <div className="text-2xl font-semibold my-3">Similar Problems</div>
        <LeetcodeTable />
        <div className="text-2xl font-semibold my-3">Lecture Note</div>
        <div className="my-3">
          <Description value={note!} />
        </div>
      </div>
    </div>
  );
};
export default lessonPage;
