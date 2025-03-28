import prisma from "@/lib/prismdb";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse){
    const body = await req.json();
    
    try{
        const event = await prisma.event.create({
            data: {
                title: body.title,
                date: body.date,
                description: body.description,
                location: body.location,
            }
        });
    } catch (error) {
        console.error("Error occured: ", error);
    }
}