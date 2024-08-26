import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LoginForm } from './loginform';


export default async function SignInPage() {

  const session = await auth();

  if (session) {
    redirect('/')
}

return (

    <LoginForm />

);
}