import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { OrderDashboardWidgetProps } from "../types/OrderWidget";

const OrderDashboardWidget: React.FC<OrderDashboardWidgetProps> = ({
  ...props
}) => {
  return (
    <Card className="self-stretch w-[328px] h-[244px] p-6 bg-white rounded-2xl shadow border flex-col justify-start items-start gap-2 inline-flex">
      <CardHeader className="self-stretch flex-row items-start justify-start p-0 pb-4">
        <CardTitle className="text-neutral-900 text-xl font-bold font-['Manrope'] leading-loose gap-1 p-0 pt-0">
          {props.titleText}
        </CardTitle>
      </CardHeader>
      <CardContent className="self-stretch flex-row items-baseline justify-start gap-1 p-0 pt-0">
        <div className="flex items-center">
          <div className="text-neutral-900 text-6xl font-bold font-['Manrope'] leading-[60px]">
            {props.number}
          </div>
          <svg
            className="ml-2 w-8 h-8 relative"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="green"
          >
            <g transform="rotate(45, 12, 12)">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </g>
          </svg>
        </div>
        <div className="self-stretch items-center gap-1">
          <div className="flex items-center">
            <div className="relative text-lg font-medium font-['Manrope'] text-[#454545]">
              {props.contentText}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sky-700 text-sm font-normal font-['Manrope'] gap-1 p-0 pt-0">
        <a href={props.footerLink} className="relative letter-spacing-tighter">
          {props.footerText}
        </a>
        <svg
          className="relative w-3.5 h-3.5 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </CardFooter>
    </Card>
  );
};

export default OrderDashboardWidget;
