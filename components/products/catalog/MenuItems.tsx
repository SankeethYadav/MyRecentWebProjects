"use client";
import React, { useState } from "react";
import Image from "next/image";
import { DropDownFilterProps, MenuItemsType } from "@/components/types/Table";
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
import "../../../styles/create-orders.css";
import "../../../styles/product-catalog.css";
import { MenuItemsColumns } from "./Columns";
import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
import DropDownFilter from "@/components/generic/table/DropDownFilter";
import Link from "next/link";
import { PlusCircle } from "lucide-react";


const data: MenuItemsType[] = [
  {
    itemName: "Cheeseburger",
    noOfIngredients: 5,
    unitOfMeasure: "each",
    itemCost: 3.0,
    totalCost: 15.0,
    retailPrice: 10.0,
    foodCost: 1.5,
  },
  {
    itemName: "Caesar Salad",
    noOfIngredients: 7,
    unitOfMeasure: "each",
    itemCost: 2.5,
    totalCost: 17.5,
    retailPrice: 12.0,
    foodCost: 2.0,
  },
  {
    itemName: "Margherita Pizza",
    noOfIngredients: 8,
    unitOfMeasure: "each",
    itemCost: 4.0,
    totalCost: 32.0,
    retailPrice: 15.0,
    foodCost: 3.5,
  },
  {
    itemName: "Spaghetti Bolognese",
    noOfIngredients: 10,
    unitOfMeasure: "each",
    itemCost: 5.0,
    totalCost: 50.0,
    retailPrice: 20.0,
    foodCost: 4.0,
  },
  {
    itemName: "Spaghetti Bolognese",
    noOfIngredients: 10,
    unitOfMeasure: "each",
    itemCost: 5.0,
    totalCost: 50.0,
    retailPrice: 20.0,
    foodCost: 4.0,
  },
  {
    itemName: "Spaghetti Bolognese",
    noOfIngredients: 10,
    unitOfMeasure: "each",
    itemCost: 5.0,
    totalCost: 50.0,
    retailPrice: 20.0,
    foodCost: 4.0,
  },
  {
    itemName: "Spaghetti Bolognese",
    noOfIngredients: 10,
    unitOfMeasure: "each",
    itemCost: 5.0,
    totalCost: 50.0,
    retailPrice: 20.0,
    foodCost: 4.0,
  },
  {
    itemName: "Chicken Tacos",
    noOfIngredients: 6,
    unitOfMeasure: "each",
    itemCost: 2.75,
    totalCost: 16.5,
    retailPrice: 8.0,
    foodCost: 1.75,
  },
];

export function MenuItems() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  
  const [showAlert, setShowAlert] = useState(true);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = MenuItemsColumns;
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
    <div className="w-full all-ingredient-main" id="all-ingredient-main">
      <div className="flex justify-end h-auto alert-container mt-15 pt-3">
        {showAlert && (
          <div className="alert-box">
            <div className="w-6 h-6 relative flex-shrink-0 mr-2">
              <Image
                src="/img/info.svg"
                alt="N"
                width="20"
                height="20"
                className="absolute"
              />
            </div>
            <div className="flex-grow h-auto">
              <div className="text-yellow-700 text-sm font-medium font-Manrope_regular leading-normal">
                Based on the last inventory that we received, you can promote
                veggie pizza with pineapple, onions and tomatoes. This product
                has a food cost of 25% based on a $10 sale price.
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center py-4 justify-between">
        <div className="flex items-center">
          <div className="search-container">
            <SearchBarFilter
              labelName="Search Items here"
              id="searchByName"
              table={table}
              column="category"
              placeHolder="Search Items by name or categories"
            ></SearchBarFilter>
          </div>
          <div className="ml-2">
            <DropDownFilter
              labelName="Product Categories"
              placeHolder="All Categories"
              id="productCategories"
              table={table}
              options={[]}
              handleSelectedOption={undefined}
            ></DropDownFilter>
          </div>
          
        </div>
        <div className="mt-5 flex gap-[20px]">
          <Link href="/stores/1/products/addingredients">
            <div className="add-button">
              <div className="w-6 h-6 relative">
                <PlusCircle className="pr-2" style={{ color: "white" }} />
              </div>
              <div className="px-1 flex justify-start items-start">
                <div className="add-button-text">
                  Add Ingredient
                </div>
              </div>
            </div>
          </Link>
          <Link href="/stores/1/products/addingredients">
            <div className="add-button">
              <div className="w-6 h-6 relative">
                <PlusCircle className="pr-2" style={{ color: "white" }} />
              </div>
              <div className="px-1 flex justify-start items-start">
                <div className="add-button-text">
                  Add LTO
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <GenericTable table={table} />
      </div>
    </div>
  );
}
