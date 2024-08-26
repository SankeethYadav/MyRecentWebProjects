"use client";

import * as React from "react";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
const data: Location[] = [
  {
    lname: "Location One",
    asile: "Asile 1",
    shelf: "Shelf 1",
  },
];

export type Location = {
  lname: string;
  asile: string;
  shelf: string;
};

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "lname",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lname")}</div>
    ),
  },
  {
    accessorKey: "asile",
    header: "Asile",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("asile")}</div>
    ),
  },
  {
    accessorKey: "shelf",
    header: "Shelf",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("shelf")}</div>
    ),
  },
];

function InventoryAddTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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

  //   Add Location
  const initialValues = {
    location: "",
    asile: "",
    shelf: "",
  };

  const validationSchema = Yup.object({
    location: Yup.string().required("Location is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      // Handle form submission here
      console.log(values);
      submitFormData(values);
    },
  });

  const submitFormData = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <Card className="rounded-lg w-full border-0 p-0 m-0 shadow-none">
          <CardHeader className="text-sm font-bold border-b border-gray-300 text-white bg-slate-700 w-full">
            Add Location
          </CardHeader>
          <CardContent className="pt-5">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                props.submitFormData(values);
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="mb-4">
                      <label
                        htmlFor="weekly sales forecast"
                        className="text-sm"
                      >
                        Location*
                      </label>
                      <br />
                      <Field
                        type="text"
                        id="location"
                        name="location"
                        className="border p-2  w-full text-sm h-12"
                        placeholder=""
                      />
                      <ErrorMessage
                        name="location"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="budget" className="text-sm">
                        Asile
                      </label>
                      <br />
                      <Field
                        type="text"
                        id="asile"
                        name="asile"
                        className="border p-2  w-full text-sm h-12"
                        placeholder=""
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="budget" className="text-sm">
                        Shelf
                      </label>
                      <br />
                      <Field
                        type="text"
                        id="shelf"
                        name="shelf"
                        className="border p-2  w-full text-sm h-12"
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div className="flex justify-end w-full">
                  <DialogTrigger asChild>
                    <Button
                      type="submit"
                      className="bg-red-600 ml-2 text-white hover:bg-red-600 active:bg-red-600 focus:bg-red-600"
                    >
                      Cancel
                    </Button>
                    </DialogTrigger>
                    <Button
                      type="submit"
                      className="bg-green-600 ml-2 text-white hover:bg-green-600 active:bg-green-600 focus:bg-green-600"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
      <div className="rounded-md border ml-5 mr-5">
        <Table>
          <TableHeader className="bg-slate-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
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
                    <TableCell key={cell.id} className="text-center">
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
      <div className="flex items-center justify-end space-x-2 py-4 ml-5 mr-5">
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
  );
}

export default InventoryAddTable;
