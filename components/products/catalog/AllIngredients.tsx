"use client";

import React, { useState, useEffect } from "react";
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
import { PlusCircle } from "lucide-react";

import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import "../../../styles/create-orders.css";
import "../../../styles/product-catalog.css";
import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
import DropDownFilter from "@/components/generic/table/DropDownFilter";
import { AllIngredientsItems } from "@/components/types/Table";
import { AllIngredientsColumns } from "./Columns";
import { CategoryGenericTable } from "@/components/generic/table/CatgeoryTable";
const data: AllIngredientsItems[] = [
  {
    category: "Vegetables",
    body: [
      {
        supplier: "Fresh Farms",
        unitOfMeasure: 2,
        qty: 100,
        totalCost: 200,
      },
      {
        supplier: "Green Valley",
        unitOfMeasure: 3,
        qty: 50,
        totalCost: 150,
      },
    ],
  },
  {
    category: "Dairy",
    body: [
      {
        supplier: "Dairy Best",
        unitOfMeasure: 1,
        qty: 200,
        totalCost: 200,
      },
      {
        supplier: "Milk & More",
        unitOfMeasure: 2,
        qty: 100,
        totalCost: 200,
      },
    ],
  },
  {
    category: "Meat",
    body: [
      {
        supplier: "Butcher's Choice",
        unitOfMeasure: 5,
        qty: 30,
        totalCost: 150,
      },
      {
        supplier: "Prime Cuts",
        unitOfMeasure: 4,
        qty: 50,
        totalCost: 200,
      },
    ],
  },
  {
    category: "Bakery",
    body: [
      {
        supplier: "Bread Co.",
        unitOfMeasure: 1,
        qty: 300,
        totalCost: 300,
      },
      {
        supplier: "Bakers Delight",
        unitOfMeasure: 2,
        qty: 150,
        totalCost: 300,
      },
    ],
  },
  {
    category: "Beverages",
    body: [
      {
        supplier: "Drink Masters",
        unitOfMeasure: 3,
        qty: 80,
        totalCost: 240,
      },
      {
        supplier: "Refresh Inc.",
        unitOfMeasure: 2,
        qty: 120,
        totalCost: 240,
      },
    ],
  },
];
export function AllIngredients() {
  // const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showAlert, setShowAlert] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const columns = AllIngredientsColumns;
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
      <div className="flex justify-end h-auto alert-container mt-2 pt-2">
        {showAlert && (
          <div className="alert-box">
            <div className="w-6 h-6 relative flex-shrink-0  mr-2">
              <Image
                src="/img/info.svg"
                alt="N"
                width="20"
                height="20"
                className="absolute"
              />
            </div>
            <div className="flex-grow h-auto">
              <div className="alert-text">
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
        <div className="mt-5  flex gap-[20px]">
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

      <div className="pc-table-container mt-2 border-none">
        <CategoryGenericTable table={table} />
      </div>
    </div>
  );
}
