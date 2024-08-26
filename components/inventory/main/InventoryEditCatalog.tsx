"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
// import filedata from "../../../store.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  SelectGroup,
  SelectLabel,
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

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface Row {
  name: string;
  reciveddate: string;
  "unit measure": string;
  vendor: string;
  "Total Cost($)": string;
  "OnHand Quantity": number;
  Quantity: number;
  "Total Adjust Inventory": string;
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
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 4,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
      {
        name: "Spoons",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 6,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
    ],
  },
  {
    head: "Boxes",
    bodies: [
      {
        name: "Cardboard Boxes",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 10,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
    ],
  },
  {
    head: "ChillSpace",
    bodies: [
      {
        name: "Forks",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 4,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
      {
        name: "Spoons",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 6,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
    ],
  },
  {
    head: "Dough",
    bodies: [
      {
        name: "Forks",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 4,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
      {
        name: "Spoons",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 6,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
    ],
  },
  {
    head: "Produce",
    bodies: [
      {
        name: "Forks",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 4,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
      {
        name: "Spoons",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 6,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
    ],
  },
  {
    head: "Promotion Items",
    bodies: [
      {
        name: "Forks",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 4,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
      {
        name: "Spoons",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 6,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
    ],
  },
  {
    head: "Restaurant Supplies",
    bodies: [
      {
        name: "Forks",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 4,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
      {
        name: "Spoons",
        reciveddate: 11 / 11 / 2023,
        "OnHand Quantity": 6,
        Quantity: 0,
        "Total Adjust Inventory": "$0",
      },
    ],
  },
];
interface InventoryEditCatalog {
  onSelectedProductsChange: (selectedProducts: Row[]) => void;
}
// const data=filedata;
function InventoryEditCatalog({
  onSelectedProductsChange,
}: InventoryEditCatalog) {
  const [date, setDate] = React.useState<Date>();
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
    newRows[itemIndex].bodies[rowIndex]["Total Adjust Inventory"] = `$${(
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
            row["Total Adjust Inventory"].replace("$", "")
          );
          return itemSum + rowQuantityCost;
        }, 0)
      );
    }, 0);
    setSubtotal(newSubtotal);
  }, [rows]);
  return (
    <div className="flex justify-center mt-1.5">
      <Card className="w-full h-100 border rounded-lg p-2  pt-5 pb-5">
        <CardContent>
          <div className="flex flex-row space-x-80">
            <Select className="bg-white">
              <SelectTrigger>
                <SelectValue placeholder="Filter By Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup className="z-10">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="items">Additional Items</SelectItem>
                  <SelectItem value="boxes">Boxes</SelectItem>
                  <SelectItem value="chill">Chill</SelectItem>
                  <SelectItem value="space">Chill Space</SelectItem>
                  <SelectItem value="supplies">
                    Condiments and Supplies
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Table className="border-collapse border mt-5 w-full">
              <TableHeader className="text-white bg-slate-700 w-full">
                <TableRow className="w-full">
                  <TableHead className="text-white w-2/12 text-center">
                    Product
                  </TableHead>
                  <TableHead className="text-white w-2/12 text-center">
                    Received date
                  </TableHead>
                  <TableHead className="text-white text-right w-2/12 ">
                    OnHand Qty
                  </TableHead>
                  <TableHead className="text-white text-right w-2/12 ">
                    Adjust Inventory
                  </TableHead>
                  <TableHead className="text-white text-center w-3/12 ">
                    Total Adjust Inventory
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
                                <TableCell className="h-2 w-2/12 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                  {row.name}
                                </TableCell>
                                <TableCell className="h-2 w-1/12 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[280px] justify-start text-left font-normal",
                                          !date && "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                          format(date, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </TableCell>

                                <TableCell className="h-2 text-center w-2/12 border border-gray-300 whitespace-normal break-words text-xs">
                                  {row["OnHand Quantity"]}
                                </TableCell>
                                <TableCell className="h-2 text-center w-2/12 border border-gray-300 whitespace-normal break-words text-xs">
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
                                <TableCell className="h-2 text-center w-3/12 border border-gray-300 whitespace-normal break-words text-xs">
                                  {row["Total Adjust Inventory"]}
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
        <CardFooter className="flex justify-between">
          <div className="flex justify-end w-full">
          <Link href="/stores/1/inventory/main">
            <Button
              type="submit"
              className="bg-red-600 ml-2 text-white hover:bg-red-600 active:bg-red-600 focus:bg-red-600"
            >
              Cancel{" "}
            </Button>
            </Link>
            <Button
              type="submit"
              className="bg-green-600 ml-2 text-white hover:bg-green-600 active:bg-green-600 focus:bg-green-600"
            >
              Submit
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
export default InventoryEditCatalog;
