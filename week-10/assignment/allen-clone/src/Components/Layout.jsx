import React from "react"
import reactLogo from "../assets/react.svg";
import "../App.css"

function Layout() {
    return (
      <div className="layout-container">
      <div className="content">
        <h1>Online coaching that delivers results</h1>
        <p style={{color: "gray"}}>Explore our online courses</p>
        <div className="course-buttons">
          <button className="course-btn">NEET</button>
          <button className="course-btn">JEE</button>
          <button className="course-btn">Class 6–10</button>
          <div className="image-section">
        </div>
      </div>
        </div>
      </div>
  );
  }
  
  export default Layout