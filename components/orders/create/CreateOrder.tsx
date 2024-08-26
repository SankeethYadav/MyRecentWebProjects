// "use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormik,
  setFieldError,
} from "formik";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Mail, FileUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import { useRouter, useSearchParams } from "next/navigation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Orders } from "@/components/data/CurrentOrders";
import axios from "axios";
import ProductCatalog from "./ProductCatalog";
// import OrderList from '../create/OrderList';

//Review modal table row
const review = [
  {
    product: "Forks",
    unitMeasure: "1",
    category: "Additional Items",
    quantity: "1",
    cost: "$47.38",
    total: "$47.38",
  },
  
];

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

const CreateOrder = ({ currentOrders }: { currentOrders: Orders[] }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Row[]>([]);
  const [currentOrderProducts, setCurrentOrderProducts] =
    useState<Orders[]>(currentOrders);
  const router = useRouter();
  useEffect(() => {
    getOrders();
    getAllOrders();
  }, []);

  async function getOrders() {
    try {
      const response = await fetch("/api/stores/1/orders", {
        method: "GET",
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllOrders() {
    // fetch("/api/stores/1/orders/getProductList", {
    //   method: "GET",
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Response from getProductList:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

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
  const [facilities, setFacilities] = useState<any>([
    { number: "name 1", name: "Facilitie 1" },
    { number: "name 2", name: "Facilitie 2" },
    { number: "name 3", name: "Facilitie 3" },
  ]);
  const [ordersTypes, setOrdersTypes] = useState<any>([
    { id: "1", name: "1 Of 3 Orders" },
    { id: "2", name: "2 Of 3 Orders" },
    { id: "3", name: "3 Of 3 Orders" },
    { id: "4", name: "Immediate Order" },
    { id: "5", name: "Will Call Order" },
  ]);
  const [memoCodes, setMemoCodes] = useState<any>([
    { id: "2", value: "DVB" },
    { id: "1", value: "Chillspace" },
    { id: "3", value: "Restaturant Supply" },
    { id: "4", value: "Pickup" },
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
    console.log("Selected Products to Send:", selectedProducts);
    axios
      .post("/api/createOrder", data)
      .then((response: { data: any }) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleFacilityChange = (e) => {
    const newSelectedFacility = e.target.value;
    setSelectedFacility(newSelectedFacility);

    // Set the new validation schema in Formik using the validationSchema prop
    formik.setFieldValue("fecility", newSelectedFacility);
    // formik.setValidationSchema(updatedValidationSchema);
  };

  // Function to update selectedProducts state
  const handleSelectedProductsChange = (newSelectedProducts: Row[]) => {
    setSelectedProducts(newSelectedProducts);
    //  console.log("Selected Products to Send:", selectedProducts);
  };

  //Review modal total cost caliculation
  const calculateTotalCost = () => {
    const totalCost = review.reduce((total, item) => {
      const costValue = parseFloat(item.cost.replace(/[^0-9.]/g, ""));
      return total + costValue;
    }, 0);

    return totalCost.toFixed(2);
  };


  const handleOrderListlick = () => {
    setLoading(true);
  };

  useEffect(() => {
    const navigateToOrdersList = async () => {
      try {
        // Simulate an asynchronous operation (e.g., API call)
        // Replace this with your actual logic
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Navigate to the Add Inventory page
        window.location.href = '/stores/1/orders/list';
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      navigateToOrdersList();
    }
  }, [loading]);

  return (
    <div>
      <Card className="rounded-lg">
        <CardHeader className="">Create Order</CardHeader>
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
            {({ handleSubmit, values, setFieldValue, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-3">
                  <div className="mb-4">
                    <label htmlFor="customer" className="text-sm">
                      Customer
                    </label>
                    <br />
                    {userType !== "ADMIN" ? (
                      <Field
                        type="text"
                        id="customer"
                        name="customer"
                        className="border p-2  w-full text-sm h-12"
                        placeholder="Enter customer name"
                      />
                    ) : (
                      <Field
                        as="select"
                        id="customer"
                        name="customer"
                        className="border p-2  w-full"
                      >
                        {stores.map((store: any) => (
                          <option key={store.id} value={store.id}>
                            {" "}
                            {store.name}
                          </option>
                        ))}
                      </Field>
                    )}
                    <ErrorMessage
                      name="customer"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="form" className="text-sm">
                      From
                    </label>
                    <br />
                    <Field
                      as="select"
                      id="fecility"
                      name="fecility"
                      className="border p-2  w-full text-sm h-12"
                      placeholder="Select fecility"
                      // value={selectedFacility}
                      onChange={(e) => {
                        handleChange(e);
                        handleFacilityChange(e);
                      }}
                    >
                      {facilities.map((facility: any) => (
                        <option key={facility.number} value={facility.number}>
                          {facility.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="fecility"
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
                  <div className="mb-4">
                    <label htmlFor="memocode" className="text-sm">
                      Memo Code
                    </label>
                    <br />
                    <Field
                      as="select"
                      id="memocode"
                      name="memocode"
                      className="border p-2  w-full text-sm h-12"
                    >
                      {memoCodes.map((memoCode: any) => (
                        <option key={memoCode.id} value={memoCode.id}>
                          {" "}
                          {memoCode.value}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="memocode"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Purchase Order No" className="text-sm">
                      Purchase Order No
                    </label>
                    <br />
                    <Field
                      type="number"
                      id="orderno"
                      name="orderno"
                      className="border p-2  w-full text-sm h-12"
                      placeholder="Enter purchase order no"
                    />
                    <ErrorMessage
                      name="orderno"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ordertype" className="text-sm">
                      Order Type
                    </label>
                    <br />
                    <Field
                      as="select"
                      id="ordertype"
                      name="ordertype"
                      className="border p-2  w-full text-sm h-12"
                    >
                      {ordersTypes.map((orderType: any) => (
                        <option key={orderType.id} value={orderType.id}>
                          {orderType.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="ordertype"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="weekly sales forecast" className="text-sm">
                      Weekly sales forecast ($)
                    </label>
                    <br />
                    <Field
                      type="text"
                      id="salesforecast"
                      name="salesforecast"
                      className="border p-2  w-full text-sm h-12"
                      placeholder="Enter your weekly sales forecast ($)"
                    />
                    <ErrorMessage
                      name="salesforecast"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="budget" className="text-sm">
                      Weekly purchase budget($ @28)
                    </label>
                    <br />
                    <Field
                      type="text"
                      id="budget"
                      name="budget"
                      className="border p-2  w-full text-sm h-12"
                      placeholder="Enter your Weekly purchase budget($ @28)"
                    />
                    <ErrorMessage
                      name="budget"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end w-full">
                  {/* <Link href="/stores/1/orders/list"> */}
                    <Button
                      className="bg-orange-700  ml-2 text-white hover:bg-orange-700 active:bg-orabge-700 focus:bg-orange-7s00"
                      onClick={handleOrderListlick}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Cancel"}
                    </Button>
                  {/* </Link> */}
                  <Button
                    type="submit"
                    // onClick={sendSelectedProductsToBackend}
                    className="bg-green-500 ml-2 text-white hover:bg-green-500 active:bg-green-500 focus:bg-green-500"
                  >
                    Submit
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-cyan-500 ml-2 text-white hover:bg-cyan-500 active:bg-cyan-500 focus:bg-cyan-500">
                        Review Order
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[825px] bg-white p-0 m-0">
                      <DialogHeader className="text-white bg-slate-700 w-full p-3">
                        <DialogTitle className="font-normal">
                          Order Summery
                        </DialogTitle>
                      </DialogHeader>
                      <Card className="rounded-lg m-2">
                        <CardHeader className="text-sm font-bold border-b border-gray-300">
                          Purchase Order# : 20
                        </CardHeader>
                        <CardContent className="pt-5">
                          <div className="flex flex-row justify-between p-2 item-center">
                            <div className="w-60 flex flex-row justify-start">
                              <div className="font-light text-sm">
                                <span className="font-semibold">Placed on</span>
                                Nov 2, 2023
                              </div>
                            </div>
                            <div className="w-60 flex flex-row justify-start">
                              <div className="font-light text-sm">
                                <span className="font-semibold">
                                  Ship Date :
                                </span>
                                Nov 6, 2023
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between p-2 item-center">
                            <div className="w-60 flex flex-row justify-start">
                              <div className="font-light text-sm">
                                <span className="font-semibold">Po# : </span>
                                20
                              </div>
                            </div>
                            <div className="w-60 flex flex-row justify-start">
                              <div className="font-light text-sm">
                                <span className="font-semibold">
                                  Order Qty :
                                </span>
                                1
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between p-2 item-center">
                            <div className="w-60 flex flex-row justify-start">
                              <div className="font-light text-sm">
                                <span className="font-semibold">
                                  Order Type :
                                </span>
                                2 Of 3 Order
                              </div>
                            </div>
                            <div className="w-60 flex flex-row justify-start">
                              <div className="font-light text-sm">
                                <span className="font-semibold">
                                  Weekly sales forecast :
                                </span>
                                $20
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between p-2 item-center">
                            <div className="w-60 flex flex-row justify-start">
                              <div className="font-light text-sm">
                                <span className="font-semibold">
                                  Memo Code :
                                </span>
                                DVB
                              </div>
                            </div>
                            <div className="w-60 flex flex-row justify-start">
                              <div className="font-light text-sm">
                                <span className="font-semibold">
                                  Weekly Purchase Budget :{" "}
                                </span>
                                $5.6
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between p-2 item-center">
                            <div className="w-60 flex flex-row justify-start">
                              <div className="font-light text-sm">
                                <span className="font-semibold">Form : </span>
                                QCC Eat Local
                              </div>
                            </div>
                          </div>
                          <div>
                            <Table>
                              <TableHeader className="text-white bg-slate-700 w-full">
                                <TableRow>
                                  <TableHead className="font-medium">
                                    Product
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Unit of Measure
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Category
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Quantity
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Cost
                                  </TableHead>
                                  <TableHead className="font-medium">
                                    Total
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {review.map((review) => (
                                  <TableRow key={review.product}>
                                    <TableCell>{review.product}</TableCell>
                                    <TableCell>{review.unitMeasure}</TableCell>
                                    <TableCell>{review.category}</TableCell>
                                    <TableCell>{review.quantity}</TableCell>
                                    <TableCell>{review.cost}</TableCell>
                                    <TableCell>{review.total}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                              <TableFooter className="border-0">
                                <TableRow>
                                  <TableCell colSpan={5}>
                                    Total: {calculateTotalCost()}
                                  </TableCell>
                                  <TableCell>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-slate-300 mb-5 ml-2 text-white hover:bg-slate-300 active:bg-slate-300 focus:bg-slate-300"
                                      >
                                        Close
                                      </Button>
                                    </DialogTrigger>
                                  </TableCell>
                                </TableRow>
                              </TableFooter>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogContent>
                  </Dialog>

                  {/* </Link> */}
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      {selectedFacility && (
        <ProductCatalog
          facility={selectedFacility}
          onSelectedProductsChange={handleSelectedProductsChange}
        />
      )}
      {/* <OrderList /> */}
    </div>
  );
};

export default CreateOrder;
