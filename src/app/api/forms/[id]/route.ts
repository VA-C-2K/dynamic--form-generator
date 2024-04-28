
import { fetchById } from "@/server/database/forms/fetchById";
import { update } from "@/server/database/forms/update";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    let form = { } as any;
    try{
        form = await fetchById(params.id);
    }catch(error){
        return NextResponse.json(form,{
            status:500
        })
    }
    return NextResponse.json(form,{
        status:200
    });
}


export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try{
        const payload = await request.json();
        const response = await update({id:params.id,payload});
        return NextResponse.json(response, {
            status: 200,
          });
        }catch(error){
            return NextResponse.json(error, {
                status: 500,
            });
        }
}