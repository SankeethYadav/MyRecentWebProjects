"use client";
import { FrequentlyOrderedpage } from "./FrequentlyOrdered";
import { DraftOrders } from "./DraftOrders";
import AllProductsByCategory from "./AllProductsByCategory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Edit, Sun, Wallet } from "lucide-react";
import SubHeader from "@/components/generic/SubHeader";
import CustomButton from "@/components/generic/CustomButton";
import "/Users/sankeethyadav/Downloads/Trips_USA/foodSupplyAi/FoodSupplyAI/foodsupply-app/styles/create-orders.css";

interface OrdersProps {
  storeId: string;
}

export function Orders({ storeId }: OrdersProps) {
  return (
    <div className="bg-[#F7F7F8]">
      <Tabs defaultValue="FrequentlyOrdered">
        <div className="tab-switcher-header">
          <div className="tab-switcher">
            <TabsList>
              <TabsTrigger className="tab-trigger" value="FrequentlyOrdered">
                Frequently Ordered
              </TabsTrigger>
              <TabsTrigger className="tab-trigger" value="AllProducts">
                All Products
              </TabsTrigger>
              <TabsTrigger className="tab-trigger-noborder" value="OrderDraft">
                Order Draft
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex space-x-2">
            <div className="budget-container budget-button text-sm">
              <CustomButton
                text={"Budget : $1200"}
                icon={<Wallet className="budget-icon" color="#205BFB" />}
                icon1={<Edit className="budget-icon" color="#205BFB" />}
              />
            </div>
            <div className="budget-container budget-button text-sm">
              <CustomButton
                text={"Total Cost : $1000"}
                icon={<DollarSign className="budget-icon" color="#205BFB" />}
              />
            </div>

            <div className="budget-container budget-button text-sm">
              <CustomButton
                text={"Expected Shipping Date"}
                icon={<Sun className="budget-icon" color="#205BFB" />}
                icon1={<Edit className="budget-icon" color="#205BFB" />}
              />
            </div>
          </div>
        </div>

        <TabsContent value="FrequentlyOrdered" className="p-4">
          <div>
            <FrequentlyOrderedpage />
          </div>
        </TabsContent>
        <TabsContent value="AllProducts" className="p-4">
          <div>
            <AllProductsByCategory storeId={storeId} />
          </div>
        </TabsContent>
        <TabsContent value="OrderDraft" className="p-4">
          <div>
            <DraftOrders />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
