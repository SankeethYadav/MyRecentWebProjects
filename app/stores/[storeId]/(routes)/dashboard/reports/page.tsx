import DashboardTable from '../../../../../../components/dashboard/table/DashboardTable'
export default async function StoreReport({params}: {params: {storeId: string}}) {
    

    return (
    <main>
        <div className="text-2xl font-semibold">
       
           <DashboardTable />
        </div>
    </main>
    )
}
