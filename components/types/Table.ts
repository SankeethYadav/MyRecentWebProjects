import { ColumnDef, Table } from "@tanstack/react-table";
export type MenuItemsType={
  itemName:string,
  noOfIngredients:number,
  unitOfMeasure:string,
  itemCost: number,
  totalCost: number,
  retailPrice: number,
  foodCost: number,
}
export type EmployeeListType ={
name: string;
email: string;
userName : string;
role:string;
}
export type AllIngredientsItems={
category : string;
body : AllIngredientsBody[];

}
export type AddInventoryManuallyType={
  category:string,
  body: AddInventoryManuallyBody[];
}
export type AddInventoryManuallyBody={
  productName: string,
  expDate:string,
  receivedDate: string;
  unitOfMeasure: string;
  pricePerUnit:number;
  onHandQnt: number;
  receivedQnt: number;
  totalQnt: number;
  totalCost:number;
}
export type AllIngredientsBody={
  supplier : string;
  unitOfMeasure : number;
  qty: number;
  totalCost: number;
}
export type ViewModifyInventoryType = {
  productName: string;
  receivedDate: string;
  expDate: string;
  onHandQnt: number;
  totalQnt: number;
};
export type AddInventoryType = {
  productName: string;
  receivedDate: string;
  expDate: string;
  onHandQnt: number;
  totalQnt: number;
};
export type OrdersHistoryType = {
  orderNum: number;
  storeName: string;
  createdDate: number;
  totalCost: number;
  orderStatus: string;
};
export type NestedItems = Items | NewOrderItems;
export type CategoryItems = {
  category: string;
  items: NestedItems[];
};
export interface NewOrderItems {
  productDescription: string;
  unitOfMeasure: string;
  vendor: string;
  totalCost: number;
  onHandQnt: number;
  cost: number;
}
export interface Items {
  ProductName: string;
  ReceivedDate: string;
  ExpDate: string;
  OnHandQnt: number;
  TotalQnt: number;
}
export interface NestedTableProps {
  data: Items[];
}
export interface SearchBarFilterPropsTables {
  labelName: string;
  placeHolder?: string;
  id: string;
  column: string;
}
export interface FreqOrders {
  productDescription: string;
  unitOfMeasure: string;
  vendor: string;
  totalCost: number;
  onHandQnt: number;
  cost: number;
}
export interface DraftOrdersType {
  orderNum: number;
  storeName: string;
  totalNoItems: number;
  createdDate: string;
  totalCost: number;
  orderStatus: string;
}

export interface Column<T> {
  header: string;
  cell: (row: T) => React.ReactNode;
}

export interface Props<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export interface SearchBarFilterProps {
  labelName: string;
  placeHolder?: string;
  id: string;
  table: Table<any>;
  column: string;
}

export interface DropDownFilterProps {
  labelName: string;
  placeHolder: string;
  id: string;
  table: Table<any>;
  options: any[];
  selectedValue?: any;
  handleSelectedOption: any;
}
