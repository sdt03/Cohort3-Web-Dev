import { ReactElement } from "react";

export interface ButtonProps{
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
}

const defaultStyles = "rounded-md px-4 py-2 flex font-light items-center"

const sizeStyles = {
    "sm": "py-1 px-2 text-sm",
    "md": "py-2 px-4 text-md",
    "lg": "py-3 px-6 text-xl"
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

export const Button = ({variant, size, text, startIcon, endIcon, onClick}: ButtonProps) => {
    return <button onClick={onClick} className={`${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]} cursor-pointer`}>
        {startIcon? <div className="pr-2">
            {startIcon}
        </div> : null} 
    {text}
    </button>
}   
