import React from "react";
import Nav from "../../Components/Navigation/Navbar/Nav";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Footer from "../../Components/Navigation/Footer/Footer";
import AddEstimator from "../../Components/AddEstimator/AddEstimator";

const AddEstimatorView = () => {
  return (
    <div className="main_menu">
      <div className="row">
        <div className="col-12">
          <Nav />
        </div>
      </div>
      <div className="row ">
        <div className="col-1 sidebar_bg_color">
          <Sidebar />
        </div>

        <AddEstimator />
      </div>
      <div className="row ">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AddEstimatorView;
