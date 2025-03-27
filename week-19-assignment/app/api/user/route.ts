import prisma from "@/lib/prismdb";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    const user = await prisma.user.findFirst({});
    return Response.json({name: user?.username, email: user?.username})
}

export async function POST(req: NextRequest){
    const body = await req.json();

    const user = await prisma.user.create({
        data: {
            name: body.name,
            username: body.username,
            password: body.password,
            email: body.email,
        }
    });

    console.log(user.id);
    return NextResponse.json({message: "Signed up"});
}