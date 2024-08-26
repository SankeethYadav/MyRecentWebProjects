export interface Product {
  id: number;
  name: string;
  price: string;
  count: number;
}

export interface AddIngredientsFormValues {
  // Replace these with your actual form fields
  productNumber: string;
  supplier: string;
  shippingCost: string;
  productName: string;
  category: string;
  markUpCost: string;
  brand: string;
  unitOfMeasure: string;
  totalCost: string;
  addIngredientCheckbox: Date | null;
}

   