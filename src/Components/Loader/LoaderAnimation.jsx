import React from "react";
// Loader
import Loader from "react-js-loader";

const LoaderAnimation = (props) => {
  return (
    // <div className={"row"}>
    //   <div className={"item"}>
        <Loader
          type="spinner-circle"
          bgColor={"#427FB9"}
          size={props.size}
        />
    //   </div>
    // </div>
  );
};

export default LoaderAnimation;
