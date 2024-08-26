"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
// import filedata from "../invertory/stor.json"
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { FileUp } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
  SelectGroup,
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

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { number } from "zod";
import InventoryAddTable from "./InventoryAddTable";

interface Row {
  Location: string;
  Product: string;
  Markup: number;
  ReceivedDate: Date;
  ExpiryDate: string;
  "ShippingCost($)": number;
  "Price($)": string;
  OnHandQty: number;
  ReceivedQty: number;
  TotalQty: number;
  "TotalCost($)": string;
}

interface Item {
  head: string;
  bodies: Row[];
}
interface ShippingCosts {
  [key: string]: number;
}

const data: Item[] = [
  {
    head: "Additional Items",
    bodies: [
      {
        Product: "Forks",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
      {
        Product: "Spoons",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
    ],
  },
  {
    head: "Boxes",
    bodies: [
      {
        Product: "Cardboard Boxes",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
      {
        Product: "Cardboard Boxes",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
    ],
  },
  {
    head: "ChillSpace",
    bodies: [
      {
        Product: "Forks",
        Markup: 1.0,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
      {
        Product: "Spoons",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
    ],
  },
  {
    head: "Dough",
    bodies: [
      {
        Location: "",
        Product: "Forks",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
      {
        Location: "",
        Product: "Spoons",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
    ],
  },
  {
    head: "Dry Goods",
    bodies: [
      {
        Location: "",
        Product: "Forks",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 1,
        "TotalCost($)": "$0.00",
      },
      {
        Location: "",
        Product: "Spoons",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
    ],
  },
  {
    head: "Produce",
    bodies: [
      {
        Location: "",
        Product: "Forks",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
      {
        Location: "",
        Product: "Spoons",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
    ],
  },
  {
    head: "Promotion Items",
    bodies: [
      {
        Location: "",
        Product: "Forks",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
      {
        Location: "",
        Product: "Spoons",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
    ],
  },
  {
    head: "Restaurant Supplies",
    bodies: [
      {
        Location: "",
        Product: "Forks",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
      {
        Location: "",
        Product: "Spoons",
        Markup: 1,
        ReceivedDate: "",
        ExpiryDate: "",
        "ShippingCost($)": 1,
        "Price($)": "$47.38",
        OnHandQty: 4,
        ReceivedQty: null,
        TotalQty: 4,
        "TotalCost($)": "$0.00",
      },
    ],
  },
];
const defaultShippingCost = 1;

// const data = filedata;
export default function Inventory() {
  const [receivedQty, setReceivedQty] = useState<{
    [key: string]: number | null;
  }>({});
  const [totalCost, setTotalCost] = useState<number>(0);
  const [markups, setMarkups] = useState<{ [key: string]: number }>({});

  const [shippingCosts, setShippingCosts] = useState<ShippingCosts>({});

  useEffect(() => {
    let newTotalCost = 0;
    data.forEach((item, itemIndex) => {
      item.bodies.forEach((row, rowIndex) => {
        const markup = markups[`row-${itemIndex}-${rowIndex}`] ?? 1;
        const shippingCost =
          shippingCosts[`row-${itemIndex}-${rowIndex}`] ?? defaultShippingCost;
        const received = receivedQty[`row-${itemIndex}-${rowIndex}`] ?? 0;

        const rowTotalCost = calculateTotalCostForRow(
          row,
          markup,
          shippingCost,
          received
        );
        newTotalCost += parseFloat(rowTotalCost.substring(1));
      });
    });
    setTotalCost(newTotalCost);
  }, [receivedQty, markups, shippingCosts]);

  const calculateTotalCostForRow = (
    row: Row,
    markup: number,
    shippingCost: number,
    receivedQty: number
  ): string => {
    const price = parseFloat(row["Price($)"].substring(1));
    const totalCost = (price + markup + shippingCost) * receivedQty;
    return `$${totalCost.toFixed(2)}`;
  };
  useEffect(() => {
    const initialReceivedQty: { [key: string]: number | null } = {};
    data.forEach((item, itemIndex) => {
      item.bodies.forEach((_, rowIndex) => {
        const rowId = `row-${itemIndex}-${rowIndex}`;
        initialReceivedQty[rowId] = null;
      });
    });
    setReceivedQty(initialReceivedQty);
  }, []);
  const handleReceived = (
    e: ChangeEvent<HTMLInputElement>,
    itemIndex: number,
    rowIndex: number
  ) => {
    const rowId = `row-${itemIndex}-${rowIndex}`;
    const value = e.target.value;

    const newReceivedQty = value ? Math.max(0, parseInt(value)) : null;

    setReceivedQty((prevReceivedQty) => ({
      ...prevReceivedQty,
      [rowId]: newReceivedQty,
    }));
  };
  useEffect(() => {
    const initialMarkups: { [key: string]: number } = {};
    data.forEach((item, itemIndex) => {
      item.bodies.forEach((_, rowIndex) => {
        const rowId = `row-${itemIndex}-${rowIndex}`;
        initialMarkups[rowId] = 1;
      });
    });
    setMarkups(initialMarkups);
  }, []);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    itemIndex: number,
    rowIndex: number
  ) => {
    const rowId = `row-${itemIndex}-${rowIndex}`;
    let newMarkup = parseFloat(e.target.value);
    if (isNaN(newMarkup) || newMarkup < 1) {
      newMarkup = 1;
    }
    setMarkups((prevMarkups) => ({
      ...prevMarkups,
      [rowId]: newMarkup,
    }));
  };

  const totalReceivedQty: number = Object.values(receivedQty)
    .filter(
      (value: any): value is number =>
        typeof value === "number" && !isNaN(value)
    )
    .reduce((acc: number, value: number) => acc + value, 0);

  useEffect(() => {
    const initialShippingCosts: ShippingCosts = {};
    data.forEach((item, itemIndex) => {
      item.bodies.forEach((_, rowIndex) => {
        const rowId = `row-${itemIndex}-${rowIndex}`;
        initialShippingCosts[rowId] = defaultShippingCost;
      });
    });
    setShippingCosts(initialShippingCosts);

    console.log(initialShippingCosts, 13);
  }, []);

  const shipChange = (
    e: ChangeEvent<HTMLInputElement>,
    itemIndex: number,
    rowIndex: number
  ) => {
    const rowId = `row-${itemIndex}-${rowIndex}`;
    let newCost = parseFloat(e.target.value);
    if (isNaN(newCost) || newCost < 1) {
      newCost = 1;
    }
    setShippingCosts((prevCosts) => ({
      ...prevCosts,
      [rowId]: newCost,
    }));
  };
  const [receiveDates, setReceiveDates] = useState<{
    [key: string]: Date | null;
  }>({});
  const [expiryDates, setExpiryDates] = useState<{
    [key: string]: Date | null;
  }>({});

  useEffect(() => {
    const initialReceiveDates: { [key: string]: Date | null } = {};
    const initialExpiryDates: { [key: string]: Date | null } = {};

    data.forEach((item, itemIndex) => {
      item.bodies.forEach((row, rowIndex) => {
        initialReceiveDates[`row-${itemIndex}-${rowIndex}`] = row.ReceivedDate
          ? new Date(row.ReceivedDate)
          : new Date();
        initialExpiryDates[`row-${itemIndex}-${rowIndex}`] = row.ExpiryDate
          ? new Date(row.ExpiryDate)
          : null;
      });
    });

    setReceiveDates(initialReceiveDates);
    setExpiryDates(initialExpiryDates);
  }, []);

  const updateReceiveDate = (rowId: string, newDate: Date | null) => {
    setReceiveDates((prevDates) => ({ ...prevDates, [rowId]: newDate }));
  };

  const updateExpiryDate = (rowId: string, newDate: Date | null) => {
    setExpiryDates((prevDates) => ({ ...prevDates, [rowId]: newDate }));
  };

  //Pdf
  interface DialogContentProps {
    children: ReactNode;
  }

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    // Add content to the PDF
    pdfDoc.text("Add Inventory Summary", 20, 20);

    pdfDoc.autoTable({
      head: [["Remark", "Date", "Received", "Cost"]],
      body: data.map((item) => [
        item.remark,
        item.date,
        item.received,
        item.cost,
      ]),
    });

    // Save the PDF
    pdfDoc.save("add_summary.pdf");
  };
  const [loading, setLoading] = useState(false);

  const handleMainInventoryClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    const navigateToMainInventory = async () => {
      try {
        // Simulate an asynchronous operation (e.g., API call)
        // Replace this with your actual logic
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Navigate to the Add Inventory page
        window.location.href = "/stores/1/inventory/main";
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      navigateToMainInventory();
    }
  }, [loading]);

  return (
    <div>
      <h1>Inventory Catalogs</h1>
      <div>
        <Card className="mt-5 ml-4 mr-4 h-[225px]">
          <CardHeader className="text-sm font-bold border-b border-gray-300">
            11Add Inventory
          </CardHeader>
          <div className="flex flex-row m-3 gap-8 mt-5">
            <Input
              className="w-[300px] ml-2 mt-2"
              placeholder="Remarks(Optional)"
            />

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-cyan-500 mt-2 text-white hover:bg-cyan-500 active:bg-cyan-500 focus:bg-cyan-500"
                >
                  <span className="text-bold text-lg mr-2">+</span> Add Location
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[825px] bg-white p-0 m-0">
                <InventoryAddTable />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex float-right gap-5 mr-4">
            {/* <Link href="/stores/1/inventory/main"> */}
            <Button
              variant="outline"
              className="bg-red-500 ml-2 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500"
              onClick={handleMainInventoryClick}
              disabled={loading}
            >
              {loading ? "Loading..." : "Cancel"}
            </Button>
            {/* </Link> */}
            <Button
              type="submit"
              className="bg-green-500 text-white hover:bg-green-500 active:bg-green-500 focus:bg-green-500"
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>
      <div>
        <Card className="mt-5 ml-4 mr-4">
          <div className="flex flex-row space-x-80 justify-between items-center pl-5 pr-5 pt-5 border-b border-gray-300 pb-5">
            <h5 className="text-sm font-bold mb-0">Inventory Catalogs</h5>
            <div className="flex flex-row  item-center  space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-red-500 ml-2 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500"
              >
                <FileUp className="h-4 w-4" onClick={downloadPDF} />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 content-center mt-5 ml-3">
            <div>
              <Select>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Filter by categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter by categories</SelectLabel>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Additional Items">
                      Additional Items
                    </SelectItem>
                    <SelectItem value="Boxes">Boxes</SelectItem>
                    <SelectItem value="Chills">Chills</SelectItem>
                    <SelectItem value="ChillSpaces">ChillSpaces</SelectItem>
                    <SelectItem value="Condiments and Supplies">
                      Condiments and Supplies
                    </SelectItem>
                    <SelectItem value="Containers">Containers</SelectItem>
                    <SelectItem value="Dough">Dough</SelectItem>
                    <SelectItem value="Dry Goods">Dry Goods</SelectItem>
                    <SelectItem value="Frozen">Frozen</SelectItem>
                    <SelectItem value="Meat">Meat</SelectItem>
                    <SelectItem value="Non Edible">Non Edible</SelectItem>
                    <SelectItem value="Produce">Produce</SelectItem>
                    <SelectItem value="Promotion Items">
                      Promotion Items
                    </SelectItem>
                    <SelectItem value="Restaurant Supplies">
                      Restaurant Supplies
                    </SelectItem>
                    <SelectItem value="Testing">Testing</SelectItem>
                    <SelectItem value="Tortilla">Tortilla</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex  justify-between items-center border mb-1  rounded w-80 h-10">
              <div className="text-sm py-1 ml-2">Total Qty :</div>
              <div className="text-sm text-bold py-1 mr-2">
                {totalReceivedQty}
              </div>
            </div>
            <div className="flex  justify-between items-center border mb-1 rounded h-10 w-80">
              <div className="text-sm py-1 ml-2">Total Cost :</div>
              <div className="text-sm text-bold py-1 mr-2">
                ${totalCost.toFixed(2)}
              </div>
            </div>
          </div>
          <CardContent>
            <div className="flex flex-row space-x-80">
              <Table className="border-collapse border mt-5">
                <TableHeader className="text-white bg-slate-700 w-full">
                  <TableRow>
                    <TableHead className="w-[90px] text-xs">Location</TableHead>
                    <TableHead className="w-[90px] text-xs">Product</TableHead>
                    <TableHead className="w-[90px] text-xs">MarkUp</TableHead>
                    <TableHead className="w-[90px] text-xs">
                      Received Date
                    </TableHead>
                    <TableHead className="w-[135px] text-xs text-center">
                      Expiry Date
                    </TableHead>
                    <TableHead className="w-[90px] text-xs text-right pr-0">
                      Shipping Cost($)
                    </TableHead>
                    <TableHead className="w-[90px] text-xs text-right pr-0">
                      Price($)
                    </TableHead>
                    <TableHead className="w-[90px] text-xs text-right">
                      OnHand Qty
                    </TableHead>
                    <TableHead className="w-[90px] text-xs">
                      Received Qty
                    </TableHead>
                    <TableHead className="w-[90px] text-xs">
                      Total Qty
                    </TableHead>
                    <TableHead className="w-[90px] text-xs">
                      Total Cost($)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                  <TableRow className="w-full">
                    <TableCell colSpan={12} className="p-0 w-full">
                      <Accordion
                        type="single"
                        collapsible
                        className="ml-2 mr-2"
                      >
                        {data.map((item, itemIndex) => (
                          <AccordionItem
                            key={itemIndex}
                            value={`item-${itemIndex + 1}`}
                          >
                            <AccordionTrigger>{item.head}</AccordionTrigger>
                            <AccordionContent>
                              {item.bodies.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                  <TableCell className="w-[90px] h-2 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    {row.Location}
                                  </TableCell>
                                  <TableCell className="w-[80px] h-2  text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    {row.Product}
                                  </TableCell>
                                  <TableCell className="w-[90px] h-2 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    <Input
                                      type="number"
                                      value={
                                        markups[
                                          `row-${itemIndex}-${rowIndex}`
                                        ]?.toString() ?? "1"
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          itemIndex,
                                          rowIndex
                                        )
                                      }
                                    />
                                  </TableCell>
                                  <TableCell className="w-[70px] h-2 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button className="bg-white-500 text-black hover:bg-white-500">
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {receiveDates[
                                            `row-${itemIndex}-${rowIndex}`
                                          ] instanceof Date
                                            ? format(
                                                receiveDates[
                                                  `row-${itemIndex}-${rowIndex}`
                                                ] as Date,
                                                "PPP"
                                              )
                                            : "Received Date"}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent>
                                        <Calendar
                                          mode="single"
                                          selected={
                                            receiveDates[
                                              `row-${itemIndex}-${rowIndex}`
                                            ] || undefined
                                          }
                                          onSelect={(newDate) =>
                                            updateReceiveDate(
                                              `row-${itemIndex}-${rowIndex}`,
                                              newDate || new Date()
                                            )
                                          }
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </TableCell>
                                  <TableCell className="w-[70px] h-2 text-right border border-gray-300 whitespace-normal break-words text-xs">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button className="bg-white-500 text-black  hover:bg-white-500">
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {expiryDates[
                                            `row-${itemIndex}-${rowIndex}`
                                          ] instanceof Date
                                            ? format(
                                                expiryDates[
                                                  `row-${itemIndex}-${rowIndex}`
                                                ] as Date,
                                                "PPP"
                                              )
                                            : "ExpiryDates"}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent>
                                        <Calendar
                                          mode="single"
                                          selected={
                                            expiryDates[
                                              `row-${itemIndex}-${rowIndex}`
                                            ] || undefined
                                          }
                                          onSelect={(newDate) =>
                                            updateExpiryDate(
                                              `row-${itemIndex}-${rowIndex}`,
                                              newDate || null
                                            )
                                          }
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </TableCell>
                                  <TableCell className="w-[90px] h-2 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    <Input
                                      type="number"
                                      className="text-center w-full appearance-none"
                                      min={1}
                                      value={
                                        shippingCosts[
                                          `row-${itemIndex}-${rowIndex}`
                                        ]?.toString() ?? "1"
                                      }
                                      onChange={(e) =>
                                        shipChange(e, itemIndex, rowIndex)
                                      }
                                    />
                                  </TableCell>
                                  <TableCell className="w-[90px] h-2 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    {row["Price($)"]}
                                  </TableCell>
                                  <TableCell className="w-[90px] h-2 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    {row.OnHandQty}
                                  </TableCell>

                                  <TableCell className="w-[90px] h-2 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    <Input
                                      type="number"
                                      value={
                                        receivedQty[
                                          `row-${itemIndex}-${rowIndex}`
                                        ]?.toString() || ""
                                      }
                                      onChange={(e) =>
                                        handleReceived(e, itemIndex, rowIndex)
                                      }
                                    />
                                  </TableCell>
                                  <TableCell className="w-[90px] h-2 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    {row.TotalQty +
                                      (receivedQty[
                                        `row-${itemIndex}-${rowIndex}`
                                      ] || 0)}
                                  </TableCell>
                                  <TableCell className="w-[90px] h-2 text-center border border-gray-300 whitespace-normal break-words text-xs">
                                    {calculateTotalCostForRow(
                                      row,
                                      markups[`row-${itemIndex}-${rowIndex}`] ??
                                        1,
                                      shippingCosts[
                                        `row-${itemIndex}-${rowIndex}`
                                      ] ?? defaultShippingCost,
                                      receivedQty[
                                        `row-${itemIndex}-${rowIndex}`
                                      ] ?? 0
                                    )}
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
            <div className="flex justify-end w-full mt-5">
              <Button
                type="submit"
                className="bg-red-600 ml-2 text-white hover:bg-red-600 active:bg-red-600 focus:bg-red-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 ml-2 text-white hover:bg-green-600 active:bg-green-600 focus:bg-green-600"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
