"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
// import filedata from "../../../store.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

import InventoryMainTable from "./InventoryMainTable";

import { any } from "zod";
import { FileUp } from "lucide-react";

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
  store: Yup.string().required("Form is required"),
  orderstatus: Yup.string().required("Memo Code is required"),
  pickdate: Yup.date().required("Ship Date is required"),
});

const initialValues = {
  pickdate: null,
};

// const data=filedata;
function InventoryMain() {
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingModify, setLoadingModify] = useState(false);
  const [loadingAvailable, setLoadingAvailable] = useState(false);

  const handleAddInventoryClick = () => {
    setLoadingAdd(true);
  };

  const handleModifyInventoryClick = () => {
    setLoadingModify(true);
  };

  const handleAvailableInventoryClick = () => {
    setLoadingAvailable(true);
  };

  useEffect(() => {
    const navigate = async (
      action: string,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Navigate based on the selected action
        switch (action) {
          case "add":
            window.location.href = "/stores/1/inventory/add";
            break;
          case "modify":
            window.location.href = "/stores/1/inventory/edit";
            break;
          case "available":
            window.location.href = "/stores/1/inventory/available";
            break;
          default:
            console.error("Invalid action");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (loadingAdd) {
      navigate("add", setLoadingAdd);
    } else if (loadingModify) {
      navigate("modify", setLoadingModify);
    } else if (loadingAvailable) {
      navigate("available", setLoadingAvailable);
    }
  }, [loadingAdd, loadingModify, loadingAvailable]);

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
    <div>
      <div className="flex justify-center mt-1.5">
        <Card className="rounded-lg w-full">
          <CardHeader className="text-sm font-bold border-b border-gray-300">
            Filter By
          </CardHeader>
          <CardContent>
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
                  <div className="grid grid-cols-3 gap-3 pt-10">
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
                  <div className="mb-4">
                    <div className="flex justify-end w-full">
                      <Button
                        type="submit"
                        className="bg-blue-600 ml-2 text-white hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                      >
                        Apply
                      </Button>
                      {/* <Link href="/stores/1/inventory/add">
                    <Button
                      className="bg-blue-600 ml-2 text-white hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                    >
                      Add Inventory
                    </Button>
                    </Link> */}
                      <Button
                        type="button"
                        className="bg-blue-600 ml-2 text-white hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                        onClick={handleAddInventoryClick}
                        disabled={loadingAdd}
                      >
                        {loadingAdd ? "Loading..." : "Add Inventory"}
                      </Button>
                      {/* <Link href="/stores/1/inventory/edit">
                        <Button
                          className="bg-blue-600 ml-2 text-white hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                        >
                          Modify Inventory
                        </Button>
                      </Link> */}
                      <Button
                        type="button"
                        className="bg-blue-600 ml-2 text-white hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                        onClick={handleModifyInventoryClick}
                        disabled={loadingModify}
                      >
                        {loadingModify ? "Loading..." : "Modify Inventory"}
                      </Button>
                      {/* <Link href="/stores/1/inventory/available">
                        <Button
                          type="submit"
                          className="bg-blue-600 ml-2 text-white hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                        >
                          Available Inventory
                        </Button>
                      </Link> */}
                      <Button
                        type="button"
                        className="bg-blue-600 ml-2 text-white hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-600"
                        onClick={handleAvailableInventoryClick}
                        disabled={loadingAvailable}
                      >
                        {loadingAvailable
                          ? "Loading..."
                          : "Available Inventory"}
                      </Button>
                    </div>
                    {/* </Link> */}
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-1.5">
        <Card className="w-full h-100 border rounded-lg p-2">
          <CardContent>
            <div className="w-full">
              <InventoryMainTable />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default InventoryMain;
