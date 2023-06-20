import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import footer from "../../Assets/Images/Group 3071.png";
import cleanAsk from "../../Assets/Images/Group 3072.png";
import { companyForgotPasswordAPI } from "../../api/Services";
import Toast from "../../Components/Toast/Toast";
import { newPwdEmailAction } from "../../Redux/Actions/Action";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // hooks start
  const [emailValue, setEmailValue] = useState("");
  const [responseError, setResponseError] = useState(false);
  // hooks end

  // useEffects start

  // useEffects end

  // Functions Here
  const forgotButton = async (e) => {
    e.preventDefault();
    var payLoad = JSON.stringify({
      email: emailValue,
    });

    try {
      let response = await companyForgotPasswordAPI(payLoad);
      if (response.success) {
        navigate("/RecoveryCode", {
          state: {
            email: emailValue,
          },
        });
        dispatch(newPwdEmailAction(emailValue));
      } else {
        setResponseError(true);
        setTimeout(() => {
          setResponseError(false);
        }, 5000);
      }
    } catch (error) {
      toast.error("Something went wrong");
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
          <div className="col-5 ">
            <div className="card signIn text-white">
              <div className="card-body text-center loginPadding">
                <div className="mb-md-5 mt-md-4">
                  {/* <Link to={"/"} className="navbar-brand"> */}
                  <h3 className="adminForgot">Forgot Your Password</h3>
                </div>
                {/* <div className="mt-4"> */}
                <p>
                  Select which contact details <br /> Should we use to reset your password
                </p>

                {responseError ? (
                  <div className=" col-12 toastClass">
                    <Toast message="Something went wrong!" />
                  </div>
                ) : (
                  <span hidden></span>
                )}

                {/* </div> */}
                <div className="mt-4">
                  <form onSubmit={(e) => forgotButton(e)}>
                    <input
                      required
                      type="email"
                      name="centerPlaceHolder"
                      onChange={(e) => setEmailValue(e.target.value)}
                      className="forgotEmail col-12"
                      placeholder="Enter Your Email"
                    />

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <button type="submit" className="btn mt-4 col-8 btnLoginSubmit">
                      Send Code
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
        {/* <img src={userManagment} alt="notFound" /> */}
      </div>
      {/* </section> */}
    </div>
  );
};
export default ForgotPassword;
