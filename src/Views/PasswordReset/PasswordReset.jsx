import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PasswordReset.css";
import footer from "../../Assets/Images/Group 3071.png";
import cleanAsk from "../../Assets/Images/Group 3072.png";
import circle from "../../Assets/Images/Icon ionic-ios-checkmark-circle-outline.png";
import { useSelector } from "react-redux";

const PasswordReset = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.isNewPwdEmail);

  const GoToLogin = () => {
    navigate("/");
  };
  return (
    <div className="row loginComponent">
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
          <div className="col-5 ">
            <div className="card signIn text-white">
              <div className="card-body text-center loginPadding">
                <div className="mb-3">
                  <h3 className="adminRecover">Password Reset Successful</h3>
                </div>
                <p className="text mb-5">
                  You have successfully reset your password. Please use your new pasword when
                  logging in
                </p>
                <img className="img-tick" src={circle} alt="Not Found" />
                <div className="w-100 mt-4">
                  <form className="recoverForm">
                    <button
                      onClick={GoToLogin}
                      value="submit"
                      type="submit"
                      className="btn mb-4 mt-4 col-12 btnLoginSubmit"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="fottercss row">
            <img className="loginFooterCss" src={footer} alt="notFound" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PasswordReset;
