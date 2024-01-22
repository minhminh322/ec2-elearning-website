"use client";

import {
  ColumnDef,
  RowSelectionState,
  SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { SolutionButton } from "./SolutionButton";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

// interface DataTableProps {
//   columns: ColumnDef<LeetcodeProblem>[];
//   data: LeetcodeProblem[];
// }
export type LeetcodeProblem = {
  id: string;
  progress: boolean | null;
  problemName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  threadId: string | null;
  solution: string | null;
};

export function DataTable({ data }: { data: LeetcodeProblem[] }) {
  const { toast } = useToast();
  const router = useRouter();
  // TODO: Refactor later
  const discordUrl = "https://discord.com/channels/1136993091480465572";
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState(() => {
    const initialRowSelection = {} as RowSelectionState;
    for (let i = 0; i < data.length; i++) {
      initialRowSelection[data[i]["id"]] = !!data[i]["progress"];
    }
    return initialRowSelection;
  });
  const columns = useMemo<ColumnDef<LeetcodeProblem>[]>(
    () => [
      {
        accessorKey: "progress",
        header: "Status",
        cell: ({ row, column, table, getValue }) => {
          const updateProgress = async () => {
            const currentState: boolean = row.getIsSelected();
            row.toggleSelected(!row.getIsSelected());
            axios
              .put(`/api/courses/problems/${row.id}/userProgress`, {
                isCompleted: !currentState,
              })
              .then((res) => {
                toast({
                  //   title: "Scheduled: Catch up",
                  description: (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="m-1 text-green-500 w-10 h-10" />
                      <p className="text-lg">Progress updated !</p>
                    </div>
                  ),
                  duration: 3000,
                });
                router.refresh();
                // console.log("Updated Leetcode progress", row.id);
              })
              .catch((err) => {
                console.log(err);
                toast({
                  description: (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="m-1 text-red-500 w-10 h-10" />
                      <p className="text-lg">Something went wrong !</p>
                    </div>
                  ),
                  duration: 3000,
                });
                row.toggleSelected(currentState);
              });
          };
          return (
            <div className="flex justify-center items-center">
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={updateProgress}
                aria-label="Select row"
                className="hover:border-emerald-500"
              />
            </div>
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
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
          return (
            <div className="flex justify-center items-center h-full">
              <Badge variant={difficulty as any}>{difficulty}</Badge>
            </div>
          );
        },
      },

      {
        accessorKey: "solution",
        header: "Solution",
        cell: ({ row }) => {
          const solution = row.getValue("solution") as string;
          // Return a link to the problem
          return (
            <div className="flex justify-center items-center h-full">
              <SolutionButton sourceCode={solution} />
            </div>
          );
        },
      },
      {
        accessorKey: "threadId",
        header: "Discussion",
        cell: ({ row }) => {
          if (!row.getValue("threadId")) {
            return (
              <div className="flex justify-center items-center h-full">
                <XCircle className="text-red-500 w-5 h-5" />
              </div>
            );
          }
          const discussion = `${discordUrl}/${row.getValue("threadId")}`;
          // Return a link to the problem
          return (
            <a
              className="flex justify-center items-center h-full"
              href={discussion}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="no-underline hover:underline">View</span>
            </a>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
      sorting,
    },
    getRowId: (row) => row.id,
    debugTable: true,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // Custom CSS for Problem column
                const headerClass =
                  header.column.columnDef.header === "Problem"
                    ? "text-left"
                    : "";

                return (
                  <TableHead key={header.id} className={headerClass}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {/* No results. */}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
