import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Routes/Index";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./Views/Error/ErrorPage";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { notificationCountAction } from "./Redux/Actions/Action";
import { getUnreadNotifications } from "./api/Services";
import { useAuthUser } from "react-auth-kit";

function ErrorHandler({ error }) {
  return (
    <div role="alert">
      <ErrorPage error={error.message} />
    </div>
  );
}
function App() {
  const dispatch = useDispatch();
  // const authUser = useAuthUser();
  const [count, setCount] = useState(0);

  useEffect(() => {
    notificationCount();
    notificationCountApi();
  }, []);

  const notificationCount = () => {
    setInterval(async () => {
      await notificationCountApi();
    }, 30000);
  };

  const notificationCountApi = async () => {
    try {
      const response = await getUnreadNotifications(localStorage.getItem("company__ID"));
      if (response.success) {
        setCount(response.unreadNotifications);
        dispatchingNotificationsCount(response.unreadNotifications);
      } else {
        setCount(0);
      }
    } catch (error) {
      toast.error(error.message);
    }
    return true;
  };

  const dispatchingNotificationsCount = (param) => {
    dispatch(notificationCountAction(param));
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <div className="App">
        <Router />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
