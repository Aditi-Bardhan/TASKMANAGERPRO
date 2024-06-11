import React, { useState } from "react";
import axios from "axios";
import "./sign.css";
import { Link, useNavigate } from "react-router-dom";
import loginpic from "./istockphoto-1354770625-612x612.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("To Login All fields are required ..");
      return;
    }
    axios
      .post("http://localhost:8080/login", { email, password })
      .then((response) => {
        console.log("Login successful!");
        localStorage.setItem("authenticated", true);
        localStorage.setItem("email", email);
        navigate("/List");
      })
      .catch((error) => {
        alert("Email or Password is wrong \nCheck once the details entered");
        console.error("Login failed.");
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h4>SIGN IN</h4>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "40%",
        }}
      >
        <img
          src={loginpic}
          alt="alternative text"
          style={{ mixBlendMode: "multiply" }}
          height={380}
        />
        <form onSubmit={handleSubmit} className="form">
          <div className="input-container">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button type="submit" className="submit">
              Login
            </button>
          </div>
          <br />
          <p style={{ textAlign: "center", alignItems: "center" }}>
            Not yet Registered ? <Link to="/register">Register</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
