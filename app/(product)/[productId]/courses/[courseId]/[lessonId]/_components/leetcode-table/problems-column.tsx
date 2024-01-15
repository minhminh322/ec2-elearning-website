"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import toast from "react-hot-toast";
import { SolutionButton } from "./SolutionButton";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type LeetcodeProblem = {
  id: string;
  progress: boolean | null;
  problemName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  solution: string | null;
};

export const columns: ColumnDef<LeetcodeProblem>[] = [
  {
    accessorKey: "progress",
    header: "Status",
    cell: ({ row }) => {
      // const initialValue = row["original"]["progress"];
      // console.log("Initial value:", initialValue);
      // row.toggleSelected(!!initialValue);
      return (
        // <div className="flex justify-center items-center h-full">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={row.getToggleSelectedHandler()}
          aria-label="Select row"
        />
        // </div>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const difficulty = row.getValue(
        "difficulty"
      ) as LeetcodeProblem["difficulty"];

      // Return a link to the problem
      return <Badge variant={difficulty as any}>{difficulty}</Badge>;
    },
  },

  {
    accessorKey: "solution",
    header: "Solution",
    cell: ({ row }) => {
      const solution = row.getValue("solution") as string;
      // Return a link to the problem
      return (
        // <a href={solution} target="_blank" rel="noopener noreferrer">
        //   <span className="no-underline hover:underline">View</span>
        // </a>
        <SolutionButton sourceCode={solution} />
      );
    },
  },
];
