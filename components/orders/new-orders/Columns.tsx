"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { ArrowUpDown, Trash2, Edit, Trash, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CategoryItems,
  DraftOrdersType,
  FreqOrders,
  NestedItems,
  OrdersHistoryType,
} from "@/components/types/Table";
import { Checkbox } from "@/components/ui/checkbox";
import { GenericTableCatNested } from "@/components/generic/table/CatgeoryTable";
import "/Users/sankeethyadav/Downloads/Trips_USA/foodSupplyAi/FoodSupplyAI/foodsupply-app/styles/tables.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { decrement, increment, setCost, setOnHandQuantity, setQuantity } from "@/redux/slices/createOrderSlice";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// components/orders/new-orders/Columns.tsx

const nestedColumns: ColumnDef<NestedItems>[] = [
  {
    accessorKey: "productDescription",
    header: "Product Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("productDescription")}</div>
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
          Unit of Measure
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("unitOfMeasure")}</div>
    ),
  },
  {
    accessorKey: "vendor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("vendor")}</div>
    ),
  },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UnitCost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const id = row.id;
      const cost: number = row.getValue("cost");

      useEffect(() => {
        dispatch(setCost({ id, cost }));
      }, [dispatch, id, cost]);

      return <div className="lowercase">${cost}</div>;
    },
  },
  {
    accessorKey: "onHandQnt",
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
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const id = row.id;
      const onHandQnt: number = row.getValue("onHandQnt");

      useEffect(() => {
        dispatch(setOnHandQuantity({ id, onHandQnt }));
      }, [dispatch, id, onHandQnt]);

      return <div className="lowercase">{onHandQnt}</div>;
    },
  },
  {
    accessorKey: "orderQnt",
    header: "OrderQuantity",
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const id = row.id;

      const handleIncrement = () => dispatch(increment(id));
      const handleDecrement = () => dispatch(decrement(id));
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        dispatch(setQuantity({ id, quantity: value }));
      };

      const quantity = useSelector((state: RootState) => state.order.items[id]?.orderQnt) || 0;

      return (
        <div className="custom-input custom-input:hover">
          <button type="button" onClick={handleDecrement}>
            <Minus className="pr-2" size="20" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleChange}
            className="custom-inputBox"
          />
          <button type="button" onClick={handleIncrement}>
            <Plus className="pr-2" size="20" />
          </button>
        </div>
      );
    },
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
    cell: ({ row }) => {
      const id = row.id;
      const totalCost = useSelector((state: RootState) => state.order.totalCosts[id]) || 0;
      return <div className="lowercase">${totalCost}</div>;
    },
  },
];

export const allProductsColumns: ColumnDef<CategoryItems>[] = [
  {
    id: "category",
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
              <GenericTableCatNested columns={nestedColumns} data={row.original.items} />
            </div>
          )}
        </div>
      );
    },
  },
];
  // {
  //   accessorKey: 'Details',
  //   header: '',
  //   cell: ({ row }) => {
  //     const [isExpanded, setIsExpanded] = useState(false);
  //     return (
  //       <div>
  //         <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
  //           {isExpanded ? 'Collapse' : 'Expand'}
  //         </Button>
  //         {isExpanded && (
  //           <div style={{ gridColumn: '1 / -1' }}>
  //             <GenericTableCatNested columns= {nestedColumns} data={row.original.body} />
  //           </div>
  //         )}
  //       </div>
  //     );
  //   },
  // },

export const OrderDraftColumns: ColumnDef<DraftOrdersType>[] = [
  {
    accessorKey: "orderNum",
    header: "Order Number",
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("orderNum")}</div>
    ),
  },
  {
    accessorKey: "storeName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Store Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("storeName")}</div>
    ),
  },
  {
    accessorKey: "totalNoItems",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total no.of Items
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("totalNoItems")}</div>
    ),
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("createdDate")}</div>
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
    accessorKey: "orderStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("orderStatus")}</div>
    ),
  },
  {
    id: "action",
    header: "Action",
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
export const FrequentlyOrderedColumns: ColumnDef<FreqOrders>[] = [
  {
    accessorKey: "productDescription",
    header: "Product Description",
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("productDescription")}</div>
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
          Unit of Measure
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">
        {row.getValue("unitOfMeasure")}
      </div>
    ),
  },
  {
    accessorKey: "vendor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("vendor")}</div>
    ),
  },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UnitCost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">${row.getValue("cost")}</div>
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
          OnHandQnt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("onHandQnt")}</div>
    ),
  },
  {
    accessorKey: "orderQnt",
    header: "OrderQuantity",
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
    id: "delete",
    header: "Delete",
    cell: ({ row }) => (
      <div>
        <Button>
          <Trash className="icon-size-delete" color="Red" />
        </Button>
      </div>
    ),
  },
];
export const OrderHistoryColumns: ColumnDef<OrdersHistoryType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <span className="ml-2">Select All</span>
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderNum",
    header: "Order Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("orderNum")}</div>
    ),
  },

  {
    accessorKey: "storeName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Store Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("storeName")}</div>
    ),
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("createdDate")}</div>
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
      <div className="lowercase">${row.getValue("totalCost")}</div>
    ),
  },

  {
    accessorKey: "orderStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("orderStatus")}</div>
    ),
  },
];
