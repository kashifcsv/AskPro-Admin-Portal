import React from "react";
import { useNavigate } from "react-router-dom";

export const BookNow = () => {
  
  let navigate = useNavigate();

  return (
    <>
      <h1>BookNow Works</h1> <br />
      <button onClick={() => navigate("/Dashboard")} className="btn btn-primary">Dashboard</button>
    </>
  );
};
export default BookNow;
