import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return new NextResponse("User already exists", { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[ERROR] Register", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
