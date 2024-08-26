
export default async function OrgHome({params}: {params: {orgId: string}}) {
    

    return (
    <main>
        <div className="text-2xl font-semibold text-purple-700">
            Org {params.orgId} Home Page. This will have dashboards
        </div>
    </main>
    )
}
