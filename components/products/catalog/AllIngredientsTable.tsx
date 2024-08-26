"use client";

import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, X } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { Edit } from "lucide-react";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProduct } from "@/app/actions/products";
import { useRouter } from "next/navigation";
import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
import DropDownFilter from "@/components/generic/table/DropDownFilter";
import { AllIngredients } from "./AllIngredients";
export const columns: ColumnDef<Ingrdient>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          ProductName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Supplier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("supplier")}</div>
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SKU
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("sku")}</div>,
  },

  {
    accessorKey: "UnitOfMeasure",
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
      <div className="capitalize">{row.getValue("UnitOfMeasure")}</div>
    ),
  },

  {
    accessorKey: "skucost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SKU Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("skucost")}</div>
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
      <div className="capitalize">{row.getValue("totalCost")}</div>
    ),
  },
];

function AllIngredientsTable() {
  // const router = useRouter();
  const [originalProducts, setOriginalProducts] = useState<Ingrdient[]>([]);
  const [data, setData] = useState<Ingrdient[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showAlert, setShowAlert] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [rowToDelete, setRowToDelete] = React.useState<Ingrdient | null>(null);

  const router = useRouter();
  //edit

  const handleEdit = (row) => {
    console.log(176);
    // Extract necessary data from the row for editing
    const ingredientId = row.id;

    // Construct the edit link with query parameters containing the ingredient data
    const editLink = `/stores/1/products/editingredients/?ingredientId=${ingredientId}`;

    // Navigate to the AllIngredients page with the data for editing
    router.push(editLink);
  };

  const handleConfirmDelete = async () => {
    if (rowToDelete) {
      // Filter out the row to delete
      const updatedData = data.filter((row) => row.id !== rowToDelete);
      // Update the data with the filtered rows
      setData(updatedData);
      let deleteData = await deleteProduct(rowToDelete);
      console.log(deleteData);
      // Close the delete confirmation modal
      setIsDeleteModalOpen(false);
      // Reset the row to delete state
      setRowToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    // Close the modal without deleting
    setIsDeleteModalOpen(false);
    setRowToDelete(null);
  };

  const handleDeleteClick = (row) => {
    const productId = row.id;
    console.log("Row ID to delete:", productId); // Log the ID of the row
    // Set the row to delete and open the modal
    setRowToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  //Product Select
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    let filteredData = originalProducts;

    // Filter data based on selected category
    if (selectedCategory) {
      filteredData = data.filter(
        (product) => product.categoryName === selectedCategory
      );
    } else {
      filteredData = originalProducts;
    }

    setData(filteredData);
  }, [selectedCategory]);

  const handleClearSelection = () => {
    setSelectedCategory(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/stores/1/products", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const responseData = await response.json();
        return responseData.products;
      } catch (err) {
        console.log(err);
        return [];
      }
    }

    async function fetchCategories() {
      try {
        const response = await fetch("/api/stores/1/category", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const responseData = await response.json();
        return responseData.allCategories;
      } catch (err) {
        console.log(err);
        return [];
      }
    }

    async function fetchData() {
      const [products, categories] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      console.log(products);
      setCategories(categories);
      setData(products);
      setOriginalProducts(products);
    }

    fetchData();
  }, []);

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
    getRowId: (row) => row.id,
  });

  return (
    <div className="w-full all-ingredient-main" id="all-ingredient-main">
      <div className="alert-container mt-15 pt-3 ">
        {showAlert && (
          <div className="w-[1376px] mt-10 h-12 px-2 py-3 bg-amber-50 rounded-lg justify-start items-center inline-flex">
            <div className="pl-1 justify-start items-start flex">
              <div className="w-6 h-6 relative">
                <Image
                  src="/img/info.svg"
                  alt="N"
                  width="20"
                  height="20"
                  className="left-[4px] top-[0px] absolute"
                />
              </div>
            </div>
            <div className="grow shrink basis-0 h-6 justify-start items-start flex">
              <div className="grow shrink basis-0 h-6 px-2 justify-start items-start gap-2 flex">
                <div className="text-yellow-700 text-sm font-medium font-Manrope_regular leading-normal">
                  Based on the last inventory that we received, you can promote
                  veggie pizza with pineapple, onions and tomatoes. This product
                  has a food cost of 25% based on a $10 sale price.
                </div>
              </div>
            </div>
            <div className="pr-1 justify-start items-start flex">
              <div className="p-0.5 rounded-lg justify-center items-center flex">
                <div className="w-5 h-5 relative cursor-pointer">
                  {" "}
                  <X onClick={handleCloseAlert} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center py-4 justify-between">
        <div className="flex items-center">
          <div className="search-container">
            {/* <label className="pc-label">Search Items here</label>
            <Input
              id="searchInput"
              type="search"
              placeholder="Search Items by name or categories"
              style={{ width: "300px" }}
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <span className="search-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                  stroke="#8A8AA3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span> */}

            <SearchBarFilter
              labelName="Search Items here"
              id="searchByName"
              table={table}
              column="name"
              placeHolder="Search Items by name or categories"
            ></SearchBarFilter>
          </div>
          <div className="ml-2">
            {/* <label for="Product Categories" className="pc-label">
              Product Categories
            </label>
            <br />
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="flex items-center justify-between w-[300px] bg-white border border-gray-300"
              >
                <Button variant="outline" className="ml-auto">
                  {selectedCategory ? selectedCategory : "All Categories"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.map((category, index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    className="capitalize"
                    checked={selectedCategory === category.name}
                    onCheckedChange={(value) =>
                      handleCategorySelect(value ? category.name : "")
                    }
                  >
                    {category.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}
            <DropDownFilter
              labelName="Product Categories"
              placeHolder="All Categories"
              id="productCategories"
              table={table}
              options={categories}
              handleSelectedOption={handleCategorySelect}
              selectedValue={selectedCategory}
            ></DropDownFilter>
          </div>
        </div>
        <div className="mt-5">
          <Link href="/stores/1/products/addingredients">
            <div className="w-[175px] h-10 px-3 py-2 bg-purple-900 rounded-lg justify-center items-center gap-1 inline-flex">
              <div className="w-6 h-6 relative">
                {" "}
                <PlusCircle className="pr-2" style={{ color: "white" }} />
              </div>
              <div className="px-1 justify-start items-start flex">
                <div className="text-white text-sm font-medium font-Manrope_regular leading-normal">
                  Add Ingredient
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {selectedCategory && (
        <div className="flex items-center mt-2 mb-5">
          <p className="categories-label">Category selected :</p>
          <div className="ml-5 selected-items-list"> {selectedCategory}</div>
          <Button
            className="flex items-center ml-5 selected-items-clear"
            onClick={handleClearSelection}
          >
            <X className="selected-items-clear-icon" />
            <span>Clear</span>
          </Button>
        </div>
      )}
      <div className="pc-table-container mt-2">
      <AllIngredients/>
        {/* <Table>
          <TableHeader className="text-black text-left pc-table-head">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="pc-table-head text-black"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                <TableHead>Update</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // data-state={row.getIsSelected() && "selected"}
                  className="pc-table-body text-black"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="capitalize">
                      <Dialog>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-black border-none pl-0"
                          onClick={() => handleEdit(row)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DialogTrigger>
                          <Button
                            variant="outline"
                            size="icon"
                            className="ml-2 text-black border-none pl-0"
                            onClick={() => handleDeleteClick(row)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                          <DialogHeader>
                            <DialogTitle>Delete Row</DialogTitle>
                          </DialogHeader>
                          {isDeleteModalOpen && (
                            <div className="grid gap-4 py-4">
                              <div className="modal">
                                <div className="modal-content">
                                  <p className="text-sm font-medium mb-10">
                                    Are you sure you want to delete this row?
                                  </p>
                                  <div className="flex item-center justify-end">
                                    <Button
                                      onClick={handleConfirmDelete}
                                      variant="outline"
                                      size="sm"
                                      className="bg-cyan-600  ml-2 text-white hover:bg-cyan-600 active:bg-cyan-600 focus:bg-cyan-600"
                                    >
                                      <DialogTrigger asChild>
                                        <span className="w-14">Yes</span>
                                      </DialogTrigger>
                                    </Button>
                                    <DialogTrigger asChild>
                                      <Button
                                        onClick={handleCancelDelete}
                                        variant="outline"
                                        size="sm"
                                        className="bg-red-600 w-14 ml-2 text-white hover:bg-red-600 active:bg-red-600 focus:bg-red-600"
                                      >
                                        Close
                                      </Button>
                                    </DialogTrigger>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                        <DialogFooter></DialogFooter>
                      </Dialog>
                    </div>
                  </TableCell>
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
        </Table> */}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
export default AllIngredientsTable;
