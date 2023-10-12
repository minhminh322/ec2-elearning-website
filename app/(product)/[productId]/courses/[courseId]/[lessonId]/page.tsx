import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import getSession from "@/actions/getSession";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Description } from "@/components/description";
import { getLesson } from "@/actions/getLesson";
import { User } from "@/lib/interface";
import { CourseProgressButton } from "./_components/course-progress-button";

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

  if (!lesson || !course) {
    return redirect("/");
  }
  const text = `
  <h1>Description here</h1>
  `;
  // console.log(video);
  return (
    <div>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          {/* <h1 className="text-2xl">{lesson?.courseId}</h1> */}
          {video && <VideoPlayer videoUrl={video.playbackId} />}
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{lesson?.title}</h2>
            {/* <Button>Mark as complete</Button> or Purchase */}
            <CourseProgressButton
              lessonId={params.lessonId}
              courseId={params.courseId}
              isCompleted={!!UserProgress?.isCompleted}
              nextLessonId={nextLesson?.id ?? null}
            />
          </div>
          <Separator />
          <div>
            <Description value={text} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default lessonPage;
