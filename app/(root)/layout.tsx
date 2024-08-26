
export default async function RootLayout({
    children,
}: { children: React.ReactNode }) {
    // check if user is signed in
    // if not signed in, redirect to /sign-in page
    // if signed in, show the initial page
    return (
        <> {children} </>
    )
}