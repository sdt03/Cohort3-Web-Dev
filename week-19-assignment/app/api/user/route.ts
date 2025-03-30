// import prisma from "@/lib/prismdb";
// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();

//         const signinSchema = z.object({
//             name: z.string(),
//             username: z.string().min(4).max(14),
//             password: z.string().min(8).max(14),
//             email: z.string().email(),
//         });

//         const parsedData = signinSchema.safeParse(body);

//         if (!parsedData.success) {
//             return NextResponse.json(
//                 { error: "Invalid input data", details: parsedData.error.errors },
//                 { status: 400 }
//             );
//         }

//         const user = await prisma.user.create({
//             data: {
//                 email: parsedData.data.email,
//                 name: parsedData.data.name,
//                 username: parsedData.data.username,
//                 password: parsedData.data.password,
//             },
//         });

//         return NextResponse.json(
//             { message: "Signed up", userId: user.id },
//             { status: 201 }
//         );

//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return NextResponse.json(
//             { error: "Something went wrong. Please try again later." },
//             { status: 500 }
//         );
//     }
// }
import prisma from "@/lib/prismdb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("📌 Received Data:", body); // Debugging

        const { name, username, password, email } = body;

        // Basic validation without Zod
        if (!name || !username || !password || !email) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user in database
        const user = await prisma.user.create({
            data: {
                email,
                name,
                username,
                password: hashedPassword, 
            },
        });

        return NextResponse.json(
            { message: "Signed up successfully", userId: user.id },
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
