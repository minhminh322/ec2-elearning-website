import Image from "next/image";
import Link from "next/link";
import { CourseProgress } from "../../../components/course-progress";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  id: string;
  title: string;
  imageId: string;
  description: string;
  courseLength: number | null;
  price: number;
  progress: number | null;
}
export const ProductCard = ({
  id,
  title,
  imageId,
  description,
  courseLength,
  price,
  progress,
}: ProductCardProps) => {
  const image_base_url = process.env.CDN_URL + "/images/";
  return (
    <Link href={`/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="h-auto w-auto object-cover transition-all hover:scale-105"
            alt={title}
            src={image_base_url + imageId}
          />
        </div>
        <div className="flex flex-col mt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <div className="flex justify-between mt-1">
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="mt-3">
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress || 0}
              length={courseLength || 0}
            />
            {/* {progress !== null ? (
              <CourseProgress
                variant={progress === 100 ? "success" : "default"}
                size="sm"
                value={progress}
              />
            ) : (
              <p className="text-md md:text-sm font-medium text-slate-700">
                {formatPrice(price)}
              </p>
            )} */}
          </div>
        </div>
      </div>
    </Link>
  );
};
