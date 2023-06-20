export const isLoggedAction = () => {
  return {
    type: "Login",
  };
};

export const roleAdminAction = () => {
  return {
    type: "Admin",
  };
};

export const roleNormalAction = () => {
  return {
    type: "Normal",
  };
};

export const isLoggedOutAction = () => {
  return {
    type: "LogOut",
  };
};

export const setRecentEstimateStatusAction = () => {
  return {
    type: "",
    type: "pending",
    // type: "accepted",
    // type: "rejected",
  };
};

export const newPwdEmailAction = (value) => {
  return {
    type: "EmailId",
    payload: value,
  };
};

export const notificationCountAction = (value) => {
  return {
    type: "notificationCount",
    payload: value,
  };
};
