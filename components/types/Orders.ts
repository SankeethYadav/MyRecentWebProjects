import { Product } from "./Product";

export interface Orders {
  id: number;
  category: string;
  products: Product[];
}
