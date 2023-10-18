import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { getProgress } from "@/actions/getCourseProgress";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageId: string;
  lessonsLength: number;
  productId: string;
  userId: string;
}

export const CourseCard = async ({
  id,
  title,
  description,
  imageId,
  lessonsLength,
  productId,
  userId,
}: CourseCardProps) => {
  const image_base_url = process.env.CDN_URL + "/images/";
  const progress = await getProgress(userId, id);

  return (
    <Link href={`/${productId}/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={image_base_url + imageId}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {lessonsLength} {lessonsLength === 1 ? "Lesson" : "Lessons"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {/* {formatPrice(price)} */} sth wrong
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
