"use client";

import * as React from "react";
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
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    product: "Dough ball",
    otyhand: 1,
    qtybooked: 2,
    qtyavailable: 10,
    purchasecost: "12.01",
    sellingcost: "15.05",
  },
  {
    product: "OREO COOKIE PIECES",
    otyhand: 0,
    qtybooked: 2,
    qtyavailable: 1,
    purchasecost: "10.04",
    sellingcost: "12.02",
  },
  {
    product: "SAUCE GARLIC JUG",
    otyhand: 10,
    qtybooked: 0,
    qtyavailable: 21,
    purchasecost: "22.01",
    sellingcost: "25.02",
  },
  {
    product: "Floor cleaner",
    otyhand: 1,
    qtybooked: 2,
    qtyavailable: 12,
    purchasecost: "-22.80",
    sellingcost: "-22.80",
  },
];

export type Payment = {
  qtybooked: number;
  product: string;
  qtyavailable: number;
  otyhand: number;
  purchasecost: string;
  sellingcost: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("product")}</div>
    ),
  },
  {
    accessorKey: "otyhand",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Qty OnHand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("otyhand")}</div>
    ),
  },
  {
    accessorKey: "qtybooked",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          QTY Booked
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("qtybooked")}</div>
    ),
  },

  {
    accessorKey: "qtyavailable",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Qty Available
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("qtyavailable")}</div>
    ),
  },

  {
    accessorKey: "purchasecost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Purchase Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("purchasecost")}</div>
    ),
  },

  {
    accessorKey: "sellingcost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Selling Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sellingcost")}</div>
    ),
    enableSorting: false,
  },
];

function InventoryAvailable() {
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
  const totalOnHandQty = data.reduce((acc, item) => acc + item.otyhand, 0);
  const totalBookedQty = data.reduce((acc, item) => acc + item.qtybooked, 0);

  const totalAvailableQty = data.reduce(
    (acc, item) => acc + item.qtyavailable,
    0
  );

  // Calculate Total Purchase Cost
  const totalPurchaseCost = data.reduce(
    (acc, item) => acc + parseFloat(item.purchasecost),
    0
  );

  // Calculate Total Selling Cost
  const totalSellingCost = data.reduce(
    (acc, item) => acc + parseFloat(item.sellingcost),
    0
  );

  return (
    <div className="w-full">
      <div className="">
        <h2 className="text-lg font-medium mb-5">Available Inventory</h2>
        <Card className="rounded-lg w-full">
          <CardHeader className="text-sm font-bold border-b border-gray-300">
            Results Summary
          </CardHeader>
          <CardContent className="mt-5 mb-5">
            <Select className="mb-5 bg-white">
              <SelectTrigger>
                <SelectValue placeholder="Filter By Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="items">Additional Items</SelectItem>
                  <SelectItem value="boxes">Boxes</SelectItem>
                  <SelectItem value="chill">Chill</SelectItem>
                  <SelectItem value="space">Chill Space</SelectItem>
                  <SelectItem value="space">Condiments and Supplies</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="shadow-md mt-5">
              <Table>
                <TableHeader className="bg-slate-600 text-white">
                  <TableRow>
                    <TableHead className="text-xs"></TableHead>
                    <TableHead colSpan={1} className="text-xs">
                      Total OnHand Qty : {totalOnHandQty}
                    </TableHead>
                    <TableHead className="text-xs">
                      Total Booked Qty : {totalBookedQty}
                    </TableHead>
                    <TableHead className="text-xs">
                      Total Available Qty : {totalAvailableQty}
                    </TableHead>
                    <TableHead className="text-xs">
                      Total Purchase Cost : {totalPurchaseCost.toFixed(2)}
                    </TableHead>
                    <TableHead className="text-xs">
                      Total Selling Cost : {totalSellingCost.toFixed(2)}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableHeader className="bg-slate-600 text-white">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="text-center">
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
                          <TableCell key={cell.id} className="text-center">
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
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
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

export default InventoryAvailable;
