
import { auth } from "@/auth";
import StoreHeaderMenu from "@/components/header/StoreHeaderMenu";
import { store } from "@/redux/store";
import { redirect } from "next/navigation";
import { Provider } from "react-redux";

export default async function StorePagesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await auth();
  const legal = ["Terms", "Privacy", "Legal"];
  if (!session) {
    redirect("/");
  }

  return (
   
    <div className="food-supply-container">
      <div className="">

        <nav>
          <div>

            <StoreHeaderMenu />
          </div>
        </nav>
      </div>
      <main className="">
        <div className="text-2xl mx-auto">{children}</div>
      </main>
    </div>
   
  );

}



