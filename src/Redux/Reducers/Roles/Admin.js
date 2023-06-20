const isAdmin = (state = false, action) => {
  switch (action.type) {
    case "Admin":
      return !state;

    default:
      return state;
  }
};

export default isAdmin;
