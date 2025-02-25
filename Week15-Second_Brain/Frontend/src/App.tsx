import { PlusIcon } from "./components/icons/PlusIcon";
import { ShareIcon } from "./components/icons/ShareIcon";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";

function App(){
  return(
    <>
      <Button startIcon={<ShareIcon size={"md"}/>} variant="primary" size="sm" text={"Share Brain"} onClick={()=>{}}/>
      <Button startIcon={<PlusIcon size={"md"}/>}variant="secondary" size="sm" text={"Add Content"} onClick={()=>{}} />
      {/* <Card title={"Share Project"} type="youtube" link="youtube.com"/> */}
    </>
  )
  
}

export default App;