
import { create } from "@/server/database/forms/create";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try{
    const payload = await request.json();
    const response = await create(payload);
    return NextResponse.json(response, {
        status: 200,
      });
    }catch(error){
        return NextResponse.json(error, {
            status: 500,
        });
    }
}

