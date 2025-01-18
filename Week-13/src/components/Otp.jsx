import { useRef, useState } from "react"
import { Button } from "./Buttons";

export function Otp({number}){
    const ref = useRef(Array(number).fill(0));
    const [disabled, setDisabled] = useState(true);

    return <div className="flex justify-center">
        {number}
        {Array(number).fill(1).map((x, index) => <SubOtpBox reference={(e) => ref.current[index]=e} key={index} onDone={()=>{
            ref.current[index+1].focus();
        }} goBack={()=>{
            if(index==0) return
            ref.current[index-1].current.focus();
        }} />)} 
        <br />
        <Button disabled={disabled}>Sign up</Button>
      </div>
}

function SubOtpBox({
    reference, onDone, goBack
}) {
    const [inputBoxVal, setInputBoxVal] = useState("");

    return <div>
        <input value={inputBoxVal} ref={reference} onKeyUp={(e)=>{
            if (e.key=="Backspace"){
                goBack();
            }
        }} onChange={(e)=>{
            const val = e.target.value;
            if (val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6" || val == "7" || val == "8" || val  == "9") {
                setInputBoxVal(val);
                onDone();
            } else {

            }
        }} type="text" className="m-1 w-[40px] h-[50px] rounded-xl outline-none px-4 text-white"></input>
    </div>
}