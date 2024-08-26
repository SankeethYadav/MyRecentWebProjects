"use client";

import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import Image from "next/image";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";

import * as z from "zod";
import * as Yup from "yup";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { useSearchParams, useRouter } from "next/navigation";
import { updateProduct } from "@/app/actions/products";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const validationSchema = Yup.object({
  altId: Yup.string().required("Product Number is required"),
  supplierId: Yup.string().required("Supplier is required"),
  shippingCost: Yup.string().required("Shipping cost is required"),
  name: Yup.string().required("Product name is required"),
  categoryName: Yup.string().required("Select category is required"),
  markup: Yup.string().required("Markup cost is required"),
  brand: Yup.string().required("Brand is required"),
  unitOfMeasure: Yup.string().required("Unit of Measure is required"),
  totalCost: Yup.string().required("Total Cost is required"),
  // visibleUntil: Yup.date().required("Ship Date is required"),
});

const EditIngredients = () => {
  const [supplier, setSupplier] = useState<any>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [ingredientId, setIngredientId] = useState(null);

  //checkbox
  const handleCheckboxChange = () => {
    console.log(65, showDatePicker)
    if (showDatePicker) {
      console.log("Setting visibleUntil to null");
      formik.setFieldValue('visibleUntil', null)
    }
    setShowDatePicker(!showDatePicker);
    

  };

  const [initialValues, setInitialValues] = useState({
    altId: String,
    supplierId: "",
    shippingCost: "",
    name: "",
    categoryName: "",
    markup: "",
    brand: "",
    unitOfMeasure: "",
    totalCost: "",
    visibleUntil: new Date(),
  });

  useEffect(() => {
    const ingredientId = searchParams.get("ingredientId");
    if (ingredientId) {
      console.log(ingredientId);
      setIngredientId(ingredientId);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log(ingredientId);
    async function fetchData() {
      try {
        if (!ingredientId) return; // Don't fetch if ingredientId is not set
        const productResponse = await fetch(
          `/api/stores/1/products/${ingredientId}`
        );
        if (!productResponse.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await productResponse.json();
        console.log("Product Data:", productData.product);
        // setProduct(productData.product)
        if(productData && productData.product && productData.product.visibleUntil){
            setShowDatePicker(true);
        }
        setInitialValues(productData.product);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    return () => {};
  }, [ingredientId]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch suppliers
        const supplierResponse = await fetch("/api/stores/1/suppliers");
        if (!supplierResponse.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const supplierData = await supplierResponse.json();
        setSupplier(supplierData.allSuppliers);
        console.log(22, supplierData.allSuppliers);

        // Fetch categories
        const categoryResponse = await fetch("/api/stores/1/category", {
          method: "GET",
        });
        if (!categoryResponse.ok) {
          throw new Error(categoryResponse.statusText);
        }
        const categoryData = await categoryResponse.json();
        console.log(97, categoryData);
        setCategories(categoryData.allCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const [unitOfMeasure, setuMeasure] = useState<any>([
    { id: "Pounds", name: "Pounds" },
    { id: "KG", name: "KG" },
    { id: "Gram", name: "Gram" },
  ]);

  const [selectWidth, setSelectWidth] = useState<any>([
    { id: "25", value: "25" },
    { id: "20", value: "20" },
    { id: "10", value: "10" },
    { id: "15", value: "15" },
  ]);
  const [selectLength, setSelectLength] = useState<any>([
    { id: "25", value: "25" },
    { id: "20", value: "20" },
    { id: "10", value: "10" },
    { id: "15", value: "15" },
  ]);
  const [selectHeight, setSelectHeight] = useState<any>([
    { id: "25", value: "25" },
    { id: "20", value: "20" },
    { id: "10", value: "10" },
    { id: "15", value: "15" },
  ]);
  const [selectWeight, setSelectWeight] = useState<any>([
    { id: "25", value: "25" },
    { id: "20", value: "20" },
    { id: "10", value: "10" },
    { id: "15", value: "15" },
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
    console.log(152, data);
    console.log("Selected Products to Send:");
  };

  const [date, setDate] = React.useState<Date>();

  const handleDateSelect = (selectedDate: any) => {
    console.log("Selected Date: ", selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    formik.setFieldValue("visibleUntil", formattedDate); // Update visibleUntil field in Formik
  };
  const handleSubmit =  async (values: any) => {
    if(!showDatePicker){
        values.visibleUntil = null
    }console.log("Edited values:", values); // Log edited values to console
    

    const data = await updateProduct(values, ingredientId);
   console.log(166, data);
    if (data) {
      router.push("/stores/1/products/catalog");
    }
  };

  return (
    <div>
      <div className="w-[1440px] h-20 px-8 pt-6 pb-8 bg-purple-200 justify-start items-start gap-[606px] inline-flex">
        <div className="h-8 justify-start items-center gap-3 flex">
          <div className="text-neutral-800 text-xl font-bold font-Manrope_regular leading-loose">
            Edit Ingredient
          </div>
        </div>
      </div>
      <Card className="border-none shadow-none">
        <div className="grid grid-cols-3 gap-3 pl-6 mt-5 mb-5">
          <div className="text-black text-2xl font-bold font-DMSans leading-9">
            Basic Details
          </div>
          <div className="text-black text-2xl font-bold font-['DM Sans'] leading-9">
            Additional Details
          </div>
          <div className="text-black text-2xl font-bold font-['DM Sans'] leading-9">
            Cost
          </div>
        </div>
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} key={initialValues ? initialValues : null}>
                <div className="grid grid-cols-3 gap-3">
                  <div className="mb-4">
                    <label
                      htmlFor="Product Number"
                      className="text-sm pc-label-main mb-2"
                    >
                      Product Number <span className="required-star">*</span>
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
                      id="altId"
                      name="altId"
                      className={`border p-2 w-full text-sm h-10 pc-input ${
                        formik.touched.altId && formik.errors.altId
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder="Enter Product Number"
                    />

                    <ErrorMessage
                      name="altId"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="form"
                      className="text-sm pc-label-main mb-2"
                    >
                      Select Supplier<span className="required-star">*</span>
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
                      id="supplier"
                      name="supplierId"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Select Supplier"
                      // value={selectedFacility}
                    >
                      {supplier.map((supplier: any) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="supplierId"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Shipping Cost"
                      className="text-sm pc-label-main mb-2"
                    >
                      Shipping Cost<span className="required-star">*</span>
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
                      id="shippingCost"
                      name="shippingCost"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Enter Shipping Cost"
                    />

                    <ErrorMessage
                      name="shippingCost"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Product Name"
                      className="text-sm pc-label-main mb-2"
                    >
                      Product Name<span className="required-star">*</span>
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
                      id="name"
                      name="name"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Enter Product Name"
                    />

                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Select Category"
                      className="text-sm pc-label-main mb-2"
                    >
                      Select Category<span className="required-star">*</span>
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
                      id="categoryName"
                      name="categoryName"
                      className="border p-2  w-full text-sm h-10 pc-input"
                    >
                      {categories.map((category, index) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="categoryName"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Markup Cost"
                      className="text-sm pc-label-main mb-2"
                    >
                      Markup Cost<span className="required-star">*</span>
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
                      id="markup"
                      name="markup"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Enter Markup Cost"
                    />
                    <ErrorMessage
                      name="markup"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Brand"
                      className="text-sm pc-label-main mb-2"
                    >
                      Brand<span className="required-star">*</span>
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
                      id="brand"
                      name="brand"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Enter Brand"
                    />

                    <ErrorMessage
                      name="brand"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Unit of Measure"
                      className="text-sm pc-label-main mb-2"
                    >
                      Unit of Measure<span className="required-star">*</span>
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
                      id="unitOfMeasure"
                      name="unitOfMeasure"
                      className="border p-2  w-full text-sm h-10 pc-input"
                    >
                      {unitOfMeasure.map((unitOfMeasure: any) => (
                        <option key={unitOfMeasure.id} value={unitOfMeasure.id}>
                          {unitOfMeasure.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="unitOfMeasure"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Total Cost"
                      className="text-sm pc-label-main mb-2"
                    >
                      Total Cost<span className="required-star">*</span>
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
                      id="totalCost"
                      name="totalCost"
                      className="border p-2  w-full text-sm h-10 pc-input"
                      placeholder="Enter Total Cost"
                    />

                    <ErrorMessage
                      name="totalCost"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <div className="items-top flex space-x-2 mt-5 items-center">
                    <input
                      type="checkbox"
                      checked={showDatePicker ? "checked" : ""}
                      id="terms1"
                      onChange={handleCheckboxChange}
                      className="checkbox-custom"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        LTO (Limited Time Item)
                      </label>
                    </div>
                  </div>
                  {showDatePicker && (
                    <div className="mb-4 w-96 mt-4 date-input">
                      <label
                        htmlFor="visibleUntil"
                        className="text-sm pc-label-main mb-2"
                      >
                        Expiry Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className={`w-full justify-start h-12 border-inherit text-sm rounded-none text-left font-normal border flex items-center ${
                              !formik.values.visibleUntil
                                ? "text-muted-foreground"
                                : ""
                            }`}
                          >
                            <CalendarIcon className="ml-2 mr-2 h-4 w-4" />
                            {formik.values.visibleUntil
                              ? format(formik.values.visibleUntil, "yyyy-MM-dd")
                              : "Expiry Date"}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            name="visibleUntil"
                            id="visibleUntil"
                            selected={formik.values.visibleUntil}
                            onSelect={(selectedDate: any) => {
                              console.log("Selected date:", selectedDate); // Add this line
                              formik.setFieldValue(
                                "visibleUntil",
                                selectedDate
                              );
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <div className="text-black text-2xl font-bold font-DM Sans leading-9">
                    Parameters
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="mb-4 pc-select-main">
                      <label
                        htmlFor="Product Number"
                        className="text-sm pc-label-main mb-2"
                      >
                        <span>Width</span>
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
                        id="width"
                        name="width"
                        className="border p-2  w-full text-sm h-10 pc-input"
                      >
                        {selectWidth.map((selectWidth: any) => (
                          <option key={selectWidth.id} value={selectWidth.id}>
                            {" "}
                            {selectWidth.value}
                          </option>
                        ))}
                      </Field>
                      <span className="pc-select-label">cm</span>
                    </div>
                    <div className="mb-4 pc-select-main">
                      <label
                        htmlFor="length"
                        className="text-sm pc-label-main mb-2"
                      >
                        Length{" "}
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
                        id="length"
                        name="length"
                        className="border p-2  w-full text-sm h-10 pc-input"
                      >
                        {selectLength.map((selectLength: any) => (
                          <option key={selectLength.id} value={selectLength.id}>
                            {" "}
                            {selectLength.value}
                          </option>
                        ))}
                      </Field>
                      <span className="pc-select-label">cm</span>
                    </div>
                    <div className="mb-4 pc-select-main">
                      <label
                        htmlFor="Height"
                        className="text-sm pc-label-main mb-2"
                      >
                        Height{" "}
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
                        id="height"
                        name="height"
                        className="border p-2  w-full text-sm h-10 pc-input"
                      >
                        {selectHeight.map((selectHeight: any) => (
                          <option key={selectHeight.id} value={selectHeight.id}>
                            {" "}
                            {selectHeight.value}
                          </option>
                        ))}
                      </Field>
                      <span className="pc-select-label">cm</span>
                    </div>
                    <div className="mb-4 pc-select-main">
                      <label
                        htmlFor="Weight"
                        className="text-sm pc-label-main mb-2"
                      >
                        Weight{" "}
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
                        id="weight"
                        name="weight"
                        className="border p-2  w-full text-sm h-10 pc-input"
                      >
                        {selectWeight.map((selectWeight: any) => (
                          <option key={selectWeight.id} value={selectWeight.id}>
                            {" "}
                            {selectWeight.value}
                          </option>
                        ))}
                      </Field>
                      <span className="pc-select-label">cm</span>
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
                            Update Ingredient
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
        <div></div>
      </Card>
    </div>
  );
};

export default EditIngredients;
