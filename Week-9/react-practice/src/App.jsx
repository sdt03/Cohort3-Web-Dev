import { useState } from "react";
import { PostComponent } from "./Post";

function App(){
  const [posts, setPosts] = useState([]);

  const postComponents = posts.map(post => <PostComponent 
    name={post.name}
    subtitle={post.subtitle}
    time={post.time}
    image={post.image}
    description={post.description}
  />)
  
  function addPost() {
    setPosts([...posts, {
      name: "Shoumik",
      subtitle: "1M Followers",
      time: "2m ago",
      image: "https://media.istockphoto.com/id/931336618/vector/clock-vector-icon-isolated.jpg?s=612x612&w=0&k=20&c=II8EBJl8i6olqcrhAtKko74ydFEVbfCQ6s5Pbsx6vfas=",
      description: "Pleased to tell you that, I have joined google as SDE-1....."
    }])
  }

  return (
    <div style={{background: "#dfe6e9", height:"100vh"}}>
      <button onClick={addPost}>Add post</button>
      <div style={{display: flex, justifyContent: "center"}}>
      <div> 
       {postComponents}
      </div>
    </div>
    </div>
  )
}

export default App