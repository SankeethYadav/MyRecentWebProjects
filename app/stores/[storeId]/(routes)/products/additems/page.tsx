import AddMenuItems from "@/components/products/catalog/AddMenuItems";

export default function AddItemsPage({
  params,
}: {
  params: { storeId: string }
}) {
  return <AddMenuItems currentOrders={[]} />;
}
