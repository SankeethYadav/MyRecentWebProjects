"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Trash2, Edit, Trash, Plus, Minus, Upload, MoreVertical } from "lucide-react";
import { useState } from "react";
import {
  AddInventoryManuallyBody,
    AddInventoryManuallyType,
    AddInventoryType,
  CategoryItems,
  DraftOrdersType,
  EmployeeListType,
  FreqOrders,
  NestedItems,
  OrdersHistoryType,
  ViewModifyInventoryType,
} from "@/components/types/Table";

import "../../styles/tables.css";
import "../../styles/settings.css";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import DropDownFilter from "../generic/table/DropDownFilter";


export const EmployeeListColumns: ColumnDef<EmployeeListType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("userName")}</div>
    ),
  },
 
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Select>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder={row.original.role || "Select a role"}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="apple">Admin</SelectItem>
          <SelectItem value="banana">Rgm</SelectItem>
          <SelectItem value="blueberry">supervisor</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    ),
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="action-button"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              // onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
       
        
      </div>
    ),
  }, 
];

