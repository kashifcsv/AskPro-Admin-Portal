import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedAction } from "../../Redux/Actions/Action";
import { roleAdminAction } from "../../Redux/Actions/Action";
import { roleNormalAction } from "../../Redux/Actions/Action";
import {
  checkingBlackListed,
  getChatToken,
  getCompanyDetails,
  getPermissionApi,
  logIn,
} from "../../api/Services";
import LoaderAnimation from "../../Components/Loader/LoaderAnimation";
import cleanAsk from "../../Assets/Images/Group 3072.png";
import userName from "../../Assets/Images/username.png";
import password from "../../Assets/Images/password.png";
import footer from "../../Assets/Images/Group 3071.png";
import userManagment from "../../Assets/Images/Group 3512.png";
import notificationMessage from "../../Assets/Images/Group 3565.png";
import "./Login.css";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import moment from "moment";

var qs = require("qs");

export let roled;
export const Login = () => {
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const [cookies, setCookie] = useCookies(["userNameCookie", "passwordCookie"]);
  const [loginError, setLoginError] = useState(false);
  const [loginPending, setLoginPending] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  useSelector((state) => state.isAdmin);
  useSelector((state) => state.isUser);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const buttonHide = () => {
    setLoginError(false);
  };

  const myFunction = async (e) => {
    e.preventDefault();
    setLoginPending(true);
    var UserEmail = document.getElementById("typeEmailX").value;
    var UserPassword = document.getElementById("typePasswordX").value;

    const data = qs.stringify({
      grant_type: "password",
      username: UserEmail,
      password: UserPassword,
      scope: "company_access",
    });

    const Company_Admin = [
      {
        EstimatorManagement: { create: true, read: true, delete: true, update: true },
        UserManagement: { create: true, read: true, delete: true, update: true },
      },
    ];
    const Exective = [
      {
        EstimatorManagement: { create: false, read: true, delete: false, update: true },
        UserManagement: { create: false, read: false, delete: false, update: true },
      },
    ];

    let role;
    var response = {};

    try {
      response = await logIn(data);
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        let responseBlackListed = await checkingBlackListed(UserEmail.split("@")[0]);
        if (
          responseBlackListed.success &&
          responseBlackListed.msg === `Your account is blocked. you can't be login.`
        ) {
          toast.error(responseBlackListed.msg);
          setLoginPending(false);
          navigate("/");
        } else {
          const rolesPermission = await getPermissionApi(UserEmail.split("@")[0]);
          if (rolesPermission.success) {
            role = rolesPermission.permission;
            let responseU = await getCompanyDetails(UserEmail.split("@")[1]);
            if (responseU.success) {
              const { access_token, refresh_token, scope, token_type } = response;
              const authState = {
                username: UserEmail,
                userName: UserEmail.split("@")[0],
                token: access_token,
                refresh_token: refresh_token,
                domain_username: UserEmail.split("@")[1],
                token_type: token_type,
                company: responseU.company,
                role,
              };
              if (
                signIn({
                  token: access_token,
                  expiresIn: "3600",
                  tokenType: "Bearer",
                  refreshToken: refresh_token,
                  scope,
                  authState,
                })
              ) {
                localStorage.setItem("company__ID", responseU.company._id);
                localStorage.setItem("username", UserEmail.split("@")[0]);
                localStorage.setItem("refresh_token", response.refresh_token);
                localStorage.setItem("scope", response.scope);
                localStorage.setItem("token_type", response.token_type);
                setLoginPending(false);
                localStorage.setItem("domain_username", UserEmail.split("@")[1]);
                navigate("./Dashboard", { replace: true });
                dispatch(roleAdminAction());
              } else {
              }
            } else {
              toast.error("Failed to fetch company information");
              setLoginPending(false);
              localStorage.clear();
              navigate("/");
            }
          } else {
            toast.error("Failed to fetch authorization");
            setLoginPending(false);
            localStorage.clear();
            navigate("/");
          }
        }
      } else {
        setLoginError(true);
        localStorage.clear();
        setLoginPending(false);
        setTimeout(() => {
          setLoginError(false);
        }, 4000);
      }
    } catch (err) {
      const error = err.message;
      toast.error("Error occurred: ", error);
    }
  };

  const rememberMe = () => {
    var UserEmailForCookie = document.getElementById("typeEmailX").value;
    var UserPasswordForCookie = document.getElementById("typePasswordX").value;
    var remember = document.getElementById("rememberMe");

    if (remember.checked) {
      setCookie("userNameCookie", UserEmailForCookie, { path: "/" });
      setCookie("passwordCookie", UserPasswordForCookie, { path: "/" });
    } else {
      setCookie("userNameCookie", "", { path: "/" });
      setCookie("passwordCookie", "", { path: "/" });
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
            <img src={cleanAsk} alt="" />
          </div>
          <div className="col-8">
            <span className="adminSignIN">Cleaning Company Sign In</span>
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-4 h-100">
          <div className="col-1 d-flex flex-column-reverse">
            {/* <img src={userManagment} alt="notFound" />
            <img src={notificationMessage} alt="notFound" /> */}
          </div>
          <div className="col-3"></div>
          <div className="col-4 ">
            <div className="card signIn text-white">
              <div className="card-body text-center loginPadding">
                <Link to={"/"} className="navbar-brand">
                  <h1 className="adminSignIN">SIGN IN</h1>
                </Link>
                {/* <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p> */}

                {/* logic here */}
                <div className="mt-4"></div>
                {loginError ? (
                  <div
                    className="alert alert-danger alert-dismissible fade show col-12 "
                    role="alert"
                  >
                    <h6 className="estimatorHHeading">Invalid username or Password</h6>
                    <button onClick={buttonHide} type="button" className="btn-close"></button>
                  </div>
                ) : (
                  <p hidden></p>
                )}

                <form style={{ width: "-webkit-fill-available" }} onSubmit={myFunction}>
                  <div className="form-outline form-white mb-4">
                    {/* <img src={userName} alt="notFound" /> */}
                    {/* <i class="fa fa-user icon"></i> */}
                    <input
                      // type = text for now. it will be changed to email later
                      type="email"
                      required
                      id="typeEmailX"
                      className="form-control inputBg form-control-lg Helvetica textCenter"
                      name="centerPlaceHolder"
                      placeholder="UserName@domain"
                      defaultValue={cookies.userNameCookie ? `${cookies.userNameCookie}` : ""}
                    />
                    {/* <label className="form-label required" for="typeEmailX">
                          Email
                        </label> */}
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      required
                      name="centerPlaceHolder"
                      type="password"
                      id="typePasswordX"
                      className="form-control inputBg form-control-lg Helvetica textCenter"
                      placeholder="Password"
                      defaultValue={cookies.passwordCookie ? `${cookies.passwordCookie}` : ""}
                    />
                    {/* <label className="form-label required" for="typePasswordX">
                          Password
                        </label> */}
                  </div>
                  <div className="row EurostileBoldCSS">
                    <div className="col-6">
                      <label onClick={() => rememberMe()}>
                        <input
                          type="checkbox"
                          checked={cookies.passwordCookie && cookies.userNameCookie ? true : false}
                          id="rememberMe"
                        />
                        &nbsp;Remember me
                      </label>
                    </div>
                    <Link className="col-6 forgotPassword" to={"/ForgotPassword"}>
                      <div>Forgot Password?</div>
                    </Link>
                  </div>

                  {!loginPending ? (
                    <button className="btn mt-4 col-12 btnLoginSubmit" value="submit" type="submit">
                      Sign in
                    </button>
                  ) : (
                    <LoaderAnimation />
                  )}
                </form>
              </div>
            </div>
          </div>{" "}
          <div className="col-4"></div>
          <div className="row">
            <img className="loginFooterCss" src={footer} alt="notFound" />
          </div>
        </div>
      </div>
      {/* </section> */}
    </div>
  );
};
export default Login;
