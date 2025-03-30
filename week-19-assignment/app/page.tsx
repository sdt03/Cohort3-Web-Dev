
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Signin from "./signin/page";

const getUserDetails = async () => {
  const session = await getServerSession();
  return session;
}


export default async function Home() {
  const session = await getUserDetails();

  if(session?.user){ 
    redirect('/naste');
  }
  return (
    <div>
      <Signin />
    </div>
  );
}