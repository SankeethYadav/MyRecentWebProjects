"use client";
import "../../../styles/sub-header.css";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import Image from "next/image";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Checkbox } from "@/components/ui/checkbox";

import CustomForm from "@/components/generic/form/CustomForm";
import DropDownFormField from "@/components/generic/form/DropDownFormField";
import { addNewMenuformFields } from "@/components/data/Product";
import { FormikConfigProps } from "@/components/types/Form";
import InputFormField from "@/components/generic/form/InputFormField";
import TextAreaFormField from "@/components/generic/form/TextAreaFormField";
const validationSchema = Yup.object({
  iname: Yup.string().required("Item Name is required"),
  supplier: Yup.string().required("Item price is required"),
  icost: Yup.string().required("Shipping cost is required"),
  rstoreprice: Yup.string().required("Recommended Store Price is required"),
  isizes: Yup.string().required("Select Item Sizes is required"),
  description: Yup.string().required("Description is required"),
  accomodation: Yup.string().required("Special Accomodation is required"),
  umeasure: Yup.string().required("Unit of Measure is required"),
  tcost: Yup.string().required("Total Cost is required"),
  pickdate: Yup.date().required("Ship Date is required"),
});

const initialValues = {
  iname: "",
  orderno: "",
  supplier: "",
  icost: "",
  rstoreprice: "",
  isizes: "",
  description: "",
  accomodation: "",
  umeasure: "",
  tcost: "",
  pickdate: null,
};

const AddMenuItems = ({ currentOrders }: { currentOrders: Orders[] }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Row[]>([]);
  const [currentOrderProducts, setCurrentOrderProducts] =
    useState<Orders[]>(currentOrders);
  const router = useRouter();
  //checkbox
  const handleCheckboxChange = () => {
    setShowDatePicker(!showDatePicker);
  };
  const [userType, setUserType] = useState<string>("");

  const [icategory, setIcategory] = useState<any>([
    { number: "name 1", name: "Tahoma" },
    { number: "name 2", name: "Tahoma" },
    { number: "name 3", name: "Tahoma" },
  ]);
  const [uMeasure, setuMeasure] = useState<any>([
    { id: "1", name: "Pounds" },
    { id: "2", name: "KG" },
    { id: "3", name: "Gram" },
  ]);
  const [selectItenSizes, setSelectItemSizes] = useState<any>([
    { id: "2", name: "Large" },
    { id: "1", name: "Medium" },
    { id: "3", name: "Small" },
  ]);
  const [selectIngredientName, setSelectIngredientName] = useState<any>([
    { id: "2", name: "Ingredient 1" },
    { id: "1", name: "Ingredient 2" },
  ]);
  const [selectSize, setSelectSize] = useState<any>([
    { id: "2", name: "1" },
    { id: "1", name: "2" },
    { id: "3", name: "3" },
    { id: "4", name: "4" },
  ]);
  const [selectQty, setSelectQty] = useState<any>([
    { id: "2", name: "25" },
    { id: "1", name: "20" },
    { id: "3", name: "10" },
    { id: "4", name: "15" },
  ]);
  const [selectWeight, setSelectWeight] = useState<any>([
    { id: "2", name: "25 kg" },
    { id: "1", name: "20 kg" },
    { id: "3", name: "10 kg" },
    { id: "4", name: "15 kg" },
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

  const submitFormData = (data: any) => {
    console.log(data);
    console.log("Selected Products to Send:", selectedProducts);
  };

  const handleFacilityChange = (e) => {
    const newSelectedFacility = e.target.value;
    setSelectedFacility(newSelectedFacility);

    // Set the new validation schema in Formik using the validationSchema prop
    formik.setFieldValue("fecility", newSelectedFacility);
    // formik.setValidationSchema(updatedValidationSchema);
  };

  const [date, setDate] = React.useState<Date>();

  const handleDateSelect = (selectedDate: any) => {
    console.log("Selected Date: ", selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    formik.setFieldValue("pickdate", formattedDate); // Update pickdate field in Formik
  };

  const handleSubmit = (values: any) => {
    console.log(257, values);
  };
  const formikConfig: FormikConfigProps = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    handleSubmit: handleSubmit,
  };

  return (
    <div className="">
      <div className="titleContainer pl-6 py-7">
        <div className="backButton">
          <svg
            className="arrowIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m7-7-7 7 7 7"
            />
          </svg>
        </div>
        <div className=" font-manrope-extrabold text-neutral-800 pl-2">
          Add New Menu-Item
        </div>
      </div>
      {/* <div className="grid grid-cols-2 gap-2 pl-6 mt-5 mb-5">
          <div className="text-black text-2xl font-bold font-DMSans leading-9">
            Product Details
          </div>
          <div className="text-black text-2xl font-bold font-['DM Sans'] leading-9">
            Price
          </div>
        </div> */}
      {/* <Formik
            // initialValues={{ pickdate: null }}
            // validationSchema={validationSchema}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            // onSubmit={(values) => {
            //   console.log("Form values:", values); // Log the form values to the console
            //   submitFormData(values); // Optionally, you can submit the data to an API
            // }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-5">
                  <div className="mb-4">
                    <label
                      htmlFor="Item Name"
                      className="text-sm pc-label-main mb-2"
                    >
                      Item Name <span className="required-star">*</span>{" "}
                      <span>
                        <Image
                          src="/img/info-one.svg"
                          alt="N"
                          width="20"
                          height="20"
                        />
                      </span>
                    </label>
                    <Field
                      type="text"
                      id="iname"
                      name="iname"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Enter Item Name"
                    />

                    <ErrorMessage
                      name="iname"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Shipping Cost"
                      className="text-sm pc-label-main mb-2"
                    >
                      Item Price<span className="required-star">*</span>{" "}
                      <span>
                        <Image
                          src="/img/info-one.svg"
                          alt="N"
                          width="20"
                          height="20"
                        />
                      </span>
                    </label>

                    <Field
                      type="number"
                      id="icost"
                      name="icost"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Enter Item price"
                    />

                    <ErrorMessage
                      name="icost"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Item Category"
                      className="text-sm pc-label-main mb-2"
                    >
                      Item Category<span className="required-star">*</span>{" "}
                      <span>
                        <Image
                          src="/img/info-one.svg"
                          alt="N"
                          width="20"
                          height="20"
                        />
                      </span>
                    </label>
                    <Field
                      as="select"
                      id="icategory"
                      name="icategory"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Item Category"
                    >
                      {icategory.map((icategory: any) => (
                        <option key={icategory.number} value={icategory.number}>
                          {icategory.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="icategory"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Recommended Store Price"
                      className="text-sm pc-label-main mb-2"
                    >
                      Recommended Store Price
                      <span className="required-star">*</span>{" "}
                      <span>
                        <Image
                          src="/img/info-one.svg"
                          alt="N"
                          width="20"
                          height="20"
                        />
                      </span>
                    </label>

                    <Field
                      type="number"
                      id="rstoreprice"
                      name="rstoreprice"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Enter Recommended Store Price"
                    />

                    <ErrorMessage
                      name="rstoreprice"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Item Sizes"
                      className="text-sm pc-label-main mb-2"
                    >
                      Item Sizes<span className="required-star">*</span>{" "}
                      <span>
                        <Image
                          src="/img/info-one.svg"
                          alt="N"
                          width="20"
                          height="20"
                        />
                      </span>
                    </label>

                    <Field
                      as="select"
                      id="isizes"
                      name="isizes"
                      className="border p-2  w-full text-sm h-10 pc-input"
                    >
                      {selectItenSizes.map((selectItenSizes: any) => (
                        <option
                          key={selectItenSizes.id}
                          value={selectItenSizes.id}
                        >
                          {" "}
                          {selectItenSizes.value}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="isizes"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Description"
                      className="text-sm pc-label-main mb-2"
                    >
                      Description<span className="required-star">*</span>{" "}
                      <span>
                        <Image
                          src="/img/info-one.svg"
                          alt="N"
                          width="20"
                          height="20"
                        />
                      </span>
                    </label>

                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      className="border p-2  w-full text-sm h-32 pc-input"
                      placeholder="Enter description"
                    />
                    <ErrorMessage
                      name="description"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4 align-input">
                    <label
                      htmlFor="Special Accomodation"
                      className="text-sm pc-label-main mb-2"
                    >
                      Special Accomodation
                      <span className="required-star">*</span>{" "}
                      <span>
                        <Image
                          src="/img/info-one.svg"
                          alt="N"
                          width="20"
                          height="20"
                        />
                      </span>
                    </label>

                    <Field
                      type="text"
                      id="accomodation"
                      name="accomodation"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Enter Special Accomodation"
                    />

                    <ErrorMessage
                      name="accomodation"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="mb-4 mt-2 pc-h3">Ingredients</h3>
                  <div className=" grid-cols-4 flex gap-4 justify-between">
                    <div className="flex items-center">
                      <div className="mb-4" style={{ width: "220px" }}>
                        <label
                          htmlFor="Ingredient Name"
                          className="text-sm pc-label-main mb-2"
                        >
                          <span>Ingredient Name</span>
                          <span className="ml-2">
                            <Image
                              src="/img/info-one.svg"
                              alt="N"
                              width="20"
                              height="20"
                            />
                          </span>
                        </label>

                        <Field
                          as="select"
                          id="ingredientname"
                          name="ingredientname"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectIngredientName.map(
                            (selectIngredientName: any) => (
                              <option
                                key={selectIngredientName.id}
                                value={selectIngredientName.id}
                              >
                                {" "}
                                {selectIngredientName.value}
                              </option>
                            )
                          )}
                        </Field>
                      </div>
                      <div className="mb-4 ml-2" style={{ width: "60px" }}>
                        <label
                          htmlFor="Size"
                          className="text-sm pc-label-main mb-2"
                        >
                          Size{" "}
                        </label>

                        <Field
                          as="select"
                          id="size"
                          name="length"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectSize.map((selectSize: any) => (
                            <option key={selectSize.id} value={selectSize.id}>
                              {" "}
                              {selectSize.value}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div
                        className="mb-4 ml-2 pc-select-main"
                        style={{ width: "120px" }}
                      >
                        <label
                          htmlFor="Qty"
                          className="text-sm pc-label-main mb-2"
                        >
                          Qty{" "}
                        </label>

                        <Field
                          as="select"
                          id="qty"
                          name="qty"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectQty.map((selectQty: any) => (
                            <option key={selectQty.id} value={selectQty.id}>
                              {" "}
                              {selectQty.value}
                            </option>
                          ))}
                        </Field>
                        <span className="pc-select-label">lb</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mb-4" style={{ width: "220px" }}>
                        <label
                          htmlFor="Ingredient Name"
                          className="text-sm pc-label-main mb-2"
                        >
                          <span>Ingredient Name</span>
                          <span className="ml-2">
                            <Image
                              src="/img/info-one.svg"
                              alt="N"
                              width="20"
                              height="20"
                            />
                          </span>
                        </label>

                        <Field
                          as="select"
                          id="ingredientname"
                          name="ingredientname"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectIngredientName.map(
                            (selectIngredientName: any) => (
                              <option
                                key={selectIngredientName.id}
                                value={selectIngredientName.id}
                              >
                                {" "}
                                {selectIngredientName.value}
                              </option>
                            )
                          )}
                        </Field>
                      </div>

                      
                      <div className="mb-4 ml-2" style={{ width: "60px" }}>
                        <label
                          htmlFor="Size"
                          className="text-sm pc-label-main mb-2"
                        >
                          Size{" "}
                        </label>

                        <Field
                          as="select"
                          id="size"
                          name="length"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectSize.map((selectSize: any) => (
                            <option key={selectSize.id} value={selectSize.id}>
                              {" "}
                              {selectSize.value}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div
                        className="mb-4 ml-2 pc-select-main"
                        style={{ width: "120px" }}
                      >
                        <label
                          htmlFor="Qty"
                          className="text-sm pc-label-main mb-2"
                        >
                          Qty{" "}
                        </label>

                        <Field
                          as="select"
                          id="qty"
                          name="qty"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectQty.map((selectQty: any) => (
                            <option key={selectQty.id} value={selectQty.id}>
                              {" "}
                              {selectQty.value}
                            </option>
                          ))}
                        </Field>
                        <span className="pc-select-label">lb</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mb-4" style={{ width: "220px" }}>
                        <label
                          htmlFor="Ingredient Name"
                          className="text-sm pc-label-main mb-2"
                        >
                          <span>Ingredient Name</span>
                          <span className="ml-2">
                            <Image
                              src="/img/info-one.svg"
                              alt="N"
                              width="20"
                              height="20"
                            />
                          </span>
                        </label>

                        <Field
                          as="select"
                          id="ingredientname"
                          name="ingredientname"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectIngredientName.map(
                            (selectIngredientName: any) => (
                              <option
                                key={selectIngredientName.id}
                                value={selectIngredientName.id}
                              >
                                {" "}
                                {selectIngredientName.value}
                              </option>
                            )
                          )}
                        </Field>
                      </div>
                      <div className="mb-4 ml-2" style={{ width: "60px" }}>
                        <label
                          htmlFor="Size"
                          className="text-sm pc-label-main mb-2"
                        >
                          Size{" "}
                        </label>

                        <Field
                          as="select"
                          id="size"
                          name="length"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectSize.map((selectSize: any) => (
                            <option key={selectSize.id} value={selectSize.id}>
                              {" "}
                              {selectSize.value}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div
                        className="mb-4 ml-2 pc-select-main"
                        style={{ width: "120px" }}
                      >
                        <label
                          htmlFor="Qty"
                          className="text-sm pc-label-main mb-2"
                        >
                          Qty{" "}
                        </label>

                        <Field
                          as="select"
                          id="qty"
                          name="qty"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectQty.map((selectQty: any) => (
                            <option key={selectQty.id} value={selectQty.id}>
                              {" "}
                              {selectQty.value}
                            </option>
                          ))}
                        </Field>
                        <span className="pc-select-label">lb</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mb-4" style={{ width: "220px" }}>
                        <label
                          htmlFor="Ingredient Name"
                          className="text-sm pc-label-main mb-2"
                        >
                          <span>Ingredient Name</span>
                          <span className="ml-2">
                            <Image
                              src="/img/info-one.svg"
                              alt="N"
                              width="20"
                              height="20"
                            />
                          </span>
                        </label>

                        <Field
                          as="select"
                          id="ingredientname"
                          name="ingredientname"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectIngredientName.map(
                            (selectIngredientName: any) => (
                              <option
                                key={selectIngredientName.id}
                                value={selectIngredientName.id}
                              >
                                {" "}
                                {selectIngredientName.value}
                              </option>
                            )
                          )}
                        </Field>
                      </div>
                      <div className="mb-4 ml-2" style={{ width: "60px" }}>
                        <label
                          htmlFor="Size"
                          className="text-sm pc-label-main mb-2"
                        >
                          Size{" "}
                        </label>

                        <Field
                          as="select"
                          id="size"
                          name="length"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectSize.map((selectSize: any) => (
                            <option key={selectSize.id} value={selectSize.id}>
                              {" "}
                              {selectSize.value}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div
                        className="mb-4 ml-2 pc-select-main"
                        style={{ width: "120px" }}
                      >
                        <label
                          htmlFor="Qty"
                          className="text-sm pc-label-main mb-2"
                        >
                          Qty{" "}
                        </label>

                        <Field
                          as="select"
                          id="qty"
                          name="qty"
                          className="border p-2  w-full text-sm h-10 pc-input"
                        >
                          {selectQty.map((selectQty: any) => (
                            <option key={selectQty.id} value={selectQty.id}>
                              {" "}
                              {selectQty.value}
                            </option>
                          ))}
                        </Field>
                        <span className="pc-select-label">lb</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center w-full mt-5">
                    <div className="w-[343px] h-10 justify-end items-center gap-4 inline-flex">
                      <Link href="/stores/1/products/catalog">
                        <div className="px-3 py-2 bg-white rounded-lg shadow border border-gray-200 justify-center items-center gap-1 flex">
                          <div className="px-1 justify-start items-start flex">
                            <div className="text-gray-400 text-sm font-medium font-Manrope_regular leading-normal">
                              Close
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="flex justify-start">
                        <div className="h-10 justify-end items-center gap-4 inline-flex">
                          <Button
                            type="submit"
                            className="px-3 py-2 bg-purple-900 hover:bg-purple-900 active:bg-purple-900 focus:bg-purple-900 rounded-lg justify-center items-center gap-1 flex text-white text-sm font-medium font-Manrope_regular leading-normal"
                          >
                            <div className="w-6 h-6 relative">
                              {" "}
                              <Image
                                src="/img/add-ingredient.png"
                                alt="N"
                                width="20"
                                height="20"
                              />
                            </div>
                            <div className="px-1 justify-start items-start flex">
                              Add Ingredient
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik> */}
      <div className="pt-1 pl-4 bg-primary-grey">
        <CustomForm
          formik={formik}
          formikConfig={formikConfig}
          formSectionProps={addNewMenuformFields}
        >
          <div className="mt-5">
            <div className="pl-2">
              <div className="text-black mb-4 mt-2 font-manrope-bold pc-h3">
                Ingredients
              </div>
              <div className=" grid-cols-4 items-center flex-row gap-4">
                <div className="flex flex-row gap-4">
                  <DropDownFormField
                    labelName="Ingredient Name"
                    id="ingredientName"
                    options={selectIngredientName}
                  ></DropDownFormField>
                  <DropDownFormField
                    labelName="Size"
                    id="size"
                    options={selectSize}
                  ></DropDownFormField>
                  <DropDownFormField
                    labelName="Quantity"
                    id="qty"
                    options={selectQty}
                  ></DropDownFormField>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full mt-10 pb-7 gap-4">
              <Link href="/stores/1/products/catalog">
                <div className="close-button">Close</div>
              </Link>
              <div className="h-10 inline-flex">
                <Button type="submit" className="add-product-button">
                  <div className="w-6 h-6 relative">
                    <Image
                      src="/img/add-ingredient.png"
                      alt="N"
                      width="20"
                      height="20"
                    />
                  </div>
                  <div className="pl-1  justify-start items-start flex">
                    Add Menu Item
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default AddMenuItems;
