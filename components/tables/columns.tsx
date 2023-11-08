"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export type LeetcodeProblem = {
  id: string;
  isComplete: boolean;
  problemName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  solution: string;
};

export const columns: ColumnDef<LeetcodeProblem>[] = [
  {
    accessorKey: "isComplete",
    header: "Completed",
    cell: ({ row }) => (
      // <div className="flex justify-center items-center h-full">
      <Checkbox
        defaultChecked={row.getValue("isComplete") as boolean}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
      // </div>
    ),
  },
  {
    accessorKey: "problemName",
    header: "Problem",
    cell: ({ row }) => {
      const problemUrl = row["original"]["url"] as string;
      const problemName = row.getValue("problemName") as string;

      // Return a link to the problem
      return (
        <a href={problemUrl} target="_blank" rel="noopener noreferrer">
          <span className="text-base font-medium no-underline hover:underline">
            {problemName}
          </span>
        </a>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },

  {
    accessorKey: "solution",
    header: "Solution",
    cell: ({ row }) => {
      const solution = row.getValue("solution") as string;

      // Return a link to the problem
      return (
        <a href={solution} target="_blank" rel="noopener noreferrer">
          <span className="no-underline hover:underline">View</span>
        </a>
      );
    },
  },
];
