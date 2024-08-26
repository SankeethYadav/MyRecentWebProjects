import prisma from "../lib/prismadb";
import { Product, ProductGroup, ProductGroupItem } from "@prisma/client";

// get all categories in a store
export const getAllCategoriesInStore = async (storeId: string) => {
  try {
    const categories = await prisma.category.findMany({ where: { storeId } });

    return categories.map((category) => {
      return { storeId: category.storeId, name: category.name };
    });
  } catch {
    console.log("ERROR:getAllCategoriesInStore");
    return null;
  }
};

// add a category to a store
export const addCategoryToStore = async (storeId: string, name: string) => {
  try {
    return await prisma.category.create({
      data: {
        storeId,
        name,
      },
    });
  } catch {
    console.log("ERROR:addCategoryToStore");
    return null;
  }
};

// delete a catagory in a store
export const deleteCategoryInStore = async (storeId: string, name: string) => {
  try {
    return await prisma.category.delete({
      where: {
        storeId_name: { storeId, name },
      },
    });
  } catch {
    console.log("ERROR:deleteCategoryInStore");
    return null;
  }
};

// get all products in store

export const getAllProductsInStore = async (storeId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        storeId: storeId,
      },
    });
    console.log(56, products)

    return products;
  } catch (err) {
    console.log("ERROR:getAllProductsInStore", err);
    return null;
  }
};

// get products by categories in store
export const getAllProductsByCategoryInStore = async (
  storeId: string,
  categories: string[]
) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        storeId: storeId,
        categoryName: { in: categories },
      },
    });

    return products;
  } catch {
    console.log("ERROR:getAllProductsByCategoryInStore");
    return null;
  }
};

// get product by id
export const getProductById = async (productId: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    return product;
  } catch {
    console.log("ERROR:getProductById");
    return null;
  }
};

// add product to store
export const addProductToStore = async (storeId: string, product: Product) => {
  try {
    const { id, ...productMetaData } = product;
    return await prisma.product.create({
      data: {
        ...productMetaData,
        storeId: storeId,
      },
    });
  } catch (err) {
    console.log("ERROR:addProductToStore", err);
    return null;
  }
};

// update product
export const updateProductInStore = async (
  storeId: string,
  productId: string,
  product: Product
) => {
  try {
    const { id, ...productMetaData } = product;
    return await prisma.product.update({
      where: {
        id: productId,
        storeId: storeId,
      },
      data: {
        ...productMetaData,
      },
    });
  } catch {
    console.log("ERROR:updateProductInStore");
    return null;
  }
};

// delete product in store
export const deleteProductInStore = async (
  storeId: string,
  productId: string
) => {
  try {
    return await prisma.product.delete({
      where: {
        storeId: storeId,
        id: productId,
      },
    });
  } catch {
    console.log("ERROR:deleteProductInStore");
    return null;
  }
};

// get all product group categories in a store
export const getAllProductGroupCategoriesInStore = async (storeId: string) => {
  try {
    const categories = await prisma.productGroupCategory.findMany({
      where: { storeId },
    });

    return categories.map((category) => {
      return { storeId: category.storeId, name: category.name };
    });
  } catch {
    console.log("ERROR:getAllProductGroupCategoriesInStore");
    return null;
  }
};

// add a product group category to a store
export const addProductGroupCategoryToStore = async (
  storeId: string,
  name: string
) => {
  try {
    return await prisma.productGroupCategory.create({
      data: {
        storeId,
        name,
      },
    });
  } catch {
    console.log("ERROR:addProductGroupCategoryToStore");
    return null;
  }
};

// delete a product group catagory in a store
export const deleteProductGroupCategoryInStore = async (
  storeId: string,
  name: string
) => {
  try {
    return await prisma.productGroupCategory.delete({
      where: {
        storeId_name: { storeId, name },
      },
    });
  } catch {
    console.log("ERROR:deleteProductGroupCategoryInStore");
    return null;
  }
};

// get all product groups in store
export const getAllProductGroupsInStore = async (storeId: string) => {
  try {
    return await prisma.productGroup.findMany({
      where: {
        storeId,
      },
      include: {
        productGroupItems: true,
      },
    });
  } catch {
    console.log("ERROR:getAllProductGroupsInStore");
    return null;
  }
};

// get all product groups by categories
export const getAllProductGroupsByCategoryInStore = async (
  storeId: string,
  categories: string[]
) => {
  try {
    const productGroups = await prisma.productGroup.findMany({
      where: {
        storeId: storeId,
        categoryName: { in: categories },
      },
    });

    return productGroups;
  } catch {
    console.log("ERROR:getAllProductGroupsByCategoryInStore");
    return null;
  }
};

// get product group by id
export const getProductGroupById = async (productGroupId: string) => {
  try {
    const productGroup = await prisma.productGroup.findUnique({
      where: {
        id: productGroupId,
      },
      include: {
        productGroupItems: true,
      },
    });
    return productGroup;
  } catch {
    console.log("ERROR:getProductGroupById");
    return null;
  }
};

// add product group to store
export const addProductGroupToStore = async (
  storeId: string,
  productGroup: ProductGroup
) => {
  try {
    const { id, ...productGroupData } = productGroup;
    return await prisma.productGroup.create({
      data: {
        ...productGroupData,
        storeId: storeId,
      },
    });
  } catch {
    console.log("ERROR:addProductGroupToStore");
    return null;
  }
};

// add item to product group
export const addProductGroupItemToProductGroup = async (
  productGroupId: string,
  productGroupItem: ProductGroupItem
) => {
  try {
    return await prisma.productGroupItem.create({
      data: {
        ...productGroupItem,
        productGroupId: productGroupId,
      },
    });
  } catch {
    console.log("ERROR:addProductGroupItemToProductGroup");
    return null;
  }
};

// update item in product group
export const updateProductGroupItemToProductGroup = async (
  productGroupId: string,
  productGroupItem: ProductGroupItem
) => {
  try {
    const { productId, ...productGroupItemData } = productGroupItem;
    return await prisma.productGroupItem.update({
      where: {
        productGroupId_productId: {
          productGroupId: productGroupId,
          productId: productId,
        },
      },
      data: {
        ...productGroupItem,
        productGroupId: productGroupId,
        productId: productId,
      },
    });
  } catch {
    console.log("ERROR:updateProductGroupItemToProductGroup");
    return null;
  }
};

// delete product group item
export const deleteProductGroupItem = async (
  productGroupId: string,
  productId: string
) => {
  try {
    return await prisma.productGroupItem.delete({
      where: {
        productGroupId_productId: {
          productGroupId,
          productId,
        },
      },
    });
  } catch {
    console.log("ERROR:deleteProductGroupItem");
    return null;
  }
};

// update product group
export const updateProductGroupInStore = async (
  storeId: string,
  productGroupId: string,
  productGroup: ProductGroup
) => {
  try {
    return await prisma.productGroup.update({
      where: {
        id: productGroupId,
        storeId: storeId,
      },
      data: {
        ...productGroup,
      },
    });
  } catch {
    console.log("ERROR:updateProductGroupInStore");
    return null;
  }
};

// delete product group
export const deleteProductGroupInStore = async (
  storeId: string,
  productGroupId: string
) => {
  try {
    return await prisma.productGroup.delete({
      where: {
        id: productGroupId,
        storeId: storeId,
      },
    });
  } catch {
    console.log("ERROR:deleteProductGroupInStore");
    return null;
  }
};

export const test = async (
) => {
  try {
    const products = await prisma.product.findMany({
    });
    console.log(products);
    return products;
  } catch {
    console.log("ERROR:getAllProductsByCategoryInStore");
    return null;
  }
};

