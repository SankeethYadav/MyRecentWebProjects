"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import AllIngredientsTable from "./AllIngredientsTable";
import MenuTable from "./MenuTable";
import ProductCatlaog from "@/components/orders/create/ProductCatalog";
import MenuItem from "@/components/generic/MenuItem";

import { AllIngredients } from "./AllIngredients";
import { FrequentlyOrderedpage } from "@/components/orders/new-orders/FrequentlyOrdered";
import { MenuItems } from "./MenuItems";
import SubHeader from "@/components/generic/SubHeader";

const subHeaderButtonPropsData: ButtonProps[] = [
  {
    label: "Order History",
    handler: () => {},
  },
  {
    label: "New Order",
    handler: () => {},
  },
];

 
function ProductCatalog() {
  return (
    <div className="food-supply-container">
      <div className="catalog-main">
        {/* <div className="sub-header">
          <h4>Product Catalog</h4>
        </div> */}
 <SubHeader
    title={"New Order"}
    backButtonHandler={function (): void {
      throw new Error("Function not implemented.");
    }}
    buttons={subHeaderButtonPropsData}
  ></SubHeader>
        {/* <div className="w-[1440px] h-20 px-8 pt-4 pb-8 bg-[white] justify-start items-start gap-[606px] inline-flex">
          <div className="h-8 justify-start items-center gap-3 flex">
            <div className="text-neutral-800 text-xl font-bold font-Manrope_regular leading-loose">
              Product Catalog
            </div>
          </div>
        </div> */}

        <div className="bg-[#F3F5F8]">
          <Tabs defaultValue="ingredients">
            <TabsList className="pc-tabs ">
              <TabsTrigger value="ingredients">All Ingredients</TabsTrigger>
              <TabsTrigger value="menuitem">Menu Items</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients">
              <div>
                <AllIngredients />
              </div>
            </TabsContent>
            <TabsContent value="menuitem">
              <div>
                {/* <MenuTable /> */}
                <MenuItems />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
export default ProductCatalog;
