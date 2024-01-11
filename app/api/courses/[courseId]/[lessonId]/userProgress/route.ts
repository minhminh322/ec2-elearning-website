import getSession from "@/actions/getSession";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { User } from "@/lib/interface";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { isCompleted } = await req.json();
    const userProgress = await db.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: (session?.user as User).id,
          lessonId: params.lessonId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId: (session?.user as User).id,
        lessonId: params.lessonId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[ERROR] USER_PROGRESS_UPDATE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
