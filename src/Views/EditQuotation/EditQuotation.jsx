import React from "react";
import Nav from "../../Components/Navigation/Navbar/Nav";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Footer from "../../Components/Navigation/Footer/Footer";

import "../Quotations/Quotations.css";
import { EditQuotation } from "../../Components/EditQuotation/EditQuotation";

export const EditQuotationPage = () => {
  return (
    <div className="main_menu">
      <div className="row">
        <div className="col-12">
          <Nav />
        </div>
      </div>
      <div className="row " style={{ backgroundColor: "white" }}>
        <div className="col-1 sidebar_bg_color">
          <Sidebar />
        </div>
        <div className="col-11 mt-2">
          <div className="row justify-content-center">
            <div className="col-11" style={{ backgroundColor: "#FFFFFF" }}>
              <EditQuotation />
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
