import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Minus, Plus, Upload } from "lucide-react";
import { useState } from "react";

import { CategoryItems, Items, ViewModifyInventory, nestedItems} from "@/components/types/Table";
import { Button } from "@/components/ui/button";
import { GenericTableCatNested } from "@/components/generic/CatgeoryTable";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ViewModifyInventorycolumns: ColumnDef<ViewModifyInventory>[] =
  [
    {
      accessorKey: "ProductName",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("ProductName")}</div>
      ),
    },
    {
      accessorKey: "ReceivedDate",
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
        <div className="lowercase">{row.getValue("ReceivedDate")}</div>
      ),
    },
    {
      accessorKey: "ExpDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ExpDate
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("ExpDate")}</div>
      ),
    },
    {
      accessorKey: "OnHandQnt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            OnHandQnt
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("OnHandQnt")}</div>
      ),
    },
    {
      accessorKey: "AdjustInventory",
      header: "Adjust Inventory",
      cell: ({ row }) => {
        const [value, setValue] = useState(0);
        const increment = () => setValue((prevValue) => prevValue + 1);
        const decrement = () =>
          setValue((prevValue) => Math.max(0, prevValue - 1)); // Prevent going below 0
        return (
          <div className="custom-input custom-input:hover">
            <button type="button" onClick={decrement}>
              <Minus className="pr-2" size="20" />
            </button>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="custom-inputBox"
            ></input>
            <button type="button" onClick={increment}>
              <Plus className="pr-2" size="20" />
            </button>
          </div>
        );
      },
    },
    {
      accessorKey: "TotalQnt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            TotalQnt
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("TotalQnt")}</div>
      ),
    },

    {
      id: "Action",
      header: "Action",
      cell: ({ row }) => (
        <div>
          <Button>
            <Upload color="blue" />
          </Button>
        </div>
      ),
    },
  ];

const nestedColumns: ColumnDef<nestedItems>[] = [
  {
    accessorKey: "ProductName",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ProductName")}</div>
    ),
  },
  {
    accessorKey: "ReceivedDate",
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
      <div className="lowercase">{row.getValue("ReceivedDate")}</div>
    ),
  },
  {
    accessorKey: "ExpDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ExpDate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("ExpDate")}</div>
    ),
  },

  {
    accessorKey: "OnHandQnt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          OnHandQnt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("OnHandQnt")}</div>
    ),
  },
  {
    accessorKey: "AdjustInventory",
    header: "Adjust Inventory",
    cell: ({ row }) => {
      const [value, setValue] = useState(0);
      const increment = () => setValue((prevValue) => prevValue + 1);
      const decrement = () =>
        setValue((prevValue) => Math.max(0, prevValue - 1)); // Prevent going below 0
      return (
        <div className="custom-input custom-input:hover">
          <button type="button" onClick={decrement}>
            <Minus className="pr-2" size="20" />
          </button>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="custom-inputBox"
          ></input>
          <button type="button" onClick={increment}>
            <Plus className="pr-2" size="20" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "TotalQnt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TotalQnt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("TotalQnt")}</div>
    ),
  },
  {
    id: "Action",
    header: "Action",
    cell: ({ row }) => (
      <div>
        <Button>UploaD</Button>
      </div>
    ),
  },
];

export const columns: ColumnDef<CategoryItems>[] = [
  {
    accessorKey: "Category",
    header: "Category",
    cell: ({ row }) => {
      const [isExpanded, setIsExpanded] = useState(true);
      return (
        <div>
          <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? row.getValue("Category") : row.getValue("Category")}
          </Button>
          {isExpanded && (
            <div style={{ gridColumn: "1 / -1" }}>
              <GenericTableCatNested
                columns={nestedColumns}
                data={row.original.items}
              />
            </div>
          )}
        </div>
      );
    },
  },

];
