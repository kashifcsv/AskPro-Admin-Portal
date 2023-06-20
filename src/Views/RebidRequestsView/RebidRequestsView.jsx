import React from "react";
import Nav from "../../Components/Navigation/Navbar/Nav";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Footer from "../../Components/Navigation/Footer/Footer";
import RebidRequests from "../../Components/Tables/Rebid_Requests/RebidRequests";

const RebidRequestsView = () => {
  return (
    <div className="main_menu">
      <div className="row">
        <div className="col-12">
          <Nav />
        </div>
      </div>
      <div className="row">
        <div className="col-1 sidebar_bg_color">
          <Sidebar />
        </div>
        <div className="col-11">
          <div className="row justify-content-center">
            <div className="col-11">
              <RebidRequests dropdown={false} icon={false} paginator={true} moveup={true}/>
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

export default RebidRequestsView;
