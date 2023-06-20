import React, { useState } from "react";
import Nav from "../../Components/Navigation/Navbar/Nav";
import Footer from "../../Components/Navigation/Footer/Footer";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import AllEstimators from "../../Components/AllEstimators/AllEstimators";
import { Button } from "react-bootstrap";
import { AllEstimatorsTable } from "../../Components/Tables/AllEstimatorsTable/AllEstimatorsTable";
import WarehouseIcon from "../../Assets/Images/WarehouseIcon.png";
import schoolIcon from "../../Assets/Images/schoolIcon.png";
import Gymnasium from "../../Assets/Images/GymnasiumIcon.png";
import VendorIcon from "../../Assets/Images/VendorIcon.png";
import BankIcon from "../../Assets/Images/BankIcon.png";
import MallIcon from "../../Assets/Images/MallIcon.png";
import fitnessblueIcon from "../../Assets/Images/fitnessblueIcon.png";
import GroupIcon from "../../Assets/Images/GroupIcon.png";
import "./AllEstimatorsPage.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import { searchEstimatesAPI } from "../../api/Services";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import LoaderAnimation from "../../Components/Loader/LoaderAnimation";
import SmartTable from "../../Components/Tables/sharedTable/sharedTable";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";
import { IsAuthorized } from "../../Auth/Authorization";

const headCells = [
  {
    id: "organiztaionName",
    numeric: false,
    label: "Organization Name",
    width: 200,
  },
  {
    id: "estimateDate",
    numeric: true,
    label: "Estimate Date",
    width: 150,
  },
  {
    id: "resultsFound",
    numeric: false,
    label: "Results Found",
    width: 100,
  },
];

const AllEstimatorsPage = () => {
  const navigate = useNavigate();
  const isViewEstimate = IsAuthorized("estimate").view;

  const auth = useAuthUser();
  const [value, setValue] = useState(["", ""]);
  const [rangePicker, setRangePicker] = useState(0);
  const [KeyboardSearch, setKeyboardSearch] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [businessTypes, setBusinessTypes] = useState("");
  const [animation, setAnimation] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);
  const [fiveRows, setFiveRows] = useState([]);
  const allId = [
    "WareHouseID",
    "SchoolID",
    "GymnasiumID",
    "VendorID",
    "BankID",
    "MallsID",
    "GymsID",
    "LawFirmsID",
    "LibraryID",
    "Vendor2ID",
    "Bank2ID",
    "Malls2ID",
  ];
  const selectedFilters = (id, business_type) => {
    setBusinessTypes(business_type);
    for (let index = 0; index < allId.length; index++) {
      if (id === allId[index]) {
        document.getElementById(id).style.backgroundColor = "rgb(217,229,241)";
      } else {
        document.getElementById(allId[index]).style.backgroundColor = "rgb(255,255,255)";
      }
    }
  };

  const applyFilters = async () => {
    setData([]);
    setFiveRows([]);
    setAnimation(true);
    setShowTable(false);

    let tempData = [];
    let tempFiverows = [];

    var payload = JSON.stringify({
      business_type: businessTypes ? businessTypes : "",
      estimatePrice: rangePicker ? rangePicker : 0,
      location: address ? address : "",
      city: city ? city : "",
      contractTermFrom: value[0] ? value[0] : "",
      contractTermTo: value[1] ? value[1] : "",
      state: state ? state : "",
      zip_code: zipCode ? zipCode : "",
      search: KeyboardSearch ? KeyboardSearch : "",
    });
    let searchEstimateResponse = await searchEstimatesAPI(payload, auth().company.company_id);
    if (searchEstimateResponse.success) {
      setAnimation(false);
      for (let index = 0; index < searchEstimateResponse.estimates.length; index++) {
        tempData.push({
          organiztaionName: searchEstimateResponse.estimates[index].client_name,
          estimateDate: moment
            .utc(searchEstimateResponse.estimates[index].createdAt)
            .format("MMM Do, YYYY"),
          resultsFound: (
            <button
              onClick={(e) => showEstimate(e, searchEstimateResponse.estimates[index])}
              className="btn pointer buttonColor"
            >
              View Estimate
            </button>
          ),
        });
      }
      for (
        let index = 0;
        index <
        (searchEstimateResponse.estimates.length > 5 ? 5 : searchEstimateResponse.estimates.length);
        index++
      ) {
        tempFiverows.push({
          organiztaionName: searchEstimateResponse.estimates[index].client_name,
          estimateDate: moment
            .utc(searchEstimateResponse.estimates[index].createdAt)
            .format("MMM Do, YYYY"),
          resultsFound: (
            <button
              onClick={(e) => showEstimate(e, searchEstimateResponse.estimates[index])}
              className="btn pointer buttonColor"
            >
              View Estimate
            </button>
          ),
        });
      }
      setData(tempData);
      setFiveRows(tempFiverows);
      setShowTable(true);
    } else {
      toast.error(searchEstimateResponse.msg);
      setShowTable(false);
      setAnimation(false);
    }
  };

  const showEstimate = (e, data) => {
    e.preventDefault();
    if (isViewEstimate) {
      navigate("/RecentOfferas", {
        state: {
          FullData: data,
        },
      });
    } else {
      toast.error("You are not authorized to view Estimate");
    }
  };

  return (
    <div className="main_menu bg-light">
      <div className="row">
        <div className="col-12">
          <Nav />
        </div>
      </div>
      <div className="row ">
        <div className="col-1 sidebar_bg_color">
          <Sidebar />
        </div>
        <div className="col-11 bgColor">
          &emsp;
          <div className="container containerAllEstimates">
            <div className="row justify-content-center">
              <div className="col-11 mt-2 cardsCenter ">
                <AllEstimators />
              </div>
            </div>
            <div className="row justify-content-start">
              <div className="col-5 mt-2 cardsCenter ">
                <h6>Business Type (select one or many)</h6>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-8">
                <div className="row">
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="WareHouseID"
                        name="WareHouse"
                        // onClick={() => wareHouseFunction()}
                        onClick={() => selectedFilters("WareHouseID", "WareHouse")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={WarehouseIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Ware House</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="SchoolID"
                        name="School"
                        // onClick={() => schoolIdFunction()}
                        onClick={() => selectedFilters("SchoolID", "School")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={schoolIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>School</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="GymnasiumID"
                        name="Gymnasium"
                        // onClick={() => GymnasiumIdFunction()}
                        onClick={() => selectedFilters("GymnasiumID", "Gymnasium")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={Gymnasium}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Gymnasium</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="VendorID"
                        name="Vendor"
                        // onClick={() => VendorIDFunction()}
                        onClick={() => selectedFilters("VendorID", "Vendor")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={VendorIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Vendor</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="BankID"
                        name="Bank"
                        // onClick={() => BankIDFunction()}
                        onClick={() => selectedFilters("BankID", "Bank")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={BankIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Bank</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="MallsID"
                        name="Malls"
                        // onClick={() => MallsIDFunction()}
                        onClick={() => selectedFilters("MallsID", "Malls")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={MallIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Malls</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            &emsp;
            <div className="row justify-content-center">
              <div className="col-8">
                <div className="row">
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="GymsID"
                        name="Gyms"
                        // onClick={() => GymsIDFunction()}
                        onClick={() => selectedFilters("GymsID", "Gyms")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={fitnessblueIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Gyms</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="LawFirmsID"
                        name="LawFirms"
                        // onClick={() => LawFirmsIDFunction()}
                        onClick={() => selectedFilters("LawFirmsID", "LawFirms")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={GroupIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Law Firms</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="LibraryID"
                        name="Library"
                        // onClick={() => LibraryIDFunction()}
                        onClick={() => selectedFilters("LibraryID", "Library")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={Gymnasium}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Library</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="Vendor2ID"
                        name="Vendor"
                        // onClick={() => Vendor2IDFunction()}
                        onClick={() => selectedFilters("Vendor2ID", "Vendor2")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={VendorIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Vendor</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="Bank2ID"
                        name="Bank"
                        // onClick={() => Bank2IDFunction()}
                        onClick={() => selectedFilters("Bank2ID", "Bank2")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={BankIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Bank</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2  ">
                    <div className="card">
                      <button
                        id="Malls2ID"
                        name="Malls2"
                        // onClick={() => Malls2IDFunction()}
                        onClick={() => selectedFilters("Malls2ID", "Malls2")}
                        className="btn btn_color"
                      >
                        <div className="row justify-content-center">
                          <div className=" mt-1">
                            <div size="1">
                              <img
                                class="responsiveImg"
                                src={MallIcon}
                                height="75"
                                width="60"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="">
                        <font size="2" className="font-size:10vw card-text mb-2">
                          <h6>Malls</h6>
                        </font>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-start">
              <div className="col-4 mt-2 cardsCenter ">
                <h6>Keyword Search</h6>
              </div>
            </div>
            <div className="row justify-content-start">
              <div className="col-1 mt-2 cardsCenter "></div>
              &emsp;&emsp;&emsp;
              <div className="col-2 mt-2 cardsCenter w-50">
                <div>
                  <form className="form-inline col-12 searchBartool">
                    <input
                      className="form-control  mr-sm-2 "
                      type="search"
                      placeholder="Search Anything"
                      onChange={(e) => setKeyboardSearch(e.target.value)}
                      aria-label="Search"
                    />{" "}
                  </form>
                </div>
              </div>
            </div>
            <div className="row justify-content-start">
              <div className="col-4 mt-2 cardsCenter">
                <h6>Location Search</h6>
              </div>
              <div className="col-2 mt-2 cardsCenter">
                <h6>City Search &emsp;</h6>
              </div>
              <div className="col-2 mt-2 cardsCenter">
                {" "}
                <h6>&emsp;Zip Code Search</h6>
              </div>
              <div className="col-2 mt-2 cardsCenter">
                <h6>State Search</h6>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-3 mt-2 cardsCenter">
                <div>
                  <form className="form-inline col-12 searchBartool">
                    <input
                      className="form-control  mr-sm-2 "
                      type="search"
                      placeholder="Address"
                      aria-label="Search"
                      onChange={(e) => setAddress(e.target.value)}
                    />{" "}
                  </form>
                </div>
              </div>
              <div className="col-2 mt-2 cardsCenter">
                <form className="form-inline col-12 searchBartool">
                  <input
                    className="form-control  mr-sm-2 "
                    type="search"
                    placeholder="City Search"
                    aria-label="Search"
                    onChange={(e) => setCity(e.target.value)}
                  />{" "}
                </form>
              </div>
              <div className="col-2 mt-2 cardsCenter">
                <form className="form-inline col-12 searchBartool">
                  <input
                    className="form-control  mr-sm-2 "
                    type="search"
                    placeholder="Zip Code Search"
                    aria-label="Search"
                    onChange={(e) => setZipCode(e.target.value)}
                  />{" "}
                </form>
              </div>
              <div className="col-2 mt-2 cardsCenter">
                <form className="form-inline col-12 searchBartool">
                  <input
                    className="form-control  mr-sm-2 "
                    type="search"
                    placeholder="State Search"
                    aria-label="Search"
                    onChange={(e) => setState(e.target.value)}
                  />{" "}
                </form>
              </div>
              &emsp;
            </div>
            &emsp;&emsp;
            <div className="row">
              <div className="col-12">
                <div className="row justify-content-start">
                  <div className="col-1"></div>

                  <div className="col-3">
                    <h6>Select Contract Expiration:&emsp;&emsp;</h6>
                  </div>
                  <div className="col-3"></div>
                  <div className="col-2">
                    <h6>Estimate Price Name</h6>
                  </div>
                </div>
              </div>
            </div>
            &emsp;
            <div className="row">
              <div
                className="col-7 mt-2 d-flex justify-content-center "
                //  style={{ width: "25rem" }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  localeText={{ start: "contract-expiration from", end: "contract-expiration to" }}
                >
                  <DateRangePicker
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField
                          // style={{ border: "3px solid black", borderRadius: "10px" }}
                          {...startProps}
                        />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField
                          // style={{ border: "3px solid black", borderRadius: "10px" }}
                          {...endProps}
                        />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider>
              </div>
              &emsp; &emsp;
              <div className="col-4 align-self-start mt-2 ">
                <div className="card sliderCard col-9">
                  <RangeSlider
                    value={rangePicker}
                    onChange={(changeEvent) => setRangePicker(changeEvent.target.value)}
                  />
                </div>
              </div>
            </div>
            &emsp; &emsp;
            <div className="row justify-content-center h-100 ">
              <div className="col-3 ">
                {!animation ? (
                  <Button
                    onClick={applyFilters}
                    className="btn-sm buttoninside w-75 buttonColor"
                    outline
                  >
                    Apply Filters
                  </Button>
                ) : (
                  <>
                    <LoaderAnimation />
                    <h5 className="mt-4" style={{ color: "red" }}>
                      Please wait, this may take a few minutes.
                    </h5>
                  </>
                )}
              </div>
            </div>
            &emsp; &emsp;
            <div className="row row justify-content-center">
              <div className="col-10">
                {showTable ? (
                  <SmartTable
                    title="All estimates"
                    data={data}
                    fiveRows={fiveRows}
                    headCells={headCells}
                    paginator={true}
                  />
                ) : null}
              </div>
            </div>
            &emsp;
          </div>
          &emsp;
        </div>
      </div>

      <div className="row ">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AllEstimatorsPage;
