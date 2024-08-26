"use client";
import { ScrollArea } from "@/components/ui/scroll-area";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect, use } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormDropDown } from "@/components/ui/form-dropdown";
import { FormTextField } from "@/components/ui/form-textfield";
import { NextPageContext } from "next";

ProductForm.getInitialProps = async (ctx: NextPageContext) => {
  console.log("in initial props!!!");
};

const profileFormSchema = z.object({
  suppliers: z.string(),
  category: z.string(),
  name: z.string(),
  altId: z.string(),
  // unitOfMeasure:z.string(),
  description: z.string(),
  brand: z.string(),
  cost: z.string(),
  shipping_cost: z.string(),
  markup: z.string(),
  sku: z.string(),
  alt_sku: z.string(),
  width: z.string(),
  length: z.string(),
  height: z.string(),
  weight: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProductForm() {
  const [supplierInitData, setSupplierInitData] = useState([]);
  const [categoryInitData, setCategoryInitData] = useState([]);

  useEffect(() => {
    console.log("useEffect()");
    getSupplierInitialData();
    getCategoryInitialData();
  }, []);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  const [formTextFieldProps, setFormTextFieldProps] = useState([
    {
      formLabel: "Product Name",
      placeHolder: "Enter a Product",
      id: "name",
    },
    {
      formLabel: "Product Number",
      placeHolder: "Enter a Product Number",
      id: "altId",
    },
    // {
    //   formLabel: "Unit of Measure",
    //   placeHolder: "Enter a Unit of Measure",
    //   id: "unitOfMeasure"

    // },
    {
      formLabel: "Description",
      placeHolder: "Enter a Description",
      id: "description",
    },
    {
      formLabel: "Brand",
      placeHolder: "Enter a Brand Name",
      id: "brand",
    },
    {
      formLabel: "Cost",
      placeHolder: "Enter Cost",
      id: "cost",
    },
    {
      formLabel: "Shipping Cost",
      placeHolder: "Enter Shipping Costs",
      id: "shippingCost",
    },
    {
      formLabel: "MarkUp",
      placeHolder: "Enter Markup",
      id: "markup",
    },
    {
      formLabel: "SKU",
      placeHolder: "Enter SKU",
      id: "sku",
    },
    {
      formLabel: "Alternate SKU",
      placeHolder: "Enter Alternate SKU",
      id: "altSku",
    },
    {
      formLabel: "Width",
      placeHolder: "Enter Width",
      id: "width",
    },
    {
      formLabel: "Length",
      placeHolder: "Enter Length",
      id: "length",
    },
    {
      formLabel: "Height",
      placeHolder: "Enter Height",
      id: "height",
    },
    {
      formLabel: "Weight",
      placeHolder: "Enter Weight",
      id: "weight",
    },
  ]);

  async function getCategoryInitialData() {
    try {
      const response = await fetch("/api/stores/1/category", {
        method: "GET",
      });

      if (!response.ok) {
        console.log("error in getCategoryInitialData");

        throw new Error(response.statusText);
      }
      //console.log("Response: ",await response.json())
      var data = await response.json();
      data = data.allCategories;
      console.log(data[0].id);
      setCategoryInitData(data);

      //console.log(data.allSuppliers[0])
    } catch (err) {
      console.log(err);
    }
  }

  const getSupplierInitialData = async () => {
    try {
      const response = await fetch("/api/stores/1/suppliers", {
        method: "GET",
      });

      if (!response.ok) {
        console.log("error in getInitialData");

        throw new Error(response.statusText);
      }
      //console.log("Response: ",await response.json())
      var data = await response.json();
      data = data.allSuppliers;
      console.log(data[0].id);

      setSupplierInitData(data);

      //console.log(data.allSuppliers[0])
    } catch (err) {
      console.log(err);
    }
  };
  let formDropDownProps1 = {
    formLabel: "Supplier",
    placeHolder: "Select a Supplier",
    id: "suppliers",
  };
  let formDropDownProps2 = {
    formLabel: "Category",
    placeHolder: "Select a Category",
    id: "category",
  };
  async function onSubmit(data: ProfileFormValues) {
    console.log("Hi data");
    console.log(data);
    try {
      await saveProduct(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function saveProduct(productData: ProfileFormValues) {
    console.log("product data:");
    //console.log(productData)
    console.log(JSON.stringify(productData));
    const response = await fetch("/api/stores/1/products", {
      method: "POST",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    });

    if (!response.ok) {
      console.log("error!!");

      throw new Error(response.statusText);
    }
  }

  //console.log("init data: ",initialData)
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-black ml-10 mt-10">
            Add New Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ScrollArea className="h-[500px] rounded-md border-white ">
            <DialogHeader>
              <DialogTitle>New Product</DialogTitle>
              <DialogDescription></DialogDescription>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" space-y-4 grid grid-cols-1 gap-4 px-8 m-9 text-black "
                >
                  <FormDropDown
                    formDD={formDropDownProps1}
                    initData={supplierInitData}
                    classname="pt-8"
                    form={form}
                  ></FormDropDown>
                  <FormDropDown
                    formDD={formDropDownProps2}
                    initData={categoryInitData}
                    form={form}
                  ></FormDropDown>
                  {formTextFieldProps.map((item) => (
                    <FormTextField props={item} form={form}></FormTextField>
                  ))}
                  <div>
                    <Button type="submit">Create Product</Button>
                  </div>
                </form>
              </Form>
            </DialogHeader>
          </ScrollArea>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
