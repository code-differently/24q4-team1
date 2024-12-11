import getDatabaseConnection from "../scripts/db";
import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/types/cartItem";

const db = getDatabaseConnection();

export async function GET(){
    const all = db.prepare(`SELECT * FROM history`).all();
    if(all == null){
        return NextResponse.json("nah")
    }
    return NextResponse.json(all);
}
export async function POST(req: NextRequest){
    const {id} = await req.json();
    const cartitem = db.prepare(`SELECT * FROM cart WHERE id = ?`).get(id) as CartItem | undefined;
        if(!id || !cartitem){
        return NextResponse.json("this is invalid");
    }
    const historyItem = db.prepare('SELECT * FROM history WHERE id = ?').get(id) as CartItem | undefined;
    if(!historyItem){
        const history = db.prepare(`
            INSERT INTO history (id, title, description, price, quantity, image)
                VALUES (?, ?, ?, ?, ?, ?)       
            
            `).run(id, cartitem?.title, cartitem?.description, cartitem?.price, 1, cartitem?.image)
            db.prepare('UPDATE cart SET quantity = quantity - 1');
            if(cartitem.quantity <= 0){
                db.prepare(`DELETE FROM cart WHERE id = ?`).run(id);
        
            }
            return NextResponse.json("created table with content");
    }
    if(cartitem.quantity <= 0){
        db.prepare(`DELETE FROM cart WHERE id = ?`).run(id);

    }
    if(historyItem.quantity > 0){
        db.prepare(`UPDATE history SET quantity = quantity + 1 WHERE id = ?`).run(id);
        db.prepare(`UPDATE cart SET quantity = quantity - 1 WHERE id = ? `).run(id);
        if(cartitem.quantity <= 0){
            db.prepare('DELETE FROM cart WHERE id = ?').run(id);
            return NextResponse.json("cleared table");
        }
        return NextResponse.json("good");
    }
        return NextResponse.json(history);
}
export async function DELETE(req: NextRequest){
    const {id} = await req.json();
    const del = db.prepare(`DELETE FROM history WHERE id = ?`).run(id);
    return NextResponse.json(del);
}