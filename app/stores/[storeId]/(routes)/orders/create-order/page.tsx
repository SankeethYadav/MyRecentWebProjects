"use client";
import { Orders } from "@/components/orders/new-orders/Orders";
import OrderHistory from "@/components/orders/order-history/OrderHistory";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function OrderFlow({ params }: { params: { storeId: string } }) {
  return (
    <Provider store={store}>
      <Orders storeId={params.storeId} />
    </Provider>
  );
}
