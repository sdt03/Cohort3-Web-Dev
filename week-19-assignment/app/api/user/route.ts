import prisma from "@/lib/prismdb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


export async function GET() {
    const user = await prisma.user.findFirst({});
    return Response.json({name: user?.username, email: user?.email})
}

export async function POST(req: NextRequest){
    const body = await req.json();

    const signinSchema = z.object({
            name: z.string(),
            username: z.string().min(4).max(14),
            password: z.string().min(8).max(14),
            email: z.string().email()
        });

    try {
        const parsedData = signinSchema.parse(body);
        if(parsedData){
            const user = await prisma.user.create({
                data: {
                    email: parsedData.email,
                    name: parsedData.name,
                    username: parsedData.username,
                    password: parsedData.password,
                }
            });
            return NextResponse.json({message: "Signed up", userId: user.id},
                {status: 201}
            );
        }
    } catch (error) {
        if(error instanceof z.ZodError){
            return NextResponse.json({
                error: "Invalid input data", details: error.errors
            }, {
                status: 400
            })
        }
    }
}