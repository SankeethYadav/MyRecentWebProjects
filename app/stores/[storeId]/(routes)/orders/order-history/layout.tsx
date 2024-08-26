"use client";

import SubHeader from "@/components/generic/SubHeader";
import { ButtonProps } from "@/components/types/SubHeader";

export default function OrderHistoryLayout({
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
        title={"Order History"}
        backButtonHandler={function (): void {
          throw new Error("Function not implemented.");
        }}
        buttons={subHeaderButtonPropsData}
      ></SubHeader>
      <div>{children}</div>
    </>
  );
}
