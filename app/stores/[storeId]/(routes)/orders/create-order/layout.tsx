"use client";

import SubHeader from "@/components/generic/SubHeader";
import { ButtonProps } from "@/components/types/SubHeader";

export default function OrdersLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {

    const subHeaderButtonPropsData: ButtonProps[] = [
      {
        label: "Order History",
        handler: () => {},
      },
      {
        label: "New Order",
        handler: () => {},
      },
    ];
  return (
    <>
      <SubHeader
        title={"New Order"}
        backButtonHandler={function (): void {
          throw new Error("Function not implemented.");
        }}
        buttons={subHeaderButtonPropsData}
      ></SubHeader>
      <div>{children}</div>
    </>
  );
}
