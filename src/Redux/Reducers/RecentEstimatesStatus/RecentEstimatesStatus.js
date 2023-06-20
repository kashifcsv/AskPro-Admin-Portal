const RecentEstimateStatus = (state = "", action) => {
  switch (action.type) {
    case "":
      return state;
    case "pending":
      return (state = "pending");
    // case "accepted":
    //   return (state = "accepted");
    // case "1rejected":
    //   return (state = "1rejected");
    // case "pending":
    //   return (state = "pending");

    default:
      return state;
  }
};

export default RecentEstimateStatus;