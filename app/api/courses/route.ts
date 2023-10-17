import getSession from "@/actions/getSession";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await req.json();
    // const course = await db.course.create({
    //   data: {
    //     title,
    //   },
    // });

    return NextResponse.json(title);
  } catch (error) {
    console.log("[ERROR] Course", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
