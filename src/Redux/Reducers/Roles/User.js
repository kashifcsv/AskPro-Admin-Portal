const isUser = (state = false, action) => {
  switch (action.type) {
    case "Normal":
      return !state;

    default:
      return state;
  }
};

export default isUser;
