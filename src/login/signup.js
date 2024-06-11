import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from "./istockphoto-1371797878-612x612.jpg";
import "./sign.css";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("To Register All fields are required ..");
      return;
    }
    if (password === confirmPassword) {
      axios
        .post("http://localhost:8080/register", {
          name,
          email,
          password,
        })
        .then((response) => {
          console.log("Registration successful!");
          localStorage.setItem("authenticated", true);
          localStorage.setItem("email", email);
          navigate("/List");
        })
        .catch((error) => {
          console.error("Registration failed.", error);
          alert("Sorry! Registration Failed");
        });
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <div
      style={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40%",
        }}
      >
        <form onSubmit={handleRegister} className="form">
          <h4>SIGN UP</h4>
          <div className="input-container">
            <input
              placeholder="Name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="text_input"
              required
            />
          </div>
          <div className="input-container">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="text_input"
              required
            />
          </div>
          <div className="input-container">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="text_input"
              required
            />
          </div>
          <div className="input-container">
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="text_input"
              required
            />
          </div>
          <button type="submit" className="submit">
            Register
          </button>
          <br />
          <br />
          <p>
            Already Registered?<Link to="/login">Login</Link>
          </p>
        </form>
        <img src={image} alt="alternative text"  height={380} />

      </div>
    </div>
  );
}

export default Registration;
