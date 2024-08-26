import MenuItem from "@/components/generic/MenuItem";
import ProductCatalog from "../../../../../../components/products/catalog/ProductCatalog";
``
import { AllIngredients } from "@/components/products/catalog/AllIngredients";

export default function PreviewProductPage({
  params,
}: {
  params: { storeId: string };
}) {
  
  return <ProductCatalog />;
  // // return <MenuItems />
  // return <AllIngredients/>
}
