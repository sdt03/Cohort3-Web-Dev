import { useState } from "react";
import { CreateContentModal } from "./components/CreateContentModal";
import { PlusIcon } from "./components/icons/PlusIcon";
import { ShareIcon } from "./components/icons/ShareIcon";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";

function App(){
  const [modalOpen, setModalOpen] = useState(false);


  return <div className="p-4">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(!modalOpen);
      }} />
        <div className="flex justify-end gap-4">
        <Button startIcon={<ShareIcon size={"md"}/>} variant="primary" size="sm" text={"Share Brain"} onClick={()=>{}}/>
        <Button startIcon={<PlusIcon size={"md"}/>}variant="secondary" size="sm" text={"Add Content"} onClick={()=>{setModalOpen(true)}} />
      </div>
      <div className="flex">
        <Card title={"Share Project"} type="twitter" link="https://x.com/sdt0304/status/1863295148467298405"/>
      </div>
      

    </div>
  
  
}

export default App;