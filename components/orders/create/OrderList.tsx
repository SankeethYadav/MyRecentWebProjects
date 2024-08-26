"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
// import filedata from "../../../store.json";
import { Orders, currentOrdersData } from "@/components/data/CurrentOrders";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertOctagon } from "lucide-react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormik,
  setFieldError,
} from "formik";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import { addDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

import OrderListTable from "./OrderListTable";

import { any } from "zod";
import { Mail } from "lucide-react";
import Link from "@/node_modules/next/link";

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

const validationSchema = Yup.object({
  store: Yup.string().required("Store is required"),
  orderstatus: Yup.string().required("Status is required"),
  pickdate: Yup.date().required("Ship Date is required"),
});

const initialValues = {
  store: "",
  orderstatus: "",
  pickdate: null,
};

// const data=filedata;
function OrderList() {
  const urlParams = useSearchParams();
  const success = urlParams.get("success");
  const tableRef = useRef<HTMLDivElement>(null);
  const dataTableRef = useRef("");
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(true);
  const [stores, setStores] = useState<any>([
    { number: "name 1", name: "All" },
    { number: "name 2", name: "1748-Mapunapuna" },
    { number: "name 3", name: "1749-Peral City" },
    { number: "name 4", name: "1751-Kapiolani" },
    { number: "name 5", name: "1752-Kapahulu" },
    { number: "name 6", name: "754-Target Center" },
    { number: "name 7", name: "1756-Waipahu" },
    { number: "name 8", name: "1757-Wahiawa" },
    { number: "name 9", name: "1759-Nuuanu" },
    { number: "name 10", name: "1763-Mililani" },
    { number: "name 11", name: "3662-Winward Mall" },
    { number: "name 12", name: "4665-Hickam" },
    { number: "name 13", name: "4805-Ewa Beach" },
    { number: "name 14", name: "9722-MCBH" },
    { number: "name 15", name: "Blue River Mex Grill" },
    { number: "name 16", name: "5142-Kailua HI" },
    { number: "name 17", name: "5200-Waianae HI" },
    { number: "name 18", name: "5196-Kihe HI" },
    { number: "name 19", name: "5203-Lahaina HI" },
    { number: "name 20", name: "5212-Honolulu HI (Non Trad)" },
    { number: "name 22", name: "1111-UH" },
    { number: "name 23", name: "1112-Waikiki" },
    { number: "name 24", name: "1113-Temp Store" },
    { number: "name 25", name: "5279-Waikiki" },
  ]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const [orderStatus, setOrderStatus] = useState<any>([
    { id: "1", value: "All" },
    { id: "2", value: "Submitted" },
    { id: "3", value: "Draft" },
    { id: "4", value: "Rejected" },
    { id: "5", value: "Delivered" },
  ]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    customer: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
      console.log(values, date);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      // Handle form submission here
      console.log(values);
      submitFormData(values);
    },
  });

  const handleDateSelect = (selectedDate: any) => {
    console.log("Selected Date: ", selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    formik.setFieldValue("pickdate", formattedDate); // Update pickdate field in Formik
  };

  const submitFormData = (data: any) => {
    console.log(data);
    axios
      .post("/api/createOrder", data)
      .then((response: { data: any }) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const printDeliveryReport = () => {
    // Open a new window for printing
    const printWindow = window.open("", "_blank");

    // Write the HTML content to the new window
    printWindow?.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @media print {
            /* Specify styles for printing */
            body {
              font-size: 12pt;
            }
            /* Add any additional styles for printing */
          }
        </style>
      </head>
      <body>
        <div class="w-full text-center mx-auto block">
          <h2 class="text-lg text-center">All Store Delivery Report</h2>
        </div>
        <div class="w-full">
          ${document.querySelector(".orders-table")?.outerHTML}
        </div>
      </body>
      </html>
    `);

    // Close the document stream
    printWindow?.document.close();

    // Print the contents
    printWindow?.print();

    // Close the new window after printing
    printWindow?.close();
  };

  useEffect(() => {
    let orderedProducts;
    let data = JSON.parse(localStorage.getItem("products") || "{}");
    if (Object.keys(data).length > 0) {
      const products: Orders[] = [
        ...data.currentOrders,
        ...data.additionalItems,
      ];
      orderedProducts = products
        .map((elm) =>
          elm.products.filter((elmt) => elmt.count > 0).length > 0
            ? elm.products
                .map((el) =>
                  el.count > 0
                    ? {
                        id: `<a href='view-order' class='text-info-70'>${el.id}</a>`,
                        store: currentOrdersData.storeInfo.store,
                        purchaseDate: currentOrdersData.storeInfo.purchaseDate,
                        name: el.name,
                        category: elm.category,
                        price: `$${el.price}`,
                        count: el.count,
                        orderCost: `$${el.count * parseFloat(el.price)}`,
                        shipDate: currentOrdersData.storeInfo.shipDate,
                      }
                    : false
                )
                .filter((order) => order)
            : false
        )
        .filter((elm) => elm)
        .flat(1);

      setTotal(
        (orderedProducts as OrderList[]).reduce(
          (total, item) => total + parseFloat(item.orderCost.slice(1)),
          0
        )
      );
    }

    if (tableRef.current) {
      initTE({ Datatable });
      dataTableRef.current = new Datatable(tableRef.current, Orders);
    }
    document
      .querySelector(".orders-table .flex-col .font-normal.mb-3")
      ?.classList.remove("mb-3");
    document
      .querySelector(".orders-table .flex-col")
      ?.classList.remove("flex-col");
  }, []);

  const [loading, setLoading] = useState(false);

  const handlenavigateToCreateOrderClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    const navigateToCreateOrder = async () => {
      try {
        // Simulate an asynchronous operation (e.g., API call)
        // Replace this with your actual logic
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Navigate to the Add Inventory page
        window.location.href = "/stores/1/orders/create";
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      navigateToCreateOrder();
    }
  }, [loading]);
  return (
    <div>
      <div className="flex justify-center mt-1.5">
        <Card className="rounded-lg w-full">
          <CardHeader className="text-sm font-bold border-b border-gray-300">
            Filter By
          </CardHeader>
          <CardContent className="pt-5">
            <Formik
              // initialValues={{ pickdate: null }}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                // Handle your form submission here
                console.log(values);
                submitFormData(values);
              }}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="mb-4">
                      <label htmlFor="store" className="text-sm">
                        Store
                      </label>
                      <br />
                      <Field
                        as="select"
                        id="store"
                        name="store"
                        className="border p-2  w-full text-sm h-12"
                        placeholder="Select Store"
                      >
                        {stores.map((stores: any) => (
                          <option key={stores.number} value={stores.number}>
                            {stores.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="store"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="order" className="text-sm">
                        Order Status
                      </label>
                      <br />
                      <Field
                        as="select"
                        id="orderstatus"
                        name="orderstatus"
                        className="border p-2  w-full text-sm h-12"
                      >
                        {orderStatus.map((orderStatus: any) => (
                          <option key={orderStatus.id} value={orderStatus.id}>
                            {" "}
                            {orderStatus.value}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="orderstatus"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="shipdate" className="text-sm">
                        Choose Ship Date
                      </label>
                      <div className={cn("grid gap-2")}>
                        <Popover className="bg-white">
                          <PopoverTrigger asChild>
                            <Button
                              id="pickdate"
                              name="pickdate"
                              className={cn(
                                "justify-start text-left font-normal border h-12 rounded-none",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date?.from ? (
                                date.to ? (
                                  <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(date.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={setDate}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                        <ErrorMessage
                          name="pickdate"
                          component="p"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end w-full">
                    <Button
                      type="submit"
                      className="bg-blue-600 ml-2 text-white hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                    >
                      Apply
                    </Button>

                    {/* </Link> */}
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-1.5">
        <Card className="w-full h-100 border rounded p-2">
          <div className="flex flex-row space-x-80 justify-between pl-5 pr-5 pt-5 border-b border-gray-300 pb-5">
            <h5 className="text-sm font-bold">Results Summery</h5>
            <div className="flex flex-row  item-center  space-x-4">
              {/* <Link href="/stores/1/orders/create"> */}
              <Button
                className="bg-green-700  ml-2 text-white hover:bg-green-700 active:bg-green-700 focus:bg-grenn-7s00"
                onClick={handlenavigateToCreateOrderClick}
                disabled={loading}
              >
                {loading ? "Loading..." : "Create Order"}
              </Button>
              {/* </Link> */}
              <Button
                type="submit"
                className="bg-red-500 ml-2 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500"
                onClick={printDeliveryReport}
              >
                Print All Delivery Report
              </Button>

              <AlertDialog className="bg-white min-w-full max-w-3xl">
                <AlertDialogTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-red-500 text-white hover:bg-red-500 active:bg-red-500 focus:bg-red-500"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white min-w-min">
                  <AlertDialogHeader>
                    <AlertOctagon className="text-lg text-center block mx-auto text-orange-400 w-9 h-10" />

                    <AlertDialogTitle className="text-bold text-lg text-center">
                      Warning
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm font-normal text-center">
                      No orders are available to send an email
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="justify-items-center block mx-auto ">
                    <AlertDialogCancel className="bg-blue-500 ml-2 text-white hover:bg-blue-500 active:bg-blue-500 focus:bg-blue-500">
                      Ok
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <CardContent>
            <div className="w-full orders-table">
              <OrderListTable />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default OrderList;
