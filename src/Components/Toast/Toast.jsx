import React from "react";

const Toast = (props) => {
  return (
    <div>
      <div
        className={`alert alert-${
          props.success ? props.success : "success"
        } alert-dismissible fade show `}
        style={{ width: "35rem" }}
        role="alert"
      >
        {props.message}
      </div>
      {/* <button
        type="button"
        className="close btn btn-primary"
        data-dismiss="alert"
        aria-label="Close"
        style={{ float: "right" }}
      >
        <span aria-hidden="true">&times;</span>
      </button> */}
    </div>
  );
};

export default Toast;
