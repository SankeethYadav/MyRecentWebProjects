import { NextRequest, NextResponse } from "next/server";

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Only GET method is allowed ", {
      status: 405,
    });
  }
  try {
    console.log("In Orders GET API");
    console.log(req.method);
    const uniqueCategoryList = await prisma.product.findMany({});
    const uniqueCategoryList1 = await prisma.order.findMany({});
    console.log("New print: ", uniqueCategoryList);
    return new NextResponse(JSON.stringify({ uniqueCategoryList1 }));
  } catch (err) {
    console.log("Orders GET API Error");
    console.log(err);
    return new NextResponse("Something went wrong ", {
      status: 405,
    });
  }
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Only POST method is allowed ", {
      status: 406,
    });
  }
  try {
    console.log("In Orders POST API");
    console.log(req.method);
    const uniqueCategoryList = await prisma.product.findMany({});
    const uniqueCategoryList1 = await prisma.order.findMany({});
    console.log("New print: ", uniqueCategoryList);
    return new NextResponse(JSON.stringify({ uniqueCategoryList}));
  } catch (err) {
    console.log("Orders POST API Error");
    console.log(err);
    return new NextResponse("Something went wrong ", {
      status: 405,
    });
  }
}

export async function getProductList(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Only GET method is allowed", {
      status: 405,
    });
  }

  try {
    const productList = await prisma.product.findMany();
    return new NextResponse(JSON.stringify({ productList }));
  } catch (err) {
    console.log("Product List GET API Error");
    console.log(err);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}


