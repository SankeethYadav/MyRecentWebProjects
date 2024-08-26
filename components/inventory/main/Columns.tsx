"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { ArrowUpDown, Trash2, Edit, Trash, Plus, Minus, Upload } from "lucide-react";
import { useState } from "react";
import {
  AddInventoryManuallyBody,
    AddInventoryManuallyType,
    AddInventoryType,
  CategoryItems,
  DraftOrdersType,
  FreqOrders,
  NestedItems,
  OrdersHistoryType,
  ViewModifyInventoryType,
} from "@/components/types/Table";
import { Checkbox } from "@/components/ui/checkbox";
import { GenericTableCatNested } from "@/components/generic/table/CatgeoryTable";
import "/Users/sankeethyadav/Documents/FoodSupplyRepo/sprint4/FoodSupplyAI/foodsupply-app/styles/tables.css";

export const ModifyInventoryColumns: ColumnDef<ViewModifyInventoryType>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("productName")}</div>
    ),
  },
  {
    accessorKey: "receivedDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Received Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("receivedDate")}</div>
    ),
  },
  {
    accessorKey: "expDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Exp Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("expDate")}</div>
    ),
  },
  {
    accessorKey: "onHandQnt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          onHandQnt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("onHandQnt")}</div>
    ),
  },
  {
    accessorKey: "adjQnt",
    header: "Adjust Qnt",
    cell: ({ row }) => {
      const [value, setValue] = useState(0);
      const increment = () => setValue((prevValue) => prevValue + 1);
      const decrement = () =>
        setValue((prevValue) => Math.max(0, prevValue - 1)); // Prevent going below 0
      return (
        <div className=" custom-input custom-input:hover">
          <button type="button" onClick={decrement}>
            <Minus className="pr-2" size="20" />
          </button>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="custom-inputBox"
          />
          <button type="button" onClick={increment}>
            <Plus className="pr-2" size="20" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "totalQnt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Qnt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">${row.getValue("totalQnt")}</div>
    ),
  },

  
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div>
        <Button>
          <Upload color='#69C0FF' />
        </Button>
      </div>
    ),
  },
];

export const AddInventoryColumns: ColumnDef<AddInventoryType>[] = [
    {
      accessorKey: "productName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase ">{row.getValue("productName")}</div>
      ),
    },
    {
      accessorKey: "receivedDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Received Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("receivedDate")}</div>
      ),
    },
    {
      accessorKey: "expDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Exp Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("expDate")}</div>
      ),
    },
    {
      accessorKey: "onHandQnt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            onHandQnt
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("onHandQnt")}</div>
      ),
    },
    {
      accessorKey: "adjQnt",
      header: "Adjust Qnt",
      cell: ({ row }) => {
        const [value, setValue] = useState(0);
        const increment = () => setValue((prevValue) => prevValue + 1);
        const decrement = () =>
          setValue((prevValue) => Math.max(0, prevValue - 1)); // Prevent going below 0
        return (
          <div className=" custom-input custom-input:hover">
            <button type="button" onClick={decrement}>
              <Minus className="pr-2" size="20" />
            </button>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="custom-inputBox"
            />
            <button type="button" onClick={increment}>
              <Plus className="pr-2" size="20" />
            </button>
          </div>
        );
      },
    },
    {
      accessorKey: "totalQnt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Qnt
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">${row.getValue("totalQnt")}</div>
      ),
    },
  
    
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div>
          <Button>
          <Upload color='#69C0FF'/>
          </Button>
        </div>
      ),
    },
  ];
 

  export const AddInventoryManuallyBodyColumns: ColumnDef<AddInventoryManuallyBody>[]=[
    {
        accessorKey: "productName",
        header: "Product Name",
        cell: ({ row }) => (
          <div className="capitalize text-center">{row.getValue("productName")}</div>
        ),
      },
      {
        accessorKey: "expDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Exp Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase text-center">{row.getValue("expDate")}</div>
        ),
      },
      {
        accessorKey: "receivedDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Received Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase text-center">{row.getValue("receivedDate")}</div>
        ),
      },
      {
        accessorKey: "onHandQnt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              On Hand Quantity
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase text-center">{row.getValue("onHandQnt")}</div>
        ),
      },
     
      {
        accessorKey: "receivedQnt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Received Quantity
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase text-center">{row.getValue("receivedQnt")}</div>
        ),
      },
     
      {
        accessorKey: "totalQnt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Total Qnt
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase text-center">{row.getValue("totalQnt")}</div>
        ),
      },
      {
        accessorKey: "totalCost",
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
          <div className="lowercase text-center">{row.getValue("totalCost")}</div>
        ),
      },
]

  export const AllIngredientsManuallyColumns: ColumnDef< AddInventoryManuallyType>[] = [
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const [isExpanded, setIsExpanded] = useState(true);
        return (
          <div>
            <Button
              className="bg-transparent border-0 p-0 m-0 hover:bg-transparent focus:outline-none text-lg"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
            > 
              {isExpanded ? row.getValue("category") : row.getValue("category")}
            </Button>
            {isExpanded && (
              <div style={{ gridColumn: "1 / -1" }}>
                <GenericTableCatNested
                  columns={AddInventoryManuallyBodyColumns}
                  data={row.original.body}
                />
              </div>
            )}
          </div>
        );
      },
    },
]

