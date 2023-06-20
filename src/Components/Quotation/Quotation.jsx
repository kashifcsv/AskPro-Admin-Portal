/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./Quotation.css";
import { AiOutlinePrinter } from "react-icons/ai";
import Group2649 from "../../Assets/Images/Group2649.png";
import crosssmall from "../../Assets/Images/crosssmall.png";
import deletew from "../../Assets/Images/Group 3595.png";
import phone from "../../Assets/Images/Icon awesome-phone-alt.png";
import line from "../../Assets/Images/Path 9263.png";
import message from "../../Assets/Images/Icon material-chat.png";
import plus from "../../Assets/Images/PlusCircle.png";
import edit from "../../Assets/Images/Icon feather-edit.png";
import { ImCross } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ClientProfileAPI,
  createConversation,
  EstimateIDFromDashboard,
  GetAnswersFromCleintID,
  getChatToken,
  getEstimatorByIdAPI,
  getViewCategoryAPI,
  SubmitForRebidAPI,
} from "../../api/Services";
import { ErrorBoundary } from "react-error-boundary";
import { Modal, Button } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Toast from "../Toast/Toast";
import { AiOutlineMinusSquare } from "react-icons/ai";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers-pro";
import Checkbox from "@mui/material/Checkbox";
import LoaderAnimation from "../Loader/LoaderAnimation";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import moment from "moment";
import { CheckBoxOutlineBlank, Mms } from "@mui/icons-material";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { IsAuthorized } from "../../Auth/Authorization";

var ElaspedTimeCheck = 1;
var arrayForDollars = [];
var arrayForDollarsStore = [];
var arrayForDollarsStoreLine = [];
var arrayForDollarsStoreTotal = 0;
let spaces = "  ";
let newArrayTotal = 0;
let count = 0;
const label = { inputProps: { "aria-label": "Checkbox demo" } };
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

export const Quotation = () => {
  // BUILD IN HOOKS
  let navigate = useNavigate();
  const location = useLocation();
  const authUser = useAuthUser();

  const isViewQuotation = IsAuthorized("estimate").view;
  const isAddQuotation = IsAuthorized("estimate").create;

  // frequency and date mandatory
  const [frequencyToastMessage, setfrequencyToastMessage] = useState(false);
  const [dateToastMessage, setdateToastMessage] = useState(false);

  // HOOKS
  const [estimateResponse, setEstimateResponse] = useState({});
  const [GetAnswerDiscriptionArray, setGetAnswerDiscriptionArray] = useState();
  const [cleaningCompanyResponse, setCleaningCompanyeResponse] = useState({});

  const [ViewCategoryAPI, setViewCategoryAPI] = useState([]);
  const [depthValueCheck, setdepthValueCheck] = useState("");
  const [liveStatusError, setLiveStatusError] = useState(false);
  // Elapsed Time
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);
  const [estimateId, setEstimateId] = useState(location.state.FullData._id);
  const [estimatorId, setEstimatorId] = useState(location.state.FullData.estimatorId);
  const [clientIDFromDashBoard, setclientIDFromDashBoard] = useState(
    location.state.FullData.clientId
  );
  const [status, setStatus] = useState(location.state.FullData.status);
  const [client, setClient] = useState([]);
  const [GetDollar, setGetDollar] = useState([]);
  const [GetAnswers, setGetAnswers] = useState([]);
  const [getAnswerApi, setgetAnswerAPI] = useState([]);
  const [editEnable, setEditEnable] = useState(false);
  const [imageFlag, setImageFlag] = useState(true);
  // GET TOTAL DOLLARS

  const [GetTotalDollar, setGetTotalDollar] = useState(0);
  // Modal Add Line Item
  const [Editshow, setEditshow] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [editItemLine, setEditItemLine] = useState(false);
  const [EditModalValue, setEditModalValue] = useState();
  const [editValue, setEditValue] = useState();
  const [editPlaceHolder, setEditPlaceHolder] = useState("");
  const [editIndex, setEditIndex] = useState();
  const [editIndexLine, setEditIndexLine] = useState();
  const [value, setValue] = useState(["", "", 2]);

  const [cleaningFrequency, setCleaningFrequency] = useState();
  const [others, setOthers] = useState([]);
  const [dateError, setDateError] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [picOrVideo, setPicOrVideo] = useState("");
  const [offerAnimation, setOfferAnimation] = useState(false);
  const [addLineItem, setAddLineItem] = useState([]);
  const [estimator, setEstimator] = useState();
  const [laterThan, setLaterThan] = useState();

  //! USE EFFECTS

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(async () => {
    if (isViewQuotation) {
      // Elapsed time
      handleStart();
      try {
        let clientApiResponse;
        clientApiResponse = await ClientProfileAPI(clientIDFromDashBoard);
        if (clientApiResponse.success) {
          setClient(clientApiResponse.client);
        }
        //  else {
        //   toast.error("Something went wrong");
        // }
      } catch (error) {
        toast.error("Something went wrong");
      }
      estimatorInfo();
    } else {
      toast.error("You are not authorized to view quotation");
      navigate("/Dashboard");
    }
  }, [ElaspedTimeCheck]);

  useEffect(async () => {
    let Response = await GetAnswersFromCleintID(clientIDFromDashBoard, estimatorId, estimateId);
    if (Response.success) {
      setGetAnswers(Response.answers);
      setgetAnswerAPI(Response.answers.length);
      for (let index = 0; index < Response.answers.length; index++) {
        arrayForDollarsStore[index] = 0;
      }
    }
    let lastUpdatedAt = Response.answers[Response.answers.length - 1];
    setLaterThan(lastUpdatedAt.updatedAt);
  }, [clientIDFromDashBoard]);

  useEffect(async () => {
    try {
      let Response = await GetAnswersFromCleintID(
        clientIDFromDashBoard,
        estimatorId,
        estimateId,
        laterThan
      );
      if (Response.success) {
        // if (getAnswerApi < Response.answers.length) {
        // try this wehn you have live answers in order to update previous updated answers
        // for (let index = getAnswerApi; index < Response.answers.length; index++) {
        for (let index = 0; index < Response.answers.length; index++) {
          GetAnswers[index] = Response.answers[index];
          if (getAnswerApi < Response.answers.length) {
            arrayForDollarsStore[index] = 0;
          }
        }
        let lastUpdatedAt = Response.answers[Response.answers.length - 1];
        setLaterThan(lastUpdatedAt.updatedAt);
        setgetAnswerAPI(Response.answers.length);
        // }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      count++;
    }, 5000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

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
    totalSum();
  };

  const totalSum = () => {
    let sum = arrayForDollarsStoreTotal + newArrayTotal;
    setGetTotalDollar(sum);
  };

  const addLineItemFunction = (e, index) => {
    arrayForDollarsStoreLine[index] = e.target.value;

    addLineItem[index] = {
      lineItemQuestion: "",
      lineItemAnswer: addLineItem[index].lineItemAnswer,
      amount: e.target.value ? e.target.value : 0,
      checkBox: addLineItem[index].chechBox,
    };

    nanNumber = e.target.value;
    if (nanNumber === "") {
      nanNumber = 0;
    }
    newArrayTotal = 0;

    for (let index = 0; index < addLineItem.length; index++) {
      if (addLineItem[index].amount === undefined) {
      } else {
        newArrayTotal = parseInt(newArrayTotal) + parseInt(addLineItem[index].amount);
      }
    }
    totalSum();
  };
  const checkBoxLine = (e, index) => {
    let checkBox = document.getElementById(`checkBoxLine${index}`);
    addLineItem[index] = {
      lineItemQuestion: "",
      lineItemAnswer: addLineItem[index].lineItemAnswer,
      amount: addLineItem[index].amount,
      checkBox: checkBox.checked,
    };
  };

  const SubmitForRebid = async () => {
    if (isAddQuotation) {
      if (cleaningFrequency !== undefined && cleaningFrequency !== "") {
        if (value[0] !== "" && value[1] !== "" && value[0] !== null && value[1] !== null) {
          setOfferAnimation(true);
          // submit for rebid api adding
          let getStatus = await EstimateIDFromDashboard(estimateId);
          if (
            getStatus.estimate.status === "revise" ||
            getStatus.estimate.status === "in_progress"
          ) {
            let grandTotal = document.getElementById("idGrandTotal");
            let monthlyTotal = document.getElementById("idMonthlyTotal");
            let newArr = [];
            for (let index = 0; index < GetAnswers.length; index++) {
              let checkBox = document.getElementById(`checkBox${index}`);
              newArr.push({
                lineItemQuestion: GetAnswers[index]?.question ? GetAnswers[index]?.question : "",
                lineItemAnswer: GetAnswers[index]?.answer,
                amount: arrayForDollarsStore[index] ? arrayForDollarsStore[index] : 0,
                checkBox: checkBox.checked,
                answer_type: GetAnswers[index]?.answer_type
                  ? GetAnswers[index]?.answer_type
                  : "Text",
                depth: GetAnswers[index]?.depth ? GetAnswers[index]?.depth : 0,
              });
            }
            setGetAnswerDiscriptionArray(newArr);
            // debugger;
            var data = JSON.stringify({
              estimateId: estimateId,
              estimatorId: estimatorId,
              clientId: clientIDFromDashBoard,
              // description: newArr,
              description: [...newArr, ...addLineItem],
              total: grandTotal.innerHTML ? parseInt(grandTotal.innerHTML) : 0,
              monthly_total: monthlyTotal.innerHTML ? parseInt(monthlyTotal.innerHTML) : 0,
              cleaningFrequency: cleaningFrequency ? cleaningFrequency : "",
              others: others,
              contractTermFrom: value[0] ? value[0] : "",
              contractTermTo: value[1] ? value[1] : "",
            });
            let response = await SubmitForRebidAPI(data);
            if (response.success) {
              setOfferAnimation(false);
              setGetTotalDollar(0);
              arrayForDollarsStore = [];
              navigate("/dashboard", { replace: true });
            } else {
              setOfferAnimation(false);
              toast.error("Something went wrong");
            }
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setOfferAnimation(false);
            setLiveStatusError(true);
            setTimeout(() => {
              setLiveStatusError(false);
            }, 4000);
          }
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          setdateToastMessage(true);
          setTimeout(() => {
            setdateToastMessage(false);
          }, 4000);
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setfrequencyToastMessage(true);
        setTimeout(() => {
          setfrequencyToastMessage(false);
        }, 4000);
      }
    } else {
      toast.error("You are not authorized to add quotation");
    }
  };
  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
        timeZone: tzString,
      })
    );
  }

  // Elapsed Time
  const handleStart = () => {
    var timeUpdate = location.state.FullData.updatedAt;
    var today = new Date();
    timeUpdate = convertTZ(timeUpdate, "Asia/Karachi").getTime();
    today = convertTZ(today, "Asia/Karachi").getTime();
    let differenceM = today - timeUpdate;
    setTimer(differenceM);

    countRef.current = setInterval(() => {
      setTimer((differenceM) => differenceM + 1000);
    }, 1000);
  };

  const formatTime = () => {
    var milliseconds = parseInt((timer % 1000) / 100),
      seconds = Math.floor((timer / 1000) % 60),
      minutes = Math.floor((timer / (1000 * 60)) % 60),
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  //edit quotation
  const editCalled = (index, categoryName) => {
    setEditItem(true);
    setEditPlaceHolder(categoryName);
    setEditIndex(index);
  };
  const editCalledLineItem = (index, categoryName) => {
    setEditItemLine(true);
    setEditPlaceHolder(categoryName);
    setEditIndexLine(index);
  };
  const EditItemClose = () => {
    setEditItem(false);
  };
  const EditItemCloseLine = () => {
    setEditItemLine(false);
  };
  const deleteCalled = (index) => {
    arrayForDollarsStoreTotal = 0;

    GetAnswers.splice(index, 1);
    arrayForDollarsStore.splice(index, 1);
    setViewCategoryAPI(GetAnswers);

    for (let index = 0; index < arrayForDollarsStore.length; index++) {
      arrayForDollarsStoreTotal += parseInt(arrayForDollarsStore[index]);
    }
    setGetTotalDollar(arrayForDollarsStoreTotal);
  };
  const deleteCalledLine = (index) => {
    addLineItem.splice(index, 1);
  };

  // Add line Item Modal
  const EdithandleClose = () => {
    setEditshow(false);
  };

  const AddLineItemForm = async (e) => {
    e.preventDefault();
    addLineItem.push({
      lineItemQuestion: "",
      lineItemAnswer: EditModalValue,
      amount: 0,
      checkBox: false,
      depth: 0,
      answer_type: "Text",
    });
    setViewCategoryAPI(GetAnswers);
    EdithandleClose();
  };

  const EditItemForm = (e) => {
    e.preventDefault();
    GetAnswers[editIndex].answer = editValue;
    setViewCategoryAPI(GetAnswers);
    EditItemClose();
  };

  const EditItemFormLine = (e) => {
    e.preventDefault();
    addLineItem[editIndexLine].lineItemAnswer = editValue;
    EditItemCloseLine();
  };

  function printDiv() {
    window.print();
  }

  const imgSize = (index) => {
    document.getElementById(`imgSizes${index}`).requestFullscreen();
  };

  const otherArray = (e) => {
    if (e.key === "Enter" && e.target.value) {
      others.push(e.target.value);
      document.getElementById("others").value = "";
    }
  };
  const popOthers = (index) => {
    others.splice(index, 1);
  };

  const estimatorInfo = async () => {
    try {
      let estimatorResponse = await getEstimatorByIdAPI(estimatorId, authUser().company.company_id);
      if (estimatorResponse.success) {
        setEstimator(estimatorResponse.estimator);
      }
      //  else {
      //   toast.error("Something went wrong");
      // }
    } catch (e) {
      toast.error("Something went wrong");
    }
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
          navigate("../Chat", { state: { fullData: navigateResponse.conversation } });
        } else {
          navigate("../Chat", { state: { fullData: navigateResponse.conversation } });
        }
      } else {
        navigate("../Chat", { state: { fullData: navigateResponse } });
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

  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      {dateToastMessage ? (
        <div className=" col-12 toastClass">
          <Toast success={"danger"} message="Date cannot be empty. please select Date!!!" />
        </div>
      ) : null}

      {frequencyToastMessage ? (
        <div className=" col-12 toastClass">
          <Toast
            success={"danger"}
            message="Cleaning frequency cannot be empty. please enter value!!!"
          />
        </div>
      ) : null}
      {liveStatusError ? (
        <div className=" col-12 toastClass">
          <Toast
            success={"danger"}
            message="Unable to send Offer until status is 'In Progress' or 'Revise' "
          />
        </div>
      ) : null}
      <div id="printThisDiv" className="row">
        <div className="col-12 mt-4 d-flex justify-content-between">
          <div className="elapsedTime">
            <span className="elapseSpan">Elasped Time</span>: {formatTime()}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="elapsedPara">
              Elapsed Time since the quotation request is received
            </span>
          </div>

          <div className="test d-flex flex-end"></div>
        </div>

        <div className="col-12 mt-4">
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

          <div className="col-12 d-flex flex-start">
            <h5>Quotation</h5>
          </div>
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
                </div>
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
                <div className="col-7 col7">{client?.address}</div>
              </div>
              <div className="mt-4"></div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-4">
          <div className="card quotationCard">
            <div className="card-title incomingBarQuotation">
              <span className="col-9 col9">Description</span>
              {/* <span className="col-3 text-center">Total</span> */}
            </div>

            <div className="card-body">
              {/* {ViewCategoryAPI.map((item, index) => ( */}
              <table className="table table-bordered">
                <tbody>
                  {GetAnswers.length > 0 ? (
                    GetAnswers.map((item, index) => (
                      <>
                        <tr>
                          <td className="col-10 ">
                            <span
                              style={{
                                fontSize: "17px",
                                fontFamily: "MyriadPro-Regular",
                                wordBreak: "break-all",
                              }}
                            >
                              <p className="d-flex">
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
                            </span>
                          </td>

                          <td className="col-1">
                            <span className="EnterAmountInDollar">
                              {/* $ */}
                              <input
                                style={{ border: "none", outline: " none" }}
                                id="getAnswerInputDollar"
                                placeholder="Enter Amount"
                                value={
                                  arrayForDollarsStore[index] === 0
                                    ? ""
                                    : arrayForDollarsStore[index]
                                }
                                onChange={(e) => getDollarFunction(e, index)}
                                type="number"
                                min="0"
                              />
                            </span>
                          </td>
                          <td style={{ display: "table-row" }} className="col-1">
                            {/* <Checkbox {...label} size="small" /> */}
                            <input id={`checkBox${index}`} type="checkbox" />
                            <img
                              style={{ transform: "scale(0.3)" }}
                              onClick={() => editCalled(index, item.answer)}
                              className="q1Image pointer"
                              src={edit}
                              alt="Not Found"
                            />
                            <ImCross className="pointer ml-2" onClick={() => deleteCalled(index)} />
                          </td>
                        </tr>
                      </>
                    ))
                  ) : (
                    <h1>No Data Found</h1>
                  )}
                  {addLineItem.length > 0 ? (
                    addLineItem.map((item, index) => (
                      <>
                        <tr>
                          <td className="col-10 ">
                            <span
                              style={{
                                fontSize: "17px",
                                fontFamily: "MyriadPro-Regular",
                                wordBreak: "break-all",
                              }}
                            >
                              <p className="d-flex">
                                {/* {item.depth ? item.depth : "0"}.&nbsp;{item?.question} */}
                              </p>
                              <p style={{ fontFamily: "MyriadPro-Regular" }} className="d-flex">
                                &nbsp; Answer.&nbsp;
                                {item?.lineItemAnswer}
                              </p>
                            </span>
                          </td>

                          <td className="col-1">
                            <span className="EnterAmountInDollar">
                              {/* $ */}
                              <input
                                style={{ border: "none", outline: " none" }}
                                id="getAnswerInputDollar"
                                placeholder="Enter Amount"
                                key={item.amount}
                                defaultValue={item.amount === 0 ? "" : item.amount}
                                onBlur={(e) => addLineItemFunction(e, index)}
                                type="number"
                                min="0"
                              />
                            </span>
                          </td>
                          <td style={{ display: "table-row" }} className="col-1">
                            {/* <Checkbox {...label} size="small" /> */}
                            <input
                              id={`checkBoxLine${index}`}
                              onClick={(e) => checkBoxLine(e, index)}
                              type="checkbox"
                            />
                            <img
                              style={{ transform: "scale(0.3)" }}
                              onClick={() => editCalledLineItem(index, item.lineItemAnswer)}
                              className="q1Image pointer"
                              src={edit}
                              alt="Not Found"
                            />
                            <ImCross
                              className="pointer ml-2"
                              onClick={() => deleteCalledLine(index)}
                            />
                          </td>
                        </tr>
                      </>
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
              <div className="row mt-4 mb-4">
                <div className="btn_addLnItms">
                  <button
                    onClick={() => {
                      setEditshow(true);
                    }}
                    className="btn buttonColor"
                  >
                    Add Line Items <img className="qImage pluscircle" src={plus} alt="Not Found" />
                  </button>
                </div>
              </div>
              {/* line item edit */}
              <Modal
                show={editItemLine}
                onHide={EditItemCloseLine}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Details LINE ITEM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <form id="EditModalID" onSubmit={(e) => EditItemFormLine(e)}>
                        <label>
                          Enter New Name
                          <br />
                        </label>
                        <textarea
                          required
                          id="EditModalIDChild"
                          type="text"
                          className="col-12 textArea"
                          defaultValue={editPlaceHolder}
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                        <br />
                        <br />{" "}
                        <div className="row">
                          <div className="col-11"></div>
                          <div className="col-1">
                            <input className="btn btn-primary" value="submit" type="submit" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={EditItemCloseLine}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* Edit item modal start */}
              <Modal
                show={editItem}
                onHide={EditItemClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <form id="EditModalID" onSubmit={(e) => EditItemForm(e)}>
                        <label>
                          Enter New Name
                          <br />
                        </label>
                        <textarea
                          required
                          id="EditModalIDChild"
                          type="text"
                          className="col-12 textArea"
                          defaultValue={editPlaceHolder}
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                        <br />
                        <br />{" "}
                        <div className="row">
                          <div className="col-11"></div>
                          <div className="col-1">
                            <input className="btn btn-primary" value="submit" type="submit" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={EditItemClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* Edit item modal End  */}
              {/* Add new modal start */}
              <Modal
                show={Editshow}
                onHide={EdithandleClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <form id="EditModalID" onSubmit={(e) => AddLineItemForm(e)}>
                        <label>
                          Enter New Item <br />
                        </label>
                        <textarea
                          required
                          id="EditModalIDChildLine"
                          type="text"
                          className="col-12 textArea"
                          onChange={(e) => setEditModalValue(e.target.value)}
                        />
                        <br />
                        <br />
                        <div className="row">
                          <div className="col-11"></div>
                          <div className="col-1">
                            <input className="btn btn-primary" value="submit" type="submit" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={EdithandleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              {/*Add new modal End  */}

              <br />
              <div className="row text-light gTotalColor">
                <span className="col-9 gthead">
                  Monthly Total:{" "}
                  <span contenteditable="true" id="idMonthlyTotal" className="monthlyGT">
                    0
                  </span>
                </span>
                <span className="col-3">
                  Total: &nbsp;&nbsp;
                  <span contenteditable="true" id="idGrandTotal" className="numberGT">
                    {GetTotalDollar}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <form onSubmit={SubmitForRebid}> */}
        <div className="row mt-4">
          <div className="col-4 d-flex">
            <span style={{ fontSize: "14px" }} className="fontHelveticaOnly">
              Cleaning frequency
            </span>

            <input
              style={{ marginLeft: "3%" }}
              type="text"
              placeholder="Cleaning frequency"
              className="fontHelveticaBorder"
              onChange={(e) => setCleaningFrequency(e.target.value)}
            />
          </div>
          <div className="col-3 d-flex">
            <span style={{ fontSize: "14px" }} className="fontHelveticaOnly">
              Others
            </span>

            <input
              style={{ marginLeft: "3%" }}
              id="others"
              onKeyDown={(e) => otherArray(e)}
              type="text"
              placeholder="Others"
              className="fontHelveticaBorder"
            />
          </div>
          <div className="col-5">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              localeText={{ start: "contract-term start", end: "contract-term end" }}
            >
              <DateRangePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </div>
          {dateError ? <span style={{ color: "red" }}>{dateError}</span> : null}
          {/* </div> */}
        </div>

        <div className="col-12">
          <div className="d-flex">
            <ol>
              {others.length ? (
                <>
                  <h6>
                    {" "}
                    <u>Tags</u>{" "}
                  </h6>
                  {others.map((item, index) => (
                    <li className="d-flex">
                      <b>{index}</b>. &nbsp; {item} &nbsp;&nbsp;&nbsp;{" "}
                      <b className="pointer" onClick={() => popOthers(index)}>
                        <AiOutlineMinusSquare />
                      </b>
                    </li>
                  ))}
                </>
              ) : null}
            </ol>
          </div>
          <div className="mt-4">
            {!offerAnimation ? (
              <button onClick={SubmitForRebid} className="btn col-2 btnFont ">
                <b>Send Offer</b>
              </button>
            ) : (
              <LoaderAnimation size={100} />
            )}

            <br />
            <button onClick={printDiv} type="button" className="btn btn-lg btn-light btnPrinter">
              <img src={Group2649} alt="Not working" />
            </button>
          </div>
        </div>
        {/* <div> */}
        {/* </div> */}
        {/* </form> */}
      </div>
    </ErrorBoundary>
  );
};
