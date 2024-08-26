import { GenericTable } from "@/components/generic/table/Table";
import { orderHistoryColumns } from "./Columns";
import { ordersHistoryColumnDef } from "@/components/types/Table";
const ordersHistoryTableData: ordersHistoryColumnDef[] = [
  {
    orderNum: 101,
    storeName: "Store A",
    createdDate: 1672531200000, // January 1, 2023, timestamp in milliseconds
    totalCost: 150.5,
    orderStatus: "Completed",
  },
  {
    orderNum: 102,
    storeName: "Store B",
    createdDate: 1672617600000, // January 2, 2023, timestamp in milliseconds
    totalCost: 200.75,
    orderStatus: "Pending",
  },
  {
    orderNum: 103,
    storeName: "Store C",
    createdDate: 1672704000000, // January 3, 2023, timestamp in milliseconds
    totalCost: 99.99,
    orderStatus: "Shipped",
  },
  {
    orderNum: 104,
    storeName: "Store D",
    createdDate: 1672790400000, // January 4, 2023, timestamp in milliseconds
    totalCost: 350.0,
    orderStatus: "Cancelled",
  },
  {
    orderNum: 105,
    storeName: "Store E",
    createdDate: 1672876800000, // January 5, 2023, timestamp in milliseconds
    totalCost: 120.45,
    orderStatus: "Processing",
  },
];
export function OrderHistoryTable() {
  return (
    <GenericTable columns={orderHistoryColumns} data={ordersHistoryTableData} />
  );
}
