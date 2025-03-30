import prisma from "@/lib/prismdb";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse){
    const body = await req.json();
    
    try{
        await prisma.event.create({
            data: {
                title: body.title,
                date: body.date,
                description: body.description,
                location: body.location,
                createdById: body.createdById,
                createdBy: body.user
            }
        });
        console.log("Event Created!");
    } catch (error) {
        console.error("Error occured: ", error);
    }
}