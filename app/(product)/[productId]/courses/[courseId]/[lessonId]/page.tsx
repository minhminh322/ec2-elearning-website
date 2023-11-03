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
  <p> HTML-Ipsum Info
  You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly normal distribution of letters and words (making it look like normal English), but it’s also Latin, which means your average reader won’t get distracted by trying to read it. It’s perfect for showcasing design work as it should look when fleshed out with text, because it allows viewers to focus on the design work itself, instead of the text. It’s also a great way to showcase the functionality of programs like word processors, font types, and more.
  
  We’ve taken Lorem Ipsum to the next level with our HTML-Ipsum tool. As you can see, this Lorem Ipsum is tailor-made for websites and other online projects that are based in HTML. Most web design projects use Lorem Ipsum excerpts to begin with, but you always have to spend an annoying extra minute or two formatting it properly for the web.
  
  Maybe you have a custom-styled ordered list you want to show off, or maybe you just want a long chunk of Lorem Ipsum that’s already wrapped in paragraph tags. No matter the need, we’ve put together a number of Lorem Ipsum samples ready to go with HTML tags and formatting in place. All you have to do is click the heading of any section on this page, and that HTML-Ipsum block is copied to your clipboard and ready to be loaded into a website redesign template, brand new design mockup, or any other digital project you might need dummy text for.
  
  No matter the project, please remember to replace your fancy HTML-Ipsum with real content before you go live - this is especially important if you're planning to implement a content-based marketing strategy for your new creation! Lorem Ipsum text is all well and good to demonstrate a design or project, but if you set a website loose on the Internet without replacing dummy text with relevant, high quality content, you’ll run into all sorts of potential Search Engine Optimization issues like thin content, duplicate content, and more.
  
  HTML-Ipsum is maintained by WebFX. For more information about us, please visit WebFX Reviews. To learn more about the industries we drive Internet marketing performormance for and our revenue driving services: SEO, PPC, social media, web design, local SEO and online advertising services. </p>
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
  );
};
export default lessonPage;
