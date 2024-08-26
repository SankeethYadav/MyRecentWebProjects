import { UserRole } from "@prisma/client";
import prisma from "../lib/prismadb";
import { getUserById } from "./user";

// get store
export const getStoreById = async (storeId: string) => {
  try {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });
    return store;
  } catch {
    console.log("ERROR:getStoreById");
    return null;
  }
};

// get all users in a store
export const getMembersInStore = async (storeId: string) => {
  try {
    const storeMembersList = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
      select: {
        storeMembers: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            role: true,
            userId: true,
          },
        },
        pendingMembers: {
          select: {
            emailId: true,
            phoneNum: true,
            role: true,
            name: true,
          },
        },
      },
    });

    // transform the data
    return {
      members: storeMembersList?.storeMembers.map((memberInStore) => {
        return {
          name: memberInStore.user.name,
          email: memberInStore.user.email,
          userId: memberInStore.userId,
          role: memberInStore.role,
        };
      }),
      pendingMembers: storeMembersList?.pendingMembers.map(
        (pendingMemberInStore) => {
          return {
            name: pendingMemberInStore.name,
            emailId: pendingMemberInStore.emailId,
            phoneNum: pendingMemberInStore.phoneNum,
            role: pendingMemberInStore.role,
          };
        }
      ),
    };
  } catch {
    console.log("ERROR:getMembersInStore");
    return null;
  }
};

export const addPendingMemberToStore = async (
  storeId: string,
  email: string,
  name: string = "",
  role: UserRole = UserRole.Member,
  phoneNum: string = ""
) => {
  try {
    // create a pendingStoreMembership
    const pendingMembershp = await prisma.pendingStoreMembership.create({
      data: {
        storeId: storeId,
        emailId: email,
        name: name,
        phoneNum: phoneNum,
        role: role,
      },
    });

    return pendingMembershp;
  } catch {
    console.log("ERROR:addPendingMemberToStore");
    return null;
  }
};

// Add user to a store
export const addMemberToStore = async (
  storeId: string,
  userId: string,
  userRole: UserRole
) => {
  try {
    const user = await getUserById(userId);

    if (!user) {
      return null;
    }

    const storeMember = await prisma.storeMembership.create({
      data: {
        userId,
        storeId,
        role: userRole,
      },
    });

    // remove all pending members with user
    await deletePendingMemberFromStore(storeId, user.email || "");

    return storeMember;
  } catch {
    console.log("ERROR:addUserToStore");
    return null;
  }
};

// update member role
export const updateMemberRoleInStore = async (
  storeId: string,
  userId: string,
  role: UserRole
) => {
  try {
    return await prisma.storeMembership.updateMany({
      where: {
        storeId: storeId,
        userId: userId,
      },
      data: {
        role: role,
      },
    });
  } catch {
    console.log("ERROR:updateMemberRoleInStore");
    return null;
  }
};

// remove user from store
export const deleteMemberFromStore = async (
  storeId: string,
  userId: string
) => {
  try {
    // TODO: Check if current user is admin|owner and delete only if there is atleast one another admin|owner

    return await prisma.storeMembership.deleteMany({
      where: {
        storeId: storeId,
        userId: userId,
      },
    });
  } catch {
    console.log("ERROR:deleteMemberFromStore");
    return null;
  }
};

// remove member from store
export const deletePendingMemberFromStore = async (
  storeId: string,
  emailId: string
) => {
  try {
    return await prisma.pendingStoreMembership.deleteMany({
      where: {
        storeId: storeId,
        emailId: emailId,
      },
    });
  } catch {
    console.log("ERROR:deletePendingMemberFromStore");
    return null;
  }
};

// connect stores
export const connectStoreWithAnother = async (
  storeId: string,
  connectedToStoreId: string
) => {
  try {
    return await prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        connectedToStoreId: connectedToStoreId,
      },
    });
  } catch {
    console.log("ERROR:connectStoreWithAnother");
    return null;
  }
};
