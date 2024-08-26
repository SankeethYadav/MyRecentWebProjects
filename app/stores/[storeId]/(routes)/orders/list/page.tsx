"use client";

// const OrderList = dynamic(() => import("@/components/orders/list/OrderList"), { ssr: false });
import CustomButton from "@/components/generic/CustomButton";
import CustomCard from "@/components/generic/CustomCard";
import TextBox from "@/components/generic/TextBox";
import { BarChart, Sparkle, Trash2, Truck } from "lucide-react";
// import "/Users/ankit/FoodSupplyAI/foodsupply-app/app/order-dashboard.css";
import "../../../../../../styles/order-dashboard.css"
const customButtonData = {
  name: "Ask Ai",
  icon: <Sparkle />,
  textColor: "#fff",
  iconColor: "#fff",
};

const newOrderButtonData = {
  name: "New Order",
};

const orderHistoryButtonData = {
  name: "Order History",
};

const customcardData = {
  name: "Order Summary",
  subtitle: "Showing all updates: 24",
  width: "100%",
  height: "auto",
};

const customgraphcardData = {
  name: "Order Summary",
  subtitle: "Showing all updates: 24",
  width: "100%",
  height: "420px",
};

const customwidget1Data = {
  name: "widget-1",
  subtitle: "Showing all updates: 24",
  width: "100%",
  height: "244px",
};
const customwidget2dData = {
  name: "widget-2",
  subtitle: "Showing all updates: 24",
  width: "100%",
  height: "244px",
};
const textboxData = [
  {
    name: "28th Jan 2024 : Inventory Update",
    subtitle:
      "Total no of items increased by 10% and Total Inventory up by 5%.",
    icon: <Truck />,
    backgroundColor: "#FFF",
    textColor: "#17663A",
  },
  {
    name: "5 Items price surged in last cycle.",
    subtitle: "Mozarella Chesse, Cann Tomatoes, Pizza Base price has surged.",
    icon: <BarChart />,
    backgroundColor: "#FEF0F4",
    textColor: "#D50B3E",
  },
  {
    name: "18th Jan 2024 : Inventory Update",
    subtitle:
      "Total no of items increased by 10% and Total Inventory up by 5%.",
    icon: <Truck />,
    backgroundColor: "#EEFBF4",
    textColor: "#17663A",
  },
  {
    name: "5 Items price surged in last cycle.",
    subtitle: "Mozarella Chesse, Cann Tomatoes, Pizza Base price has surged.",
    icon: <BarChart />,
    backgroundColor: "#FEF0F4",
    textColor: "#D50B3E",
  },
  {
    name: "20 Items expired.",
    subtitle: "Mozarella Chesse, Cann Tomatoes, Pizza Base price has surged.",
    icon: <Trash2 />,
    backgroundColor: "#FEF0F4",
    textColor: "#D50B3E",
  },
];

export default function ListOrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div>
      <div className="order-container bg-gray-100 w-full title subtitle">
        <div className="menuItem">
          <div className="title">Order Dashboard</div>
        </div>
        <div className="menuItem">
          <button className="menuItem">
            <div className="menuItemText">
              <CustomButton text={orderHistoryButtonData.name} />
            </div>
          </button>
          <button className="menuItem">
            <div className="menuItemText">
              <CustomButton text={newOrderButtonData.name} />
            </div>
          </button>
        </div>
      </div>
      <div className="grid-layout bg-gray-100 h-full subtitle">
        <div>
          <CustomCard
            text={customwidget1Data.name}
            subtitle={customwidget1Data.subtitle}
            width={customwidget1Data.width}
            height={customwidget1Data.height}
          />
        </div>
        <div>
          <CustomCard
            text={customwidget2dData.name}
            subtitle={customwidget2dData.subtitle}
            width={customwidget2dData.width}
            height={customwidget2dData.height}
          />
        </div>
        <div className="grid-row-span-2 subtitle">
          <CustomCard
            text={customcardData.name}
            subtitle={customcardData.subtitle}
            width={customcardData.width}
            height={customcardData.height}
          >
            <div className="space-y-4">
              {textboxData.map((alert, index) => (
                <TextBox
                  key={index}
                  text={alert.name}
                  subtitle={alert.subtitle}
                  icon={alert.icon}
                  backgroundColor={alert.backgroundColor}
                  textColor={alert.textColor}
                />
              ))}
            </div>
          </CustomCard>
        </div>
        <div className="grid-col-span-2 subtitle">
          <CustomCard
            text={customgraphcardData.name}
            subtitle={customgraphcardData.subtitle}
            width={customgraphcardData.width}
            height={customgraphcardData.height}
          />
        </div>
      <div className="custom-button absolute bottom-0 right-0">
        <CustomButton
          text={customButtonData.name}
          icon={customButtonData.icon}
          textColor={customButtonData.textColor}
          iconColor={customButtonData.iconColor}
        />
      </div>
    </div>
  </div>
  );
}