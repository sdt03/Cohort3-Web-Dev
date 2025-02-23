import { PlusIcon } from "./components/icons/PlusIcon";
import { Button } from "./components/ui/Button";

function App(){
  return(
    <>
      <Button variant="primary" size="md" text={"Share"} onClick={()=>{}}/>
      <Button startIcon={<PlusIcon size={"lg"}/>}variant="secondary" size="md" text={"Add Content"} onClick={()=>{}} />
    </>
  )
  
}

export default App;