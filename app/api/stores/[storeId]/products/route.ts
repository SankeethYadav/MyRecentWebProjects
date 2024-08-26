import { NextRequest, NextResponse } from 'next/server';
import { addProductToStore, getAllProductsInStore, getAllCategoriesInStore } from '@/data/product';


// export async function POST(req: NextRequest,res:NextResponse)  {

//   if (req.method !== 'POST') {
//     return new NextResponse('Only POST method is allowed ',{
//       status:405
//     }) 
//   }

//   try {
//     console.log("Yes I am here!")

//     console.log(req.method)
//     console.log(req.body)
//     const product: Prisma.ProductCreateInput = await new NextResponse(req.body).json();
//     console.log("product:")
//     console.log(product)

//     const newProduct = {
//       suppliers: {
//         create: [
//           {
//             supplier:{
//             connect:{
//               id: product.suppliers
//             }  
//             }
//           },
//         ],
//       },
//       category: {
//         connect:{
//           id:product.category
//         }
//       },
//       name: product.name,
//       product_number: product.product_number,
//       description: product.description,
//       brand: product.brand,
//       cost: product.cost,
//       shipping_cost: product.shipping_cost,
//       markup: product.markup,
//       sku: product.sku,
//       alt_sku: product.alt_sku,
//       width: product.width,
//       length: product.length,
//       height: product.height,
//       weight: product.weight,
//     };

//     const savedProduct = await prisma.product.create({ data:newProduct });
//     console.log("savedProd: ",savedProduct)
//     return new NextResponse(JSON.stringify({savedProduct}))
//   } catch (err) {
//     console.log("Yes I am here222!")
//     console.log(err)
//     return new NextResponse('Something went wrong',{
//       status:400
//     })   
//   }
// };

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
    // console.log(79, product1)

   const products = await getAllProductsInStore(storeId);
   return new NextResponse(JSON.stringify({products}))
    // return new NextResponse(JSON.stringify({productsByCategory}))
  } catch (err) {
    console.log("Product GET API Error")
    console.log(err)
    return new NextResponse('Something went wrong ',{
      status:405

    }) 
  }
  }

  




