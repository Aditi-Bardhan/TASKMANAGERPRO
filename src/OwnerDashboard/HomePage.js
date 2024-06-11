import React, { useState, useEffect } from "react";
import Header from "./header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'; // Import rsuite CSS

function OwnerHomePage() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [email, setEmail] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      console.log(`Email retrieved from localStorage: ${storedEmail}`);
    } else {
      console.error("No email found in local storage");
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const formattedDate = date ? date.toISOString().split('T')[0] : "";
    const formattedTime = time ? time.toTimeString().split(' ')[0] : "";

    const formData = {
      title: title,
      des: des,
      date: formattedDate,
      time: formattedTime,
      email: email 
    };

    axios
      .post("http://localhost:8080/task/add", formData)
      .then((response) => {
        console.log(response.data);
        navigate("/List");
      })
      .catch((error) => {
        console.error("Adding Tasks Failed.", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="card">
          <div className="heading">ADD TASK</div>
          <form onSubmit={handleFormSubmit}>
            <div className="inputBox">
              <input
                type="text"
                name="title"
                placeholder="TITLE"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <br />
            <div className="inputBox">
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={des}
                onChange={(e) => setDes(e.target.value)}
              />
            </div>
            <br />
            <div className="inputBox custom-datepicker">
              <DatePicker 
                placeholder="DATE"
                value={date}
                onChange={setDate}
                style={{ width: '100%' }}
              />
            </div>
            <br />
            <div className="inputBox custom-datepicker">
              <DatePicker 
                format="HH:mm:ss"
                placeholder="TIME"
                value={time}
                onChange={setTime}
                ranges={[]}
                style={{ width: '100%' }}
              />
            </div>
            <br />
            <br />
            <button
              type="submit"
              className="btn"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerHomePage;
