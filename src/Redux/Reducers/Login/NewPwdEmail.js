const isNewPwdEmail = (state = "", action) => {
    switch (action.type) {
      case "EmailId": {
        state = action.payload;
        return state;
      }
      default:
        return state;
    }
  };
  
  export default isNewPwdEmail;