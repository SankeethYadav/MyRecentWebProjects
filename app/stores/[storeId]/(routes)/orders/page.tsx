
export default async function StoreOrdersPage({params}: {params: {storeId: string}}) {

    return (
    <main>
        <div className="text-2xl font-semibold text-purple-700">
            Store {params.storeId} Orders Page
        </div>
    </main>
    )
}
