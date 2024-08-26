
export default async function OrgSettingsPage({params}: {params: {orgId: string}}) {

    return (
    <main>
        <div className="text-2xl font-semibold text-purple-700">
            Org {params.orgId} Settings Page
        </div>
    </main>
    )
}
