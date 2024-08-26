"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
  {
    order: 1,
    store: "store one",
    date: "20-10-2022",
    status: "success",
    code: 123,
    ordered: 1,
    cost: "$135",
    shipdate: "20-10-2022",
  },
]

export type Payment = {
  order: number,
  store: string,
  date: string,
  status: "pending" | "processing" | "success" | "failed",
  code: number,
  ordered: number,
  cost: string,
  shipdate: string,
}

export const columns: ColumnDef<Payment>[] = [

  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("order")}</div>
    ),
  },
  {
    accessorKey: "store",
    header: "Store",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("store")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Order date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "code",
    header: "Memo Code",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("code")}</div>
    ),
  },
  {
    accessorKey: "ordered",
    header: "QTY Ordered",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ordered")}</div>
    ),
  },
  {
    accessorKey: "cost",
    header: "Ordered Cost",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cost")}</div>
    ),
  },
  {
    accessorKey: "shipdate",
    header: "Ship Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("shipdate")}</div>
    ),
  },
 
]

 function OrderListTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-slate-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderListTable;
