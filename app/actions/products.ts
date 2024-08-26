
'use server'

import { addProductToStore, deleteProductInStore, updateProductInStore } from '@/data/product';


// Function to create a new product
export async function createProduct(data: any) {
  try {
    const storeId = 'clstragfk000c6gvk0er68bm2';
    const product = data;
    product.storeId = storeId

    // Create the product in the database using Prisma client
    const newProduct = await addProductToStore(storeId, product)
    console.log(9, newProduct)
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

export async function deleteProduct(id: string) {
  try {
    const storeId = 'clstragfk000c6gvk0er68bm2';
    const product = id;

    // Create the product in the database using Prisma client
    const newProduct = await deleteProductInStore(storeId, product)
    console.log(9, newProduct)
    return newProduct;
  } catch (error) {
    console.error('Error delete product:', error);
    throw new Error('Failed to delete product');
  }
}

export async function updateProduct(data: any, id: any) {
  try {
    const storeId = 'clstragfk000c6gvk0er68bm2';
    const productId = id
    const product = data;

    // Create the product in the database using Prisma client
    const newProduct = await updateProductInStore(storeId, productId, product)
    console.log(9, newProduct)
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

