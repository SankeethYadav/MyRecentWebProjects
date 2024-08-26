"use client";

import * as React from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ReactNode } from 'react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Mail } from "lucide-react";
import { FileUp, Ban, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
  TableFooter,
} from "@/components/ui/table";

//Pdf 
interface DialogContentProps {
    children: ReactNode;
  }

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    // Add content to the PDF
    pdfDoc.text('Order Summary', 20, 20);

    // Check if review array is defined and not empty
    if (review && review.length > 0) {
        // Use autoTable to generate the table
        pdfDoc.autoTable({
            head: [['Product', 'Unit of Measure', 'Category', 'Quantity', 'Cost', 'Total']],
            body: review.map(item => [item.product, item.unitMeasure, item.category, item.quantity, item.cost, item.total]),
        });
    } else {
        // Handle the case where review is undefined or empty
        console.error('Review array is undefined or empty');
    }

    // Save the PDF
    pdfDoc.save('order_summary.pdf');
};

//Review modal table row
const review = [
  {
    product: "Forks",
    unitMeasure: "1",
    category: "Additional Items",
    quantity: "1",
    cost: "$47.38",
    total: "$47.38",
  },
];

const data: Payment[] = [
  {
    order: "9999-1748-1119231250",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Submitted",
    code: "Restaurant Supply",
    ordered: 12,
    cost: "$2,750.91",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-111623422",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Submitted",
    code: "DVB",
    ordered: 21,
    cost: "$2,750.91",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-111423340	",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "DVB",
    ordered: 64,
    cost: "$2,750.91",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-111423329	",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "DVB",
    ordered: 39,
    cost: "$2,750.91",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-111023804	",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "Chillspace",
    ordered: 21,
    cost: "$732.55",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-111023802	",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "Chillspace",
    ordered: 11,
    cost: "$732.55",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-11923702",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "Chillspace",
    ordered: 10,
    cost: "$732.55",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-11723327",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "Chillspace",
    ordered: 61,
    cost: "$732.55",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-11723318",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "Chillspace",
    ordered: 1,
    cost: "$732.55",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-11223554",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "Chillspace",
    ordered: 21,
    cost: "$1,661.82",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-11223552",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "Chillspace",
    ordered: 31,
    cost: "$1,661.82",
    shipdate: "20-10-2022",
  },
  {
    order: "1",
    store: "1748-Mapunapuna",
    date: "20-10-2022",
    status: "Delivered",
    code: "Chillspace",
    ordered: 61,
    cost: "$1,661.82",
    shipdate: "20-10-2022",
  },
  {
    order: "9999-1748-1031231003",
    store: "1748-Mapunapuna",
    date: "2023-10-26",
    status: "Delivered",
    code: "DVB",
    ordered: 21,
    cost: "	$1,442.90",
    shipdate: "2023-10-30",
  },
];

export type Payment = {
  order: string;
  store: string;
  date: string;
  status: "Submitted" | "Delivered" | "success" | "failed";
  code: string;
  ordered: number;
  cost: string;
  shipdate: string;
};

 //Review modal total cost caliculation
 const calculateTotalCost = () => {
    const totalCost = review.reduce((total, item) => {
      const costValue = parseFloat(item.cost.replace(/[^0-9.]/g, ""));
      return total + costValue;
    }, 0);

    return totalCost.toFixed(2);
  };

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "order",
    // header: "Order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      //   <div className="capitalize text-sm text-cyan-500 cursor-pointer">{row.getValue("order")}</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            className="capitalize text-sm text-cyan-500 cursor-pointer"
          >
            {row.getValue("order")} 
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[825px] bg-white p-0 m-0" id="orderDetails">
          <DialogHeader className="text-white bg-slate-700 w-full p-3">
            <DialogTitle className="font-normal">Order Summery</DialogTitle>
          </DialogHeader>
          <div className="flex flex-row justify-between p-2 item-center">
            <h4 className="text-lg font-medium mb-0">
              Order placed Successfully !!!
            </h4>
            <div className="w-60 flex flex-row justify-end">
              <div className="text-sm font-medium py-1 pl-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-red-500 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-base font-medium py-1 pr-1">
                <Button
                 onClick={downloadPDF}
                  variant="outline"
                  size="icon"
                  className="bg-red-500 ml-2 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500"
                >
                  <FileUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <Card className="rounded-lg m-2">
            <CardHeader className="text-sm font-bold border-b border-gray-300">
              Purchase Order# : 9999-1748-11223546
            </CardHeader>
            <CardContent className="pt-5">
              <div className="flex flex-row justify-between p-2 item-center">
                <div className="w-60 flex flex-row justify-start">
                  <div className="font-light text-sm">
                    <span className="font-semibold">Placed on : </span> Nov 2,
                    2023
                  </div>
                </div>
                <div className="w-60 flex flex-row justify-start">
                  <div className="font-light text-sm">
                    <span className="font-semibold">Ship Date : </span> Nov 6,
                    2023
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between p-2 item-center">
                <div className="w-60 flex flex-row justify-start">
                  <div className="font-light text-sm">
                    <span className="font-semibold">Po# : </span>
                    9999-1748-11223546
                  </div>
                </div>
                <div className="w-60 flex flex-row justify-start">
                  <div className="font-light text-sm">
                    <span className="font-semibold">Order Qty : </span>23
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between p-2 item-center">
                <div className="w-60 flex flex-row justify-start">
                  <div className="font-light text-sm">
                    <span className="font-semibold">Order Type : </span>
                    Immediate Order
                  </div>
                </div>
                <div className="w-60 flex flex-row justify-start">
                  <div className="font-light text-sm">
                    <span className="font-semibold">
                      Weekly sales forecast :{" "}
                    </span>
                    $19000
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between p-2 item-center">
                <div className="w-60 flex flex-row justify-start">
                  <div className="font-light text-sm">
                    <span className="font-semibold">Memo Code : </span>
                    Chillspace
                  </div>
                </div>
                <div className="w-60 flex flex-row justify-start">
                  <div className="font-light text-sm">
                    <span className="font-semibold">
                      Weekly Purchase Budget :{" "}
                    </span>{" "}
                    $5320
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between p-2 item-center">
                <div className="w-60 flex flex-row justify-start">
                  <div className="font-light text-sm">
                    <span className="font-semibold">Form : </span>QCC Eat Local
                  </div>
                </div>
              </div>
              <div>
                <Table>
                  <TableHeader className="text-white bg-slate-700 w-full">
                    <TableRow>
                      <TableHead className="font-medium">Product</TableHead>
                      <TableHead className="font-medium">
                        Unit of Measure
                      </TableHead>
                      <TableHead className="font-medium">Category</TableHead>
                      <TableHead className="font-medium">Quantity</TableHead>
                      <TableHead className="font-medium">Cost</TableHead>
                      <TableHead className="font-medium">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {review.map((review) => (
                      <TableRow key={review.product}>
                        <TableCell>{review.product}</TableCell>
                        <TableCell>{review.unitMeasure}</TableCell>
                        <TableCell>{review.category}</TableCell>
                        <TableCell>{review.quantity}</TableCell>
                        <TableCell>{review.cost}</TableCell>
                        <TableCell>{review.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="border-0">
                      <TableCell colSpan={5}>
                        Total: {calculateTotalCost()}
                      </TableCell>
                      <TableCell>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-slate-300 mb-5 ml-2 text-white hover:bg-slate-300 active:bg-slate-300 focus:bg-slate-300"
                          >
                            Close
                          </Button>
                        </DialogTrigger>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    accessorKey: "store",
    // header: "Store",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Store
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("store")}</div>
    ),
  },
  {
    accessorKey: "date",
    // header: "Order date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "status",
    // header: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "code",
    // header: "Memo Code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Memo Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "ordered",
    // header: "QTY Ordered",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          QTY Ordered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ordered")}</div>
    ),
  },
  {
    accessorKey: "cost",
    // header: "Ordered Cost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ordered Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("cost")}</div>,
  },
  {
    accessorKey: "shipdate",
    // header: "Ship Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ship Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("shipdate")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      if (payment.status === "Submitted") {
        return (
          <>
            <div className="flex flex-row justify-between">
              <Button
                variant="outline"
                //   size="icon"
                className="bg-cyan-500 ml-2 text-white hover:bg-cyan-500 active:bg-cyan-500 focus:bg-cyan-500 w-20"
              >
                Deliver
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-red-500 ml-2 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500 w-20"
              >
                <Ban className="h-4 w-4" />
                <span className="ml-2">Reject</span>
              </Button>
              <Link href="/stores/1/orders/create">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-cyan-500 ml-2 text-white hover:bg-cyan-500 active:bg-cyan-500 focus:bg-cyan-500 w-20"
                >
                  <Pencil className="h-4 w-4" />
                  <span className="ml-2">Edit</span>
                </Button>
              </Link>
            </div>
          </>
        );
      } else {
        return null;
      }
    },
  },
];

function OrderListTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const calculateGrandTotal = () => {
    const grandTotal = data.reduce((total, item) => {
      // Remove non-numeric characters and convert to float
      const costValue = parseFloat(item.cost.replace(/[^0-9.]/g, ""));

      // Add the numeric value to the total
      return total + costValue;
    }, 0);

    return grandTotal.toFixed(2);
  };

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

  return (
    <div className="w-full">
      <div className="flex justify-end mb-6 mt-5">
        <div className="flex justify-between border w-96 px-3 py-2 rounded-lg">
          <span className="text-lg"> Grand Total: </span>
          <span className="text-lg font-medium"> ${calculateGrandTotal()}</span>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
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

export default OrderListTable;
