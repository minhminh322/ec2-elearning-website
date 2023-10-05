import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import getSession from "@/actions/getSession";
import { db } from "@/lib/db";

const lessonPage = async ({
  params,
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) => {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }

  const video = await db.video.findFirst({
    where: {
      lessonId: params.lessonId,
    },
  });

  // console.log(video);
  return (
    <div>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          {/* <h1 className="text-2xl">{video?.title}</h1> */}
          {video && <VideoPlayer videoUrl={video.url} />}
        </div>
      </div>
    </div>
  );
};
export default lessonPage;
