import { ModifyInventory } from "@/components/inventory/main/Modify-Inventory";
import InventoryAvailable from "../../../../../../components/inventory/main/InventoryAvailable";
import { AddInventoryManually } from "@/components/inventory/main/AddInventoryManually";
export default async function StoreInventoryEditPage({params}: {params: {storeId: string}}) {

    return (
    <main>
        <div>
            <ModifyInventory />
        </div>
    </main>
    )
}
