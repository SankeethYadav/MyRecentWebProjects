"use client";

import React from "react";
import { FrequentlyOrderedColumns } from "./Columns";
import {
  DropDownFilterProps,
} from "@/components/types/Table";
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
import {
  Save,
  ShoppingCart,
} from "lucide-react";
import { FreqOrders } from "@/components/types/Table";
import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
import { GenericTable } from "@/components/generic/table/Table";
import DropDownFilter from "@/components/generic/table/DropDownFilter";
import { Button } from "@/components/ui/button";
import "../../../styles/create-orders.css";

const data: FreqOrders[] = [
  {
    productDescription: "Wireless Mouse",
    unitOfMeasure: "Each",
    vendor: "TechVendor Inc.",
    totalCost: 250.0,
    onHandQnt: 50,
    cost: 5.0,
  },
  {
    productDescription: "Mechanical Keyboard",
    unitOfMeasure: "Each",
    vendor: "KeyboardKings",
    totalCost: 600.0,
    onHandQnt: 30,
    cost: 20.0,
  },
  {
    productDescription: "27-inch Monitor",

    unitOfMeasure: "Each",
    vendor: "DisplayWorks",
    totalCost: 4500.0,
    onHandQnt: 15,
    cost: 300.0,
  },
  {
    productDescription: "External Hard Drive 1TB",

    unitOfMeasure: "Each",
    vendor: "Storage Solutions",
    totalCost: 1200.0,
    onHandQnt: 40,
    cost: 30.0,
  },
  {
    productDescription: "USB-C Hub",

    unitOfMeasure: "Each",
    vendor: "Connector Co.",
    totalCost: 400.0,
    onHandQnt: 100,
    cost: 4.0,
  },
  {
    productDescription: "Laptop Stand",

    unitOfMeasure: "Each",
    vendor: "OfficeGear",
    totalCost: 800.0,
    onHandQnt: 50,
    cost: 16.0,
  },
  {
    productDescription: "Ergonomic Chair",

    unitOfMeasure: "Each",
    vendor: "ComfortSeating",
    totalCost: 7500.0,
    onHandQnt: 25,
    cost: 300.0,
  },
  {
    productDescription: "Smartphone",

    unitOfMeasure: "Each",
    vendor: "MobileTech",
    totalCost: 10000.0,
    onHandQnt: 20,
    cost: 500.0,
  },
  {
    productDescription: "Bluetooth Speaker",
    unitOfMeasure: "Each",
    vendor: "SoundPro",
    totalCost: 1500.0,
    onHandQnt: 75,
    cost: 20.0,
  },
  {
    productDescription: "Portable Projector",
    unitOfMeasure: "Each",
    vendor: "VisionTech",
    totalCost: 3000.0,
    onHandQnt: 10,
    cost: 300.0,
  },
];

// Calculate the number of selected rows on the current page
export function FrequentlyOrderedpage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = FrequentlyOrderedColumns;
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
  const searchByStoreFilterProps: DropDownFilterProps = {
    labelName: "Store",
    placeHolder: "Enter Store Name",
    id: "storeName",
    table: table,
    options: [
      { name: "Store 1", id: "store1" },
      { name: "Store 2", id: "store2" },
      { name: "Store 3", id: "store3" },
      { name: "Store 4", id: "store4" },
      { name: "Store 5", id: "store5" },
    ],
    handleSelectedOption: () => {},
  };
  const buttons = [
    {
      label: "New Orders",
      handler: function (): void {
        throw new Error("Function not implemented.");
      },
    },
    {
      label: "Order History",
      handler: function (): void {
        throw new Error("Function not implemented.");
      },
    },
  ];
  function handleButtonClick(index: number): void {
    throw new Error("Function not implemented.");
  }

  function getButtonClasses(arg0: any): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="py-2 mt-[-20px]">
        <span className="page-name">
          Frequently Ordered Items(Based on past orders)
        </span>
      </div>
      <div className="flex flex-auto">
        <div>
          <SearchBarFilter
            labelName={"Search by description"}
            id={"searchByName"}
            placeHolder="Enter description"
            table={table}
            column={"productDescription"}
          />
        </div>
        <div className="px-3">
          <DropDownFilter {...searchByStoreFilterProps}></DropDownFilter>
        </div>
        <div className="px-3">
          <SearchBarFilter
            labelName={"Category"}
            id={"Category"}
            placeHolder="chill"
            table={table}
            column={"Category"}
          />
        </div>
      </div>
      <GenericTable table={table} />
      <div className="fotter-button mt-[10px]">
        <Button className="fotter-button-style">
          <Save className="h-[70%]" color="white" />
          <span>Save For Later</span>
        </Button>
        <Button className="fotter-button-style ">
          <ShoppingCart className="h-[70%]" color="white" />
          <span>Review & Place order</span>
        </Button>
      </div>
      {/* <OrderHistory /> */}
    </div>
  );
}
