"use client";

import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <UseAnimations
        animation={loading2}
        size={200}
        strokeColor={"#0081FB"}
        fillColor="transparent"
        // wrapperStyle={{ stroke: "#1c87c9" }}
      />
    </div>
  );
}
