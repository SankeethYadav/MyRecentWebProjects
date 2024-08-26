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
  SearchBarFilterPropsTables,
} from "@/components/types/Table";

import { searchByCatData } from "@/components/data/CurrentOrders";
import { CategoryGenericTable } from "@/components/generic/table/CatgeoryTable";
import "/Users/sankeethyadav/Documents/FoodSupplyRepo/sprint4/FoodSupplyAI/foodsupply-app/styles/create-orders.css";
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
import { AllIngredientsManuallyColumns } from "./Columns";
import { ButtonProps } from "@/components/types/SubHeader";
import SubHeader from "@/components/generic/SubHeader";
import CustomButton from "@/components/generic/CustomButton";
const data: AddInventoryManuallyType[] = [
  {
    category: "Vegetables",
    body: [
      {
        productName: "Carrots",
        expDate: "2024-08-10",
        receivedDate: "2024-06-15",
        unitOfMeasure: "kg",
        pricePerUnit: 1.5,
        onHandQnt: 20,
        receivedQnt: 50,
        totalQnt: 70,
        totalCost: 105.0,
      },
      {
        productName: "Lettuce",
        expDate: "2024-07-20",
        receivedDate: "2024-06-10",
        unitOfMeasure: "kg",
        pricePerUnit: 2.0,
        onHandQnt: 15,
        receivedQnt: 30,
        totalQnt: 45,
        totalCost: 90.0,
      },
    ],
  },
  {
    category: "Dairy",
    body: [
      {
        productName: "Milk",
        expDate: "2024-07-01",
        receivedDate: "2024-06-01",
        unitOfMeasure: "liter",
        pricePerUnit: 0.9,
        onHandQnt: 100,
        receivedQnt: 200,
        totalQnt: 300,
        totalCost: 270.0,
      },
      {
        productName: "Cheese",
        expDate: "2024-09-01",
        receivedDate: "2024-06-05",
        unitOfMeasure: "kg",
        pricePerUnit: 5.0,
        onHandQnt: 10,
        receivedQnt: 25,
        totalQnt: 35,
        totalCost: 175.0,
      },
    ],
  },
  {
    category: "Meat",
    body: [
      {
        productName: "Chicken Breast",
        expDate: "2024-07-15",
        receivedDate: "2024-06-20",
        unitOfMeasure: "kg",
        pricePerUnit: 7.0,
        onHandQnt: 50,
        receivedQnt: 100,
        totalQnt: 150,
        totalCost: 1050.0,
      },
      {
        productName: "Ground Beef",
        expDate: "2024-07-30",
        receivedDate: "2024-06-18",
        unitOfMeasure: "kg",
        pricePerUnit: 10.0,
        onHandQnt: 30,
        receivedQnt: 50,
        totalQnt: 80,
        totalCost: 800.0,
      },
    ],
  },
  {
    category: "Bakery",
    body: [
      {
        productName: "Whole Wheat Bread",
        expDate: "2024-07-05",
        receivedDate: "2024-06-15",
        unitOfMeasure: "loaf",
        pricePerUnit: 2.5,
        onHandQnt: 40,
        receivedQnt: 60,
        totalQnt: 100,
        totalCost: 250.0,
      },
      {
        productName: "Croissants",
        expDate: "2024-07-10",
        receivedDate: "2024-06-12",
        unitOfMeasure: "dozen",
        pricePerUnit: 5.0,
        onHandQnt: 20,
        receivedQnt: 30,
        totalQnt: 50,
        totalCost: 250.0,
      },
    ],
  },
  {
    category: "Beverages",
    body: [
      {
        productName: "Orange Juice",
        expDate: "2024-07-25",
        receivedDate: "2024-06-25",
        unitOfMeasure: "liter",
        pricePerUnit: 3.0,
        onHandQnt: 50,
        receivedQnt: 70,
        totalQnt: 120,
        totalCost: 360.0,
      },
      {
        productName: "Apple Cider",
        expDate: "2024-08-15",
        receivedDate: "2024-06-20",
        unitOfMeasure: "liter",
        pricePerUnit: 4.0,
        onHandQnt: 30,
        receivedQnt: 40,
        totalQnt: 70,
        totalCost: 280.0,
      },
    ],
  },
];

export function AddInventoryManually() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = AllIngredientsManuallyColumns;
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
  // const buttons = [
  //   {
  //     label: "Add New Inventory",
  //     handler: function (): void {
  //       throw new Error("Function not implemented.");
  //     },
  //   },
  //   {
  //     label: "Modify Inventory",
  //     handler: function (): void {
  //       throw new Error("Function not implemented.");
  //     },
  //   },
  // ];
  // function handleButtonClick(index: number): void {
  //   throw new Error("Function not implemented.");
  // }

  // function getButtonClasses(arg0: any): string | undefined {
  //   throw new Error("Function not implemented.");
  // }

  // const subHeaderButtonPropsData: ButtonProps[] = [
  //   {
  //     label: "Add New Inventory",
  //     handler: () => {},
  //   },
  //   {
  //     label: "Modify Inventory",
  //     handler: () => {},
  //   },
  // ];
  return (
    <div>
      <SubHeader
        title={"Add Inventory Manually"}
        backButtonHandler={function (): void {
          throw new Error("Function not implemented.");
        }}
      
      />
      <div className="bg-primary-grey">
        <div className="items-center min-h-screen m-4">
        <div className="flex  mt-[-20px]">
          <span className="py-5 w-full text-[20px]">All Product Details</span>
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
          <div>
            <SearchBarFilter
              labelName={"Search by description"}
              id={"searchByName"}
              placeHolder="Enter description"
              table={table}
              column={"productDescription"}
            />
          </div>
          <div>
            <DropDownFilter {...searchByStoreFilterProps}></DropDownFilter>
          </div>
          <div className="px-2">
            <SearchBarFilter
              labelName={"Category"}
              id={"Category"}
              placeHolder="ChillSpace"
              table={table}
              column={"Category"}
            />
          </div>
        </div>
        <div className="mt-16 overflow-y-auto">
          <CategoryGenericTable table={table} />
        </div>

        <div className="fotter-button mt-[10px]">
          <Button className=" bg-primary-blue text-white">
            <Save className="h-[70%]  mr-2" color="white" />
            <span>Save For Later</span>
          </Button>
          <Button className=" bg-primary-blue text-white">
            <ShoppingCart className="h-[70%] mr-2" color="white" />
            <span>Review & Place order</span>
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
