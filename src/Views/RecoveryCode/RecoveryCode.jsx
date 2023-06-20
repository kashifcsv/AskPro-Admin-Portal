import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./RecoveryCode.css";
import footer from "../../Assets/Images/Group 3071.png";
import cleanAsk from "../../Assets/Images/Group 3072.png";
import OTPInput from "otp-input-react";
import { companyForgotPasswordAPI, companyVerifyOtpAPI } from "../../api/Services";
import { useSelector } from "react-redux";
import Toast from "../../Components/Toast/Toast";
import { toast } from "react-toastify";

const RecoveryCode = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const email = useSelector((state) => state.isNewPwdEmail);

  // useEffect
  const [OTP, setOTP] = useState("");
  const [responseError, setResponseError] = useState(false);

  // Functions
  const recoveryCodeSubmit = async (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      email: email,
      otp: OTP,
    });

    try {
      let companyVerifyOtpResponse = await companyVerifyOtpAPI(data);
      if (companyVerifyOtpResponse.success) {
        navigate("/CreateNewPassword", { replace: true });
      } else {
        toast.error("companyVerifyOtpResponse is not valid");
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }

    // if (OTP.length === 4) {
    // }
  };

  const resendCode = async () => {
    var payLoad = JSON.stringify({
      email: location.state.email,
    });

    try {
      let response = await companyForgotPasswordAPI(payLoad);
      if (response.success) {
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
                {responseError ? (
                  <Toast message="Code resended successfully! " />
                ) : (
                  <span hidden></span>
                )}
                <div className="mb-md-5">
                  <h4 className="adminRecover">Enter 4-Digit Recovery Code</h4>
                </div>
                <p>
                  The recovery code was sent to your mobile number.
                  <br /> Please enter the code:
                </p>
                {/* </div> */}
                <div className="mt-4">
                  <form className="recoverForm">
                    <br />
                    <OTPInput
                      required
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={4}
                      otpType="number"
                      disabled={false}
                      secure={false}
                      style={{ display: "flex", justifyContent: "center" }}
                      inputStyles={{
                        border: "3px solid #427fb9",
                        borderRadius: "7px",
                        height: "50px",
                        width: "50px",
                        marginRight: "15px",
                        backgroundColor: "#171d2a",
                        color: "white",
                      }}
                    />

                    <br />
                    <br />
                    <button
                      onClick={(e) => recoveryCodeSubmit(e)}
                      className="btn mb-4 mt-4 col-8 btnLoginSubmit"
                    >
                      Next
                    </button>
                    <p className="mt-4 HelveticaRecovery">
                      Haven't received the code?{" "}
                      <span onClick={resendCode} className="resendCodeColor pointer">
                        resend code
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="fottercss row">
            <img className="footerPic" src={footer} alt="notFound" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecoveryCode;
