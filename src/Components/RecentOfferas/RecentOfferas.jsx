/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./RecentOfferas.css";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ClientProfileAPI,
  createConversation,
  EstimateIDFromDashboard,
  GetAnswersFromCleintID,
  getChatToken,
  getEstimatorByIdAPI,
  getQuotationAPI,
  getReviewListAPI,
} from "../../api/Services";

import blueCircle from "../../Assets/Images/Ellipse 93.png";
import filledstar from "../../Assets/Images/fillStarY.png";
import graystar from "../../Assets/Images/Icon feather-star.png";
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";

import phone from "../../Assets/Images/Icon awesome-phone-alt.png";
import line from "../../Assets/Images/Path 9263.png";
import message from "../../Assets/Images/Icon material-chat.png";
import { useAuthUser } from "react-auth-kit";
import { IsAuthorized } from "../../Auth/Authorization";

import Avatar from "@mui/material/Avatar";

var arrayForDollars = [];
var arrayForDollarsStore = [];
var arrayForDollarsStoreTotal = 0;

function ErrorHandler({ error }) {
  const reload = () => {
    reload();
  };
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
      <button onClick={reload}>Reload Page</button>
    </div>
  );
}

const RecentOfferas = () => {
  // BUILD IN HOOKS
  let navigate = useNavigate();
  const location = useLocation();
  const authUser = useAuthUser();

  const isViewEstimate = IsAuthorized("estimate").view;
  const isUpdateEstimate = IsAuthorized("estimate").update;
  // Elapsed Time

  // HOOKS

  const [totalDataFromDashboard, setTotalDataFromDashboard] = useState(location.state.FullData);

  const [estimateId, setEstimateId] = useState(totalDataFromDashboard._id);
  const [estimatorId, setEstimatorId] = useState(totalDataFromDashboard.estimatorId);
  const [clientIDFromDashBoard, setclientIDFromDashBoard] = useState(
    totalDataFromDashboard.clientId
  );

  const [status, setStatus] = useState(location.state.FullData.status);
  const [client, setClient] = useState([]);
  const [GetRealAnswers, setGetRealAnswers] = useState([]);
  const [getQuotation, setGetQuotation] = useState();
  const [getQuotationTotal, setGetQuotationTotal] = useState();
  const [starRating, setStarRating] = useState();
  const [getQuotationMonthlyTotal, setGetQuotationMonthlyTotal] = useState(0);
  const [reviewClientName, setReviewClientName] = useState("");
  const [reviewShow, setReviewShow] = useState(false);
  const [reviewDetails, setReviewDetails] = useState([]);
  const [estimator, setEstimator] = useState();
  // GET TOTAL DOLLARS

  // ("clientID", clientIDFromDashBoard);
  // Modal Add Line Item

  const [editError, setEditError] = useState(false);

  const [reason] = useState(
    location.state.FullData.reason ? location.state.FullData.reason : " Reason Not Available"
  );
  //! USE EFFECTS

  useEffect(async () => {
    if (!isViewEstimate) {
      toast.error("You are not authorized to view Estimate");
      navigate("/Dashboard");
    }
    try {
      estimatorInfo();
      let clientApiResponse = await ClientProfileAPI(clientIDFromDashBoard);
      if (clientApiResponse.success) {
        setClient(clientApiResponse.client);
      }
      //  else {
      //   toast.error("Something went wrong");
      // }
    } catch (error) {
      toast.error("Something went wrong");
    }

    let getQuotationResponse = await getQuotationAPI(estimateId, estimatorId);
    if (getQuotationResponse.success) {
      setGetQuotation(getQuotationResponse.quotation.description);
      setGetQuotationTotal(getQuotationResponse.quotation.total_amount);
      setGetQuotationMonthlyTotal(getQuotationResponse.quotation.monthly_total);
    } else {
      setGetQuotation([]);
      // toast.error("Something went wrong");
    }

    try {
      let responsegetReviewListAPI = await getReviewListAPI(estimateId);
      if (responsegetReviewListAPI.success) {
        if (responsegetReviewListAPI.estimateReview.length === 1) {
          setReviewDetails(responsegetReviewListAPI.estimateReview[0]);
          setStarRating(responsegetReviewListAPI.estimateReview[0]?.rating);
          setReviewClientName(responsegetReviewListAPI.estimateReview[0]?.client_details[0].name);
          setReviewShow(true);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, []);

  useEffect(() => {
    getAnswers();
  }, [clientIDFromDashBoard]);

  const getAnswers = async () => {
    let Response = await GetAnswersFromCleintID(clientIDFromDashBoard, estimatorId, estimateId);
    if (Response.success) {
      setGetRealAnswers(Response.answers);
      for (let index = 0; index < Response.answers.length; index++) {
        arrayForDollarsStore[index] = 0;
      }
    }
  };

  // FUNCTIONS
  let nanNumber;
  const getDollarFunction = (e, index) => {
    nanNumber = e.target.value;
    if (nanNumber === "") {
      nanNumber = 0;
    }

    arrayForDollars[index] = nanNumber;
    arrayForDollarsStore[index] = arrayForDollars[index];
    arrayForDollarsStoreTotal = 0;
    for (let index = 0; index < arrayForDollarsStore.length; index++) {
      if (arrayForDollarsStore[index] === undefined) {
      } else {
        arrayForDollarsStoreTotal =
          parseInt(arrayForDollarsStoreTotal) + parseInt(arrayForDollarsStore[index]);
      }
    }
  };

  const estimatorInfo = async () => {
    try {
      let estimatorResponse = await getEstimatorByIdAPI(estimatorId, authUser().company.company_id);
      if (estimatorResponse.success) {
        setEstimator(estimatorResponse.estimator);
      }
      // else {
      //   toast.error("Something went wrong");
      // }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const yellowStars = (animals) => {
    let content = [];
    for (let i = 0; i < animals; i++) {
      content.push(<li key={i}>{<img src={filledstar} />}</li>);
    }
    return content;
  };

  const grayStars = (animals) => {
    let content = [];
    for (let i = 0; i < animals; i++) {
      content.push(<li key={i}>{<img src={graystar} />}</li>);
    }
    return content;
  };

  const moveTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setEditError(true);
    setTimeout(() => {
      setEditError(false);
    }, 4000);
  };

  const editNavigate = async () => {
    if (isUpdateEstimate) {
      let getStatus = await EstimateIDFromDashboard(estimateId);
      if (getStatus.estimate.status === "revise" || getStatus.estimate.status === "in_progress") {
        navigate("/editquotation", {
          state: {
            FullData: totalDataFromDashboard,
          },
        });
      } else if (getStatus.estimate.status === "in_rebid") {
        navigate("/rebid", {
          state: {
            FullData: totalDataFromDashboard,
          },
        });
      } else {
        moveTop();
      }
    } else {
      toast.error("You are not authorized to update quotation");
    }
  };

  const imgSize = (index) => {
    document.getElementById(`imgSizes${index}`).requestFullscreen();
  };

  const navigateToChat = async () => {
    try {
      var data = JSON.stringify({
        uniqueName: localStorage.getItem("username") + "&&" + client.username + "-client",
        identity_one: localStorage.getItem("username"),
        identity_two: client.username,
      });
      let navigateResponse = await createConversation(data);
      if (navigateResponse.success) {
        const twillioToken = await getChatToken(localStorage.getItem("username"));
        if (twillioToken.success) {
          localStorage.setItem("twillio_token", twillioToken.token);
          // navigate("../Messages", { replace: true });
          navigate("../Chat", { state: { fullData: navigateResponse.conversation } });
        } else {
          navigate("../Chat", { state: { fullData: navigateResponse.conversation } });
          // navigate("../Messages", { replace: true });
        }
      } else {
        navigate("../Chat", { state: { fullData: navigateResponse } });
        // navigate("../Messages", { replace: true });
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const navigateToChatEstimator = async () => {
    try {
      var data = JSON.stringify({
        uniqueName: localStorage.getItem("username") + "&&" + estimator.username + "-estimator",
        identity_one: localStorage.getItem("username"),
        identity_two: estimator.username,
      });
      let navigateResponse = await createConversation(data);
      if (navigateResponse.success) {
        const twillioToken = await getChatToken(localStorage.getItem("username"));
        if (twillioToken.success) {
          localStorage.setItem("twillio_token", twillioToken.token);
          // navigate("../Messages", { replace: true });
          navigate("../Chat", { state: { fullData: navigateResponse.conversation } });
        } else {
          // navigate("../Messages", { replace: true });
          navigate("../Chat", { state: { fullData: navigateResponse.conversation } });
        }
      } else {
        navigate("../Chat", { state: { fullData: navigateResponse } });
        // navigate("../Messages", { replace: true });
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      {editError ? (
        <div className=" col-12 toastClass">
          <Toast
            success={"danger"}
            message="Unable to edit until your status is 'In Progress' or 'Revise' or 'In Rebid' "
          />
        </div>
      ) : null}
      <div className="row">
        <div className="col-12 mt-4 d-flex justify-content-between">
          <span className="">Offers# {estimateId} </span>
        </div>

        <div className="topBtn">
          &nbsp; &nbsp; &nbsp;
          <img className="qImage1" src={phone} alt="Not Found" /> &nbsp; &nbsp;
          <img className="qImage1" src={line} alt="Not Found" /> &nbsp; &nbsp;
          <img
            onClick={navigateToChatEstimator}
            className="qImage1 pointer"
            src={message}
            alt="Not Found"
          />
          &nbsp; &nbsp;
          <div>
            <button className="btn buttonColor ">
              {estimator?.contact ? estimator?.contact : "Number Not Available"}
            </button>
            <br />
            <span className="fontHelvetica"> Estimator Number</span>{" "}
          </div>
        </div>

        <div className="col-12 mt-4 mb-4">
          <div className="card quotationCard">
            <div className="card-title incomingBarQuotation">Client Information</div>

            <div className="card-body">
              <div className="row">
                <div className=" col-5 col5">
                  <p className="fontBold">Point Of Contact Role</p>
                </div>
                <div className="col-7 col7">{client.role}</div>
              </div>
              <hr />

              <div className="row">
                <div className=" col-5 col5">
                  <p className="fontBold">Point of Contact Name</p>
                </div>
                <div className="col-7 col7">{client.pocname}</div>
              </div>
              <hr />

              <div className="row">
                <div className=" col-5 col5">
                  <p className="fontBold">Point of Contact Email</p>
                </div>
                <div className="col-7 col7">{client.emailaddress}</div>
              </div>
              <hr />

              <div className="row">
                <div className=" col-5 col5">
                  <p className="fontBold">Company Phone Number</p>
                </div>{" "}
                <div className="col-7 col7">
                  {client?.contact}
                  <div className="phoneDiv">
                    &nbsp; &nbsp; &nbsp;
                    <img className="qImage" src={phone} alt="Not Found" /> &nbsp; &nbsp;
                    <img className="qImage" src={line} alt="Not Found" /> &nbsp; &nbsp;
                    <img
                      onClick={navigateToChat}
                      className="qImage pointer"
                      src={message}
                      alt="Not Found"
                    />
                  </div>
                </div>
                {/* <div className="col-7 col7">{client?.contact}</div> */}
              </div>
              <hr />

              <div className="row">
                <div className=" col-5 col5">
                  <p className="fontBold">Point of Contact Cell Number</p>
                </div>
                <div className="col-7 col7">
                  {client.poccellnumber}
                  <div className="phoneDiv">
                    &nbsp; &nbsp; &nbsp;
                    <img className="qImage" src={phone} alt="Not Found" /> &nbsp; &nbsp;
                    <img className="qImage" src={line} alt="Not Found" /> &nbsp; &nbsp;
                    <img
                      onClick={navigateToChat}
                      className="qImage pointer"
                      src={message}
                      alt="Not Found"
                    />
                  </div>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className=" col-5 col5">
                  <p className="fontBold">Address</p>
                </div>
                <div className="col-7 col7">{client?.address} </div>
              </div>
              <div className="mt-4"></div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-4 mb-4">
          <div className="card quotationCard">
            <div className="card-title incomingBarQuotation">
              <span className="col-9 col9">Description</span>
              <span className="col-3 text-center">Total</span>
            </div>

            <div className="card-body">
              {/* {ViewCategoryAPI.map((item, index) => ( */}
              {getQuotation ? (
                getQuotation.map((item, index) => (
                  <>
                    <div className="row">
                      <div className=" col-9 col9">
                        <p className="col-9 col9">
                          <span
                            style={{
                              fontSize: "17px",
                              fontFamily: "MyriadPro-Regular",
                              wordBreak: "break-all",
                            }}
                          >
                            <p className="d-flex">
                              {" "}
                              {item.depth ? item.depth : "0"}.&nbsp; {item.lineItemQuestion}
                            </p>
                            <p style={{ fontFamily: "MyriadPro-Regular" }} className="d-flex">
                              &nbsp; Answer.&nbsp;
                              {(() => {
                                switch (item?.answer_type ? item?.answer_type : "Text") {
                                  // switch ("Text") {
                                  case "Text":
                                    return item?.lineItemAnswer;
                                  case "date":
                                    return item?.lineItemAnswer;
                                  case "Picture":
                                    return item?.lineItemAnswer?.map((itemI, IndexI) => (
                                      <img
                                        style={{ height: "100%", width: "10%" }}
                                        onClick={() => imgSize(IndexI)}
                                        className="answerImages pointer"
                                        src={itemI.url}
                                        alt="imageNotFound"
                                        id={`imgSizes${IndexI}`}
                                      />
                                    ));
                                  case "Measurements":
                                    return item?.lineItemAnswer;
                                  case "Numeric":
                                    return item?.lineItemAnswer;
                                  case "Yes/No":
                                    return item?.lineItemAnswer;
                                  case "Video":
                                    return item?.answer ? (
                                      <div className="video-responsive">
                                        <video width="320" height="240" controls>
                                          <source src={item?.answer} />
                                          Your browser does not support the video tag.
                                        </video>
                                      </div>
                                    ) : (
                                      <p>Video not uploaded</p>
                                    );

                                  default:
                                    return item?.lineItemAnswer;
                                }
                              })()}
                            </p>
                            {/* {depthValueCheck[index]}
                          {item.depth}: {item.category_name}
                           */}
                          </span>
                        </p>
                      </div>

                      <div className="col-3">
                        <span className="numberT d-flex justify-content-end">
                          $
                          <input
                            readOnly
                            style={{
                              border: "none",
                              outline: " none",
                              background: "white",
                              color: "black",
                            }}
                            id="getAnswerInputDollar"
                            placeholder="Enter Amount"
                            value={item.amount === 0 ? "" : item.amount}
                            onChange={(e) => getDollarFunction(e, index)}
                            type="number"
                            min="0"
                          />
                        </span>
                      </div>
                    </div>
                    <hr className="nomargin" />
                    &nbsp;
                  </>
                ))
              ) : (
                <h1>No Data Found</h1>
              )}
              {/* <div className="row mt-4 mb-4">
                <div className="btn_addLnItms">
                  <button onClick={() => setEditshow(true)} className="btn buttonColor">
                    Add Line Items <img className="qImage pluscircle" src={plus} alt="Not Found" />
                  </button>
                </div>
              </div> */}

              {/*Add new modal End  */}
              {/* <div className="mt-4"></div> */}

              <div className="row text-light gTotalColor">
                <span className="col-9 gthead">
                  Monthly Total:{" "}
                  <span contenteditable="true" id="idMonthlyTotal" className="monthlyGT">
                    {getQuotationMonthlyTotal}
                  </span>
                </span>
                <span className="col-3">
                  Total: &nbsp;&nbsp;
                  <span contenteditable="true" id="idGrandTotal" className="numberGT">
                    {getQuotationTotal}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-4 ">
          <div className="row d-flex justify-content-center">
            <div className="elapsedTimeBottom">
              <span className="">
                <span className="elapseSpan">Status</span>:
                <span style={{ color: "red" }}>
                  {" "}
                  &nbsp; {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>{" "}
              </span>
              <span className="elapsedPara">
                <b>Reason:</b>{" "}
                <span className="fontHelvetica">{reason ? reason : "Reason Not Found"}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 mt-4">
          <div className="mt-4">
            {/* <button onClick={SubmitForRebid} type="button" class="btn col-2 btnFont "> */}
            <button onClick={editNavigate} type="button" class="btn col-2 btnFont ">
              <b>Edit</b>
            </button>
          </div>
        </div>
      </div>

      <h5 className="EstimateQuotation mt-4 mb-4">Estimator Input</h5>
      <div className="col-12 mt-4 ">
        <div className="card quotationCard">
          <div className="card-title incomingBarQuotation">
            <span className="col-9 col9">Description</span>
          </div>

          <div className="card-body">
            {/* {ViewCategoryAPI.map((item, index) => ( */}
            {GetRealAnswers ? (
              GetRealAnswers.map((item, index) => (
                <>
                  <div className="row">
                    <div className=" col-9 col9">
                      <p className="col-9 col9">
                        <span
                          style={{
                            fontSize: "17px",
                            fontFamily: "MyriadPro-Regular",
                            wordBreak: "break-all",
                          }}
                        >
                          <p className="d-flex">
                            {" "}
                            {item.depth ? item.depth : "0"}.&nbsp;{item?.question}
                          </p>
                          <p style={{ fontFamily: "MyriadPro-Regular" }} className="d-flex">
                            &nbsp; Answer.&nbsp;
                            {(() => {
                              switch (item?.answer_type ? item?.answer_type : "Text") {
                                case "Text":
                                  return item?.answer;
                                case "date":
                                  return item?.answer;
                                case "Picture":
                                  return item?.answer ? (
                                    item?.answer?.map((itemI, IndexI) => (
                                      <img
                                        style={{ height: "100%", width: "10%" }}
                                        onClick={() => imgSize(IndexI)}
                                        className="answerImages pointer"
                                        src={itemI.url}
                                        alt="imageNotFound"
                                        id={`imgSizes${IndexI}`}
                                      />
                                    ))
                                  ) : (
                                    <p>Image not uploaded </p>
                                  );
                                case "Measurements":
                                  return item?.answer;
                                case "Numeric":
                                  return item?.answer;
                                case "Yes/No":
                                  return item?.answer;
                                case "Video":
                                  return item?.answer ? (
                                    <div className="video-responsive">
                                      <video width="320" height="240" controls>
                                        <source src={item?.answer} />
                                        Your browser does not support the video tag.
                                      </video>
                                    </div>
                                  ) : (
                                    <p>Video not uploaded</p>
                                  );

                                default:
                                  return item?.answer;
                              }
                            })()}
                          </p>
                          {/* {depthValueCheck[index]}
                           {item.depth}: {item.category_name}
                            */}
                        </span>

                        {/* <pre
                          className="mt-4"
                          style={{ fontSize: "17px", fontFamily: "MyriadPro-Regular" }}
                        >
                          {item.question} <br />
                          <span style={{ fontFamily: "MyriadPro-Regular" }}>
                            Answer. {item.answer}
                          </span>
                        </pre> */}
                      </p>
                    </div>
                  </div>
                  <hr className="nomargin" />
                </>
              ))
            ) : (
              <h1>No Data Found</h1>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4"></div>
      <div className="mt-4"></div>
      <div className="mt-4"></div>
      <div className="mt-4"></div>
      {reviewShow ? (
        <div className="col-12 mt-4">
          <div className="col-12 d-flex flex-start">
            <h5>Client Reviews </h5>
          </div>
          <div className="card quotationCard">
            <div className="card-title  clientReviewsQuotation">
              <div className="row incomingBarQuotation" style={{ flexWrap: "nowrap" }}>
                <div className="col-1">
                  {reviewDetails?.client_details[0]?.profilepicture ? (
                    <img
                      className="blueCircleImages"
                      src={reviewDetails?.client_details[0]?.profilepicture}
                      alt="notFound"
                    />
                  ) : (
                    <Avatar sx={{ width: 56, height: 56 }}>{reviewClientName.slice(0, 1)}</Avatar>
                  )}
                </div>

                <div style={{ color: "#666666", padding: "0px" }} className="col-11">
                  <h3>{reviewClientName}</h3>
                  <span>
                    {reviewDetails?.client_details[0]?.designation
                      ? reviewDetails?.client_details[0]?.designation
                      : null}
                  </span>
                </div>
                <div style={{ marginLeft: "-25%", display: "flex" }}>
                  <ul style={{ display: "flex", paddingLeft: "0px" }}>{yellowStars(starRating)}</ul>
                  <ul style={{ display: "flex", paddingLeft: "0px" }}>
                    {grayStars(5 - starRating)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="container alignStart clientReview">{reviewDetails?.comment}</div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="row mt-4"></div>
      <div className="row mt-4"></div>

      {/* <div className="row mt-4">
        <div className="col-1"></div>
        <div className="col-10 mt-4">
          <div className="col-12 d-flex flex-start">
            <h5>Additional Notes</h5>
          </div>
          <div className="card quotationCard">
            <div className="card-body d-flex additionalNotesCard">
              <span className="additionalNotes">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi culpa aliquid
                numquam nobis. Doloremque illum aperiam, architecto ipsum cupiditate eaque nemo enim
                modi distinctio dolores necessitatibus unde vitae officia! Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Impedit, hic modi aut minus aliquam tempore
                doloribus voluptatibus esse consectetur odit quam accusantium magnam eveniet ducimus
                necessitatibus dolores! Vitae, modi corporis!
              </span>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div> */}
      <div className="mt-4"></div>
      <div className="mt-4"></div>
      <div className="mt-4"></div>
    </ErrorBoundary>
  );
};

export default RecentOfferas;
