import React from "react";
import Nav from "../../Components/Navigation/Navbar/Nav";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Footer from "../../Components/Navigation/Footer/Footer";
import EstimatorRating from "../../Components/EstimatorRating/EstimatorRating.jsx";

const estimatorRatingView = () => {
  return (
    <div className="main_menu">
      <div className="row">
        {/* <div className="col-12"> */}
        <Nav />
        {/* </div> */}
      </div>
      <div className="row ">
        <div className="col-1 sidebar_bg_color">
          <Sidebar />
        </div>
        {/* ROW 1 */}
        <div className="col-11">
          <div className="row">
            <div className="row mt-2 cardsCenter">
              <EstimatorRating />
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default estimatorRatingView;
