import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import Header from "../OwnerDashboard/header";
import profilepic from "./profilepic1.jpg";

const Profile = () => {
  const [user, setUser] = useState({});
  const [password, setPassword] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState(" ");
  const [passmode, setPassmode] = useState(true);
  const data = localStorage.getItem("email");
 
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getData/${data}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Can't fetch details");
      });
  }, [data]);

  const handlePassword = () => {
    if (password === confirmPassword) {
      axios
        .put("http://localhost:8080/changePass", {
          email: user.email,
          password: password,
        })
        .then((response) => {
          alert.success("Password Changed!");
          setPassmode(true);
        })
        .catch((error) => {
          alert.error("Sorry! Password Can't be Changed");
        });
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <div className="main-container">
      <Header />
      <div className="container">
        <div className="left-div" >
          <img
            src={profilepic }
            alt="Can't fetch profile"
            className="picture"
          />          
        </div>
        <div className="right-div">
          <h6>Name</h6> : <p> {user.name} </p>
          <hr />
          <h6>Email</h6> : <p> {user.email} </p>
          <hr />
          {passmode ? (
            <div>
              <h6>Password</h6> ********
              <br />
              <button
                onClick={() => setPassmode(false)}
                className="passwordClass"
              > Forget Password ?
              </button>
              <hr />
            </div>
          ) : (
            <div>
              <div>
                <h6 style={{ display: "flex" }}>New Password</h6>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div><br />
              <div>
                <h6 style={{ display: "flex" }}>Confirm Password</h6>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div><br />
              <button onClick={handlePassword} className="btn1">SET</button>
              <hr />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
