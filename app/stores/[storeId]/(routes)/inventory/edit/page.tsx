import InventoryEdit from "../../../../../../components/inventory/main/InventoryEdit";
export default async function StoreInventoryEditPage({params}: {params: {storeId: string}}) {

    return (
    <main>
        <div>
            <InventoryEdit />
        </div>
    </main>
    )
}
