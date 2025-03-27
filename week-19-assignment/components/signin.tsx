"use client"
import React, { ChangeEventHandler, useRef } from "react";

export function Signin() {
    const name = useRef("");
    const username = useRef("");
    const password = useRef("");
    const email = useRef("");

    const handleInputChange = (field: "name" | "username" | "password" | "email") => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        if(field === "name") name.current = value;
        else if(field === "username") username.current = value;
        else if(field === "password") password.current = value;
        else if(field === "email") email.current = value;
    };

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
            <button className="bg-black border border-gray-500 rounded-lg p-3 cursor-pointer hover:bg-gray-700 ">Sign In</button>
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
