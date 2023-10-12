import { User } from "@/lib/interface";
import getSession from "./getSession";

export default async function getUserId() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  return (session.user as User).id;
}
