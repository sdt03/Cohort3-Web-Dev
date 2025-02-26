import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";

export function SideBar(){
    return <div className="fixed top-0 left-0 h-screen w-72 bg-white border-gray-r pl-6">
        <div className="flex text-xl pt-4 items-center">
            <div className="pr-2 text-purple-600">
                <Logo />
            </div>
            Second Brain
        </div>
        <div className="pt-8 pl-4">
            <SideBarItem icon={<TwitterIcon />} text="Twitter" />
            <SideBarItem icon={<YoutubeIcon />} text="Youtube" />
        </div>
    </div>
}