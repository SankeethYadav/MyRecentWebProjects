/* eslint-disable react/jsx-key */
"use client";
import "../../../styles/sub-header.css";

import React, { useState, useEffect } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormik,
  FormikProps,
} from "formik";
import Image from "next/image";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

import * as z from "zod";
import * as Yup from "yup";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { useRouter } from "next/navigation";
import { createProduct } from "@/app/actions/products";

import DatePickerPopUp from "@/components/generic/form/DatePickerPopUp";
import { productDimsFields, unitsOfCost } from "@/components/data/Product";
import { AddIngredientsFormValues } from "@/components/types/Product";
import {
  CheckBoxField,
  FormikConfigProps,
  FormSectionProps,
  optionType,
} from "@/components/types/Form";
import CustomForm from "@/components/generic/form/CustomForm";

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

const initialValues: AddIngredientsFormValues = {
  productNumber: "",
  supplier: "",
  shippingCost: "",
  productName: "",
  category: "",
  markUpCost: "",
  brand: "",
  unitOfMeasure: "",
  totalCost: "",
  addIngredientCheckbox: new Date(),
};

const AddNewProducts = () => {
  const [supplier, setSupplier] = useState<any>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const ingredientId = router.query?.ingredientId;
  const data = router.query?.data;

  //checkbox
  const handleCheckboxChange = () => {
    setShowDatePicker(!showDatePicker);
    console.log(65, showDatePicker);
    if (!showDatePicker) {
      console.log("Setting visibleUntil to null");
      formik.handleChange({
        target: {
          id: "visibleUntil",
          value: null,
        },
      });
    }
  };

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

  useEffect(() => {
    // Check if ingredientId and data are defined
    if (ingredientId && data) {
      const parsedData = JSON.parse(decodeURIComponent(data));
      // Populate form fields with the data retrieved from query parameters
      // Set form values using parsedData
    }
  }, [ingredientId, data]);

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

  const formik: FormikProps<AddIngredientsFormValues> = useFormik({
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
  const handleSubmit = async (values: any) => {
    console.log(157, values);
    if (!showDatePicker) {
      values.visibleUntil = null;
    }
    console.log("values:", values); // Log edited values to console

    const data = await createProduct(values);
    console.log(166, data);
    if (data) {
      router.push("/stores/1/products/catalog");
    }
  };
  const datePicker = (
    <div className="flex row gap-4">
      <DatePickerPopUp formik={formik} id="startDate" labelName="Start Date" />
      <DatePickerPopUp formik={formik} id="endDate" labelName="End Date" />
    </div>
  );

  // const formFields: FormSectionProps[] = [
  //   {
  //     heading: ["Basic Details"],
  //     fields: [

  //       {
  //         type: "dropdown",
  //         labelName: "Supplier",
  //         id: "supplier",
  //         options: supplier,
  //       },
  //       {
  //         type: "input",
  //         labelName: "Shipping Cost",
  //         id: "shippingCost",
  //         inputType: "number",
  //       },
  //       {
  //         type: "input",
  //         labelName: "Product Name",
  //         id: "productName",
  //         inputType: "text",
  //       },
  //       {
  //         type: "dropdown",
  //         labelName: "Category",
  //         id: "category",
  //         options: categories,
  //       },
  //       {
  //         type: "input",
  //         labelName: "Markup Cost",
  //         id: "markUpCost",
  //         inputType: "number",
  //       },
  //       {
  //         type: "input",
  //         labelName: "Brand",
  //         id: "brand",
  //         inputType: "text",
  //       },
  //       {
  //         type: "dropdown",
  //         labelName: "Unit of Measure",
  //         id: "unitOfMeasure",
  //         options: unitOfMeasure,
  //       },
  //       {
  //         type: "input",
  //         labelName: "Total Cost",
  //         id: "totalCost",
  //         inputType: "number",
  //       },
  //       {
  //         type: "checkbox",
  //         labelName: "LTO (Limited Time Offering)",
  //         id: "addIngredientCheckbox",
  //         showChildren: showDatePicker,
  //         children: datePicker,
  //         handleCheckboxClick: handleCheckboxChange,
  //       },
  //     ],
  //   },
  //   {
  //     heading: ["Parameters"],
  //     fields: productDimsFields,
  //   },
  // ];

  const formFields: FormSectionProps[] = [
    {
      heading: "Basic Details",
      fields: [
        {
          type: "input",
          labelName: "Product Name",
          id: "productName",
          inputType: "text",
        },

        {
          type: "input",
          labelName: "Brand",
          id: "brand",
          inputType: "text",
        },
      ],
    },
    {
      heading: "Cost Details",
      fields: [
        {
          type: "dropdown",
          labelName: "Unit",
          id: "unitOfCost",
          options: unitsOfCost,
        },
        {
          type: "input",
          labelName: "Shipping Cost",
          id: "shippingCost",
          inputType: "number",
        },
        {
          type: "input",
          labelName: "Markup Cost",
          id: "markUpCost",
          inputType: "number",
        },
        {
          type: "input",
          labelName: "Total Cost",
          id: "totalCost",
          inputType: "number",
        },
      ],
    },
    {
      heading: "Additional Details",
      fields: [
        {
          type: "dropdown",
          labelName: "Supplier",
          id: "supplier",
          options: supplier,
        },

        {
          type: "dropdown",
          labelName: "Category",
          id: "category",
          options: categories,
        },
        {
          type: "dropdown",
          labelName: "Unit of Measure",
          id: "unitOfMeasure",
          options: unitOfMeasure,
        },
      ],
    },
    {
      heading: "",
      fields: [
        {
          type: "checkbox",
          labelName: "LTO (Limited Time Offering)",
          id: "addIngredientCheckbox",
          showChildren: showDatePicker,
          children: datePicker,
          handleCheckboxClick: handleCheckboxChange,
        },
      ],
    },

    {
      heading: "Parameters",
      fields: productDimsFields,
    },
  ];

  const formikConfig: FormikConfigProps = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    handleSubmit: handleSubmit,
  };
  return (
    <div>
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
        <div className="text-neutral-800 font-manrope-extrabold pl-2">
          Add New Product
        </div>
      </div>
      <div className="pt-1 pl-4 bg-primary-grey">
        {/* <div className="grid grid-cols-3 gap-3 pl-6 mt-5 mb-5">
          <div className="text-black text-2xl font-bold font-DMSans leading-9">
            Basic Details
          </div>
          <div className="text-black text-2xl font-bold font-['DM Sans'] leading-9">
            Additional Details
          </div>
          <div className="text-black text-2xl font-bold font-['DM Sans'] leading-9">
            Cost
          </div>
        </div> */}
        {/* <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-3 gap-3">
                {formFields.map((field) => {
                  if (field.type === "input") {
                    return (
                      <LabeledInput
                        id={field.id}
                        labelName={field.labelName}
                        formik={formik}
                        inputType={field.inputType}
                      />
                    );
                  } else if (field.type === "dropdown") {
                    return (
                      <LabeledDropDown
                        key={field.fieldName}
                        labelName={field.labelName}
                        id={field.id}
                        options={field.options}
                      />
                    );
                  }
                  return null;
                })}
              </div>
              <div>
                <ToggledCheckBox
                  formik={formik}
                  id="checkbox1"
                  handleCheckboxChange={handleCheckboxChange}
                  isChecked={showDatePicker}
                  labelName="LTO (Limited Time Offering)"
                >
                  <DatePickerPopUp
                    formik={formik}
                    id="visibleUntil"
                    labelName="Expiry Date"
                  />
                  
                </ToggledCheckBox>
              </div>
              <div className="mt-5">
                <div className="text-black text-2xl font-bold font-DM Sans leading-9">
                  Parameters
                </div>
                {productDimsFields.map((field) => {
                  if (field.type === "input") {
                    return (
                      <LabeledInput
                        id={field.id}
                        labelName={field.labelName}
                        formik={formik}
                        inputType={field.inputType}
                      />
                    );
                  }
                  return null;
                })}

                
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
            </Form>
          </Formik> */}

        <CustomForm
          formik={formik}
          formikConfig={formikConfig}
          formSectionProps={formFields}
        >
          <div className="flex justify-center items-center w-full mt-10 pb-7 gap-4">
            <Link href="/stores/1/products/catalog">
              <div className="close-button ">Close</div>
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
                <div className="pl-1 justify-start items-start flex">
                  Add Product
                </div>
              </Button>
            </div>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default AddNewProducts;

/* <div className="mb-4 w-96 mt-4 date-input">
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
                            
                          />
                        </PopoverContent>
                      </Popover>
                    </div> */

/* <div className="text-black text-2xl font-bold font-DM Sans leading-9">
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
                  </div> */
