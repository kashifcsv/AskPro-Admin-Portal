const isLogged = (state = false, action) => {
  switch (action.type) {
    case "Login":
      // let loginNewState = localStorage.setItem("IsLogged" , !state)
      return !state;

    default:
      return state;
  }
};

export default isLogged;
