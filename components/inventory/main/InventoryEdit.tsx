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

import { any } from "zod";
import { FileUp } from "lucide-react";

import InventoryEditCatalog from './InventoryEditCatalog';

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

const initialValues = {
  pickdate: null,
};

// const data=filedata;
function InventoryEdit() {

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
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const submitFormData = (data: any) => {
    console.log(data);
    // axios
    //   .post("/api/createOrder", data)
    //   .then((response: { data: any }) => {
    //     console.log(response.data);
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //   });
  };
  return (
    <div className="w-full">
      <div className="flex justify-center mt-1.5">
        <Card className="rounded-lg w-full">
          <CardHeader className="text-sm font-bold border-b border-gray-300">
          Update Inventory
          </CardHeader>
          <CardContent>
            <Formik
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
                    <label htmlFor="remarks" className="text-sm">
                     Remarks
                    </label>
                    <br />
                    <Field
                      type="text"
                      id="remarks"
                      name="remarks"
                      className="border p-2  w-full text-sm h-12"
                      placeholder="Enter remarks (Optional)"
                    />
                  </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-end w-full">
                    {/* <Link href="/stores/1/inventory/main"> */}
                      <Button
                        type="submit"
                        className="bg-red-600 ml-2 text-white hover:bg-red-600 active:bg-red-600 focus:bg-red-600" onClick={handleMainInventoryClick}
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Cancel'}
                      </Button>
                      {/* </Link> */}
                      <Button
                        type="submit"
                        className="bg-green-600 ml-2 text-white hover:bg-green-600 active:bg-green-600 focus:bg-green-600"
                      >
                        Submit
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

      
       <InventoryEditCatalog onSelectedProductsChange={function (selectedProducts: Row[]): void {
                  throw new Error("Function not implemented.");
              } }  />
      
    </div>
  );
}
export default InventoryEdit;
