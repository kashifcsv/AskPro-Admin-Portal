import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Views/Dashboard/Dashboard";
import Login, { roled } from "../Views/Login/Login";
import BookNow from "../Components/BookNow/BookNow";
import { QuotationPage } from "../Views/Quotations/Quotations";

import PastOffers from "../Views/PastOffers/PastOffers";
import ErrorPage from "../Views/Error/ErrorPage";
import Auth from "../Auth/Auth";
import Register from "../Views/Register/Register";

// this import is for socket
import Join, { user } from "../Components/Sockets/Join/Join";
import Chat from "../Components/Sockets/Chat/Chat";
// that import was for socket

//! For testing purpose
import DashBoardClient from "../Views/DashBoardClient/DashBoardClient";
import { useSelector } from "react-redux";
import RecentEstimatePage from "../Views/RecentEstimatePage/RecentEstimatePage";
import AddEstimatorView from "../Views/AddEstimatorView/AddEstimatorView";
import AllEstimatorsPage from "../Views/AllEstimators/AllEstimatorsPage";
import UpdateEstimatorsView from "../Views/UpdateEstimatorsView/UpdateEstimatorView";
import ManageEstimatorsListView from "../Views/ManageEstimatorsListView/ManageEstimatorsListView";
import { ActiveJobsView } from "../Views/ActiveJobsView/ActiveJobsView";
import RebidRequestsView from "../Views/RebidRequestsView/RebidRequestsView";
import ExpiringSoonView from "../Views/ExpiringSoonView/ExpiringSoonView";
import ForgotPassword from "../Views/ForgotPassword/ForgotPassword";
import RecoveryCode from "../Views/RecoveryCode/RecoveryCode";
import CreateNewPassword from "../Views/CreateNewPassword/CreateNewPassword";
import PasswordReset from "../Views/PasswordReset/PasswordReset.jsx";
import SignUp from "../Views/SignUp/SignUp.jsx";
import EstimatorRatingView from "../Views/EstimatorRatingView/estimatorRatingView";
import RebidView from "../Views/RebidView/RebidView";
import NotificationsUIView from "../Views/NotificationsUIView/NotificationsUIView";
import RecentOfferasView from "../Views/RecentOfferasView/recentOfferasView";
import HistoryView from "../Views/HistoryView/HistoryView";
import { EditQuotationPage } from "../Views/EditQuotation/EditQuotation";
// import EnhancedTable from "../Components/Tables/sharedTable/sharedTable";
import EnhancedTable from "../Components/Tables/sharedTable/sharedTable.jsx";
import Messages from "../Views/Messages/Messages";
import Chatting from "../Views/Chatting/Chatting";
import UserManagmentList from "../Views/UserManagment/UserManagmentList";
import AddUserView from "../Views/UserManagment/AddUserView";
import UpdateUserView from "../Views/UserManagment/UpDateUserView";
import UserPermissionView from "../Views/UserManagment/UserPermissionView";
import { RequireAuth, AuthProvider } from "react-auth-kit";
import UserManagementDetails from "../Views/UserManagementDetails/UserManagementDetails";
import AddRoleView from "../Views/UserManagment/AddRoleView";

export const Router = () => {
  return (
    <div>
      <AuthProvider authType={"localStorage"} authName={"auth"}>
        <BrowserRouter>
          <Routes>
            {/* Public routes  */}
            <Route path="/" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/CreateNewPassword" element={<CreateNewPassword />} />
            <Route path="/RecoveryCode" element={<RecoveryCode />} />
            {/* Protected routes  */}
            <Route
              path="/Dashboard"
              element={
                <RequireAuth loginPath={"/"}>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/Quotation"
              element={
                <RequireAuth loginPath={"/"}>
                  <QuotationPage />
                </RequireAuth>
              }
            />
            <Route
              path="/EditQuotation"
              element={
                <RequireAuth loginPath={"/"}>
                  <EditQuotationPage />
                </RequireAuth>
              }
            />
            <Route
              path="/Rebid"
              element={
                <RequireAuth loginPath={"/"}>
                  <RebidView />
                </RequireAuth>
              }
            />
            <Route
              path="/EstimatorRating"
              element={
                <RequireAuth loginPath={"/"}>
                  <EstimatorRatingView />
                </RequireAuth>
              }
            />
            <Route
              path="/RecentOfferas"
              element={
                <RequireAuth loginPath={"/"}>
                  <RecentOfferasView />
                </RequireAuth>
              }
            />
            <Route
              path="/BookNow"
              element={
                <RequireAuth loginPath={"/"}>
                  <BookNow />
                </RequireAuth>
              }
            />
            <Route
              path="/PastOffers"
              element={
                <RequireAuth loginPath={"/"}>
                  <PastOffers />
                </RequireAuth>
              }
            />
            <Route
              path="/AddEstimator"
              element={
                <RequireAuth loginPath={"/"}>
                  <AddEstimatorView />
                </RequireAuth>
              }
            />
            <Route
              path="/Register"
              element={
                <RequireAuth loginPath={"/"}>
                  <Register />
                </RequireAuth>
              }
            />
            <Route
              path="/Join"
              element={
                <RequireAuth loginPath={"/"}>
                  <Join />
                </RequireAuth>
              }
            />
            <Route
              path="/RecentEstimates"
              element={
                <RequireAuth loginPath={"/"}>
                  <RecentEstimatePage />
                </RequireAuth>
              }
            />
            <Route
              path="/AllEstimators"
              element={
                <RequireAuth loginPath={"/"}>
                  <AllEstimatorsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/UpdateEstimators"
              element={
                <RequireAuth loginPath={"/"}>
                  <UpdateEstimatorsView />
                </RequireAuth>
              }
            />
            <Route
              path="/ManageEstimators"
              element={
                <RequireAuth loginPath={"/"}>
                  <ManageEstimatorsListView />
                </RequireAuth>
              }
            />
            <Route
              path="/ActiveJobs"
              element={
                <RequireAuth loginPath={"/"}>
                  <ActiveJobsView />
                </RequireAuth>
              }
            />
            <Route
              path="/RebidRequests"
              element={
                <RequireAuth loginPath={"/"}>
                  <RebidRequestsView />
                </RequireAuth>
              }
            />
            <Route
              path="/ExpiringSoon"
              element={
                <RequireAuth loginPath={"/"}>
                  <ExpiringSoonView />
                </RequireAuth>
              }
            />
            <Route
              path="/Notifications"
              element={
                <RequireAuth loginPath={"/"}>
                  <NotificationsUIView />
                </RequireAuth>
              }
            />{" "}
            <Route
              path="/History"
              element={
                <RequireAuth loginPath={"/"}>
                  <HistoryView />
                </RequireAuth>
              }
            />
            <Route
              path="/sharedTable"
              element={
                <RequireAuth loginPath={"/"}>
                  <EnhancedTable />
                </RequireAuth>
              }
            />
            <Route
              path="/Messages"
              element={
                <RequireAuth loginPath={"/"}>
                  <Messages />
                </RequireAuth>
              }
            />
            <Route
              path="/Chat"
              element={
                <RequireAuth loginPath={"/"}>
                  <Chatting />
                </RequireAuth>
              }
            />
            <Route
              path="/User-Management"
              element={
                <RequireAuth loginPath={"/"}>
                  <UserManagmentList />
                </RequireAuth>
              }
            />
            <Route
              path="/Add-User"
              element={
                <RequireAuth loginPath={"/"}>
                  <AddUserView />
                </RequireAuth>
              }
            />
            <Route
              path="/Update-User"
              element={
                <RequireAuth loginPath={"/"}>
                  <UpdateUserView />
                </RequireAuth>
              }
            />
            <Route
              path="/User-Permissions"
              element={
                <RequireAuth loginPath={"/"}>
                  <UserPermissionView />
                </RequireAuth>
              }
            />
            <Route
              path="/UserManagementDetails"
              element={
                <RequireAuth loginPath={"/"}>
                  <UserManagementDetails />{" "}
                </RequireAuth>
              }
            />
            <Route
              path="/Add-Roles"
              element={
                <RequireAuth loginPath={"/"}>
                  <AddRoleView />{" "}
                </RequireAuth>
              }
            />
            {/* Error Page  */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default Router;
