import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from 'axios'
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            data: [
                username,
                password
            ]
        });
        navigate("/signin");
        alert("You have signed in");
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 border-gray-200 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />

            <div className="cursor-pointer flex justify-center p-5 ">
            <Button variant ="primary" text="signup" size="md" onClick={signup} loading={false} />
            </div>
        </div>

    </div>
}

export default Signup;