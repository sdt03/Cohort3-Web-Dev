import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

function SignIn(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            data: [
                username,
                password
            ]
        });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt)
        navigate("/dashboard");
        
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 border-gray-200 p-8">
            <Input placeholder="Username" />
            <Input placeholder="Password" />

            <div className="cursor-pointer flex justify-center p-5 ">
            <Button variant ="primary" text="Sign In" size="md" onClick={signin} loading={false} />
            </div>
        </div>

    </div>
}

export default SignIn;