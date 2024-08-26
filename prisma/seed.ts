import { PrismaClient, Store, StoreType, UserRole } from "@prisma/client";
import {
  confirmAllPendingMembershipsForUser,
  getPendingStoreMembershipsForEmail,
  getUserStoreMemberships,
} from "../data/user";
import {
  addPendingMemberToStore,
  addMemberToStore,
  getMembersInStore,
} from "../data/store";

const prisma = new PrismaClient();

const deleteAllTables = async () => {
  await prisma.supplier.deleteMany();
  await prisma.product.deleteMany();

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.category.deleteMany();
  await prisma.pendingStoreMembership.deleteMany();
  await prisma.storeMembership.deleteMany();

  await prisma.store.deleteMany();

  await prisma.user.deleteMany();
  await prisma.org.deleteMany();
};

const createMainUsersAndOrg = async () => {
  const org1 = await prisma.org.create({
    data: { name: "Org 1" },
  });
  const user1 = await prisma.user.create({
    data: {
      name: "Mahesh Pasupuleti",
      email: "mahesh@foodsupply.ai",
      accounts: {
        create: {
          provider: "google",
          providerAccountId: "106729024321642104964",
          type: "oauth",
        },
      },
      orgId: org1.id,
    },
  });

  const updatedOrg = await prisma.org.update({
    where: { id: org1.id },
    data: { ownerId: user1.id },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Test User2",
      email: "testuser2@foodsupply.ai",
      orgId: updatedOrg.id,
      accounts: {
        create: {
          provider: "google",
          providerAccountId: "555524321642104964",
          type: "oauth",
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Test User3",
      email: "testuser3@foodsupply.ai",
      orgId: updatedOrg.id,
      accounts: {
        create: {
          provider: "google",
          providerAccountId: "3552341321642104914",
          type: "oauth",
        },
      },
    },
  });

  return { org1, user1, user2, user3 };
};

const createStores = async (orgId: string, ownerId: string) => {
  // Create Store 1
  const store1 = await createStore("Store1", orgId, ownerId, StoreType.Store);
  const facility1 = await createStore(
    "Facility1",
    orgId,
    ownerId,
    StoreType.Facility
  );

  return { store1, facility1 };
};

const createStore = async (
  storeName: string,
  orgId: string,
  ownerId: string,
  storeType: StoreType
) => {
  return await prisma.store.create({
    data: {
      orgId: orgId,
      name: storeName,
      ownerId: ownerId,
      storeType: storeType,
      storeMembers: {
        create: {
          userId: ownerId,
          role: UserRole.Owner,
        },
      },
    },
  });
};

async function main() {
  await deleteAllTables();

  // Create core user and org
  const { org1, user1, user2 } = await createMainUsersAndOrg();
  const { store1, facility1 } = await createStores(org1.id, user1.id);

  await addMemberToStore(store1.id, user2.id, UserRole.Member);
  //await addUserToStore(facility1.id, user2.id, UserRole.Member);

  await addPendingMemberToStore(
    store1.id,
    "testuser5@foodsupply.ai",
    "foo bar"
  );

  await addPendingMemberToStore(facility1.id, "testuser2@foodsupply.ai");

  console.log(
    "User1 Stores = ",
    JSON.stringify(await getUserStoreMemberships(user1.id))
  );
  console.log(
    "User2 Stores = ",
    JSON.stringify(await getUserStoreMemberships(user2.id))
  );

  console.log(
    "Pending Members for user2 = ",
    JSON.stringify(
      await getPendingStoreMembershipsForEmail("testuser2@foodsupply.ai")
    )
  );

  console.log(
    "Members in Store1 = ",
    JSON.stringify(await getMembersInStore(store1.id))
  );
  console.log(
    "Members in Facility1 = ",
    JSON.stringify(await getMembersInStore(facility1.id))
  );

  await confirmAllPendingMembershipsForUser(user2.id);
  console.log(
    "Members in Store1 = ",
    JSON.stringify(await getMembersInStore(store1.id))
  );
  console.log(
    "Members in Facility1 = ",
    JSON.stringify(await getMembersInStore(facility1.id))
  );

  // const supplier = await addSuppliers();
  // const category=await addCategoriesToStore(facility1.id);
  // const supplierList = await getAllSuppliers();
  // console.log("supplierList: ", supplierList);

  // const product= await addProductsToStore(facility1.id);
  // console.log("Product: ", product);

  // const prodsByCategory = await getProductsByCategory();
  // console.log("prodsByCategory: ", prodsByCategory);
}

async function getAllSuppliers() {
  return await prisma.supplier.findMany({});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// const getProductsByCategory = async () => {
//   const uniqueCategoryIds = await prisma.product.findMany({
//     distinct: ["categoryId"],
//     select: {
//       categoryId: true,
//     },
//   });
//   const productsByCategory = [];

//   for (const category of uniqueCategoryIds) {
//     const productsInCategory = await prisma.product.findMany({
//       where: {
//         categoryId: category.categoryId,
//       },
//     });
//     productsByCategory.push({
//       categoryId: category.categoryId,
//       products: productsInCategory,
//     });
//   }

//   productsByCategory.map((product) => {
//     console.log("categoryId: ", product.categoryId);
//     console.log(product.products);
//   });
// };

// async function addProductsToStore(storeId: string) {
//   return await prisma.product.create({
//     data: {
//       name: "Butter",
//       description: "Tasty Butter!",
//       id: "1234",
//       categoryId: "cat1",
//       storeId: storeId,
//       supplierId: "sup1",
//     },
//   });
// }

// const addSuppliers = async () => {
//   return await prisma.supplier.createMany({
//     data: [
//       { name: "Amazon", id: "sup1" },
//       { name: "Walmart", id: "sup2" },
//     ],
//   });
// };

// const addCategoriesToStore = async (storeId: string) => {
//   return await prisma.category.createMany({
//     data: [
//       { name: "Milk Products", id: "cat1", storeId: storeId },
//       { name: "Veggies ", id: "cat2", storeId: storeId },
//       { name: "Boxes ", id: "cat3", storeId: storeId },
//       { name: "Pizza ", id: "cat4", storeId: storeId },
//     ],
//   });
// };

// const createOrg = async (orgName: string, ownerId: string) => {
//     return await prisma.org.create({
//         data: {
//             name: orgName,
//             ownerId: ownerId,
//         }
//     });
// }

// const addUserToStore = async (
//   storeId: string,
//   userId: string,
//   userRole: UserRole
// ) => {
//   return await prisma.storeMembership.create({
//     data: {
//       userId,
//       storeId,
//       role: userRole,
//     },
//   });
//   // return await prisma.store.update({
//   //   where: {
//   //     id: storeId,
//   //   },
//   //   data: {
//   //     storeMembers: {
//   //       connect: {
//   //         storeId_userId: {
//   //           storeId: storeId,
//   //           userId: userId,
//   //         },
//   //       },
//   //     },
//   //   },
//   // });
// };

// const createOrder = async (
//     storeId: string, facilityId: string, orderDate: string, number: number,
//     forecastBudget: number, forecastSales: number,
//     orderPrice: number,
//     orderTax: number,
//     paymentReceived: number,
//     shippingDate: string,
//     deliveryDate: string,
//     shippingMethod: string,
//     orderStatus: string,
//     remarks: string,
//     orderType: string,
//     orderStatusId: number, orderTypeId: number
// ) => {
//     return await prisma.createOrder.create({
//         data: {
//             storeId: storeId,
//             facilityId: facilityId,
//             orderDate: orderDate,
//             number: number,
//             forecastBudget: forecastBudget,
//             forecastSales: forecastSales,
//             orderPrice: orderPrice,
//             orderTax: orderTax,
//             paymentReceived: paymentReceived,
//             shippingDate: shippingDate,
//             deliveryDate: deliveryDate,
//             shippingMethod: shippingMethod,
//             orderStatus: orderStatus,
//             remarks: remarks,
//             orderType: orderType,
//             orderStatusId: orderStatusId,
//             orderTypeId: orderTypeId
//         }
//     });
// }
