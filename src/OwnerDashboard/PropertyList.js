import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import "./PropertyList.css";
import Header from "./header";
import axios from "axios";
import oop from "./oops.png";

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8080/task/getData/${email}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Can't fetch details", error);
          setError("Failed to fetch data");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No email found in local storage");
    }
  }, [email]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/task/deleteOne/${id}`)
      .then((response) => {
        console.log(response.data);
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <br />
      <div className="header-container">
        
      </div>
      <br />
      <div><div>
        {error ? (
          <div className="error-message">{error}</div>
        ) : Array.isArray(data) && data.length > 0 ? (
          <MDBRow className="g-6">
            {data.map((item) => (
              <MDBCol md="6" lg="4" key={item.id}>
                <MDBCard>
                  <MDBCardHeader>{item.title || " "}</MDBCardHeader>
                  <MDBCardBody>
                    <MDBCardText>
                      {item.des && (
                        <div>
                          <h6>Description:</h6>
                          <p>{item.des}</p>
                        </div>
                      )}<br></br>
                      {item.date && (
                        <div>
                          <h6>Date:</h6>
                          <p>{item.date}</p>
                        </div>
                      )}<br></br>
                      {item.time && (
                        <div>
                          <h6>Time:</h6>
                          <p>{item.time}</p>
                        </div>
                      )}<br></br>
                    </MDBCardText>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        ) : (
          <div className="empty-container">
            <img src={oop} alt="alternative" className="ooppic" />
            <h3>This Page is Empty. Since you haven't added any tasks.</h3>
          </div>
        )}</div>
      </div>
    </div>
  );
};

export default List;
