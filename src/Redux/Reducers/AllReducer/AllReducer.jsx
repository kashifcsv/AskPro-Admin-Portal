import isLogged from "../Login/IsLogged";
import isAdmin from "../Roles/Admin";
import isUser from "../Roles/User";
import RecentEstimateStatus from "../RecentEstimatesStatus/RecentEstimatesStatus";
import isNewPwdEmail from "../Login/NewPwdEmail";
import notificationCountReducer from "../NotificationCounts/notificationsCountReducer";
import { combineReducers } from "redux";
import * as storage from "redux-storage";

const allReducer = storage.reducer(
  combineReducers({
    isLogged,
    isAdmin,
    isUser,
    RecentEstimateStatus,
    notificationCountReducer,
    isNewPwdEmail,
  })
);

export default allReducer;
