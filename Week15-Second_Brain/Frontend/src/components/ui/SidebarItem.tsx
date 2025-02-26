import { ReactElement } from "react"

export function SideBarItem({text, icon}:{
    text: string,
    icon: ReactElement
}) {
    return <div className="flex text-gray-500 py-2 curson-pointer hover:bg-gray-200 rounded transition-all duration-500">
        <div className="p-2">
            {icon}
        </div>
        <div className="p-2">
            {text}
        </div>
    </div>
}