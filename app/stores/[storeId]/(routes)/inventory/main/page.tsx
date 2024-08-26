import InventoryMain from "../../../../../../components/inventory/main/InventoryMain";
export default async function StoreInventoryMainPage({params}: {params: {storeId: string}}) {

    return (
    <main>
        <div>
          <InventoryMain />
        </div>
    </main>
    )
}
