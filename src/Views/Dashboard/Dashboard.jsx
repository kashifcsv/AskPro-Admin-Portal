import React, { useState, useEffect } from "react";
import Nav from "../../Components/Navigation/Navbar/Nav";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Footer from "../../Components/Navigation/Footer/Footer";
import Kpi from "../../Components/Kpi/Kpi";
import Login from "../../Views/Login/Login";
import Stats from "../../Components/Stats/Stats";

import "./Dashboard.css";
import PastWeekInquiries from "../../Components/Charts/LineChart/LineChart";
import RecentJobs from "../../Components/Charts/ProgressChart/ProgressChart";
import Progress from "../../Components/Charts/Donut/DonutChart";
import Notifications from "../../Components/Notifications/Notifications";
import IncomingInquiries from "../../Components/Incoming Inquiries/IncomingInquiries";
import ActiveJobs from "../../Components/Active Jobs/ActiveJobs";
import Map from "../../Components/GoogleMap/GoogleMap";
import ScheduledJobs from "../../Components/Scheduled Jobs/ScheduledJobs";
import PastOffers from "../../Components/PastOffers/PastOffers";

import { MdPersonSearch } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { GiNewspaper } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import RebidRequests from "../../Components/Tables/Rebid_Requests/RebidRequests";
import RecentEstimates from "../../Components/Tables/RecentEstimates/RecentEstimates";
import ExpiringSoon from "../../Components/Tables/ExpiringSoon/ExpiringSoon";

// Images
import History from "../../Components/Tables/History/History";
import DashBoardSeacrhIcon from "../../Assets/Images/DashBoardSeacrhIcon.png";
import ManageClientsIcon from "../../Assets/Images/ManageClientsIcon.png";
import ManageBillingCompany from "../../Assets/Images/ManageBillingCompany.png";
import Vendor from "../../Assets/Images/Vendor.png";
import ManageSuppliers from "../../Assets/Images/ManageSuppliers.png";
import {
  getStatesOfClientsAPI,
  getStatesOfCompaniesAPI,
  getStatesOfEstimatesAPI,
  getStatesOfEstimatorsAPI,
} from "../../api/Services";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";

function Dashboard(props) {
  const authUser = useAuthUser();
  const [getStates, setGetStates] = useState();
  const [getEstimator, setGetEstimator] = useState();
  const [getClients, setGetClients] = useState();
  const [getCompanies, setGetCompanies] = useState();

  useEffect(() => {
    getStatesOfEstimates();
    getStatesOfEstimators();
    // getStatesOfClients();
    getStatesOfCompanies();
  }, []);

  const getStatesOfEstimates = async () => {
    try {
      let response = await getStatesOfEstimatesAPI(authUser().company.company_id);
      if (response.success) {
        setGetStates(response.states);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const getStatesOfEstimators = async () => {
    try {
      let response = await getStatesOfEstimatorsAPI(authUser().company.company_id);
      if (response.success) {
        setGetEstimator(response.states);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const getStatesOfClients = async () => {
    try {
      let response = await getStatesOfClientsAPI(authUser().company.company_id);
      if (response.success) {
        setGetClients(response.states);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getStatesOfCompanies = async () => {
    try {
      let response = await getStatesOfCompaniesAPI(authUser().company.company_id);
      if (response.success) {
        setGetCompanies(response.states);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

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
        {/* ROW 1 */}
        <div className="col-11">
          <div className="row">
            <div className="row mt-4 cardsCenter">
              <Kpi
                id="ManageEstimators"
                title="Manage Estimators"
                icon={DashBoardSeacrhIcon}
                height={45}
              />
              <Kpi title="Manage Clients" icon={ManageClientsIcon} height={45} />
              <Kpi
                id="ManageBillingCompany"
                title="Manage Billing Company"
                icon={ManageBillingCompany}
                height={40}
              />
              <Kpi title="Manage Vendor" icon={Vendor} height={45} />
              <Kpi title="Manage Suppliers" icon={ManageSuppliers} height={45} />
            </div>
          </div>
          <br></br>
          <div className="row justify-content-center">
            <div className="row justify-content-center mt-2">
              <Stats title="Clients" value={getClients ? getClients : 0} />
              &emsp;
              <Stats
                title="Billing Companies"
                value="N/A"
                //  value={getCompanies ? getCompanies : 0}
              />
              &emsp;
              <Stats title="Estimators" value={getEstimator ? getEstimator : 0} />
              &emsp;
              <Stats title="Vendors" value="N/A" />
              &emsp;
              <Stats title="Suppliers" value="N/A" />
              &emsp;
              <Stats
                title="Total Estimates"
                value={getStates?.totalEstimates ? getStates?.totalEstimates : 0}
              />
              &emsp;
            </div>
          </div>
          <br></br>
          <div className="row justify-content-center">
            <div className="row justify-content-center mt-4">
              <Stats
                title="Accepted"
                value={getStates?.acceptedEstimates ? getStates?.acceptedEstimates : 0}
              />
              &emsp;
              <Stats
                title="Rejected"
                value={getStates?.rejectedEstimates ? getStates?.rejectedEstimates : 0}
              />
              &emsp;
              <Stats
                title="Pending"
                value={getStates?.pendingEstimates ? getStates?.pendingEstimates : 0}
              />
              &emsp;
              <Stats
                title="In Rebid"
                value={getStates?.inRebidEstimates ? getStates?.inRebidEstimates : 0}
              />
              &emsp;
              <Stats
                title="Near Expiration"
                value={getStates?.expiringSoonEstimates ? getStates?.expiringSoonEstimates : 0}
              />
              &emsp;
              <Stats
                title="Expired"
                value={getStates?.expiredEstimates ? getStates?.expiredEstimates : 0}
              />
              &emsp;
            </div>
          </div>
          &emsp;
          <div className="row justify-content-center mt-4">
            <div className="col-12 ">
              <RebidRequests dropdown={false} icon={true} paginator={false} moveup={false} />
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-12 ">
              <RecentEstimates paginator={false} icon={true} searchBar={false} moveup={false} />
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-12 ">
              <ExpiringSoon icon={true} paginator={false} moveup={false} />
            </div>
          </div>
          &emsp;{" "}
          <div className="row justify-content-center mt-4">
            <div className="col-12 ">
              <History icon={true} paginator={false} moveup={false} />
            </div>
          </div>
          &emsp;
        </div>
      </div>
      <div className="row ">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
