"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";



import * as z from "zod";
import * as Yup from "yup";

import { format } from "date-fns";

import dynamic from "next/dynamic";
import { comparisionBarChartOptions } from "@/components/data/Charts";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
// const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });
const GroupedBarChart = dynamic(
  () => import("@/components/generic/GroupedBarChart"),
  {
    ssr: false,
  }
);


const validationSchema = Yup.object({
  customer: Yup.string()
    .min(2, "Customer Name must be at least 2 characters")
    .required("Customer Name is required"),
  fecility: Yup.string().required("Form is required"),
  memocode: Yup.string().required("Memo Code is required"),
  orderno: Yup.string().required("Purchase Order No is required"),
  ordertype: Yup.string().required("Order Type No is required"),
  salesforecast: Yup.string().required("Sales Forecast No is required"),
  budget: Yup.string().required("Purchase Budget is required"),
  //   pickdate: Yup.string().required("Ship Date is required"),
  pickdate: Yup.date().required("Ship Date is required"),
});

const initialValues = {
  customer: "",
  orderno: "",
  fecility: "",
  memocode: "",
  ordertype: "",
  salesforecast: "",
  budget: "",
  pickdate: null,
};

const DashboardMain = () => {
  const handleSubmit = (values: any) => {
    // Handle form submission here
    console.log(values);
  };

  const [userType, setUserType] = useState<string>("");
  const [stores, setStores] = useState<any>([
    { id: "1", name: "All" },
    { id: "2", name: "1748-Mapunapuna" },
    { id: "3", name: "1749-Pearl City" },
    { id: "4", name: "1751-Kapiolani" },
    { id: "5", name: "1752-Kapahulu" },
    { id: "6", name: "1754-Target Center" },
    { id: "7", name: "1756-Waipahu" },
    { id: "8", name: "1759-Nuuanu" },
    { id: "9", name: "1763-Mililani" },
    { id: "10", name: "3662-Winward Mall" },
    { id: "11", name: "4665-Hickam" },
    { id: "12", name: "4805-Ewa Beach" },
    { id: "13", name: "9722-MCBH" },
    { id: "14", name: "Blue River Mex Grill" },
    { id: "15", name: "5142-Kailua HI" },
    { id: "16", name: "5200-Waianae HI" },
    { id: "17", name: "5196-Kihe HI" },
    { id: "18", name: "5203-Lahaina HI" },
    { id: "19", name: "5212-Honolulu HI (Non Trad)" },
    { id: "20", name: "5213-Waianae HI (Non Trad)" },
    { id: "21", name: "5216-Ewa Beach HI" },
    { id: "22", name: "1111-UH" },
    { id: "23", name: "1112-Waikiki" },
    { id: "24", name: "1113-Temp Store" },
    { id: "25", name: "5279-Waikiki" },
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
  const submitFormData = (data: any) => {
    console.log(data);
  };

  const handleDateSelect = (selectedDate: any) => {
    console.log("Selected Date: ", selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    formik.setFieldValue("pickdate", formattedDate); // Update pickdate field in Formik
  };

  // const options = {
  //   //     series: [{
  //   //     name: 'PRODUCTS',
  //   //     data: [22224, 52335, 11141, 16227, 12662, 14443]
  //   //   }, {
  //   //     name: 'ADDITIONAL ITEMS',
  //   //     data: [12113, 13423, 22520, 11238, 13000, 27000]
  //   //   }, {
  //   //     name: 'DOUGH',
  //   //     data: [2221, 17000, 15000, 30115, 21000, 24000]
  //   //   }, {
  //   //     name: 'RESTAURANT SUPPLIES',
  //   //     data: [22241, 27000, 20052, 20003, 32200, 28000]
  //   //   },
  //   //   {
  //   //     name: 'BOXES',
  //   //     data: [40000, 12007, 12500, 11300, 12200, 21008]
  //   //   },
  //   //   {
  //   //     name: 'CHILSPACE',
  //   //     data: [21100, 11700, 21500, 13001, 22100, 18000]
  //   //   }
  //   // ],
  //   series: [
  //     {
  //       name: "Inflation",
  //       data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6],
  //     },
  //   ],
  //   //     series: [{
  //   //     name: 'PRODUCTS',
  //   //     data: [22224, 52335, 11141, 16227, 12662, 14443]
  //   //   }, {
  //   //     name: 'ADDITIONAL ITEMS',
  //   //     data: [12113, 13423, 22520, 11238, 13000, 27000]
  //   //   }, {
  //   //     name: 'DOUGH',
  //   //     data: [2221, 17000, 15000, 30115, 21000, 24000]
  //   //   }, {
  //   //     name: 'RESTAURANT SUPPLIES',
  //   //     data: [22241, 27000, 20052, 20003, 32200, 28000]
  //   //   },
  //   //   {
  //   //     name: 'BOXES',
  //   //     data: [40000, 12007, 12500, 11300, 12200, 21008]
  //   //   },
  //   //   {
  //   //     name: 'CHILSPACE',
  //   //     data: [21100, 11700, 21500, 13001, 22100, 18000]
  //   //   }
  //   // ],
  //   series: [
  //     {
  //       name: "Inflation",
  //       data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6],
  //     },
  //   ],
  //   chart: {
  //     type: "bar",
  //     height: 650,
  //     stacked: true,
  //     toolbar: {
  //       show: true,
  //     },
  //     zoom: {
  //       enabled: true,
  //     },
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         legend: {
  //           position: "bottom",
  //           offsetX: -10,
  //           offsetY: 0,
  //         },
  //       },
  //     },
  //   ],
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       borderRadius: 10,
  //       dataLabels: {
  //         total: {
  //           enabled: true,
  //           style: {
  //             fontSize: "13px",
  //             fontWeight: 900,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   xaxis: {
  //     // type: 'datetime',
  //     categories: [
  //       "Products",
  //       "Additional Items",
  //       "Dough",
  //       "Restaurant Supplies",
  //       "Boxes",
  //       "ChillSpace",
  //     ],
  //   },

  //   legend: {
  //     position: "right",
  //     offsetY: 10,
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  //     type: "bar",
  //     height: 650,
  //     stacked: true,
  //     toolbar: {
  //       show: true,
  //     },
  //     zoom: {
  //       enabled: true,
  //     },
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         legend: {
  //           position: "bottom",
  //           offsetX: -10,
  //           offsetY: 0,
  //         },
  //       },
  //     },
  //   ],
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       borderRadius: 10,
  //       dataLabels: {
  //         total: {
  //           enabled: true,
  //           style: {
  //             fontSize: "13px",
  //             fontWeight: 900,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   xaxis: {
  //     // type: 'datetime',
  //     categories: [
  //       "Products",
  //       "Additional Items",
  //       "Dough",
  //       "Restaurant Supplies",
  //       "Boxes",
  //       "ChillSpace",
  //     ],
  //   },

  //   legend: {
  //     position: "right",
  //     offsetY: 10,
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  // };
  // const handleBackButton = () => {
  //   //router.push('/previous-page');
  //   console.log("Back button clicked");
  // };
  // const firstButtonHandler = () => {
  //   console.log("First button clicked");
  // };


  return (
    <div>
     
      <div className=" w-[46.8%] h-[47.78%]">
        <GroupedBarChart
          chartOptions={comparisionBarChartOptions}
          selectorOptions={{
            header: "Select Date Range",
            options: ["Last 6 months", "Last 12 months", "2022-2023"],
          }}
          heading={"Orders Placed vs Orders Recieved"}
        ></GroupedBarChart>
      </div>
      {/* <h1 className="text-md font-bold text-black">Dashboard</h1>

      <div className="flex flex-row justify-between pt-2 pb-2 item-center">
       
        <div className="w-1/4 h-32 bg-cyan-300 mr-2 rounded">
          <p className="text-white text-sm text-left pt-6 pl-5 font-light">
            Total# of submitted orders
          </p>
          <h3 className="text-white text-sm font-bold text-center mt-6">37</h3>
        </div>
        <div className="w-1/4 h-32 bg-cyan-500 mr-2 rounded">
          <p className="text-white text-sm pt-6 pl-5 font-light">
            Total# of Stores
          </p>
          <h3 className="text-white text-sm font-bold text-center mt-6">17</h3>
        </div>
        <div className="w-1/4 h-32 bg-yellow-400 mr-2 rounded">
          <p className="text-white text-sm pt-6 pl-5 font-light">
            Total unit of products
          </p>
          <h3 className="text-white text-sm font-bold text-center mt-6">
            1293
          </h3>
        </div>
        <div className="w-1/4 h-32 bg-red-400 rounded">
          <p className="text-white text-sm pt-6 pl-5 font-light">
            Total Cost($)
          </p>
          <h3 className="text-white text-sm font-bold text-center mt-6">
            $40017.53
          </h3>
        </div>
      </div>
      <Link
        href="/stores/1/dashboard/reports"
        className="text-sm font-medium text-blue-300 decoration underline pt-10 pb-10"
      >
        Dough Prepare
      </Link>
      <Link
        href="/stores/1/dashboard/reports"
        className="text-sm font-medium text-blue-300 decoration underline pt-10 pb-10"
      >
        Dough Prepare
      </Link>

      <Card className="rounded-lg">
        <CardContent>
          <Formik
            // initialValues={{ pickdate: null }}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form values:", values); // Log the form values to the console
              submitFormData(values); // Optionally, you can submit the data to an API
            }}
          >
            {({ handleSubmit, values, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-3">
                <div className="mb-4">
                    <label htmlFor="status" className="text-xs text-black font-medium">
                      Status
                    </label>
                    <br />
                    <Field
                        as="select"
                        id="orderstatus"
                        name="orderstatus"
                        className="border p-2  w-full text-xs h-12 text-black font-medium"
                      >
                        {orderStatus.map((orderStatus: any) => (
                          <option key={orderStatus.id} value={orderStatus.id} className="text-xs text-black">
                            {" "}
                            {orderStatus.value}
                          </option>
                        ))}
                      </Field>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="stores" className="text-xs text-black font-medium">
                      Stores
                    </label>
                    <br />
                    <Field
                      as="select"
                      id="customer"
                      name="customer"
                      className="border p-2  w-full text-xs h-12 text-black font-medium"
                    >
                      {stores.map((store: any) => (
                        <option key={store.id} value={store.id}>
                          {" "}
                          {store.name}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div className="mb-4">
                      <label htmlFor="shipdate" className="text-xs text-black font-medium">
                        Choose Ship Date
                      </label>
                      <div className={cn("grid gap-2")}>
                        <Popover className="bg-white">
                          <PopoverTrigger asChild>
                            <Button
                              id="pickdate"
                              name="pickdate"
                              className={cn(
                                "justify-start text-left font-normal border text-xs text-black  h-12 rounded-none",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-black" />
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
                                <span className="text-black">Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 text-xs text-black " align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={setDate}
                              numberOfMonths={2}
                              className="text-xs text-black"
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
                    <label
                      htmlFor="shipdate"
                      className="text-xs text-black font-medium"
                    >
                      Choose Ship Date
                    </label>
                    <div className={cn("grid gap-2")}>
                      <Popover className="bg-white">
                        <PopoverTrigger asChild>
                          <Button
                            id="pickdate"
                            name="pickdate"
                            className={cn(
                              "justify-start text-left font-normal border text-xs text-black  h-12 rounded-none",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
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
                              <span className="text-black">Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 text-xs text-black "
                          align="start"
                        >
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                            className="text-xs text-black"
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
              </Form>
            )}
          </Formik>

         

        </CardContent>
      </Card> */}
    </div>
  );
};

export default DashboardMain;
