// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   CategoryItems,
//   DropDownFilterProps,
// } from "@/components/types/Table";
// import { allProductsColumns } from "./Columns";
// import { CategoryGenericTable } from "@/components/generic/table/CatgeoryTable";
// import {
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
// import DropDownFilter from "@/components/generic/table/DropDownFilter";
// import { Button } from "@/components/ui/button";
// import { Save, ShoppingCart } from "lucide-react";

// interface AllProductsByCategoryProps {
//   storeId: string;
// }

// export const AllProductsByCategory = ({ storeId }: AllProductsByCategoryProps) => {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = useState({});
//   const [data, setData] = useState<CategoryItems[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`/api/stores/${storeId}/category?storeId=${storeId}`);
//         if (!res.ok) {
//           throw new Error(`Error fetching categories: ${res.statusText}`);
//         }
//         const result = await res.json();
//         console.log('Data fetched:', JSON.stringify(result, null, 2));
//         setData(result.allCategories);
//         setLoading(false);
//       } catch (error) {
//         if (error instanceof Error) {
//           console.error('Error fetching categories:', error.message);
//           setError(error.message);
//         } else {
//           console.error('An unexpected error occurred');
//           setError('An unexpected error occurred');
//         }
//         setLoading(false);
//       }
//     };

//     if (storeId) {
//       fetchCategories();
//     }
//   }, [storeId]);

//   const columns = allProductsColumns;

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   const searchByStoreFilterProps: DropDownFilterProps = {
//     labelName: 'Store',
//     placeHolder: 'Enter Store Name',
//     id: 'storeName',
//     table: table,
//     options: [
//       { name: 'Store 1', id: 'store1' },
//       { name: 'Store 2', id: 'store2' },
//       { name: 'Store 3', id: 'store3' },
//       { name: 'Store 4', id: 'store4' },
//       { name: 'Store 5', id: 'store5' },
//     ],
//     handleSelectedOption: () => {},
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="py-2 mt-[-20px]">
//         <span className="page-name">All Product details</span>
//       </div>
//       <div className="flex space-x-4">
//         <div>
//           <SearchBarFilter
//             labelName={'Search by description'}
//             id={'searchByName'}
//             placeHolder="Enter description"
//             table={table}
//             column={'productDescription'}
//           />
//         </div>
//         <div>
//           <DropDownFilter {...searchByStoreFilterProps}></DropDownFilter>
//         </div>
//         <div className="px-2">
//           <SearchBarFilter
//             labelName={'Category'}
//             id={'Category'}
//             placeHolder="ChillSpace"
//             table={table}
//             column={'category'}
//           />
//         </div>
//       </div>
//       <div className="overflow-y-auto">
//         <CategoryGenericTable table={table} />
//       </div>

//       <div className="fotter-button mt-[10px]">
//         <Button className="fotter-button-style">
//           <Save className="h-[70%]" color="white" />
//           <span>Save For Later</span>
//         </Button>
//         <Button className="fotter-button-style ">
//           <ShoppingCart className="h-[70%]" color="white" />
//           <span>Review & Place order</span>
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default AllProductsByCategory;

// components/orders/new-orders/AllProductsByCategory.tsx
"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoryGenericTable } from "@/components/generic/table/CatgeoryTable";
import { allProductsColumns } from "./Columns";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Save, ShoppingCart } from "lucide-react";
import SearchBarFilter from "@/components/generic/table/SearchBarFilter";
import DropDownFilter from "@/components/generic/table/DropDownFilter";
import { AppDispatch, RootState } from '@/redux/store';
import { fetchCategories } from '@/redux/slices/orderCategorySlice';

interface AllProductsByCategoryProps {
  storeId: string;
}

export const AllProductsByCategory = ({ storeId }: AllProductsByCategoryProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.category);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    if (storeId && data.length === 0) {
      dispatch(fetchCategories(storeId));
    }
  }, [storeId, dispatch, data.length]);

  const columns = allProductsColumns;

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

  const searchByStoreFilterProps = {
    labelName: 'Store',
    placeHolder: 'Enter Store Name',
    id: 'storeName',
    table: table,
    options: [
      { name: 'Store 1', id: 'store1' },
      { name: 'Store 2', id: 'store2' },
      { name: 'Store 3', id: 'store3' },
      { name: 'Store 4', id: 'store4' },
      { name: 'Store 5', id: 'store5' },
    ],
    handleSelectedOption: () => {},
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="py-2 mt-[-20px]">
        <span className="page-name">All Product details</span>
      </div>
      <div className="flex space-x-4">
        <div>
          <SearchBarFilter
            labelName={'Search by description'}
            id={'searchByName'}
            placeHolder="Enter description"
            table={table}
            column={'productDescription'}
          />
        </div>
        <div>
          <DropDownFilter {...searchByStoreFilterProps}></DropDownFilter>
        </div>
        <div className="px-2">
          <SearchBarFilter
            labelName={'Category'}
            id={'Category'}
            placeHolder="ChillSpace"
            table={table}
            column={'category'}
          />
        </div>
      </div>
      <div className="overflow-y-auto">
        <CategoryGenericTable table={table} />
      </div>

      <div className="fotter-button mt-[10px]">
        <Button className="fotter-button-style">
          <Save className="h-[70%]" color="white" />
          <span>Save For Later</span>
        </Button>
        <Button className="fotter-button-style ">
          <ShoppingCart className="h-[70%]" color="white" />
          <span>Review & Place order</span>
        </Button>
      </div>
    </div>
  );
};

export default AllProductsByCategory;
