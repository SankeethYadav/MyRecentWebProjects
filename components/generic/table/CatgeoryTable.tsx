"use client";
import React from "react";
import { Button } from "../../ui/button";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { SearchBarFilterPropsTables } from "../../types/Table";
import SearchBarFilter from "./SearchBarFilter";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface GenericTableCatProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchData?: SearchBarFilterPropsTables[];
}

export function GenericTableCatNested<TData, TValue>({
  columns,
  data,
  searchData,
}: GenericTableCatProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Calculate the number of selected rows on the current page
  const currentPageRows = table.getPaginationRowModel().rows;
  const selectedRowsOnCurrentPage = currentPageRows.filter((row) =>
    row.getIsSelected()
  ).length;

  // Get current page index and total number of pages
  const currentPageIndex = table.getState().pagination.pageIndex + 1; // pageIndex is zero-based
  const totalPages = table.getPageCount();

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader  >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow  key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-left" key={header.id}>
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
              table.getRowModel().rows.map((row, index) => (
                <TableRow 
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-center"  key={cell.id}>
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
                  colSpan={columns.length}
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
        <div className="space-x-2">
          <Button
            className="bg-transparent border-0 p-0 m-0 hover:bg-transparent focus:outline-none"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="bg-transparent border-0 p-0 m-0 hover:bg-transparent focus:outline-none"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
interface TableProps {
  table: any; // Update this with the correct type from @tanstack/react-table if available
}
export function CategoryGenericTable({ table }: TableProps) {
  // Calculate the number of selected rows on the current page
  const currentPageRows = table.getPaginationRowModel().rows;
  const selectedRowsOnCurrentPage = currentPageRows.filter(
    (row: { getIsSelected: () => any }) => row.getIsSelected()
  ).length;

  // Get current page index and total number of pages
  const currentPageIndex = table.getState().pagination.pageIndex + 1; // pageIndex is zero-based
  const totalPages = table.getPageCount();

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="custom-table">
          {/* Add the generic-table class */}
          <TableHeader>
            {table
              .getHeaderGroups()
              .map(
                (headerGroup: {
                  id: React.Key | null | undefined;
                  headers: any[];
                }) => (
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
                )
              )}
          </TableHeader>
          <Table>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map(
                    (
                      row: {
                        id: React.Key | null | undefined;
                        getIsSelected: () => any;
                        getVisibleCells: () => any[];
                      },
                      index: any
                    ) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  )
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
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {currentPageIndex} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
