import React, { useState, useEffect } from "react";
import backimage from "./6-Great-Benefits-of-Using-Employee-Task-Management-Software.webp";
import "./enterance.css";
import { useNavigate } from "react-router-dom";

const Enterance = () => {
  const [isAnimationStarted, setAnimationStarted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimationStarted(true);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isAnimationStarted ? "hidden" : "hidden";
  }, [isAnimationStarted]);

  
  return (
    <div className="homepage">
      <img className="background-image" src={backimage} alt="Background" />
      <div className="overlay" />
      <div className={`text-container ${isAnimationStarted ? "animate" : ""}`}>
        <div className="center-text"><h1>TASK MANAGER</h1></div>
        <p className="sub-center"><h2>Organise and Manage Tasks</h2></p>
        <br />
        <br />
        <br />
        {isAnimationStarted && (
          navigate("/login")
        )}
        
      </div>
    </div>
  );
};

export default Enterance;
