
import { Order, OrderItem } from "@prisma/client";
import prisma from "../lib/prismadb";
import { CategoryItems } from "@/components/types/Table";

// get all orders
export const getAllOrdersFromStore = async (
  storeId: string,
  skip: number = 0,
  take: number = 25
) => {
  try {
    return await prisma.order.findMany({
      where: {
        fromStoreId: storeId,
      },
      include: {
        orderItems: true,
      },
      skip: skip,
      take: take,
    });
  } catch {
    console.log("ERROR:getAllOrdersFromStore");
    return null;
  }
};

export const getAllOrdersToStore = async (
  storeId: string,
  skip: number = 0,
  take: number = 25
) => {
  try {
    return await prisma.order.findMany({
      where: {
        toStoreId: storeId,
      },
      include: {
        orderItems: true,
      },
      skip: skip,
      take: take,
    });
  } catch {
    console.log("ERROR:getAllOrdersToStore");
    return null;
  }
};

// get order by id
export const getOrderById = async (orderId: string) => {
  try {
    return await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
      },
    });
  } catch {
    console.log("ERROR:getOrderById");
    return null;
  }
};

// create new order
export const createOrder = async (
  order: Order,
  orderItems: OrderItem[] = []
) => {
  try {
    const { id, ...orderData } = order;
    const createdOrder = await prisma.order.create({
      data: {
        ...orderData,
      },
    });
    Promise.all(
      orderItems.map((orderItem) => {
        return prisma.orderItem.create({
          data: {
            ...orderItem,
            orderId: createdOrder.id,
          },
        });
      })
    );
    return createdOrder;
  } catch {
    console.log("ERROR:createOrder");
    return null;
  }
};

// update order
export const updateOrder = async (orderId: string, order: Order) => {
  try {
    const { id, ...orderData } = order;
    return await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        ...orderData,
      },
    });
  } catch {
    console.log("ERROR:updateOrder");
    return null;
  }
};

// delete order
export const deleteOrder = async (orderId: string) => {
  try {
    return await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  } catch {
    console.log("ERROR:deleteOrder");
    return null;
  }
};

// create new orderItem
export const addOrderItemToOrder = async (
  orderId: string,
  orderItem: OrderItem
) => {
  try {
    const { productId, ...orderData } = orderItem;
    return await prisma.orderItem.create({
      data: {
        productId: productId,
        ...orderData,
        orderId: orderId,
      },
    });
  } catch {
    console.log("ERROR:addOrderItemToOrder");
    return null;
  }
};

export const addMultipleOrderItemsToOrder = async (
  orderId: string,
  orderItems: OrderItem[]
) => {
  try {
    const orderItemsToAdd = orderItems.map((orderItem) => {
      return { ...orderItem, orderId } as OrderItem;
    });

    return await prisma.orderItem.createMany({
      data: orderItemsToAdd,
    });
  } catch {
    console.log("ERROR:addMultipleOrderItemsToOrder");
    return null;
  }
};

// update order item
export const updateOrderItemInOrder = async (orderItem: OrderItem) => {
  try {
    const { orderId, productId, ...orderItemData } = orderItem;
    return prisma.orderItem.update({
      where: {
        orderId_productId: {
          orderId: orderId,
          productId: productId,
        },
      },
      data: {
        ...orderItemData,
      },
    });
  } catch {
    console.log("ERROR:updateOrderItemInOrder");
    return null;
  }
};

// delete order item
export const deleteOrderItemInOrder = async (
  orderId: string,
  productId: string
) => {
  try {
    return prisma.orderItem.delete({
      where: {
        orderId_productId: {
          orderId,
          productId,
        },
      },
    });
  } catch {
    console.log("ERROR:deleteOrderItemInOrder");
    return null;
  }
};




export const getCategoriesWithProducts = async (storeId: string): Promise<CategoryItems[]> => {
  const categories = await prisma.category.findMany({
    where: {
      storeId,
    },
    include: {
      products: true,
    },
  });

  const data: CategoryItems[] = categories.map((category) => ({
    category: category.name,
    items: category.products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.cost,
      productDescription: product.name, // Assuming name is the product description
      unitOfMeasure: 'unit', // Placeholder, replace with actual field if available
      vendor: 'vendorName', // Placeholder, replace with actual field if available
      totalCost: product.cost ?? 0, // Assuming totalCost is the product price
      onHandQnt: 0, // Placeholder, replace with actual field if available
      cost: product.cost ?? 0, // Assuming cost is the product price
    })),
  }));

  return data;
};