import prisma from "../lib/prismadb";

// create org
export const addOrg = async (name: string, ownerId?: string) => {
  try {
    return await prisma.org.create({
      data: {
        name,
        ownerId,
      },
    });
  } catch {
    console.log("ERROR:addOrg");
    return null;
  }
};

// get org by id
export const getOrgById = async (orgId: string) => {
  try {
    const org = await prisma.org.findUnique({
      where: {
        id: orgId,
      },
    });
    return org;
  } catch {
    console.log("ERROR:getOrgById");
    return null;
  }
};

// update org owner
export const updateOrgOwner = async (orgId: string, ownerId: string) => {
  try {
    return await prisma.org.update({
      where: {
        id: orgId,
      },
      data: {
        ownerId: ownerId,
      },
    });
  } catch {
    console.log("ERROR:updateOrgOwner");
    return null;
  }
};
