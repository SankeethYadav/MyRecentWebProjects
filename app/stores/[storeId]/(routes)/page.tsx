import DashboardPage from "../../../../components/dashboard/main/DashboardMain";

export default async function StoreHome({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <main>

      <div className="text-2xl font-semibold">
        <DashboardPage />
      </div>
    </main>
    )
}
