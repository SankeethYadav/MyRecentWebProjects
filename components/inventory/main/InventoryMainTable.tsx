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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ReactNode } from "react";
import { Trash2 } from "lucide-react";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUp } from "lucide-react";

export type Inventory = {
  remark: string;
  date: string;
  received: number;
  cost: string;
};

function InventoryMainTable() {
  const columns: ColumnDef<Inventory>[] = [
    {
      accessorKey: "date",
      // header: "Inventory date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Inventory date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("date")}</div>
      ),
    },
    {
      accessorKey: "cost",
      // header: "Total Cost",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Cost
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("cost")}</div>
      ),
    },
    {
      accessorKey: "received",
      // header: "Received QTY",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Received QTY
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("received")}</div>
      ),
    },

    {
      accessorKey: "remark",
      // header: "Remarks",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Remarks
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("remark")}</div>
      ),
    },

    {
      accessorKey: "action",
      header: "Actions",

      cell: ({ row }) => (
        <div className="capitalize">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-red-500 ml-2 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500"
              >
                <Trash2
                  className="h-4 w-4"
                  onClick={() =>
                    handleDeleteClick(row.getValue("date"), row.original)
                  }
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Delete Data</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {isDeleteModalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <p className="text-sm font-medium mb-10">
                        Are you sure you want to delete this row?
                      </p>
                      <div className="flex item-center justify-end">
                        <Button
                          onClick={handleConfirmDelete}
                          variant="outline"
                          size="sm"
                          className="bg-cyan-600  ml-2 text-white hover:bg-cyan-600 active:bg-cyan-600 focus:bg-cyan-600"
                        >
                          <DialogTrigger asChild>
                            <span className="w-14">Yes</span>
                          </DialogTrigger>
                        </Button>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-600 w-14 ml-2 text-white hover:bg-red-600 active:bg-red-600 focus:bg-red-600"
                          >
                            Close
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogFooter></DialogFooter>
          </Dialog>
        </div>
      ),
    },
  ];
  const [data, setData] = React.useState<Inventory[]>([
    {
      remark: "Sam's 11.20.23",
      date: "November 21, 2023",
      received: 47,
      cost: "908.67",
    },
    {
      remark: "CZ 11.20.23",
      date: "November 20, 2023",
      received: 18,
      cost: "2960.46",
    },
    {
      remark: "Costco 11.20.23",
      date: "November 19, 2023",
      received: 128,
      cost: "2230.24",
    },
    {
      remark: "inventory 11.5.23",
      date: "November 18, 2023",
      received: -122,
      cost: "-4576.19	",
    },
    {
      remark: "Sam's 11.20.23",
      date: "November 21, 2023",
      received: 47,
      cost: "908.67",
    },
    {
      remark: "Costco 11.20.23",
      date: "November 19, 2023",
      received: 128,
      cost: "2230.24",
    },
  ]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [tableData, setTableData] = React.useState<Inventory[]>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [rowToDelete, setRowToDelete] = React.useState<Inventory | null>(null);
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

  const totalReceivedQty = data.reduce((acc, item) => acc + item.received, 0);

  // Calculate Total Cost
  const totalCost = data.reduce((acc, item) => {
    const costValue = parseFloat(item.cost.replace("$", ""));
    return acc + costValue;
  }, 0);

  //Pdf
  interface DialogContentProps {
    children: ReactNode;
  }

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    // Add content to the PDF
    pdfDoc.text("Inventory Summary", 20, 20);

    pdfDoc.autoTable({
      head: [["Remark", "Date", "Received", "Cost"]],
      body: data.map((item) => [
        item.remark,
        item.date,
        item.received,
        item.cost,
      ]),
    });

    // Save the PDF
    pdfDoc.save("review_summary.pdf");
  };

  const handleDeleteClick = (date, row) => {
    // Set the row to delete and open the modal
    setRowToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (rowToDelete) {
      // Find the index of the row to be deleted
      const rowIndex = data.findIndex((item) => item.date === rowToDelete.date);
  
      // If the row is found, remove it from the data array
      if (rowIndex !== -1) {
        // Create a new array without the deleted row
        const newData = [
          ...data.slice(0, rowIndex),
          ...data.slice(rowIndex + 1),
        ];
  
        // Update the data array using setData
        setData(newData);
      }
    }
  
    // Close the modal
    setIsDeleteModalOpen(false);
    setRowToDelete(null);
  };
  
  const handleCancelDelete = () => {
    // Close the modal without deleting
    setIsDeleteModalOpen(false);
    setRowToDelete(null);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row space-x-80 justify-between pl-5 pr-5 pt-5 border-b border-gray-300 pb-5">
        <h5 className="text-sm font-bold">Results Summery</h5>
        <div className="flex flex-row  item-center  space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-red-500 ml-2 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500"
          >
            <FileUp className="h-4 w-4" onClick={downloadPDF} />
          </Button>
        </div>
      </div>
      <div className="rounded-md border mt-5">
        <Table>
          <TableHeader className="bg-slate-600 text-white">
            <TableRow>
              <TableHead colSpan={2}></TableHead>
              <TableHead colSpan={2} className="text-xs">
                Total Received QTY : {totalReceivedQty}
              </TableHead>
              <TableHead className="text-xs">
                Total Cost : {totalCost.toFixed(2)}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableHeader className="bg-slate-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-slate-600 text-white"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <>
                      <TableHead key={header.id} className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    </>
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
                  id={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {/* <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-red-500 ml-2 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500"
                        >
                          <Trash2
                            className="h-4 w-4"
                            onClick={() =>
                              handleDeleteClick(
                                row.getValue("date"),
                                row.original
                              )
                            }
                          />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                          <DialogTitle>Delete Data</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {isDeleteModalOpen && (
                            <div className="modal">
                              <div className="modal-content">
                                <p className="text-sm font-medium mb-10">
                                  Are you sure you want to delete this row?
                                </p>
                                <div className="flex item-center justify-end">
                                  <Button
                                    onClick={handleConfirmDelete}
                                    variant="outline"
                                    size="sm"
                                    className="bg-cyan-600  ml-2 text-white hover:bg-cyan-600 active:bg-cyan-600 focus:bg-cyan-600"
                                  >
                                    <DialogTrigger asChild>
                                      <span className="w-14">Yes</span>
                                    </DialogTrigger>
                                  </Button>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="bg-red-600 w-14 ml-2 text-white hover:bg-red-600 active:bg-red-600 focus:bg-red-600"
                                    >
                                      Close
                                    </Button>
                                  </DialogTrigger>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                      <DialogFooter></DialogFooter>
                    </Dialog>
                  </TableCell> */}
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
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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

export default InventoryMainTable;
