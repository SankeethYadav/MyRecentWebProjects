import { Button } from "@/components/ui/button";
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/signin')
  }

  return (
    <main>
      <div>
        {
          session ? (
            <>
              <div className="text-3xl font-bold"> You are logged in. </div> 
              <Button> <Link href={'/api/auth/signout'}>Sign-out</Link> </Button>
            </>
          ) : (

            <>
            <div className="text-3xl font-bold"> You are NOT logged in. </div> 
            <Button> <Link href={'/signin'}>Sign-in</Link> </Button>
            
          </>

          )
        }
        <div className="text-2xl font-semibold text-purple-700">
          Root Page
        </div>
      </div>
    </main>
  )
}
