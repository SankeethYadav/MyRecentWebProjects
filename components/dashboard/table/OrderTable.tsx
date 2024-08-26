"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  const data: Product[] = [
    {
        pname: "8 Dough ball",
        patties: 15.0,
        ounce: 7.25,
        trays: 8,
        trayweight: 930.0
    },

    {
        pname: "10 Dough ball",
        patties: 12.0,
        ounce: 10.25,
        trays: 33,
        trayweight: 4059.0
    },

    {
        pname: "12 Dough ball",
        patties: 11.0,
        ounce: 14.25,
        trays: 41,
        trayweight: 6426.0
    },

    {
        pname: "8 Dough ball",
        patties: 8.0,
        ounce: 20.25,
        trays: 265,
        trayweight: 42930.0
    },
  ]
   
  export type Product = {
    pname: string
    patties: number
    ounce: number
    trays: number
    trayweight: number
  }

  export const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "pname",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0"
          >
            product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("pname")}</div>
      ),
    },
    {
      accessorKey: "patties",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0"
          >
            Patties
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("patties")}</div>,
    },
    {
        accessorKey: "ounce",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="pl-0"
            >
              Ounce
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("ounce")}</div>,
      },
      {
        accessorKey: "trays",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="pl-0"
            >
              Trays
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("trays")}</div>,
      },
      {
        accessorKey: "trayweight",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="pl-0"
            >
              Tray Weight
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("trayweight")}</div>,
      },
   
  ]

function OrderReport() {
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
    <div>
      <Card className="rounded-lg w-full">
        <CardHeader className="text-sm text-black font-bold border-b border-gray-300">
          Orders
        </CardHeader>
        <CardContent className="pt-5">
          <div className="flex item-center justify-between">
            <div className="width-1/4">
              <div className="bg-slate-600 text-white text-base pl-5 pr-5 font-normal pt-2 pb-2">
                Store: 1748-Mapunapuna
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">10" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">2</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">12" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">2</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">14" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">40</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">16" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">5</div>
              </div>
              <div className="flex justify-between items-center pl-5 pr-5 border">
                <div className="font-bold text-black text-sm border-r w-2/3 h-12 pt-4 pb-5">Total</div>
                <div className="font-bold text-black text-sm h-12 pt-4 pb-5">49</div>
              </div>
            </div>

            <div className="width-1/4">
              <div className="bg-slate-600 text-white text-base pl-5 pr-5 font-normal pt-2 pb-2">
                Store: 1751-Kapiolani
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">8" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">2</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">10" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">8</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">12" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">8</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">14" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">40</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">16" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">6</div>
              </div>
              <div className="flex justify-between items-center pl-5 pr-5 border">
                <div className="font-bold text-black text-sm border-r w-2/3 h-12 pt-4 pb-5">Total</div>
                <div className="font-bold text-black text-sm h-12 pt-4 pb-5">64</div>
              </div>
            </div>

          <div className="width-1/4">
              <div className="bg-slate-600 text-white text-base pl-5 pr-5 font-normal pt-2 pb-2">
                Store: 1752-Kapahulu
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">8" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">2</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">10" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">5</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">12" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">6</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">14" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">40</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">16" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">6</div>
              </div>
              <div className="flex justify-between items-center pl-5 pr-5 border">
                <div className="font-bold text-black text-sm border-r w-2/3 h-12 pt-4 pb-5">Total</div>
                <div className="font-bold text-black text-sm h-12 pt-4 pb-5">59</div>
              </div>
            </div>

            <div className="width-1/4">
              <div className="bg-slate-600 text-white text-base pl-5 pr-5 font-normal pt-2 pb-2">
                Store: 1759-Nuuanu
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">10" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">5</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">12" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">5</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">14" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">40</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">16" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">4</div>
              </div>
              <div className="flex justify-between items-center pl-5 pr-5 border">
                <div className="font-bold text-black text-sm border-r w-2/3 h-12 pt-4 pb-5">Total</div>
                <div className="font-bold text-black text-sm h-12 pt-4 pb-5">54</div>
              </div>
            </div>

          </div>

          <div className="flex item-center justify-between mt-5">
          <div className="width-1/4">
              <div className="bg-slate-600 text-white text-base pl-5 pr-5 font-normal pt-2 pb-2">
                Store: 3662-Winward Mall
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">8" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">2</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">10" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">2</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">12" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">2</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">14" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">20</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">16" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">12</div>
              </div>
              <div className="flex justify-between items-center pl-5 pr-5 border">
                <div className="font-bold text-black text-sm border-r w-2/3 h-12 pt-4 pb-5">Total</div>
                <div className="font-bold text-black text-sm h-12 pt-4 pb-5">38</div>
              </div>
            </div>

            <div className="width-1/4">
              <div className="bg-slate-600 text-white text-base pl-5 pr-5 font-normal pt-2 pb-2">
                Store: 9722-MCBH
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">8" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">1</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">10" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">4</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">12" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">6</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">14" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">40</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">16" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">1</div>
              </div>
              <div className="flex justify-between items-center pl-5 pr-5 border">
                <div className="font-bold text-black text-sm border-r w-2/3 h-12 pt-4 pb-5">Total</div>
                <div className="font-bold text-black text-sm h-12 pt-4 pb-5">52</div>
              </div>
            </div>

            <div className="width-1/4">
              <div className="bg-slate-600 text-white text-base pl-5 pr-5 font-normal pt-2 pb-2">
                Store: 5142-Kailua HI
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">10" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">4</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">12" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">5</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">14" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">20</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">16" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">3</div>
              </div>
              <div className="flex justify-between items-center pl-5 pr-5 border">
                <div className="font-bold text-black text-sm border-r w-2/3 h-12 pt-4 pb-5">Total</div>
                <div className="font-bold text-black text-sm h-12 pt-4 pb-5">32</div>
              </div>
            </div>

            <div className="width-1/4">
              <div className="bg-slate-600 text-white text-base pl-5 pr-5 font-normal pt-2 pb-2">
                Store: 5279-Waikiki
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">8" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">1</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">10" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">3</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pr-5 pt-4 pb-5">12" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">7</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">14" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">25</div>
              </div>
              <div className="flex justify-between pl-5 pr-5 border">
                <div  className="font-normal text-black text-sm border-r w-2/3 pt-4 pb-5">16" Dough Ball	</div>
                <div className="font-normal text-black text-sm pt-4 pb-5">1</div>
              </div>
              <div className="flex justify-between items-center pl-5 pr-5 border">
                <div className="font-bold text-black text-sm border-r w-2/3 h-12 pt-4 pb-5">Total</div>
                <div className="font-bold text-black text-sm h-12 pt-4 pb-5">37</div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      <div>
      <Card className="rounded-lg w-full">
        <CardHeader className="text-sm text-black font-bold border-b border-gray-300">
          Orders
        </CardHeader>
        <CardContent className="pt-5">
             <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-slate-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-left text-white">
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
                  className="text-black font-normal text-left"
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
        </CardContent>
       </Card>
      </div>
    </div>
  );
}

export default OrderReport;
