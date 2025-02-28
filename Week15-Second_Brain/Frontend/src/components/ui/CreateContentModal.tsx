
// controlled component
import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { data } from "react-router-dom";

// @ts-ignore
enum ContentType{
    Twitter = "twitter",
    Youtube="youtube"
}
export function CreateContentModal({open, onClose}){
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    
    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            data: {
               link,
               title,
               type
            }
        }, {
            headers: {
                "Authorization": localStorage.getItem("token");
            }
        })
    }

    return <div>
        {open && <div className="w-screen h-screen bg-slate-800 fixed top-0 left-0 opacity-60 flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon />
                        </div>

                    </div>
                    <div>
                        <Input placeholder={"Title"} />
                        <Input placeholder={"Link"} />
                    </div>
                    <div>
                        <h1>Type</h1>
                        <div className="flex gap-1 justify-center pb-2">
                            <Button text="Youtube" size="md" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={()=>{
                                setType(ContentType.Youtube)
                            }} />
                            <Button text="Twitter" size="md" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={()=>{
                                setType(ContentType.Twitter)
                            }} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button variant="primary" size="md" text="Submit" />
                    </div>
                </span>
            </div>
        </div>}
    </div>
}