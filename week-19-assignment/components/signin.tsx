"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useRef } from "react";
import { z } from "zod";
import bcrypt from 'bcrypt'

export function Signin() {
    const name = useRef("");
    const username = useRef("");
    const password = useRef("");
    const email = useRef("");

    const router = useRouter();

    const signUpSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        username: z.string().min(3, "Username must be at least 3 characters"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const handleInputChange = (field: "name" | "username" | "password" | "email") => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        if(field === "name") name.current = value;
        else if(field === "username") username.current = value;
        else if(field === "password") password.current = value;
        else if(field === "email") email.current = value;
    };

    const handleSubmit = async () => {
        const hashedPassword = await bcrypt.hash(password.current, 10);

        try{
            const formData = {
                email: email.current,
                name: name.current,
                username: username.current,
                password: hashedPassword
            };

            const validatedData = signUpSchema.safeParse(formData);

            if(!validatedData){
                return;
            }
            await axios.post("/api/user", formData);
            router.push("/");
        } catch (e) {
            console.error("Something went wrong", e);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-40 p-6 bg-white border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center">
            <Input
                onChange={handleInputChange("email")}
                label="Email"
                placeholder="Shoumik@gmail.com"
            />
            <Input
                onChange={handleInputChange("name")}
                label="Name"
                placeholder="Shoumik"
            />
            <Input
                onChange={handleInputChange("username")}
                label="Username"
                placeholder="shoumik123"
            />
            <Input
                onChange={handleInputChange("password")}
                label="Password"
                placeholder="••••••••"
            />
            <button
                className="bg-black border border-gray-500 rounded-lg p-3 cursor-pointer hover:bg-gray-700"
                onClick={handleSubmit} 
                type="button"
                >
                    Sign In
                </button>
        </div>
    );
}

interface InputProps {
    label: string;
    placeholder: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Input({
    label,
    placeholder,
    onChange
}: InputProps) {
    return (
        <div className="flex flex-col space-y-1 mb-4 items-center">
            <label className="text-sm font-medium text-black">{label}</label>
            <input
                onChange={onChange}
                placeholder={placeholder}
                required
                className="px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
