import { Supplier } from "@prisma/client";
import prisma from "../lib/prismadb";

// add new supplier
export const addSupplierToOrg = async (orgId: string, supplier: Supplier) => {
  try {
    const { id, ...supplierData } = supplier;
    return await prisma.supplier.create({
      data: {
        ...supplierData,
        orgId,
      },
    });
  } catch {
    console.log("ERROR:addSupplierToOrg");
    return null;
  }
};

// get supplier by id
export const getSupplierById = async (supplierId: string) => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: supplierId,
      },
    });
    return supplier;
  } catch {
    console.log("ERROR:getSupplierById");
    return null;
  }
};

// update supplier
export const updateSupplier = async (
  supplierId: string,
  supplier: Supplier
) => {
  try {
    const { id, ...supplierData } = supplier;
    return await prisma.supplier.update({
      where: {
        id: supplierId,
      },
      data: {
        ...supplierData,
      },
    });
  } catch {
    console.log("ERROR:updateSupplier");
    return null;
  }
};

// delete supplier
export const deleteSupplier = async (supplierId: string) => {
  try {
    return await prisma.supplier.delete({
      where: {
        id: supplierId,
      },
    });
  } catch {
    console.log("ERROR:deleteSupplier");
    return null;
  }
};

export const getAllSuppliers = async () => {
  try {
    return await prisma.supplier.findMany({
    });
  } catch {
    console.log("ERROR:getAllSuppliers");
    return null;
  }
};
