import { ProductForm } from "./components/product-form";
import { ProductCatalog } from "./components/product-cataloge";

export default function StoreProductsCatalogPage({}: {}) {
  return (
    <main>
      <div className="text-2xl font-semibold">
        {/* Store {params.storeId} Products Catalog Page */}

        <ProductForm />
        {/* <ProductCatalog/> */}
      </div>
    </main>
  );
}
