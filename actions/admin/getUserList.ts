import { db } from "@/lib/db";
import { Purchase } from "@prisma/client";

type User = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserInformation = User & {
  purchases: Purchase[];
};

export const getUserList = async (): Promise<User[]> => {
  try {
    const users = (await db.user.findMany()) as User[];

    return users;
  } catch (error) {
    console.log("[GET_USER_LIST]", error);
    return [];
  }
};
