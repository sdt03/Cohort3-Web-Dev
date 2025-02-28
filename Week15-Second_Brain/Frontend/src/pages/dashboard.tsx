import { useEffect, useState } from "react";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { PlusIcon } from "../components/icons/PlusIcon";
import { ShareIcon } from "../components/icons/ShareIcon";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { SideBar } from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";


function Dashboard(){
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(()=>{
    refresh();
  }, [modalOpen]);

  return <div>
      <SideBar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-gray-2">
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(!modalOpen);
        }} />
          <div className="flex justify-end gap-4">
          <Button startIcon={<ShareIcon size={"md"}/>} variant="primary" size="sm" text={"Share Brain"} onClick={async ()=>{
            const response = await axios.post(`${BACKEND_URL}/api/v1/share`, {
              share: true
            }, {
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            });
            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            alert(shareUrl);
          }}/>
          <Button startIcon={<PlusIcon size={"md"}/>}variant="secondary" size="sm" text={"Add Content"} onClick={()=>{setModalOpen(true)}} />
        </div>
        <div className="flex gap-4">
            {contents.map(({title, link, type}: any)=> 
            <Card 
              type={type}
              title={title}
              link={link}  
          /> )}
        </div>
      </div>
    </div>

}

export default Dashboard;