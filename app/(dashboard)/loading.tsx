"use client";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <UseAnimations
        animation={infinity}
        size={100}
        strokeColor="bg-indigo-500"
      />
    </div>
  );
}
