import {
  Category,
  Inventory,
  Order,
  OrderItem,
  OrderState,
  Product,
  Store,
  StoreMembership,
  StoreType,
  Supplier,
  User,
} from "@prisma/client";
const {
  PrismaClient: PrismaClientSecond,
} = require("@internal/prisma-second/client");
const { PrismaClient } = require("@prisma/client");

const secondPrisma = new PrismaClientSecond();
const firstPrisma = new PrismaClient();

async function main() {
  try {
    await deleteAllData();

    await migrateUsers();

    await migrateStores();

    await migrateStoreMembership();

    await migrateSupplier();

    await migrateCategory();

    await migrateProducts();

    await migrateOrders();
    await migrateOrderItems();

    console.log("All migrations completed successfully.");
  } catch (error) {
    console.error("An error occurred during the migration process:", error);
  } finally {
    await firstPrisma.$disconnect();
    await secondPrisma.$disconnect();
    console.log("Disconnected from databases.");
  }
}

async function deleteAllData() {
  try {
    await firstPrisma.StoreMembership.deleteMany();
    console.log("All Store Membership data deleted successfully!!!");

    await firstPrisma.Product.deleteMany();
    console.log("All Product data deleted successfully!!!");

    await firstPrisma.Category.deleteMany();
    console.log("All Category data deleted successfully!!!");

    await firstPrisma.OrderItem.deleteMany();
    console.log("All Order Items data deleted successfully!!!");

    await firstPrisma.Order.deleteMany();
    console.log("All Orders data deleted successfully!!!");

    await firstPrisma.Store.deleteMany();
    console.log("All Stores data deleted successfully!!!");

    await firstPrisma.Supplier.deleteMany();
    console.log("All Supplier data deleted successfully!!!");

    await firstPrisma.User.deleteMany({
      where: {
        name: {
          notIn: [
            "Mahesh Pasupuleti",
            "Test User2",
            "Test User3",
            "Sreedhar Lagadapati",
            "Nischal Vangipuram",
          ],
        },
      },
    });
    console.log("All User data deleted successfully!!!");
  } catch (error) {
    console.log("Failed Deleting all the data: ", error);
  }
}

// Execute the main function
main().catch((error) => {
  console.error("Migration process failed:", error);
});

//Migrate Users
async function writeUserData(oldUsers: any) {
  try {
    var userData: User[] = [];
    for (const user of oldUsers) {
      if (user.username == null) {
        continue;
      }
      const tempUser: any = {
        id: user.id.toString(),
        name: user.name,
        email: user.email != null ? user.email : user.username,
      };
      userData.push(tempUser);
    }
    await firstPrisma.user.createMany({
      data: userData,
    });
  } catch (error) {
    throw error;
  }
}

async function migrateUsers() {
  try {
    // Fetch users from the old database
    const oldUsers = await secondPrisma.users.findMany();

    // Transform and write users date into the new database
    await writeUserData(oldUsers);

    console.log("All Users Migrated Successfully!!!");
  } catch (error) {
    console.log(`Failed to migrate User: ${error}`);
    throw error;
  } finally {
    firstPrisma.$disconnect(), secondPrisma.$disconnect();
  }
}

async function fetchStoresInitData() {
  try {
    const [oldStores, defaultOrgId, defaultOwnerId, oldFacilities] =
      await Promise.all([
        // Fetch init store data from the old database
        await secondPrisma.store.findMany(),
        //Fetch default Org id to be given to all the stores
        await firstPrisma.Org.findFirst({
          where: { name: "Org 1" },
          select: { id: true },
        }),
        //Fetch user named "Nischal Vangipuram" to assign as store owner
        await firstPrisma.User.findFirst({
          where: { name: "Nischal Vangipuram" },
          select: { id: true },
        }),
        await secondPrisma.facility.findMany(),
      ]);

    return {
      oldStores,
      defaultOrgId,
      defaultOwnerId,
      oldFacilities,
    };
  } catch (error) {
    throw error;
  }
}

async function writeStoresData(
  oldStores: any,
  defaultOrgId: any,
  defaultOwnerId: any
) {
  // Transform and insert into the new database
  var storeData: Store[] = [];
  for (const store of oldStores) {
    if (store.name == null) {
      continue;
    }
    const tempStore: any = {
      id: store.id.toString(),
      orgId: defaultOrgId.id,
      name: store.name,
      address: store.address,
      phoneNum: store.phone,
      ownerId: defaultOwnerId.id,
      logoImageUri: store.logo,
      ...(store.createdDate && { createdDate: store.createdDate }),
      ...(store.modifiedDate && { lastUpdated: store.modifiedDate }),
    };
    storeData.push(tempStore);
  }
  await firstPrisma.Store.createMany({
    data: storeData,
  });
}
async function writeFacilitiesDataIntoStores(
  oldFacilities: any,
  defaultOrgId: any,
  defaultOwnerId: any
) {
  var facilityData: Store[] = [];
  for (const facility of oldFacilities) {
    const tempFacility: any = {
      orgId: defaultOrgId.id,
      name: facility.name,
      address: facility.address,
      phoneNum: facility.phone,
      ownerId: defaultOwnerId.id,
      storeType: StoreType.Facility,
      logoImageUri: facility.logo,
      ...(facility.createdDate && { createdDate: facility.createdDate }),
      ...(facility.modifiedDate && { lastUpdated: facility.modifiedDate }),
    };
    facilityData.push(tempFacility);
  }
  await firstPrisma.Store.createMany({
    data: facilityData,
  });
}
//Migrate Stores
async function migrateStores() {
  try {
    const { oldStores, defaultOrgId, defaultOwnerId, oldFacilities } =
      await fetchStoresInitData();

    await writeStoresData(oldStores, defaultOrgId, defaultOwnerId);

    console.log("Stores data migrated, now migrating Facilities data!");
    //Migrate Facilities into the Stores
    await writeFacilitiesDataIntoStores(
      oldFacilities,
      defaultOrgId,
      defaultOwnerId
    );

    console.log("All Stores and Facilities Migrated Successfully!!!");
  } catch (error) {
    console.error(`Failed to migrate Store : ${error}`);
    throw error;
  }
}

async function getNewFacilityId(user: any) {
  try {
    //Fetching facility name in order to fetch new facility Id
    const oldFacilityName = await secondPrisma.facility.findFirst({
      where: {
        id: user.facilty_id,
      },
      select: {
        name: true,
      },
    });

    const newFacilityId = await firstPrisma.Store.findFirst({
      where: {
        name: oldFacilityName.name,
      },
      select: {
        id: true,
      },
    });

    return newFacilityId.id;
  } catch (error) {
    throw error;
  }
}

async function transformStoreMembership(user: any) {
  try {
    var newUserRole;
    if (user.ROLE == "ROLE_ADMIN") {
      newUserRole = "Admin";
    } else if (user.ROLE == null) {
      newUserRole = "Member";
    }
    var newStoreId, newFacilityId;
    if (user.store_id != null) {
    } else {
      newFacilityId = await getNewFacilityId(user);
    }

    const transformedData: any = {
      userId: user.id.toString(),
      storeId: user.store_id?.toString() ?? newFacilityId,
      role: newUserRole,
    };

    return transformedData;
  } catch (error) {
    throw error;
  }
}
async function writeStoreMembershipData(oldUsers: any) {
  try {
    var storeMembershipData: StoreMembership[] = [];
    for (const user of oldUsers) {
      if (user.store_id == null && user.facility_id == null) {
        continue;
      }

      const transformedSMData = await transformStoreMembership(user);
      storeMembershipData.push(transformedSMData);
    }
    await firstPrisma.storeMembership.createMany({
      data: storeMembershipData,
    });
  } catch (error) {
    throw error;
  }
}
async function migrateStoreMembership() {
  try {
    const oldUsers = await secondPrisma.users.findMany();

    await writeStoreMembershipData(oldUsers);
    console.log(`All Store memberships migrated successfully.`);
  } catch (error) {
    console.log("Failed to Migrate Store Memberships ", error);
    throw error;
  }
}

async function transformSupplier(supplier: any) {
  try {
    const defaultOrg = await firstPrisma.Org.findFirst({
      where: { name: "Org 1" },
      select: {
        id: true,
      },
    });
    const newSupplier: any = {
      id: supplier.id.toString(),
      name: supplier.name,
      orgId: defaultOrg.id,
      webSiteURL: null,
      address: null,
      phoneNum: supplier.phoneNo,
      createdDate: supplier.createdDate,
      lastUpdated: supplier.modifiedDate,
      email: supplier.email,
      active: supplier.active,
    };
    return newSupplier;
  } catch (error) {
    throw error;
  }
}
async function writeSupplier(oldSupplier: any) {
  try {
    var supplierData: Supplier[] = [];
    for (const supplier of oldSupplier) {
      const newSupplier = await transformSupplier(supplier);

      supplierData.push(newSupplier);
    }
    await firstPrisma.Supplier.createMany({
      data: supplierData,
    });
  } catch (error) {
    throw error;
  }
}
async function migrateSupplier() {
  try {
    const oldSupplier = await secondPrisma.supplier.findMany();
    await writeSupplier(oldSupplier);
    console.log(`All Suppliers migrated successfully.`);
  } catch (error) {
    console.log("Failed to Migrate Supplier", error);
    throw error;
  } finally {
    firstPrisma.$disconnect(), secondPrisma.$disconnect();
  }
}

async function transformCategory(category: any) {
  try {
    const storeName = await secondPrisma.facility.findFirst({
      where: {
        id: category.facility_id,
      },
      select: {
        name: true,
      },
    });
    const storeId = await firstPrisma.Store.findFirst({
      where: {
        name: storeName.name,
      },
      select: {
        id: true,
      },
    });

    const newCategory: any = {
      storeId: storeId.id,
      name: category.name,
      createdDate: category.createdDate,
      lastUpdated: category.modifiedDate,
    };
    return newCategory;
  } catch (error) {
    throw error;
  }
}
async function writeCategory(oldCategories: any) {
  try {
    var categoryData: Category[] = [];
    for (const category of oldCategories) {
      const newCategory = await transformCategory(category);
      categoryData.push(newCategory);
    }

    await firstPrisma.Category.createMany({
      data: categoryData,
    });
  } catch (error) {
    throw error;
  }
}
async function migrateCategory() {
  try {
    const oldCategories = await secondPrisma.category.findMany();
    await writeCategory(oldCategories);
    console.log(`All Categories migrated successfully.`);
  } catch (error) {
    console.log("Failed to Migrate Category ", error);
    throw error;
  }
}

async function getCategoryAndFacilityIdForProducts(product: any) {
  try {
    const category = await secondPrisma.category.findFirst({
      where: {
        id: product.category_id,
      },
      select: {
        facility_id: true,
        name: true,
      },
    });

    const oldFacilityName = await secondPrisma.facility.findFirst({
      where: {
        id: category.facility_id,
      },
      select: {
        name: true,
      },
    });

    const newFacilityId = await firstPrisma.store.findFirst({
      where: {
        name: oldFacilityName.name,
      },
      select: {
        id: true,
      },
    });

    return {
      category,
      newFacilityId,
    };
  } catch (error) {
    throw error;
  }
}

async function transformProduct(product: any) {
  try {
    const { category, newFacilityId } =
      await getCategoryAndFacilityIdForProducts(product);

    const newProduct: any = {
      id: product.id.toString(),
      altId: null,
      name: product.name,
      description: product.description,
      imageUri: product.image,
      sku: product.sku,
      createdDate: product.createdDate,
      lastUpdated: product.modifiedDate,
      altSku: product.alt_sku,
      brand: product.brand,
      cost: parseFloat(product.cost),
      height: product.height,
      length: product.length,
      weight: product.weight,
      width: product.width,
      // size: product.size,
      markup: parseFloat(product.markup),
      totalCost: parseFloat(product.totalCost),
      categoryName: category.name,
      storeId: newFacilityId.id,
      supplierId: product.supplier_id.toString(),
      originalCost: null,
      shippingCost: parseFloat(product.shipping_cost),
    };
    return newProduct;
  } catch (error) {
    throw error;
  }
}
async function writeProduct(oldProducts: any) {
  try {
    var productData: Product[] = [];
    for (const product of oldProducts) {
      if (product.name == null || product.category_id == null) {
        continue;
      }
      const newProduct = await transformProduct(product);
      productData.push(newProduct);
    }
    await firstPrisma.Product.createMany({
      data: productData,
    });
  } catch (error) {
    throw error;
  }
}

// Migrate Prodcut Data
async function migrateProducts() {
  try {
    const oldProducts = await secondPrisma.product.findMany();
    await writeProduct(oldProducts);
    console.log(`All Products migrated successfully.`);
  } catch (error) {
    console.log("Failed to Migrate Products", error);
    throw error;
  }
}

async function getNewOrderStateForOrders(order: any) {
  try {
    var newOrderState;
    const oldOrderState = await secondPrisma.order_status.findUnique({
      where: {
        id: order.order_status_id,
      },
      select: {
        name: true,
      },
    });

    switch (oldOrderState.name) {
      case "Submitted":
        newOrderState = OrderState.OrderProcessing;
        break;
      case "Draft":
        newOrderState = OrderState.OrderDraft;
        break;
      case "Rejected":
        newOrderState = OrderState.OrderCancelled;
        break;
      case "Delivered":
        newOrderState = OrderState.OrderDelivered;
        break;
    }
    return newOrderState;
  } catch (error) {
    throw error;
  }
}

async function getnewFacilityforOrders(facilityId: any) {
  try {
    const newStoreName = await secondPrisma.facility.findFirst({
      where: {
        id: facilityId,
      },
      select: {
        name: true,
      },
    });
    const newStoreId = await firstPrisma.Store.findFirst({
      where: {
        name: newStoreName.name,
      },
      select: {
        id: true,
      },
    });
    return newStoreId.id;
  } catch (error) {
    throw error;
  }
}

async function transformOrders(order: any, orderedByUserId: any) {
  try {
    var newOrderState = await getNewOrderStateForOrders(order);

    if (order.createdBy != null) {
      const userId = await secondPrisma.users.findFirst({
        where: {
          username: order.createdBy,
        },
        select: {
          id: true,
        },
      });
      if (userId != null) {
        orderedByUserId = userId;
      }
    }

    const newFacilityId = await getnewFacilityforOrders(order.facility_id);

    const newOrder: Order = {
      id: order.id.toString(),
      fromStoreId: order.store_id.toString(),
      toStoreId: newFacilityId,
      orderDate: order.ordr_date,
      state: newOrderState,
      orderedByUserId: orderedByUserId.id.toString(),
      totalCost: order.order_price,
      ...(order.modifiedDate && { lastUpdated: order.modifiedDate }),
      createdDate: order.createdDate,
    };
    return newOrder;
  } catch (error) {
    throw error;
  }
}
async function writeOrders(oldOrders: any) {
  try {
    var orderData: Order[] = [];
    var orderedByUserId = await firstPrisma.User.findFirst({
      where: {
        name: "Nischal Vangipuram",
      },
      select: {
        id: true,
      },
    });
    var count = 0;
    for (const order of oldOrders) {
      const newOrder = await transformOrders(order, orderedByUserId);
      orderData.push(newOrder);
    }
    console.log("Orders transormation completed. Now writing the orders data");
    await firstPrisma.Order.createMany({
      data: orderData,
    });
  } catch (error) {
    throw error;
  }
}
//Migrate Orders and OrderItems Entity
async function migrateOrders() {
  try {
    const oldOrders = await secondPrisma.orders.findMany();
    console.log("Total No of orders: ", oldOrders.length);
    await writeOrders(oldOrders);
    console.log(`All Orders migrated successfully.`);
  } catch (error) {
    console.log("Failed to Migrate Orders", error);
    throw error;
  }
}

async function writeOrderItems(oldOrderItems: any) {
  try {
    var orderItemsData: OrderItem[] = [];
    // Set to track (order_id, product_id) combinations
    const seenCombinations = new Set<string>();

    for (const item of oldOrderItems) {
      if (item.order_id == null || item.product_id == null) {
        console.log("null");
        continue;
      }
      // Create a unique key for each (orderId, productId) combination
      const combinationKey = `${item.order_id.toString()}-${item.product_id.toString()}`;
      if (seenCombinations.has(combinationKey)) {
        // If combination already processed, skip this item
        continue;
      }
      // Add new combination to the set
      seenCombinations.add(combinationKey);

      const newOrderItem: any = {
        orderId: item.order_id.toString(),
        productId: item.product_id.toString(),
        quantity: item.quantity ? parseFloat(item.quantity) ?? null : null,
        cost: item.price ? parseFloat(item.price) ?? null : null

      };
      orderItemsData.push(newOrderItem);
    }
    console.log("Total No. of Order Items: ", orderItemsData.length);
    await firstPrisma.OrderItem.createMany({
      data: orderItemsData,
    });
  } catch (error) {
    throw error;
  }
}

async function migrateOrderItems() {
  try {
    const oldOrderItems = await secondPrisma.order_details.findMany();

    await writeOrderItems(oldOrderItems);
    console.log("All Order Items Migrated Successfully");
  } catch (error) {
    console.log("Failed to Migrate Order Items: ", error);
  }
}



// async function writeInventory(oldInventory: any) {
//   try {
//     var inventoryData: Inventory[] = [];
  

//     for (const item of oldInventory) {
//       if (item.order_id == null || item.product_id == null) {
//         console.log("null");
//         continue;
//       }
//       // Create a unique key for each (orderId, productId) combination
//       const combinationKey = `${item.order_id.toString()}-${item.product_id.toString()}`;
//       if (seenCombinations.has(combinationKey)) {
//         // If combination already processed, skip this item
//         continue;
//       }
//       // Add new combination to the set
//       seenCombinations.add(combinationKey);

//       const newOrderItem: any = {
//         orderId: item.order_id.toString(),
//         productId: item.product_id.toString(),
//         quantity: item.quantity ? parseFloat(item.quantity) ?? null : null,
//         cost: item.price ? parseFloat(item.price) ?? null : null

//       };
//       orderItemsData.push(newOrderItem);
//     }
//     console.log("Total No. of Order Items: ", orderItemsData.length);
//     await firstPrisma.OrderItem.createMany({
//       data: orderItemsData,
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// async function migrateInventory() {
//   try {
//     const oldInventory = await secondPrisma.inventory.findMany();

//     await writeInventory(oldInventory);
//     console.log("All Inventory Migrated Successfully");
//   } catch (error) {
//     console.log("Failed to Migrate Inventory: ", error);
//   }
// }
