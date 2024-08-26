import ViewOrder from "@/components/orders/view-order/ViewOrder";

export default function PreviewOrdersPage({ params }: { params: { storeId: string; }; }) {
    return (

        <ViewOrder />

    );
}
