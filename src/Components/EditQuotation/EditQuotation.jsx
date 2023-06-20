/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./EditQuotation.css";
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
  getQuotationAPI,
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
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { TextField, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { IsAuthorized } from "../../Auth/Authorization";

var ElaspedTimeCheck = 1;
var arrayForDollars = [];
var arrayForDollarsStore = [];
var arrayForDollarsStoreTotal = 0;
let spaces = "  ";
let count = 0;

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

export const EditQuotation = () => {
  // BUILD IN HOOKS
  let navigate = useNavigate();
  const location = useLocation();
  const authUser = useAuthUser();
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
  const [offerAnimation, setOfferAnimation] = useState(false);
  const [GetTotalDollar, setGetTotalDollar] = useState(0);
  // ("clientID", clientIDFromDashBoard);
  // Modal Add Line Item
  const [Editshow, setEditshow] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [EditModalValue, setEditModalValue] = useState();
  const [editValue, setEditValue] = useState();
  const [editPlaceHolder, setEditPlaceHolder] = useState("");
  const [editIndex, setEditIndex] = useState();
  const [value, setValue] = useState(["", "", 2]);

  const [cleaningFrequency, setCleaningFrequency] = useState();
  const [others, setOthers] = useState([]);
  const [dateError, setDateError] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [picOrVideo, setPicOrVideo] = useState("");
  const [getQuotation, setGetQuotation] = useState();
  const [getQuotationTotal, setGetQuotationTotal] = useState(0);
  const [getQuotationMonthlyTotal, setGetQuotationMonthlyTotal] = useState(0);
  const [getQuotationAPIResponse, setGetQuotationAPIResponse] = useState({});
  const [estimator, setEstimator] = useState();

  //! USE EFFECTS
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isUpdateQuotation = IsAuthorized("estimate").update;
  useEffect(() => {
    if (!isUpdateQuotation) {
      toast.error("You are not authorized to update quotation");
    }
  }, []);

  useEffect(async () => {
    estimatorInfo();
    // window.scrollTo(0, 0);
    try {
      let clientApiResponse;
      // clientApiResponse = await ClientProfileAPI(clientDataFromDashBoard.username);
      clientApiResponse = await ClientProfileAPI(clientIDFromDashBoard);
      if (clientApiResponse.success) {
        setClient(clientApiResponse.client);
      }
      // else {
      //   toast.error(clientApiResponse.msg);
      // }
    } catch (error) {
      toast.error("Something went wrong");
    }
    // Elapsed time
    handleStart();
  }, [ElaspedTimeCheck]);

  // debugger;
  useEffect(async () => {
    let getQuotationResponse = await getQuotationAPI(estimateId, estimatorId);
    if (getQuotationResponse.success) {
      setGetQuotation(getQuotationResponse.quotation.description);
      setGetQuotationTotal(getQuotationResponse.quotation.total_amount);
      setGetQuotationMonthlyTotal(getQuotationResponse.quotation.monthly_total);
      setGetQuotationAPIResponse(getQuotationResponse.quotation);
      setCleaningFrequency(getQuotationResponse.quotation.cleaningFrequency);
      setValue([
        getQuotationResponse.quotation.contractTermFrom
          ? getQuotationResponse.quotation.contractTermFrom
          : "",
        getQuotationResponse.quotation.contractTermTo
          ? getQuotationResponse.quotation.contractTermTo
          : "",
      ]);
      setOthers(getQuotationResponse.quotation.others ? getQuotationResponse.quotation.others : []);
    }
    // else {
    //   toast.error(
    //     getQuotationResponse?.message ? getQuotationResponse.message : "quotation Not found"
    //   );
    // }
  }, [clientIDFromDashBoard]);

  // FUNCTIONS
  let nanNumber;
  const getDollarFunction = (e, item, index) => {
    nanNumber = e.target.value;
    if (nanNumber === "") {
      nanNumber = 0;
    }
    let total = 0;
    // getQuotation[index].amount = nanNumber;
    getQuotation[index] = {
      lineItemQuestion: item.lineItemQuestion,
      lineItemAnswer: item.lineItemAnswer,
      amount: nanNumber,
      checkBox: item.checkBox ? item.checkBox : false,
      answer_type: item.answer_type ? item.answer_type : "Text",
      depth: item.depth ? item.depth : 0,
    };
    for (let index = 0; index < getQuotation.length; index++) {
      total = parseInt(total) + parseInt(getQuotation[index].amount);
    }
    setGetQuotationTotal(total);
  };
  const checkBoxClicked = (item, index) => {
    let checkBox = document.getElementById(`checkBox${index}`);

    getQuotation[index] = {
      lineItemQuestion: item.lineItemQuestion ? item.lineItemQuestion : "",
      lineItemAnswer: item.lineItemAnswer ? item.lineItemAnswer : "",
      amount: item.amount ? item.amount : 0,
      checkBox: checkBox.checked,
      answer_type: item.answer_type ? item.answer_type : "Text",
      depth: item.depth ? item.depth : 0,
    };
  };

  const SubmitForRebid = async () => {
    if (cleaningFrequency !== undefined && cleaningFrequency !== "") {
      if (value[0] !== "" && value[1] !== "" && value[0] !== null && value[1] !== null) {
        setOfferAnimation(true);
        // submit for rebid api adding

        let getStatus = await EstimateIDFromDashboard(estimateId);
        if (getStatus.estimate.status === "revise" || getStatus.estimate.status === "in_progress") {
          let monthlyTotal = document.getElementById("idMonthlyTotal");

          let grandTotal = document.getElementById("idGrandTotal");
          var data = JSON.stringify({
            estimateId: estimateId,
            estimatorId: estimatorId,
            clientId: clientIDFromDashBoard,
            // description: newArr,
            description: getQuotation,
            total: grandTotal.innerHTML ? parseInt(grandTotal.innerHTML) : 0,
            monthly_total: monthlyTotal.innerHTML ? parseInt(monthlyTotal.innerHTML) : 0,
            cleaningFrequency: cleaningFrequency ? cleaningFrequency : "",
            others: others,
            contractTermFrom: value[0],
            contractTermTo: value[1],
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
  const EditItemClose = () => {
    setEditItem(false);
  };
  const deleteCalled = (index) => {
    getQuotation.splice(index, 1);

    let total = 0;
    for (let index = 0; index < getQuotation.length; index++) {
      total = parseInt(total) + parseInt(getQuotation[index].amount);
    }
    setGetQuotationTotal(total);
  };

  // Add line Item Modal
  const EdithandleClose = () => {
    setEditshow(false);
  };

  const AddLineItemForm = async (e) => {
    e.preventDefault();

    getQuotation.push({
      lineItemQuestion: "",
      lineItemAnswer: EditModalValue,
      amount: 0,
      checkBox: false,
      answer_type: "Text",
      depth: 0,
    });
    EdithandleClose();
  };

  const EditItemForm = async (e) => {
    e.preventDefault();
    getQuotation[editIndex].lineItemAnswer = editValue;
    EditItemClose();
  };

  function printDiv() {
    // var printContents = document.getElementById("printThisDiv").innerHTML;
    // var originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    window.print();

    // document.body.innerHTML = originalContents;
  }

  function isValidUrl(_string) {
    const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    // if (matchPattern.test(_string)) {
    //   var substring = matchPattern.substring(matchPattern.length - 3);
    //   setPicOrVideo(substring);
    // }
    return matchPattern.test(_string);
  }

  const imgSize = (url) => {
    document.getElementById(`imgSizes${url}`).requestFullscreen();
  };

  const otherArray = (e) => {
    if (e.key === "Enter" && e.target.value) {
      others.push(e.target.value);
      document.getElementById("others").value = "";
    }
    //Show that array in html
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
  const navigateToChat = async (idTwo, estimatorOrClient) => {
    try {
      var data = JSON.stringify({
        uniqueName: localStorage.getItem("username") + "&&" + idTwo + "-" + estimatorOrClient,
        identity_one: localStorage.getItem("username"),
        identity_two: idTwo,
      });
      let navigateResponse = await createConversation(data);
      if (navigateResponse.success) {
        const twillioToken = await getChatToken(localStorage.getItem("username"));
        if (twillioToken.success) {
          localStorage.setItem("twillio_token", twillioToken.token);
          // navigate("../Messages", { replace: true });
          navigate("../Chat", { state: { fullData: navigateResponse.conversation } });
          // navigate("../Chat", { state: { fullData: navigateResponse } });
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
              onClick={() => navigateToChat(estimator.username, "estimator")}
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
                      onClick={() => navigateToChat(client.username, "client")}
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
                      onClick={() => navigateToChat(client.username, "client")}
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
                  {getQuotation ? (
                    getQuotation.map((item, index) => (
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
                                {" "}
                                {item.depth ? item.depth : "0"}.&nbsp;{item?.lineItemQuestion}
                              </p>
                              <p style={{ fontFamily: "MyriadPro-Regular" }} className="d-flex">
                                &nbsp; Answer.&nbsp;
                                {(() => {
                                  switch (item?.answer_type ? item?.answer_type : "Text") {
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
                            </span>
                          </td>

                          <td className="col-1">
                            <span className="EnterAmountInDollar">
                              {/* $ */}
                              <input
                                style={{ border: "none", outline: " none" }}
                                id="getAnswerInputDollar"
                                placeholder="Enter Amount"
                                value={item.amount}
                                onChange={(e) => getDollarFunction(e, item, index)}
                                type="number"
                                min="0"
                              />
                            </span>
                          </td>
                          <td style={{ display: "table-row" }} className="col-1">
                            <input
                              type="checkbox"
                              id={`checkBox${index}`}
                              defaultChecked={item.checkBox}
                              onClick={(e) => checkBoxClicked(item, index)}
                            />
                            <img
                              onClick={() => editCalled(index, item.lineItemAnswer)}
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
                </tbody>
              </table>
              <div className="row mt-4 mb-4">
                <div className="btn_addLnItms">
                  <button onClick={() => setEditshow(true)} className="btn buttonColor">
                    Add Line Items <img className="qImage pluscircle" src={plus} alt="Not Found" />
                  </button>
                </div>
              </div>
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
                          id="EditModalIDChild"
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
              defaultValue={
                getQuotationAPIResponse.cleaningFrequency
                  ? getQuotationAPIResponse.cleaningFrequency
                  : ""
              }
              onChange={(e) => setCleaningFrequency(e.target.value)}
            />
          </div>
          <div className="col-3 d-flex">
            {/* <div className="row">
              <div className="col-6 ml3"> */}
            <span style={{ fontSize: "14px" }} className="fontHelveticaOnly">
              Others
            </span>
            {/* </div> */}
            {/* <div className="col-6"> */}
            <input
              style={{ marginLeft: "3%" }}
              id="others"
              onKeyDown={(e) => otherArray(e)}
              type="text"
              placeholder="Others"
              className="fontHelveticaBorder"
            />
            {/* </div> */}
            {/* </div> */}
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
            <button onClick={SubmitForRebid} type="button" className="btn col-2 btnFont ">
              <b>Send Offer</b>
            </button>

            <br />
            <button onClick={printDiv} type="button" className="btn btn-lg btn-light btnPrinter">
              <img src={Group2649} alt="Not working" />
            </button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </ErrorBoundary>
  );
};
