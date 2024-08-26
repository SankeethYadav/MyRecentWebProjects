"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import "../../../styles/tables.css";
import React from "react";

interface TableProps {
  table: any; // Update this with the correct type from @tanstack/react-table if available
}

export function GenericTable({ table }: TableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const currentPageRows = table.getPaginationRowModel().rows;
  const selectedRowsOnCurrentPage = currentPageRows.filter(
    (row: { getIsSelected: () => any }) => row.getIsSelected()
  ).length;

  const currentPageIndex = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return (
    <div className="w-full pc-table-container mt-2 border-none flex-grow flex-shrink basis-auto overflow-x-auto">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-right ml-auto border border-gray-300 bg-[#205BFB] text-white rounded-lg px-4 py-2"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: any) => column.getCanHide())
              .map((column: any) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="custom-table">
          {" "}
          {/* Apply custom-table class */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <TableHead className="text-left" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell className="text-left" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {currentPageIndex} of {totalPages}
        </div>
        <div className="flex space-x-2">
  <Button
    className="flex items-center text-gray-500 hover:text-gray-700 disabled:text-gray-300"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    <span className="mr-1">&lt;</span>
    <span>Prev</span>
  </Button>
  <Button
    className="flex items-center text-gray-500 hover:text-gray-700 disabled:text-gray-300"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    <span>Next</span>
    <span className="ml-1">&gt;</span>
  </Button>
</div>

      </div>
    </div>
  );
}
