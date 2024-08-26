import prisma from "../lib/prismadb";

// get inventory for a store
export const getInventoryItemsForStore = async (
  storeId: string,
  skip: number = 0,
  take: number = 25
) => {
  try {
    const inventoryItems = await prisma.inventoryItems.findMany({
      where: {
        storeId: storeId,
      },
      skip: skip,
      take: take,
      orderBy: {
        receivedDate: "desc",
      },
    });
  } catch {
    console.log("ERROR:getInventoryItemsForStore");
    return null;
  }
};
export const getInventoryItemsByCategory = async(
  storeId: string,
  Category : string,
)=> {
  try{
    const inventoryItems = await prisma.inventoryItems.findMany({
      where:{
        storeId:storeId,
      },
    })
  }
  catch {
    console.log("ERROR:getInventoryItemsForStore");
    return null;
  }
}
export const updateOnHandQty = async (
  inventoryId: string,
  storeId: string,
  productId : string,
  receivedDate : string,
  newQty: number,
) => {
  try {
    // Update the "On Hand Qty" in the database
    await prisma.inventoryItems.update({
      where: {
        inventoryId_storeId_productId_receivedDate: {
          inventoryId,
          storeId,
          productId,
          receivedDate
        }
      },
      data: {
        onHandQty: newQty
      }
    });
    console.log("On Hand Qty updated successfully");
  } catch (error) {
    console.error("Error updating On Hand Qty:", error);
    throw new Error("Failed to update On Hand Qty");
  }
};
// update inventory items
// Add Inventory Items to the store