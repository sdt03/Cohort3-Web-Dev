import { ChangeEventHandler } from "react"

interface InputProps{
    title: string
    placeholder: string 
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export function Input({
    title,
    placeholder,
    onChange
}: InputProps) {
    return (
        <div>
            <input
                onChange={onChange}
                placeholder={placeholder}
                className="p-3 border border-gray-500 text-white m-2 rounded-lg"
            />
        </div>
    )
}