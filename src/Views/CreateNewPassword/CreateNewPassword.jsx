import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateNewPassword.css";
import footer from "../../Assets/Images/Group 3071.png";
import cleanAsk from "../../Assets/Images/Group 3072.png";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import lock from "../../Assets/Images/Icon feather-lock.png";
import { SendNewPassword } from "../../api/Services";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateNewPassword = () => {
  const [values, setValues] = useState({
    password: "",
    password2: "",
    showPassword1: false,
    showPassword2: false,
  });

  let navigate = useNavigate();
  const email = useSelector((state) => state.isNewPwdEmail);

  // Functions
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword1: !values.showPassword1,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange2 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword2 = () => {
    setValues({
      ...values,
      showPassword2: !values.showPassword2,
    });
  };

  const handleMouseDownPassword2 = (e) => {
    e.preventDefault();
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();
    if (values.password !== "" && values.password === values.password2) {
      var data = JSON.stringify({
        email: email,
        password: values.password,
      });
      try {
        let sendNewPasswordResponse = await SendNewPassword(data);
        if (sendNewPasswordResponse.success) {
          navigate("/passwordreset", { replace: true });
        } else {
          toast.error("sendNewPasswordResponse is not valid");
        }
      } catch (error) {
        toast.error("Something went wrong", error);
      }
    } else {
      toast.error("Please enter your password correctly");
    }
  };

  return (
    <div className="row loginComponent">
      {/* <button className="btn btn-danger" onClick={() => navigate("/Join")}>
        Chat
      </button> */}
      {/* <section className="vh-100 bgColorLogin"> */}
      <div className="container h-100">
        <div className="row mt-4">
          <div className="col-2">
            <Link to={"/"} className="navbar-brand">
              <img className="logoTitle" src={cleanAsk} alt="" />
            </Link>
          </div>
          <div className="col-8">
            <span className="adminSignIN">Cleaning Company Sign In</span>
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-4 h-100">
          <div className="col-4 ">
            <div className="card signIn text-white">
              <div className="card-body text-center loginPadding">
                <div>
                  {/* <Link to={"/"} className="navbar-brand"> */}
                  <h3 className="adminRecover">Create New Password</h3>
                </div>
                {/* <div className="mt-4"> */}
                <p className="text">
                  Set your new password so you can login <br />
                  and Access .
                </p>
                {/* </div> */}
                <div className="mt-4">
                  <form className="recoverForm">
                    <div className="row mt-4 newPasswordClass">
                      <FormControl sx={{ m: 1 }} variant="filled">
                        <div>
                          <InputLabel
                            htmlFor="filled-adornment-password"
                            style={{ color: "white" }}
                          >
                            <img className="img-lock" src={lock} alt="notFound" />
                            Create new password
                          </InputLabel>
                        </div>
                        <FilledInput
                          id="filled-adornment-password"
                          style={{ color: "white" }}
                          type={values.showPassword1 ? "text" : "password"}
                          value={values.password}
                          onChange={handleChange("password")}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                style={{ color: "#427fb9" }}
                              >
                                {values.showPassword1 ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <div className="row mt-4  newPasswordClass">
                      <FormControl sx={{ m: 1 }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password2" style={{ color: "white" }}>
                          <img className="img-lock" src={lock} alt="notFound" />
                          Confirm new password
                        </InputLabel>
                        <FilledInput
                          id="filled-adornment-password2"
                          type={values.showPassword2 ? "text" : "password"}
                          value={values.password2}
                          onChange={handleChange2("password2")}
                          style={{ color: "white" }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password2 visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword2}
                                edge="end"
                                style={{ color: "#427fb9" }}
                              >
                                {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <button
                      onClick={(e) => submitNewPassword(e)}
                      value="submit"
                      type="submit"
                      className="btn mb-4 mt-4 col-8 btnLoginSubmit"
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="fottercss row">
            <img className="footerPic" src={footer} alt="notFound" />
          </div>
        </div>
        {/* <img src={userManagment} alt="notFound" /> */}
      </div>
      {/* </section> */}
    </div>
  );
};
export default CreateNewPassword;
