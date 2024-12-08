import { NextRequest, NextResponse } from "next/server";
import getDatabaseConnection from "../../scripts/db";

const db = getDatabaseConnection();

export async function GET(req:NextRequest,
    { params }: { params: { id: string }}
) {
    try{
        const {id} = await params;
        const item = db.prepare(`SELECT * FROM cart WHERE id = ?`).get(id);
        const query = db.prepare(`SELECT * FROM cart WHERE id = ${id}`).all();
        if(!item){
            return NextResponse.json({error : "item does not exist"}, {status:404})
        }
        return NextResponse.json(query, {status:200});
    }catch(error){
        console.error(error)
        return NextResponse.json({error: "server error"}, {status:500});
    }
}