import React from "react";

const ErrorPage = (props) => {
  const reload = () => {
    window.location = "/";
  };
  return (
    <div className="container">
      <h1 style={{ color: "white" }}>404 Some Thing went wrong</h1>
      <br />
      <br />
      <h5 style={{ color: "white" }}>{props.error}</h5>
      <button onClick={reload} className="btn btn-primary">
        Login Page
      </button>
    </div>
  );
};

export default ErrorPage;
