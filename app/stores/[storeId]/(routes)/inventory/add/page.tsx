import { AddInventory } from "@/components/inventory/main/AddInventory";

export default async function StoreInventoryAddPage({params}: {params: {storeId: string}}) {

    return (
    <main>
        <div>
            <AddInventory />
        </div>
    </main>
    )
}
