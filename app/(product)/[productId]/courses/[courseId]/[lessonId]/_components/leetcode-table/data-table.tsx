"use client";

import {
  ColumnDef,
  RowSelectionState,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // const [initialRowSelection, setInitialRowSelection] = useState({});
  const [rowSelection, setRowSelection] = useState({} as RowSelectionState);
  const firstInitRender = useRef(true);
  const first2RowRender = useRef(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    // initialState: {
    //   rowSelection,
    // },
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
        initialRowSelection[i] = (data[i] as any)["progress"];
      }
      console.log("Initial row selection", initialRowSelection);
      setRowSelection(initialRowSelection);
    };
    fetchInitialRowSelection();
  }, []);
  async function updateProgress(index: number, updatedRow: boolean) {
    axios
      .put(`/api/courses/problems/${(data[index] as any)["id"]}/userProgress`, {
        isCompleted: !!updatedRow,
      })
      .then((res) => {
        (data[index] as any)["progress"] = !!updatedRow;
        toast.success("Progress updated");
        console.log("Updated Leetcode progress", data[index]);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update progress");
      });
  }
  useEffect(() => {
    if (first2RowRender.current < 2) {
      first2RowRender.current += 1;
      return;
    }

    const fetchData = async () => {
      table.getRowModel().rows?.forEach(async (row) => {
        const updatedRow = row.getIsSelected();
        const originalRow = (data[row.index] as any)["progress"];
        if (updatedRow !== originalRow) {
          await updateProgress(row.index, updatedRow);
        }
      });
    };
    fetchData();
  }, [rowSelection]);
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
