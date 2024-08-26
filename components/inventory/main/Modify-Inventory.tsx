"use client";

import React from "react";
import { ModifyInventoryColumns } from "./Columns";
import {
  DropDownFilterProps,
  ViewModifyInventoryType,
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
import { Save, ShoppingCart, Upload } from "lucide-react";

import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
import { GenericTable } from "@/components/generic/table/Table";
import { Button } from "@/components/ui/button";
import "../../../styles/create-orders.css";
import SubHeader from "@/components/generic/SubHeader";
import { ButtonProps } from "@/components/types/SubHeader";
import DropDownFilter from "@/components/generic/table/DropDownFilter";
const data: ViewModifyInventoryType[] = [
  {
    productName: "Apple",
    receivedDate: "2024-06-01",
    expDate: "2024-07-01",
    onHandQnt: 100,
    totalQnt: 150,
  },
  {
    productName: "Banana",
    receivedDate: "2024-06-10",
    expDate: "2024-07-05",
    onHandQnt: 75,
    totalQnt: 100,
  },
  {
    productName: "Carrot",
    receivedDate: "2024-05-20",
    expDate: "2024-07-15",
    onHandQnt: 50,
    totalQnt: 80,
  },
  {
    productName: "Dairy Milk",
    receivedDate: "2024-06-15",
    expDate: "2024-08-15",
    onHandQnt: 200,
    totalQnt: 250,
  },
  {
    productName: "Eggs",
    receivedDate: "2024-06-18",
    expDate: "2024-07-10",
    onHandQnt: 30,
    totalQnt: 50,
  },
  {
    productName: "Eggs",
    receivedDate: "2024-06-18",
    expDate: "2024-07-10",
    onHandQnt: 30,
    totalQnt: 50,
  },
  {
    productName: "Eggs",
    receivedDate: "2024-06-18",
    expDate: "2024-07-10",
    onHandQnt: 30,
    totalQnt: 50,
  },
  {
    productName: "Eggs",
    receivedDate: "2024-06-18",
    expDate: "2024-07-10",
    onHandQnt: 30,
    totalQnt: 50,
  },
  {
    productName: "Eggs",
    receivedDate: "2024-06-18",
    expDate: "2024-07-10",
    onHandQnt: 30,
    totalQnt: 50,
  },
  {
    productName: "Eggs",
    receivedDate: "2024-06-18",
    expDate: "2024-07-10",
    onHandQnt: 30,
    totalQnt: 50,
  },
];

// Calculate the number of selected rows on the current page
export function ModifyInventory() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = ModifyInventoryColumns;
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

  const buttons = [
    {
      label: "Add New Inventory",
      handler: function (): void {
        throw new Error("Function not implemented.");
      },
    },
    {
      label: "Modify Inventory",
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
  const subHeaderButtonPropsData: ButtonProps[] = [
    {
      label: "Add New Inventory",
      handler: () => {},
    },
    {
      label: "Modify Inventory",
      handler: () => {},
    },
  ];
  return (
    <div >
      <SubHeader
        title={"View/Modify Inventory"}
        backButtonHandler={function (): void {
          throw new Error("Function not implemented.");
        }}
        buttons={subHeaderButtonPropsData}
      />
     <div className = "bg-primary-grey">
      <div className="w-full all-ingredient-main py-2" >
        <div className="search-container">
          <div className="flex flex-row ">
            <div>
              <SearchBarFilter
                labelName={"Search by Name"}
                id={"searchByName"}
                placeHolder="Search item by name"
                table={table}
                column={"productName"}
              />
            </div>

            <div className="px-3">
              <DropDownFilter labelName={"Product Categories"} placeHolder={"Select product category"} id={"Category"} table={table} options={['chill Space','cat1','cat2']} handleSelectedOption={undefined}/>
              
            </div>
            <div className="w-full flex justify-end h-[8%] l-[4%] mt-6 gap-2">
              <div className="flex ml-auto border bg-primary-blue text-white rounded-lg">
                <Button className="flex items-center space-x-2 px-4 py-2">
                  <Upload className="h-[70%]" color="white" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14">
          {" "}
          <GenericTable table={table} />
        </div>

        <div className="w-full flex justify-end h-[8%] l-[4%] mt-6 gap-2">
              <div className="flex ml-auto border bg-primary-blue text-white rounded-full">
                <Button className="flex items-center space-x-2 px-4 py-2">
                  
                  <span>Review & Update Inventory</span>
                </Button>
              </div>
            </div>
      </div>
    </div>
    </div>
  );
}
