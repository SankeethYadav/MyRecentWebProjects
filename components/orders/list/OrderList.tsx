"use client";
import { Orders, currentOrdersData } from "@/components/data/CurrentOrders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormik,
  setFieldError,
} from "formik";
import { Datatable, initTE } from "tw-elements";
import AlertNotification from "../create/AlertNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { Mail } from "lucide-react";
import OrderListTable from "./OrderListTable";

const validationSchema = Yup.object({
  store: Yup.string().required("Form is required"),
  orderstatus: Yup.string().required("Memo Code is required"),
  pickdate: Yup.date().required("Ship Date is required"),
});

const initialValues = {
  store: "",
  orderstatus: "",
  pickdate: null,
};

interface OrderList {
  id: string;
  store: string;
  purchaseDate: string;
  name: string;
  category: string;
  price: string;
  count: number;
  orderCost: string;
  shipDate: string;
}

let orderData: {
  columns: {
    label: string;
    field: string;
    sort: boolean;
    width: number;
  }[];
  rows: {
    id: string;
    store: string;
    purchaseDate: string;
    name: string;
    category: string;
    price: string;
    count: string;
    orderCost: string;
    shipDate: string;
  }[];
} = {
  columns: [
    { label: "Order#", field: "id", sort: true, width: 100 },
    { label: "Store", field: "store", sort: false, width: 100 },
    { label: "Order Date", field: "purchaseDate", sort: true, width: 100 },
    { label: "Product", field: "name", sort: false, width: 100 },
    { label: "Category", field: "category", sort: false, width: 100 },
    { label: "Price", field: "price", sort: true, width: 100 },
    { label: "Quantity", field: "count", sort: false, width: 100 },
    { label: "Order Cost", field: "orderCost", sort: false, width: 100 },
    { label: "Ship Date", field: "shipDate", sort: true, width: 100 },
  ],
  rows: [],
};
const OrderList = () => {
  const urlParams = useSearchParams();
  const success = urlParams.get("success");
  const tableRef = useRef<HTMLDivElement>(null);
  const dataTableRef = useRef("");
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(true);

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

    const Orders = {
      columns: orderData.columns,
      rows: orderedProducts,
    };

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

  const [date, setDate] = React.useState<Date>();
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
  return (
    <>
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
                            {" "}
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
                      <label htmlFor="pickdate" className="text-sm">
                        Choose a ship date
                      </label>
                      <br />
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className={`w-full justify-start h-12 border-inherit text-sm rounded-none text-left font-normal border flex items-center ${
                              !values.pickdate ? "text-muted-foreground" : ""
                            }`}
                          >
                            <CalendarIcon className="ml-2 mr-2 h-4 w-4" />
                            {values.pickdate
                              ? format(values.pickdate, "yyyy-MM-dd")
                              : "Pick a date"}
                          </button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            name="pickdate"
                            id="pickdate"
                            selected={values.pickdate}
                            onSelect={(selectedDate: any) => {
                              // Update the Formik field and validate it
                              setFieldValue("pickdate", selectedDate);
                            }}
                            initialFocus
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
      <div>
        {success === "1" && show ? (
          <AlertNotification
            type={"success"}
            messages={[
              "<strong className='mr-1'>Grate!</strong> Your order has been placed successfully.",
            ]}
            show={setShow}
          />
        ) : null}
        <Card>
          <CardHeader className="underline underline-offset-8 mb-6">
            <span className="flex justify-between flex-col sm:flex-row gap-6 sm:gap-0">
              Order Summary
              <Link href="create">
                <Button className="bg-slate-900 text-white hover:bg-slate-900 active:bg-slate-900 focus:bg-slate-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shopping-cart me-2"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Create Order
                </Button>
              </Link>
            </span>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-6">
              <div className="flex justify-between border w-96 px-3 py-2 rounded-lg">
                <span className="text-lg">Grand Total: </span>
                <span className="text-lg">{`$${total}`}</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                  id="datatable-search-input"
                  type="search"
                  onInput={(e) =>
                    dataTableRef.current.search(
                      (e.target as HTMLInputElement).value
                    )
                  }
                  className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon1"
                />
              </div>
            </div>
            <div className="w-full">
              <OrderListTable />
            </div>
          </CardContent>
          <div
            className="orders-table"
            ref={tableRef}
            data-te-fixed-header="true"
          ></div>
        </Card>
      </div>
    </>
  );
};

export default OrderList;
