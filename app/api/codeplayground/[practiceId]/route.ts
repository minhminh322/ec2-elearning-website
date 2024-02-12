import getSession from "@/actions/getSession";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { problemId: string } }
) {
  try {
    // TODO: ADD back after testing
    // const session = await getSession();
    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // console.log("params", params);

    return NextResponse.json({ problemId: params.problemId });
  } catch (error) {
    console.log("[ERROR] Course", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
