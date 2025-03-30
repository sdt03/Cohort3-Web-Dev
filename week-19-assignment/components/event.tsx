"use client"
import React, { useRef, useState } from "react"
import { Input } from "./inputprops"
import { CrossButton } from "./icons/close-button";
import { useRouter } from "next/navigation";
import { User } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

interface EventUser {
    user: User | null
}

export default function EventCard({user}: EventUser) {
    const router = useRouter();
    const title = useRef("");
    const date = useRef("");
    const description = useRef("");
    const location = useRef("");
    const [isClosed, setIsClosed] = useState<boolean>(false);

    const handleInputChange = (field: "title" | "date" | "description" | "location") => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        if(field === "title") title.current = value
        if(field === "date") date.current = value
        if(field === "description") description.current = value
        if(field === "location") location.current = value
    }

    const handleSubmit = async () => {
        if(!user?.token){
            alert("You are not logged in!");
            router.push("/api/auth/signin");
            return;
        }

        const eventData = {
            title: title.current,
            date: date.current,
            description: description.current,
            location: location.current,
            createdById: user.id,
            createdBy: user.name
        };

        try{
            await axios.post("/api/event", eventData);
            console.log("Data sent!");
        } catch(e) {
            console.error("Error occurred", e);
        }
    }
    if(isClosed) {
        router.push("/");
        return null;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-96 border p-6 rounded-lg shadow-lg relative">
                <button 
                    className="absolute top-2 right-2 p-2 mb-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => setIsClosed(!isClosed)}
                >
                    <CrossButton />
                </button>
                <div className="flex flex-col gap-y-4 items-center mt-4">
                    <Input title="Title" onChange={handleInputChange("title")} placeholder="Enter title"/>
                    <Input title="Date" onChange={handleInputChange("date")} placeholder="Enter date"/>
                    <Input title="Description" onChange={handleInputChange("description")} placeholder="Enter description"/>
                    <Input title="Location" onChange={handleInputChange("location")} placeholder="Enter location"/>
                    
                    <button
                    onClick={handleSubmit} 
                    className="w-full mt-2 px-5 py-3 cursor-pointer border border-gray-500 rounded-lg hover:bg-gray-200 transition">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}