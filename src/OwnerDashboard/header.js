import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const headerStyle = {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    padding: "1rem",
    backgroundColor: "rgb(41, 125, 215)",
    fontWeight: "bold", 
  };
  
  const buttonStyle = {
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    gap: "40px",
    textDecoration: "none",
  };
  
  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  const handleLogout = () => {
    localStorage.setItem("authenticated", false);
    localStorage.setItem("email", "");
  };
  return (
    <header style={headerStyle}>
      <div>
        <h4>WELCOME TO TASK MANAGER</h4>
      </div>
      <div style={buttonStyle}>
        <Link to="/List" style={linkStyle}>Tasks</Link>
        <Link to="/AddTask" style={linkStyle}>Add Task</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
        <Link to="/" onClick={handleLogout} style={linkStyle}>
          Logout
        </Link>
      </div>
    </header>
  );
}
