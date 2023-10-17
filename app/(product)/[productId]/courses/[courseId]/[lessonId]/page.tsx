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

  // TODO: embed descriptions from database
  const text = `
  <h1>Description</h1>
  <p> Updating ... </p>
  `;

  const sourceCode = `
  // C program to check whether a number is palindrome or not 
  #include <stdio.h> 
    
  // Driver code 
  int main() 
  { 
      // This is our given number 
      int original_number = 12321; 
    
      // This variable stored reversed digit 
      int reversed = 0; 
    
      int num = original_number; 
    
      // Execute a while loop to reverse 
      // digits of given number 
      while (num != 0) { 
          int r = num % 10; 
          reversed = reversed * 10 + r; 
          num /= 10; 
      } 
    
      // Compare original_number with 
      // reversed number 
      if (original_number == reversed) { 
          printf(" Given number %d is a palindrome number", 
                 original_number); 
      } 
      else { 
          printf( 
              " Given number %d is not a palindrome number", 
              original_number); 
      } 
      
      return 0; 
  }
  `;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full p-10">
        <div className="flex justify-between my-5">
          <h1 className="text-3xl font-semibold">{lesson?.title}</h1>
          <h1>10 mins</h1>
        </div>
        <div className="">
          {video && <VideoPlayer videoUrl={videoMeta.link} />}
        </div>

        <div className="">
          <div className="flex flex-col md:flex-row items-center justify-between my-5 mx-auto">
            <div className="flex space-x-3">
              <CourseProgressButton
                lessonId={params.lessonId}
                courseId={params.courseId}
                isCompleted={!!UserProgress?.isCompleted}
                nextLessonId={nextLesson?.id ?? null}
              />
              <SourceCodeButton sourceCode={sourceCode} />
            </div>
            <div className="">
              <NextButton nextLessonId={nextLesson?.id ?? null} />
            </div>
            {/* <Button>Mark as complete</Button> or Purchase */}
          </div>
          <Separator />
          <div className="my-3">
            <Description value={text} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default lessonPage;
