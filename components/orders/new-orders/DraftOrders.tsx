"use client";

import React from "react";

import { OrderDraftColumns } from "./Columns";
import "../../../styles/create-orders.css";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { GenericTable } from "@/components/generic/table/Table";
import { DraftOrdersType } from "@/components/types/Table";

const data: DraftOrdersType[] = [
  {
    orderNum: 1001,
    storeName: "ElectroMart",
    totalNoItems: 25,
    createdDate: "2023-06-15",
    totalCost: 750.0,
    orderStatus: "Pending",
  },
  {
    orderNum: 1002,
    storeName: "GroceryHub",
    totalNoItems: 40,
    createdDate: "2023-06-16",
    totalCost: 320.0,
    orderStatus: "Completed",
  },
  {
    orderNum: 1003,
    storeName: "OfficeDepot",
    totalNoItems: 15,
    createdDate: "2023-06-17",
    totalCost: 450.0,
    orderStatus: "In Progress",
  },
  {
    orderNum: 1004,
    storeName: "FashionStore",
    totalNoItems: 30,
    createdDate: "2023-06-18",
    totalCost: 900.0,
    orderStatus: "Pending",
  },
  {
    orderNum: 1005,
    storeName: "BookWorld",
    totalNoItems: 50,
    createdDate: "2023-06-19",
    totalCost: 500.0,
    orderStatus: "Completed",
  },
  {
    orderNum: 1006,
    storeName: "ToyLand",
    totalNoItems: 20,
    createdDate: "2023-06-20",
    totalCost: 400.0,
    orderStatus: "In Progress",
  },
  {
    orderNum: 1007,
    storeName: "HomeEssentials",
    totalNoItems: 35,
    createdDate: "2023-06-21",
    totalCost: 1050.0,
    orderStatus: "Pending",
  },
  {
    orderNum: 1008,
    storeName: "SportsGear",
    totalNoItems: 10,
    createdDate: "2023-06-22",
    totalCost: 200.0,
    orderStatus: "Completed",
  },
  {
    orderNum: 1009,
    storeName: "BeautyShop",
    totalNoItems: 45,
    createdDate: "2023-06-23",
    totalCost: 675.0,
    orderStatus: "In Progress",
  },
  {
    orderNum: 1010,
    storeName: "PetSupplies",
    totalNoItems: 28,
    createdDate: "2023-06-24",
    totalCost: 560.0,
    orderStatus: "Pending",
  },
];
export function DraftOrders() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = OrderDraftColumns;
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
    <div>
      <div className="py-2 mt-[-20px]">
        {" "}
        <span className="page-name">Order Drafts</span>
      </div>

      <GenericTable table={table} />
    </div>
  );
}
