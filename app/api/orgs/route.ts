import { auth } from "@/auth"
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
  ) {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    try {
      const body = await req.json();
  
      const { name } = body;
  
      if (!name) {
        return new NextResponse("Org Name is required", { status: 400 });
      }

      // TODO: Check if user has permissions to create org

      // TODO: Validate request 

      // TODO: Create Org 

      return new NextResponse("Internal error. UnImplemented yet", { status: 503 });

  
    //   const store = await prismadb.store.create({
    //     data: {
    //       name,
    //       userId,
    //     }
    //   });
    
    //   return NextResponse.json(store);
    } catch (error) {
      console.log('[ORGS_POST]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };