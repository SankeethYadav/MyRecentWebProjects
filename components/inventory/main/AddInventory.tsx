"use client";
import { useRouter } from 'next/router';
import React from "react";
import { AddInventoryColumns } from "./Columns";
import {
  AddInventoryType,
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
import {
  DollarSign,
  Edit,
  Save,
  ShoppingCart,
  Sun,
  Upload,
  Wallet,
} from "lucide-react";

import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
import { GenericTable } from "@/components/generic/table/Table";
import { Button } from "@/components/ui/button";
import "/Users/sankeethyadav/Documents/FoodSupplyRepo/sprint4/FoodSupplyAI/foodsupply-app/styles/create-orders.css";
import CustomButton from "@/components/generic/CustomButton";
import DropDownFilter from "@/components/generic/table/DropDownFilter";
import SubHeader from "@/components/generic/SubHeader";
import { ButtonProps } from "@/components/types/SubHeader";
const data: AddInventoryType[] = [
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
];

// Calculate the number of selected rows on the current page
export function AddInventory() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = AddInventoryColumns;
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
    <div className="">
      <SubHeader
        title={"Add Inventory by Order"}
        backButtonHandler={function (): void {
          throw new Error("Function not implemented.");
        }}
       buttons={subHeaderButtonPropsData}
      />

      <div className="bg-primary-grey">
        <div className="items-center min-h-screen m-4">
          <div className="flex  mt-[-20px]">
            <span className="py-5 w-full text-[20px]">
              View & Update Inventory
            </span>
            <div className="w-full flex justify-end gap-2 py-1 -mt-15">
              <div className="budget-container budget-button text-sm">
                <CustomButton
                  text={"Budget : $1200"}
                  icon={<Wallet className="budget-icon" color="#205BFB" />}
                  icon1={<Edit className="budget-icon" color="#205BFB" />}
                />
              </div>
              <div className="budget-container budget-button">
                <CustomButton
                  text={"Total Cost : $1000"}
                  icon={<DollarSign className="budget-icon" color="#205BFB" />}
                />
              </div>

              <div className="budget-container budget-button ">
                <CustomButton
                  text={"Expected Shipping Date"}
                  icon={<Sun className="budget-icon" color="#205BFB" />}
                  icon1={<Edit className="budget-icon" color="#205BFB" />}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row search-container">
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
                <DropDownFilter
                  labelName={"Product Categories"}
                  placeHolder={"Select product category"}
                  id={"Category"}
                  table={table}
                  options={["chill Space", "cat1", "cat2"]}
                  handleSelectedOption={undefined}
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
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
