import { Orders } from "./Orders";
import { StoreInfo } from "./Stores";

export interface Category {
  storeInfo: StoreInfo;
  currentOrders: Orders[];
  additionalItems: Orders[];
}
