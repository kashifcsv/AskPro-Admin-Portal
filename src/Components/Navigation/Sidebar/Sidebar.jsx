import React from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardIcon from "../../../Assets/Images/DashboardIcon.png";
import DashMessagesIcon from "../../../Assets/Images/DashMessagesIcon.png";
import DashBellIcon from "../../../Assets/Images/DashBellIcon.png";
import manageEstimatorListPlusIcon from "../../../Assets/Images/manageEstimatorListPlusIcon.png";
import DashWindow from "../../../Assets/Images/DashWindow.png";
import DashMan from "../../../Assets/Images/DashMan.png";
import DashFile from "../../../Assets/Images/DashFile.png";
import DashFile2 from "../../../Assets/Images/DashFile2.png";
import { getChatToken } from "../../../api/Services";
import { toast } from "react-toastify";
import Badge from "@mui/material/Badge";

function Sidebar(props) {
  let navigate = useNavigate();

  const notificationsCounting = useSelector((state) => state.notificationCountReducer);

  function NotificationButton() {
    navigate("/Notifications", { replace: true });
  }

  const navigationToAllEstimators = () => {
    navigate("/AllEstimators", { replace: true });
  };

  const messages = async () => {
    const twillioToken = await getChatToken(localStorage.getItem("username"));
    if (twillioToken.success) {
      localStorage.setItem("twillio_token", twillioToken.token);
      navigate("../Messages", { replace: true });
    } else {
      toast.error(`${twillioToken.msg}`);
    }
  };

  return (
    <div className="text-white">
      <ul className="nav nav-pills d-flex align-items-center flex-column" id="menu">
        <br></br>
        <li className="nav-item">
          <span className="nav-link align-middle px-0">
            <i className="fs-4 bi-house"></i>{" "}
            <span className="ms-1  d-sm-inline ">
              <Link to="/Dashboard">
                <img src={DashboardIcon} height={40} width={40} alt="notFound" />
              </Link>
            </span>
          </span>
          Dashboard
        </li>
        <br></br>
        <li onClick={messages}>
          <Link to={"/Messages"} data-bs-toggle="collapse" className="nav-link px-0 align-middle">
            <i className="fs-4 bi-speedometer2"></i>{" "}
            <span className="ms-1  d-sm-inline">
              <img src={DashMessagesIcon} height={40} width={40} alt="" />
            </span>{" "}
          </Link>
          Messages
        </li>
        <br></br>

        <li>
          <span className="nav-link px-0 align-middle">
            <i className="fs-4 bi-table"></i>{" "}
            <span className="ms-1  d-sm-inline">
              <Badge
                badgeContent={notificationsCounting ? notificationsCounting : 0}
                color={"warning"}
                overlap="circular"
                showZero
              >
                <img
                  alt="notFound"
                  onClick={NotificationButton}
                  src={DashBellIcon}
                  height={40}
                  width={40}
                  className="pointer"
                />{" "}
              </Badge>
            </span>
          </span>
          Notification
        </li>
        <br></br>
        <li className="pointer">
          <span className="nav-link px-0 align-middle">
            <Link to="/User-Management">
              <i className="fs-4 bi-table"></i>{" "}
              <span className="ms-1  d-sm-inline">
                <img alt="notFound" src={manageEstimatorListPlusIcon} height={40} width={40} />
              </span>
            </Link>
          </span>
          User Managment
        </li>
        <br></br>
        <li>
          <Link
            to="/AllEstimators"
            onClick={navigationToAllEstimators}
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle "
            aria-current="page"
          >
            <i className="fs-4 bi-bootstrap"></i>{" "}
            <span className="ms-1 d-sm-inline">
              <img alt="notFound" src={DashWindow} height={40} width={40} />
            </span>
          </Link>
        </li>
        <br></br>
        <li>
          <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
            <i className="fs-4 bi-grid"></i>{" "}
            <span className="ms-1  d-sm-inline">
              <img alt="notFound" src={DashMan} height={40} width={40} />
            </span>{" "}
          </a>
        </li>
        <br></br>
        <li>
          <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
            <i className="fs-4 bi-grid"></i>{" "}
            <span className="ms-1  d-sm-inline">
              <img alt="notFound" src={DashFile} height={40} width={40} />
            </span>{" "}
          </a>
        </li>
        <br></br>
        <li>
          <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
            <i className="fs-4 bi-grid"></i>{" "}
            <span className="ms-1  d-sm-inline">
              <img alt="notFound" src={DashFile2} height={40} width={40} />
            </span>{" "}
          </a>
        </li>
        <br></br>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
