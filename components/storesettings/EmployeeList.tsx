"use client";
import React from "react";
import {
  Columns,
  DollarSign,
  Edit,
  Save,
  ShoppingCart,
  Sun,
  Wallet,
} from "lucide-react";
import {
  AddInventoryManuallyType,
  CategoryItems,
  DropDownFilterProps,
  EmployeeListType,
  SearchBarFilterPropsTables,
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

import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
import DropDownFilter from "@/components/generic/table/DropDownFilter";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/types/SubHeader";
import SubHeader from "@/components/generic/SubHeader";
import CustomButton from "@/components/generic/CustomButton";
import { GenericTable } from "../generic/table/Table";
import "/Users/sankeethyadav/Downloads/Trips_USA/foodSupplyAi/FoodSupplyAI/foodsupply-app/styles/create-orders.css";
import { EmployeeListColumns } from "./Columns";
const data: EmployeeListType[] = [
    { name: "John Doe", email: "john.doe@example.com", userName: "johndoe", role: "Developer" },
    { name: "Jane Smith", email: "jane.smith@example.com", userName: "janesmith", role: "Manager" },
    { name: "Michael Brown", email: "michael.brown@example.com", userName: "michaelbrown", role: "Data Analyst" },
    { name: "Emily Davis", email: "emily.davis@example.com", userName: "emilydavis", role: "Designer" },
    { name: "Chris Wilson", email: "chris.wilson@example.com", userName: "chriswilson", role: "Product Manager" },
    { name: "Sarah Taylor", email: "sarah.taylor@example.com", userName: "sarahtaylor", role: "Marketing Specialist" },
    { name: "Alex Martinez", email: "alex.martinez@example.com", userName: "alexmartinez", role: "Software Engineer" },
    { name: "Olivia Thompson", email: "olivia.thompson@example.com", userName: "oliviathompson", role: "UX/UI Designer" },
    // Add more employees as needed
  ];
  
export function EmployeeList() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = EmployeeListColumns;
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
      label: "Add New Employee",
      handler: () => {},
    },
 
  ];
  return (
    <div>
      <SubHeader
        title={" “Store Name” Employee List"}
        backButtonHandler={function (): void {
          throw new Error("Function not implemented.");
        }}
        buttons={subHeaderButtonPropsData}
      />
      <div className="bg-[#F3F5F8]">
        <div className="items-center min-h-screen m-4">
        <div className="flex mt-[-20px] flex-row search-container">
          <div>
            <SearchBarFilter
              labelName={"Search Employee"}
              id={"searchByName"}
              placeHolder="Enter Name"
              table={table}
              column={"name"}
            />
          </div>
        </div>
        <div className="mt-16 overflow-y-auto">
          <GenericTable table={table} />
        </div>

        <div className="fotter-button mt-[10px]">
          <Button className=" bg-[#205BFB] text-white">
            <Save className="h-[70%]" color="white" />
            <span>Save For Later</span>
          </Button>
          <Button className=" bg-[#205BFB] text-white">
            <ShoppingCart className="h-[70%]" color="white" />
            <span>Review & Place order</span>
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
