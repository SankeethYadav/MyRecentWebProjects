// import type { NextApiRequest, NextApiResponse } from 'next';

// import { PrismaClient, Prisma,Supplier } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getAllSuppliers } from '@/data/supplier';

// const prisma = new PrismaClient();

export async function GET(req: NextRequest)  {
  if (req.method !== 'GET') {
    return new NextResponse('Only GET method is allowed ',{
      status:405
    }) 
  }

  try {
    const storeId = 'clstragfk000c6gvk0er68bm2';
    console.log("In suppliers API")
    console.log(req.method)
    const allSuppliers = await getAllSuppliers();
    
    console.log("Suppliers in api: ", allSuppliers)
    return new NextResponse(JSON.stringify({allSuppliers}))
    
  } catch (err) {
    console.log("Supplier API Error")
    console.log(err)
    return new NextResponse('Something went wrong ',{
      status:405

    }) 
  }
  }

  

 
