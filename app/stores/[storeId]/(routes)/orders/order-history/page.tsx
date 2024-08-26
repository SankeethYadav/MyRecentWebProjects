import OrderHistory from "@/components/orders/order-history/OrderHistory";

export default async function StoreHome({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    
     <OrderHistory />
  
  );
}
