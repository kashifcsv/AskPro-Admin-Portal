import React from "react";
import Nav from "../../Components/Navigation/Navbar/Nav";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Footer from "../../Components/Navigation/Footer/Footer";
import Chat from "../../Components/Chat/Chat";

const Chatting = () => {
  return (
    <div className="main_menu">
      <div className="row ">
        <div className="col-12">
          <Nav />
        </div>
      </div>
      <div className="row ">
        <div className="col-1 sidebar_bg_color">
          <Sidebar />
        </div>
        <div className="col-1"></div>

        <div className="col-9">
          <div className="row">
            &nbsp; &nbsp;
            <Chat />
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row footercss">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Chatting;
