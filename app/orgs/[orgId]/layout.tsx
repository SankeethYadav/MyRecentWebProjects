import { auth } from "@/auth"
import { redirect } from 'next/navigation';

export default async function OrgPagesLayout({
    children, params
}: { 
    children: React.ReactNode 
    params: {orgId: string}
}) {
    const session = await auth();
    if (!session) {
        redirect('/');
    }

    return (
        <>
        {/* TODO: Add org navbar etc here */}
          {children}
        </>
      ); 
}