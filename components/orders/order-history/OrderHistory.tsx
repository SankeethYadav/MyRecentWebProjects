"use client";
import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
import {
  DropDownFilterProps,
  OrdersHistoryType,
  SearchBarFilterProps,
} from "@/components/types/Table";
import DropDownFilter from "@/components/generic/table/DropDownFilter";
import React from "react";
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
import { OrderHistoryColumns } from "../new-orders/Columns";
import { Button } from "@/components/ui/button";
import { HelpCircle, Info, Save, ShoppingCart } from "lucide-react";
import "../../../styles/create-orders.css";
import { GenericTable } from "@/components/generic/table/Table";

function OrderHistory() {

    const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = OrderHistoryColumns;
  
  const data: OrdersHistoryType[] = [
    {
      orderNum: 101,
      storeName: "Store A",
      createdDate: 1672531200000, // January 1, 2023, timestamp in milliseconds
      totalCost: 150.5,
      orderStatus: "Completed",
    },
    {
      orderNum: 102,
      storeName: "Store B",
      createdDate: 1672617600000, // January 2, 2023, timestamp in milliseconds
      totalCost: 200.75,
      orderStatus: "Pending",
    },
    {
      orderNum: 103,
      storeName: "Store C",
      createdDate: 1672704000000, // January 3, 2023, timestamp in milliseconds
      totalCost: 99.99,
      orderStatus: "Shipped",
    },
    {
      orderNum: 104,
      storeName: "Store D",
      createdDate: 1672790400000, // January 4, 2023, timestamp in milliseconds
      totalCost: 350.0,
      orderStatus: "Cancelled",
    },
    {
      orderNum: 105,
      storeName: "Store E",
      createdDate: 1672876800000, // January 5, 2023, timestamp in milliseconds
      totalCost: 120.45,
      orderStatus: "Processing",
    },
  ];

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
  const searchByStatusFilterProps: DropDownFilterProps = {
    labelName: "Status",
    placeHolder: "Enter Order Status",
    id: "orderStatus",
    table: table,
    options: [
      { name: "Order Processing", id: "os1" },
      { name: "Order Payment Due", id: "os2" },
      { name: "Order Delivered", id: "os3" },
      { name: "Order Pickup Available", id: "os4" },
      { name: "Order Cancelled", id: "os5" },
    ],
    handleSelectedOption: () => {},
  };
  return (
    <div className="bg-[#F7F7F8] min-h-screen">
      <div className="flex flex-auto">
        <div className="px-2">
          <SearchBarFilter
            labelName={"Search Items here"}
            id={"searchByNo"}
            placeHolder="Search Order No"
            table={table}
            column={"orderNum"}
          />
        </div>
        <div className="px-2">
          <DropDownFilter {...searchByStoreFilterProps}></DropDownFilter>
        </div>
        <div className="px-2">
          {" "}
          <DropDownFilter {...searchByStatusFilterProps}></DropDownFilter>
        </div>

        <div className="px-4">
          <SearchBarFilter
            labelName={"Order Date Range"}
            id={"dateRange"}
            placeHolder="createdDate"
            table={table}
            column={"createdDate"}
          />
        </div>
      </div>
      <div>
        <GenericTable table={table} />
      </div>
      <div className="fotter-button mt-[10px]">
        <Button className="fotter-button-style hover:bg-[#205BFB] ">
          <Info className="h-[70%]" color="white" />
          <span>View Order</span>
        </Button>
        <Button className="fotter-button-style hover:bg-[#205BFB] ">
          <HelpCircle className="h-[70%]" color="white" />
          <span>Report Issue</span>
        </Button>
        <Button className="fotter-button-style hover:bg-[#205BFB]  ">
          <ShoppingCart className="h-[70%]" color="white" />
          <span>Order it again</span>
        </Button>
      </div>
    </div>
  );
}

export default OrderHistory;
