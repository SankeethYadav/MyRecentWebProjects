"use client";

import React, { useState } from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash2, X } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { Edit } from "lucide-react";
import Image from "next/image";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
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

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Menu[] = [
  {
    iname: "Onion Rings",
    nofingredients: "02",
    sku: "01",
    um: "Pcs",
    itemcost: "$2",
    tocost: "$500",
    rprice: "$6.48",
    fcost: "$14.81",
  },
  {
    iname: "Green Beans",
    nofingredients: "04",
    sku: "11",
    um: "Pcs",
    itemcost: "$2",
    tocost: "$500",
    rprice: "$16.48",
    fcost: "$24.81",
  },
  {
    iname: "Regular Fries",
    nofingredients: "02",
    sku: "05",
    um: "Kg",
    itemcost: "$2",
    tocost: "$500",
    rprice: "$11.48",
    fcost: "$14.81",
  },
  {
    iname: "Side Salad",
    nofingredients: "08",
    sku: "12",
    um: "Pcs",
    itemcost: "$2",
    tocost: "$500",
    rprice: "$8.48",
    fcost: "$34.81",
  },
  {
    iname: "Curly Fries",
    nofingredients: "01",
    sku: "01",
    um: "Kg",
    itemcost: "$2",
    tocost: "$500",
    rprice: "$12.48",
    fcost: "$22.81",
  },
  {
    iname: "Tater Tots",
    nofingredients: "02",
    sku: "16",
    um: "Pcs",
    itemcost: "$2",
    tocost: "$500",
    rprice: "$9.48",
    fcost: "$44.81",
  },
];

export type Menu = {
  pname: string;
  supplier: string;
  sku: number;
  um: string;
  itemcost: number;
  tocost: number;
  rprice: number;
  focst: number;
};

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: "iname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Item Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("iname")}</div>
    ),
  },
  {
    accessorKey: "nofingredients",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No of Ingredients
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nofingredients")}</div>
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SKU
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("sku")}</div>,
  },

  {
    accessorKey: "um",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unit of Measure
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("um")}</div>,
  },

  {
    accessorKey: "itemcost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("itemcost")}</div>
    ),
  },

  {
    accessorKey: "tocost",
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
      <div className="capitalize">{row.getValue("tocost")}</div>
    ),
  },
  {
    accessorKey: "rprice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Retail Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("rprice")}</div>
    ),
  },
  {
    accessorKey: "fcost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % Food Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fcost")}</div>
    ),
  },
];
function MenuTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowToDelete, setRowToDelete] = React.useState<Menu | null>(null);
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
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
    <div className="w-full all-ingredient-main" id="menu-table">
      <div className="alert-container mt-15 pt-3 mb-5">
        {showAlert && (
          <div className="w-[1376px] mt-10 h-12 px-2 py-3 bg-amber-50 rounded-lg justify-start items-center inline-flex">
            <div className="pl-1 justify-start items-start flex">
              <div className="w-6 h-6 relative">
                <Image
                  src="/img/info.svg"
                  alt="N"
                  width="20"
                  height="20"
                  className="left-[4px] top-[0px] absolute"
                />
              </div>
            </div>
            <div className="grow shrink basis-0 h-6 justify-start items-start flex">
              <div className="grow shrink basis-0 h-6 px-2 justify-start items-start gap-2 flex">
                <div className="text-yellow-700 text-sm font-medium font-Manrope_regular leading-normal">
                  Based on the last inventory that we received, you can promote
                  veggie pizza with pineapple, onions and tomatoes. This product
                  has a food cost of 25% based on a $10 sale price.
                </div>
              </div>
            </div>
            <div className="pr-1 justify-start items-start flex">
              <div className="p-0.5 rounded-lg justify-center items-center flex">
                <div className="w-5 h-5 relative cursor-pointer">
                  {" "}
                  <X onClick={handleCloseAlert} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-0 mb-10">
        <div className="flex items-center">
          <div className="search-container">
            <label className="pc-label">Search Items here</label>
            <Input
              id="searchInput"
              type="search"
              placeholder="Search Items by name or categories"
              value={
                (table.getColumn("iname")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("iname")?.setFilterValue(event.target.value)
              }
              style={{ width: "300px" }}
            />
            <span className="search-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                  stroke="#8A8AA3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="mt-5">
          <Link href="/stores/1/products/additems">
            <div className="w-[157px] h-10 px-3 py-2 bg-purple-900 rounded-lg justify-center items-center gap-1 inline-flex">
              <div className="w-6 h-6 relative">
                {" "}
                <PlusCircle className="pr-2" style={{ color: "white" }} />
              </div>
              <div className="px-1 justify-start items-start flex">
                <div className="text-white text-sm font-medium font-Manrope_regular leading-normal">
                  Add Items
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="pc-table-container mt-2">
        <Table>
          <TableHeader className="text-black text-left pc-table-head">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="pc-table-head text-black"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                <TableHead>Update</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="pc-table-body text-black"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-8 table-data-pc">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="capitalize">
                      <Dialog>
                        <DialogTrigger>
                          <Link
                            href={`/stores/1/products/addingredients/${row.sku}`}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-black border-none pl-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            className="ml-2 text-black border-none pl-0"
                            onClick={() => handleDeleteClick(row)}
                          >
                            <Trash2 className="h-4 w-4" />
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
                  </TableCell>
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
export default MenuTable;
function setData(newData: Menu[]) {
    throw new Error("Function not implemented.");
}

