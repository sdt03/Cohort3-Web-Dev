import prisma from "@/lib/prismdb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const signinSchema = z.object({
            name: z.string(),
            username: z.string().min(4).max(14),
            password: z.string().min(8).max(14),
            email: z.string().email(),
        });

        const parsedData = signinSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json(
                { error: "Invalid input data", details: parsedData.error.errors },
                { status: 400 }
            );
        }

        const user = await prisma.user.create({
            data: {
                email: parsedData.data.email,
                name: parsedData.data.name,
                username: parsedData.data.username,
                password: parsedData.data.password,
            },
        });

        return NextResponse.json(
            { message: "Signed up", userId: user.id },
            { status: 201 }
        );

    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
