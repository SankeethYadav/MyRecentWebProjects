"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
// import filedata from "../../../store.json";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { any } from "zod";
interface Row {
  name: string;
  sku: string;
  "unit measure": string;
  vendor: string;
  "Total Cost($)": string;
  "OnHand Quantity": number;
  Quantity: number;
  "Quantity Cost": string;
}
interface Item {
  head: string;
  bodies: Row[];
}
const data: Item[] = [
  {
    head: "Additional Items",
    bodies: [
      {
        name: "Forks",
        sku: 1,
        "unit measure": 1,
        vendor: "samclub",
        "Total Cost($)": "$47.38",
        "OnHand Quantity": 4,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
      {
        name: "Spoons",
        sku: 2,
        "unit measure": 2,
        vendor: "walmart",
        "Total Cost($)": "$25.00",
        "OnHand Quantity": 6,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
    ],
  },
  {
    head: "Boxes",
    bodies: [
      {
        name: "Cardboard Boxes",
        sku: 3,
        "unit measure": 3,
        vendor: "amazon",
        "Total Cost($)": "$15.99",
        "OnHand Quantity": 10,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
    ],
  },
  {
    head: "ChillSpace",
    bodies: [
      {
        name: "Forks",
        sku: 1,
        "unit measure": 1,
        vendor: "samclub",
        "Total Cost($)": "$47.38",
        "OnHand Quantity": 4,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
      {
        name: "Spoons",
        sku: 2,
        "unit measure": 2,
        vendor: "walmart",
        "Total Cost($)": "$25.00",
        "OnHand Quantity": 6,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
    ],
  },
  {
    head: "Dough",
    bodies: [
      {
        name: "Forks",
        sku: 1,
        "unit measure": 1,
        vendor: "samclub",
        "Total Cost($)": "$47.38",
        "OnHand Quantity": 4,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
      {
        name: "Spoons",
        sku: 2,
        "unit measure": 2,
        vendor: "walmart",
        "Total Cost($)": "$25.00",
        "OnHand Quantity": 6,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
    ],
  },
  {
    head: "Produce",
    bodies: [
      {
        name: "Forks",
        sku: 1,
        "unit measure": 1,
        vendor: "samclub",
        "Total Cost($)": "$47.38",
        "OnHand Quantity": 4,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
      {
        name: "Spoons",
        sku: 2,
        "unit measure": 2,
        vendor: "walmart",
        "Total Cost($)": "$25.00",
        "OnHand Quantity": 6,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
    ],
  },
  {
    head: "Promotion Items",
    bodies: [
      {
        name: "Forks",
        sku: 1,
        "unit measure": 1,
        vendor: "samclub",
        "Total Cost($)": "$47.38",
        "OnHand Quantity": 4,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
      {
        name: "Spoons",
        sku: 2,
        "unit measure": 2,
        vendor: "walmart",
        "Total Cost($)": "$25.00",
        "OnHand Quantity": 6,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
    ],
  },
  {
    head: "Restaurant Supplies",
    bodies: [
      {
        name: "Forks",
        sku: 1,
        "unit measure": 1,
        vendor: "samclub",
        "Total Cost($)": "$47.38",
        "OnHand Quantity": 4,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
      {
        name: "Spoons",
        sku: 2,
        "unit measure": 2,
        vendor: "walmart",
        "Total Cost($)": "$25.00",
        "OnHand Quantity": 6,
        Quantity: 0,
        "Quantity Cost": "$0",
      },
    ],
  },
];
interface ProductCatalogProps {
  onSelectedProductsChange: (selectedProducts: Row[]) => void;
}
// const data=filedata;
export default function ProductCatlaog({
  onSelectedProductsChange,
}: ProductCatalogProps) {
  const [selectedProducts, setSelectedProducts] = useState<Row[]>([]);
  const [rows, setRows] = useState<Item[]>(data);
  const [subtotal, setSubtotal] = useState<number>(0);
  const handleQuantityChange = (
    itemIndex: number,
    rowIndex: number,
    value: number
  ) => {
    const newRows = [...rows];
    newRows[itemIndex].bodies[rowIndex].Quantity = value;
    const totalCost = parseFloat(
      newRows[itemIndex].bodies[rowIndex]["Total Cost($)"].replace("$", "")
    );
    newRows[itemIndex].bodies[rowIndex]["Quantity Cost"] = `$${(
      totalCost * value
    ).toString()}`;
    setRows(newRows);

    if (value > 1) {
      const selectedProduct = newRows[itemIndex].bodies[rowIndex];
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        selectedProduct,
      ]);
    } else {
      // Remove the product from selected products if the quantity is 0 or 1
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter(
          (product) => product.sku !== newRows[itemIndex].bodies[rowIndex].sku
        )
      );
    }
    onSelectedProductsChange(selectedProducts);
  };
  useEffect(() => {
    const newSubtotal = rows.reduce((sum, item) => {
      return (
        sum +
        item.bodies.reduce((itemSum, row) => {
          const rowQuantity = row.Quantity;
          const rowQuantityCost = parseFloat(
            row["Quantity Cost"].replace("$", "")
          );
          return itemSum + rowQuantityCost;
        }, 0)
      );
    }, 0);
    setSubtotal(newSubtotal);
  }, [rows]);

  const [memoCodes, setMemoCodes] = useState<any>([
    { id: "1", value: "Code 1" },
    { id: "2", value: "Code 2" },
    { id: "3", value: "Code 3" },
  ]);
  
  return (
    <div className="flex justify-center mt-1.5">
      <Card className="w-full h-100 border rounded p-2">
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between space-x-80 z-10">
            <Select className="w-16 z-10 bg-white">
              <SelectTrigger>
                <SelectValue placeholder="Filter by Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="items">Additional Items</SelectItem>
                <SelectItem value="boxes">Boxes</SelectItem>
                <SelectItem value="chill">Chill</SelectItem>
                <SelectItem value="space">Chill Space</SelectItem>
                <SelectItem value="supplies">Condiments and Supplies</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-60 flex flex-row justify-between	 item-center border p-1 rounded space-x-4">
              <div className="text-sm font-medium	 py-1 pl-1">Subtotal:</div>
              <div className="text-base font-medium py-1 pr-1">${subtotal}</div>
            </div>
          </div>
          <div className="w-full">
            <Table className="border-collapse border mt-5 w-full">
              <TableHeader className="text-white bg-slate-700 w-full">
                <TableRow className="w-full">
                  <TableHead className="text-white w-2/12 text-center">
                    Product
                  </TableHead>
                  <TableHead className="text-white w-1/12 text-center">
                    Sku
                  </TableHead>
                  <TableHead className="text-white w-1/12 text-center ml-5">
                    Unit of Measure
                  </TableHead>
                  <TableHead className="text-white w-2/12 text-center">
                    Vendor
                  </TableHead>
                  <TableHead className="text-white w-2/12 text-left">
                    Total cost($)
                  </TableHead>
                  <TableHead className="text-white w-2/12 text-left">
                    OnHand Quantity
                  </TableHead>
                  <TableHead className="text-white w-1/12 text-center">
                    Quantity
                  </TableHead>
                  <TableHead className="text-white w-3/12 text-center">
                    Quantity Cost
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full">
                <TableRow className="w-full">
                  <TableCell colSpan={8} className="p-0 w-full">
                    <Accordion
                      type="single"
                      collapsible
                      className="pl-5 pr-5 w-full"
                    >
                      {data.map((item, itemIndex) => (
                        <AccordionItem
                          key={itemIndex}
                          value={`item-${itemIndex + 1}`}
                          className="w-full"
                        >
                          <AccordionTrigger>{item.head}</AccordionTrigger>
                          <AccordionContent>
                            {item.bodies.map((row, rowIndex) => (
                              <TableRow key={rowIndex} className="w-full">
                                <TableCell className="text-center h-2 w-2/12 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                  {row.name}
                                </TableCell>
                                <TableCell className="text-center h-2 w-1/12 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                  {row.sku}
                                </TableCell>
                                <TableCell className="text-center h-2 w-1/12 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                  {row["unit measure"]}
                                </TableCell>
                                <TableCell className="text-center h-2 w-2/12 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                  {row.vendor}
                                </TableCell>
                                <TableCell className="text-center h-2 w-2/12 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                  {row["Total Cost($)"]}
                                </TableCell>
                                <TableCell className="text-center h-2 text-center w-2/12 border border-gray-300 whitespace-normal break-words text-xs">
                                  {row["OnHand Quantity"]}
                                </TableCell>
                                <TableCell className="text-center h-2 text-center w-2/12 border border-gray-300 whitespace-normal break-words text-xs">
                                  <Input
                                    type="number"
                                    className="text-center w-full"
                                    value={row.Quantity}
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                      handleQuantityChange(
                                        itemIndex,
                                        rowIndex,
                                        parseFloat(e.target.value)
                                      )
                                    }
                                    min="0"
                                    max={row["OnHand Quantity"]}
                                  />
                                </TableCell>
                                <TableCell className="text-center h-2 text-center w-3/12 border border-gray-300 whitespace-normal break-words text-xs">
                                  {row["Quantity Cost"]}
                                </TableCell>
                              </TableRow>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
