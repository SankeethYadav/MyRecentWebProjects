import { NextRequest, NextResponse } from 'next/server';
import { getAllCategoriesInStore } from '@/data/product';
import { getCategoriesWithProducts } from '@/data/order';

export async function GET(req: NextRequest) {
  try {
    const storeId = req.nextUrl.searchParams.get('storeId');
    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const allCategories = await getCategoriesWithProducts(storeId);
    console.log(14, allCategories);
    return new NextResponse(JSON.stringify({ allCategories }));
  } catch (err) {
    console.log("Category API Error");
    console.log(18, err);
    return new NextResponse('Something went wrong', { status: 500 });
  }
}
