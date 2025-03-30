import { Signup } from "../../components/signin";

export default function Signin(){
    return (
    <div>
        <div className="text-white flex justify-center text-2xl font-bold">
            <h1>Sign up to get started</h1>
        </div>
        <div>
            <Signup />
        </div>
    </div>)
}