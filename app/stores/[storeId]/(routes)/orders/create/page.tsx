"use client";
import AlertNotification from "@/components/orders/create/AlertNotification";
import CurrentOrders from "@/components/orders/create/CurrentOrders";
import StoreInfo from "@/components/orders/create/StoreInfo";
import CreateOrder from "../../../../../../components/orders/create/CreateOrder";
import { currentOrdersData } from "@/components/data/CurrentOrders";
import { useState } from "react";

export default function CreateOrdersPage({ params }: { params: { storeId: string; }; }) {
    const [show, setShow] = useState(true);
    return (
        <>
            {show ?
                <AlertNotification type={"warning"} messages={["Inventory is running low.", "Cheese Prices Went Up", "Last Week Cost $1000"]} show={setShow} />
                : null}
            <CreateOrder />
            <StoreInfo storeInfo={currentOrdersData.storeInfo} />
            <CurrentOrders currentOrders={currentOrdersData.currentOrders} additionalItems={currentOrdersData.additionalItems} />
        </>
    );
}
