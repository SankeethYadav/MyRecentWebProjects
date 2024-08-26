"use client";

import { useCallback, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
// import { TableSection } from "@/components/ui/table-section";



interface TableSectionProps {
  productCategory: (string | number | boolean)[]; // Replace with actual possible types
}
const TableSection = ({ productCategoriesObject }) => {
  function isOpenController(initialState: boolean) {
    const [isOpen, setOpenState] = useState(initialState);

    const toggleTableButton = useCallback(() => {
      setOpenState((state) => !state);
    }, [setOpenState]);

    return { isOpen, toggleTableButton };
  }

  const { isOpen, toggleTableButton } = isOpenController(false);
  return (
    <TableBody>
      <TableRow className="text-black">
        <TableCell className="font-medium bg-slate-300">
          <Button variant="link" onClick={toggleTableButton}>
            {productCategoriesObject.category.name}
          </Button>
        </TableCell>
      </TableRow>

      {isOpen
        ? productCategoriesObject.products.map((item) => (
            <TableRow className="text-black" key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell>{item.suppliers}</TableCell>
              <TableCell>{item.totalCost}</TableCell>
            </TableRow>
          ))
        : null}
    </TableBody>
  );
};

const ProductCatalog = () => {

  const[productList1,setProductList1]=useState([])
  useEffect( ()=>{
    console.log("useEffect() Product Catalog")
    getProductList()
  },[])
  async function getProductList() {
  
    try {
      const response = await fetch('/api/stores/1/products', {
        method: 'GET',
      });
    
      if (!response.ok) {
        console.log("error in getProductList")
    
        throw new Error(response.statusText);
      }
      //console.log("Response: ",await response.json())
      var data=await response.json()
      data=data.productsByCategory;
      console.log("Product List: ",data)
      setProductList1(data)
  
      //console.log(data.allSuppliers[0])
      } 
          catch (err) {
      console.log(err);
    }
  
  }

  // const productListKeys = Object.keys(productList);

  function useOpenController(initialState: boolean) {
    const [isOpen, setOpenState] = useState(initialState);

    const toggle = useCallback(() => {
      setOpenState((state) => !state);
    }, [setOpenState]);

    return { isOpen, toggle };
  }
  const { isOpen, toggle } = useOpenController(false);

  return (
    <div className="mt-10">
      <Table>
        <TableCaption>A list of Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Unit of Measure</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Total Cost{"\u0024"}</TableHead>
          </TableRow>
        </TableHeader>
        {productList1.map((productCategoriesObject) => (
          <TableSection productCategoriesObject={productCategoriesObject}></TableSection>
        ))}
      </Table>
    </div>
  );
};

export { ProductCatalog};
