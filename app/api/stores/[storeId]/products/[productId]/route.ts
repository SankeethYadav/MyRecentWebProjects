import { getProductById } from '@/data/product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest)  {
  if (req.method !== 'GET') {
    return new NextResponse('Only GET method is allowed ',{
      status:405
    }) 
  }

  try {
    const storeId = 'clstragfk000c6gvk0er68bm2';
    // const product1 = await addProductToStore(storeId, {
    //   name: 'product1',
    //   storeId: storeId
    // })
    console.log(79, req.url)
    const parts = req.url.split('/');
    const productId = parts[parts.length - 1];
    console.log(79, productId)

   const product = await getProductById(productId);
   return new NextResponse(JSON.stringify({product}))
    // return new NextResponse(JSON.stringify({productsByCategory}))
  } catch (err) {
    console.log("Product GET API Error")
    console.log(err)
    return new NextResponse('Something went wrong ',{
      status:405

    }) 
  }
  }

  




