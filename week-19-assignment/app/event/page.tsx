import EventCard from "@/components/event";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CustomSession, User } from "../api/auth/[...nextauth]/route";

export default async function Event(){
    const session = await getServerSession() as CustomSession | null;

    if(!session){
        redirect("/signin");
    }

    return <EventCard user={{...session.user, token: session.user.jwtToken}} />
}