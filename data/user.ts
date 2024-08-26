import prisma from "../lib/prismadb";
import { addMemberToStore } from "./store";

// Get User for email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });

    return user;
  } catch {
    console.log("ERROR:getUserByEmail");
    return null;
  }
};

// Get User by Id
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    console.log("ERROR:getUserById");
    return null;
  }
};

// Check if user is part of any of the stores
export const shouldAllowUserToSignin = async (userId: string) => {
  try {
    // Allow if user is part of any of the stores
    const storeList = (await getUserStoreMemberships(userId)) || [];
    if (storeList?.length > 0) {
      return true;
    }

    // Allow if user's email is part of pending list
    const user = await getUserById(userId);
    const userEmail = user?.email || "";
    if (userEmail) {
      const pendingStores =
        (await getPendingStoreMembershipsForEmail(userEmail)) || [];
      if (pendingStores?.length > 0) {
        return true;
      }
    }

    // else reject the user
    return false;
  } catch {
    console.log("ERROR:shouldAllowUserToSignin");
    return null;
  }
};

// get list of stores for a given user
export const getUserStoreMemberships = async (userId: string) => {
  try {
    const stores = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        storeMemberships: {
          select: {
            storeId: true,
            role: true,
            store: {
              select: {
                name: true,
                storeType: true,
              },
            },
          },
        },
      },
    });

    return stores?.storeMemberships.map((storeMembership) => {
      return {
        storeId: storeMembership.storeId,
        role: storeMembership.role,
        storeName: storeMembership.store.name,
        storeType: storeMembership.store.name,
      };
    });
  } catch {
    console.log("ERROR:getUserStoreMemberships");
    return null;
  }
};

// get pending store memberships for user email
export const getPendingStoreMembershipsForEmail = async (email: string) => {
  try {
    // get list of stores where user is pending
    const pendingStores = await prisma.pendingStoreMembership.findMany({
      where: {
        emailId: email,
      },
      select: {
        storeId: true,
        role: true,
        store: {
          select: {
            storeType: true,
            name: true,
          },
        },
      },
    });

    return pendingStores.map((pendingStore) => {
      return {
        storeId: pendingStore.storeId,
        role: pendingStore.role,
        storeType: pendingStore.store.storeType,
        storeName: pendingStore.store.name,
      };
    });
  } catch {
    console.log("ERROR:getPendingStoresForUserEmail");
    return null;
  }
};

// Confirm all pending memberships for an user
export const confirmAllPendingMembershipsForUser = async (userId: string) => {
  try {
    // get user pending members
    const user = await getUserById(userId);
    const userEmail = user?.email || "";
    const pendingMemberships =
      (await getPendingStoreMembershipsForEmail(userEmail)) || [];

    // approve all memberships
    await Promise.all(
      pendingMemberships.map((pendingMembership) => {
        return addMemberToStore(
          pendingMembership.storeId,
          userId,
          pendingMembership.role
        );
      })
    );
  } catch {
    console.log("ERROR:confirmAllUserPendingMemberships");
    return null;
  }
};
