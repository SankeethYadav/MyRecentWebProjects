import { AddInventory } from "@/components/inventory/main/AddInventory";
import { AddInventoryManually } from "@/components/inventory/main/AddInventoryManually";
import { ModifyInventory } from "@/components/inventory/main/Modify-Inventory";

export default async function StoreInventoryPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <main>
      <div>
      
        <ModifyInventory />

      </div>
    </main>
  );
}
