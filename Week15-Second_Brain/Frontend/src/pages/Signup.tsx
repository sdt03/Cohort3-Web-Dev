import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

function Signup(){
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 border-gray-200 p-8">
            <Input placeholder="Username" />
            <Input placeholder="Password" />

            <div className="cursor-pointer flex justify-center p-5 ">
            <Button variant ="primary" text="signup" size="md" />
            </div>
        </div>

    </div>
}

export default Signup;