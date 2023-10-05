import { db } from "@/lib/db";

async function createMockData() {
  const course_1 = await db.course.create({
    data: {
      title: "Trai Code EC2 101: Beginner to Intermediate",
      description: "Description 1",
      imageUrl: "https://i.imgur.com/3j5JYt8.png",
    },
  });

  const lesson_1 = await db.lesson.create({
    data: {
      title: "What is Computer Science?",
      description: "Description 1",
      position: 1,
    },
  });
}
