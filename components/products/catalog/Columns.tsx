import { GenericTableCatNested } from "@/components/generic/table/CatgeoryTable";
import { AllIngredientsBody, AllIngredientsItems, MenuItemsType } from "@/components/types/Table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { useState } from "react";

export const MenuItemsColumns: ColumnDef<MenuItemsType>[] = [
    {
      accessorKey: "itemName",
      header: "Item Name",
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue("itemName")}</div>
      ),
    },
    {
      accessorKey: "noOfIngredients",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No Of Ingrents
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("noOfIngredients")}</div>
      ),
    },
    {
      accessorKey: "unitOfMeasure",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Unit Of Measure
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("unitOfMeasure")}</div>
      ),
    },
    {
      accessorKey: "itemCost",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Item Cost
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("itemCost")}</div>
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
        <div className="lowercase text-center">${row.getValue("totalCost")}</div>
      ),
    },
    {
      accessorKey: "retailPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Retail Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("retailPrice")}</div>
      ),
    },
    {
        accessorKey: "foodCost",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Food Cost
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase text-center">{row.getValue("foodCost")}</div>
        ),
      },
    {
      id: "update",
      header: "Update",
      cell: ({ row }) => (
        <div>
          <Button>
            <Edit className="icon-size-delete" />
          </Button>
          <Button>
            <Trash className="icon-size-delete" color="Red" />
          </Button>
        </div>
      ),
    },
  ];


export const AllIngredientsBodyColumns: ColumnDef<AllIngredientsBody>[]=[
    {
        accessorKey: "supplier",
        header: "Supplier",
        cell: ({ row }) => (
          <div className="capitalize text-center">{row.getValue("supplier")}</div>
        ),
      },
      {
        accessorKey: "unitOfMeasure",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Unit Of Measure
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase text-center">{row.getValue("unitOfMeasure")}</div>
        ),
      },
      {
        accessorKey: "qty",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Quantity
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase text-center">{row.getValue("qty")}</div>
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
      {
        id: "update",
        header: "Update",
        cell: ({ row }) => (
          <div>
            <Button>
              <Edit className="icon-size-delete" />
            </Button>
            <Button>
              <Trash className="icon-size-delete" color="Red"/>
            </Button>
          </div>
        ),
      },
]
  export const AllIngredientsColumns: ColumnDef< AllIngredientsItems>[] = [
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
                  columns={AllIngredientsBodyColumns}
                  data={row.original.body}
                />
              </div>
            )}
          </div>
        );
      },
    },
]