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
import toast from "react-hot-toast";

import { Checkbox } from "@/components/ui/checkbox";
import { SolutionButton } from "./SolutionButton";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import { PracticeProblemWithProgress } from "@/actions/getPracticeProblem";
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
  solution: string | null;
};

export function DataTable({ data }: { data: LeetcodeProblem[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({} as RowSelectionState);
  const firstInitRender = useRef(true);
  const first2RowRender = useRef(0);
  const columns = useMemo<ColumnDef<LeetcodeProblem>[]>(
    () => [
      {
        accessorKey: "progress",
        header: "Status",
        cell: ({ row, column, table, getValue }) => {
          // const initialValue = row["original"]["progress"];
          // console.log("Initial value:", initialValue, row.getIsSelected(), row.id);
          // // console.log(row["original"]["id"]);
          // // row.toggleSelected(!!initialValue);
          // console.log(table);
          // const initialValue = getValue();
          // // const [value, setValue] = React.useState(initialValue);
          // console.log(
          //   "Initial value:",
          //   initialValue,
          //   row.getIsSelected(),
          //   row.id
          // );
          const updateProgress = async () => {
            const currentState: boolean = row.getIsSelected();
            row.toggleSelected(!row.getIsSelected());
            axios
              .put(`/api/courses/problems/${row.id}/userProgress`, {
                isCompleted: !currentState,
              })
              .then((res) => {
                toast.success("Progress updated");
                console.log("Updated Leetcode progress", row.id);
              })
              .catch((err) => {
                console.log(err);
                toast.error("Failed to update progress");
                row.toggleSelected(currentState);
              });
          };
          return (
            // <div className="flex justify-center items-center h-full">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={updateProgress}
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

  useEffect(() => {
    if (firstInitRender.current) {
      firstInitRender.current = false;
      return;
    }
    const fetchInitialRowSelection = () => {
      // console.log("Fetching initial row selection", data);
      const initialRowSelection = {} as any;
      for (let i = 0; i < data.length; i++) {
        const id = (data[i] as any)["id"];
        initialRowSelection[id] = (data[i] as any)["progress"];
      }
      console.log("Initial row selection", initialRowSelection);
      setRowSelection(initialRowSelection);
    };
    fetchInitialRowSelection();
  }, []);
  // // async function updateProgress(index: number, updatedRow: boolean) {

  // // }
  // useEffect(() => {
  //   // if (first2RowRender.current < 2) {
  //   //   first2RowRender.current += 1;
  //   //   return;
  //   // }

  //   // const fetchData = async () => {
  //   //   table.getRowModel().rows?.forEach(async (row) => {
  //   //     const updatedRow = row.getIsSelected();
  //   //     const originalRow = (data[row.index] as any)["progress"];
  //   //     if (updatedRow !== originalRow) {
  //   //       await updateProgress(row.index, updatedRow);
  //   //     }
  //   //   });
  //   // };
  //   // fetchData();
  //   console.log("Row selection changed", rowSelection);
  // }, [rowSelection]);
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
