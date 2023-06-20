/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Toast, ToastHeader } from "react-bootstrap";
import { Input, Label, Form } from "reactstrap";
import {
  addEstimatorAPI,
  addUserDisable,
  checkingBlackListed,
  removeBlackListed,
} from "../../api/Services";
import { getCompaniesAPI, getEstimatorDetailsAPI } from "../../api/Services";
import { BiUpload } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { uploadImage } from "../../api/Services";
import { color } from "highcharts";
import { useLocation } from "react-router-dom";
import { UpdateEstimatorsAPI } from "../../api/Services";
import "./UpdateEstimators.css";
import LoaderAnimation from "../Loader/LoaderAnimation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

import { useAuthUser } from "react-auth-kit";
import { IsAuthorized } from "../../Auth/Authorization";

const MAX_FILE_SIZE = 1000000 * 2.5,
  ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

const UpdateEstimators = () => {
  const location = useLocation();
  const authUser = useAuthUser();
  useEffect(async () => {
    try {
      let response = await getEstimatorDetailsAPI(location.state.username);

      checkingBlackListedUser(response.estimator.username);
      setUserName(response.estimator.username);
      setName(response.estimator.fullname);
      setEmail(response.estimator.emailaddress);
      setTotalExperience(response.estimator.totalexperience);
      setCertifications(response.estimator.certifications);
      setSsn(response.estimator.ssn);
      setLicense(response.estimator.driverlicense);
      setPayPalID(response.estimator.paypalid);
      setBusinessType(response.estimator.businessType);
      setRate(response.estimator.rate);
      // setDropDownMenuButton1(response.estimator.companyid);
      setPhone(response.estimator.contact);
      setCheckStatus(response.estimator.status);
      setCheckPicture(
        response.estimator?.profilepicture?.split("https://somecompany-images.s3.amazonaws.com/")[1]
      );

      setPicture(
        response.estimator?.profilepicture
          ? response.estimator?.profilepicture?.split(
              "https://somecompany-images.s3.amazonaws.com/"
            )[1]
          : response.estimator?.profilepicture
      );
      setCheckPhoto(
        response.estimator?.photoid?.split("https://somecompany-images.s3.amazonaws.com/")[1]
      );
      setPhoto(
        response.estimator?.photoid
          ? response.estimator?.photoid?.split("https://somecompany-images.s3.amazonaws.com/")[1]
          : response.estimator?.photoid
      );
      setCertList(
        response.estimator.certificateimages ? response.estimator.certificateimages.split(",") : ""
      );
    } catch (error) {
      toast.error("Error!!! ", error);
    }
  }, []);
  let navigate = useNavigate();
  const [checkStatus, setCheckStatus] = useState("");
  const [CheckPicture, setCheckPicture] = useState();
  const [CheckPhoto, setCheckPhoto] = useState();
  const [username, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [total_experience, setTotalExperience] = useState("");
  const [certifications, setCertifications] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [rate, setRate] = useState();
  const [rateError, setRateError] = useState(false);
  const [isBlackListed, setIsBlackListed] = useState(true);
  const [inActiveModal, setInActiveModal] = useState(false);
  // const [dropdownMenuButton1, setDropDownMenuButton1] = useState(
  //   location.state.dropdownValue
  // );
  const [ssn, setSsn] = useState("");
  const [license, setLicense] = useState("");
  const [paypal_id, setPayPalID] = useState("");

  const [picture, setPicture] = useState();
  const [photo, setPhoto] = useState();
  const [certList, setCertList] = useState("");

  const [companyList, setCompanyList] = useState([]);
  const [estimatorAdded, setEstimatorAdded] = useState(false);
  const [estimatorNotAdded, setEstimatorNotAdded] = useState(false);
  const [gettingDropdownOption, setGettingDropdownOption] = useState("");
  const [gettingDropdownOptionValue, setGettingDropdownOptionValue] = useState("");
  // const [companyName, setCompanyName] = useState("");

  // username error
  const [userNameError, setUserNameError] = useState(false);
  const [totalExperienceError, setTotatlExperienceError] = useState(false);
  const [certificationError, setCertificationError] = useState(false);

  //Upload Your Picture
  const [animationupload, setAnimationupload] = useState(false);

  const [animationuploadPhoto, setAnimationuploadPhoto] = useState(false);

  //Upload Certificates (Multiple Uploads Available)
  const [animationuploadMultiple, setAnimationuploadMultiple] = useState(false);

  // animation
  const [updateEstimatorLoader, setUpdateEstimatorLoader] = useState(false);
  const [statusTag, setStatusTage] = useState(false);
  const isUpdateEtimator = IsAuthorized("estimator").update;
  const isMakeActive = IsAuthorized("estimator").active;
  const isMakeInActive = IsAuthorized("estimator").inActive;

  useEffect(() => {
    if (isUpdateEtimator) {
      setUserName(location.state.username);
    } else {
      toast.error("You are not authorized to update etimator");
      navigate("/ManageEstimators");
    }
  }, []);

  const addEstimatorButton = async (e) => {
    e.preventDefault();
    setUpdateEstimatorLoader(true);

    var updateData = JSON.stringify({
      username: username,
      name: name,
      contact: phone,
      businessType: businessType,
      email: email,
      role: "estimator",
      rate: rate,
      ssn: ssn,
      driver_license: license,
      status: statusTag ? "active" : "inActive",
      paypalid: paypal_id,
      total_experience: total_experience,
      certifications: certifications,
      picture:
        picture == "undefined" ? "" : "https://somecompany-images.s3.amazonaws.com/" + picture,
      photoID: photo == "undefined" ? "" : "https://somecompany-images.s3.amazonaws.com/" + photo,
      certificateImages: certList.length ? certList.map((e) => e).join(",") : "",
    });

    let result = await UpdateEstimatorsAPI(updateData);
    if (result.success) {
      setEstimatorAdded(true);
      setUpdateEstimatorLoader(false);
      e.target.reset();
      setUserName("");
      // setPassword("");
      setName("");
      setPhone("");
      setEmail("");
      setTotalExperience("");
      setCertifications("");
      setBusinessType("");
      setRate("");
      // setDropDownMenuButton1("");
      setSsn("");
      setLicense("");
      setPayPalID("");
      setPicture("");
      setPhoto("");
      setCertList("");
      navigate("/manageestimators", { replace: true });
    } else {
      // open toast
      setEstimatorNotAdded(true);
      setUpdateEstimatorLoader(false);
      setTimeout(() => {
        setEstimatorNotAdded(false);
      }, 4000);
    }
    // Scrolling to the top of the page after submitting
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const buttonHideNotEstimator = () => {
    setEstimatorNotAdded(false);
  };

  const buttonHideEstimator = () => {
    setEstimatorAdded(false);
  };

  const checkImage = (image) => {
    let file_size = image.size;
    let file_type = image.type;
    if ((file_size <= MAX_FILE_SIZE && ALLOWED_FILE_TYPES.includes(file_type)) === true)
      return true;
    else return false;
  };

  const [uploadYourPictureTitle, setUploadYourPictureTitle] = useState(CheckPicture ? true : false);
  const uploadPicture = async (event) => {
    let image = event.target.files[0];

    if (checkImage(image)) {
      setAnimationupload(true);
      const result = await uploadImage(image);
      if (result.success) {
        setPicture(result.url.split("https://somecompany-images.s3.amazonaws.com/")[1]);
        setUploadYourPictureTitle(false);
        setAnimationupload(false);
      } else toast.error("Error while uploading image");
    } else {
      toast.error("File size should not exceed 2.5 MB");
    }
  };
  const deletePicture = () => {
    setPicture();
    setUploadYourPictureTitle(true);
  };

  const [uploadPhotoID, setUploadPhotoID] = useState(CheckPhoto ? true : false);
  const uploadPhoto = async (event) => {
    let image = event.target.files[0];

    setAnimationuploadPhoto(true);
    if (checkImage(image)) {
      const result = await uploadImage(image);
      if (result.success) {
        setPhoto(result.url.split("https://somecompany-images.s3.amazonaws.com/")[1]);
        setUploadPhotoID(false);
        setAnimationuploadPhoto(false);
      } else toast.error("Error while uploading image");
    } else {
      toast.error("File size should not exceed 2.5 MB");
    }
  };

  const deletePhotoID = () => {
    setPhoto();
    setUploadPhotoID(true);
  };

  const [uploadCertificateMulti, setUploadCertificateMulti] = useState(true);
  const uploadCertificate = async (event) => {
    setAnimationuploadMultiple(true);
    for (let index = 0; index < event.target.files.length; index++) {
      let image = event.target.files[index];

      if (checkImage(image)) {
        const result = await uploadImage(image);
        if (result.success) {
          setCertList((certList) => [
            ...certList,
            result.url.split("https://somecompany-images.s3.amazonaws.com/")[1],
          ]);
          setUploadCertificateMulti(false);
          setAnimationuploadMultiple(false);
        } else toast.error("Error while uploading image: ", image.name);
      } else {
        toast.error("File size should not exceed 2.5 MB");
      }
    }
  };

  const deleteCertificate = (val) => {
    certList.splice(val, 1);
    setCertList((certList) => [
      ...certList,
      // certList.splice(val, 1)
    ]);

    setUploadCertificateMulti(true);
  };
  // Get Companies API
  const getOptions = async () => {};

  const redOutline = () => {
    if (username === "") {
      showError("username", true);
    } else {
      showError("username", false);
    }

    if (name === "") {
      showError("name", true);
    } else {
      showError("name", false);
    }
    if (phone === "") {
      showError("phone", true);
    } else {
      showError("phone", false);
    }
    if (email === "") {
      showError("email", true);
    } else {
      showError("email", false);
    }
  };

  const showError = (elementID, flag) => {
    if (flag === true) {
      document.getElementById(elementID).style.border = "1px solid red";
    } else {
      document.getElementById(elementID).style.border = "1px solid lightgray";
    }
  };

  const validateUserName = (username) => {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    // return usernameRegex.test(username);
    if (usernameRegex.test(username)) {
      setUserNameError(false);
      setUserName(username);
    } else {
      setUserNameError(true);
    }
  };

  const settingRate = (rate) => {
    if (rate > -1) {
      setRateError(false);
      setRate(rate);
    } else {
      setRateError(true);
    }
  };

  const validateExperience = (experience) => {
    if (experience > -1) {
      setTotatlExperienceError(false);
      setTotalExperience(experience);
    } else {
      setTotatlExperienceError(true);
    }
  };

  const validateCertifications = (certification) => {
    if (certification > -1) {
      setCertificationError(false);
      setCertifications(certification);
    } else {
      setCertificationError(true);
    }
  };

  const checkingBlackListedUser = async (username1) => {
    try {
      let response = await checkingBlackListed(username1);
      if (response.success) {
        response.msg === `Your account is blocked. you can't be login.`
          ? setIsBlackListed(false)
          : setIsBlackListed(true);
      } else {
        setIsBlackListed(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const makeInactive = () => {
    if (isMakeInActive) {
      setInActiveModal(true);
      setDisabledButton(false);
    } else {
      toast.error("You are not authorized to update it");
    }
  };
  const makeActive = async () => {
    if (isMakeActive) {
      try {
        let response = await removeBlackListed(username);
        if (response.success) {
          setIsBlackListed(true);
          setStatusTage(true);
          toast.success(response.msg);
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("You are not authorized to update it");
    }
  };
  const [reason, setReason] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const inActiveSubmit = async (e) => {
    e.preventDefault();
    setDisabledButton(true);
    var data = JSON.stringify({
      username: username,
      reason: reason,
    });
    try {
      let response = await addUserDisable(data);
      setDisabledButton(true);
      if (response.success) {
        setIsBlackListed(false);
        setStatusTage(false);
        toast.success(response.msg);
        cloneModalClose();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      setDisabledButton(true);
      toast.error(error.msg);
    }
  };
  const cloneModalClose = () => setInActiveModal(false);
  return (
    <div className="col-11">
      <div className="card recentEstimatesCard mb-4">
        <div className="card-title incomingBar">
          <h6>Update Estimators</h6>
        </div>
        <div className="card-body text-center">
          <div className="col-11 formDiv">
            {estimatorAdded ? (
              <div
                className="alert alert-primary alert-dismissible fade show col-6 estimatorAlert"
                role="alert"
              >
                <h6 className="estimatorHHeading">Estimator Updated Successfully!</h6>
                <button type="button" className="btn-close" onClick={buttonHideEstimator}></button>
              </div>
            ) : (
              <p hidden></p>
            )}
            {estimatorNotAdded ? (
              <div
                className="alert alert-danger alert-dismissible fade show col-6 estimatorAlert"
                role="alert"
              >
                <h6 className="estimatorHHeading">Error while updating estimator</h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={buttonHideNotEstimator}
                ></button>
              </div>
            ) : null}
            <Form id="addEstimatorForm" onSubmit={addEstimatorButton}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label required" style={{ float: "left" }}>
                  Username
                </label>
                <input
                  required={true}
                  value={username}
                  readOnly={true}
                  disabled={false}
                  type="text"
                  className="form-control required"
                  id="username"
                  aria-describedby="emailHelp"
                  placeholder="Username"
                />
              </div>
              {/* <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label required"
                  style={{ float: "left" }}
                >
                  Password
                </label>
                <input
                  //  value={location.state.password}
                  required={true}
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label required" style={{ float: "left" }}>
                  Name
                </label>
                <input
                  required={true}
                  value={name}
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  placeholder="Estimator Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label required" style={{ float: "left" }}>
                  Contact #
                </label>
                <input
                  required={true}
                  value={phone}
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Mobile #"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {/* ! Email Here  */}
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label required"
                  style={{ float: "left" }}
                >
                  Email ID
                </label>
                <input
                  required={true}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Test@test.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="experience" className="form-label" style={{ float: "left" }}>
                  Total Experience
                </label>
                <input
                  /*required={true}*/
                  value={total_experience}
                  type="number"
                  min="0"
                  className="form-control"
                  id="experience"
                  placeholder="No Of Months"
                  onChange={(e) => validateExperience(e.target.value)}
                />
                {totalExperienceError ? (
                  <span style={{ color: "red", float: "left" }}>
                    Experience should not be less then 0
                  </span>
                ) : (
                  <span hidden></span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="taxID" className="form-label" style={{ float: "left" }}>
                  Business Type
                </label>
                <input
                  //required={true}
                  defaultValue={businessType}
                  type="text"
                  className="form-control"
                  id="taxID"
                  placeholder="Enter Your Business Type"
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rate" className="form-label" style={{ float: "left" }}>
                  Estimators Fee
                </label>
                <input
                  //required={true}
                  defaultValue={rate}
                  min={0}
                  type="number"
                  className="form-control"
                  placeholder="Enter Estimators Fee"
                  onChange={(e) => settingRate(e.target.value)}
                />
                {rateError ? (
                  <span style={{ color: "red", float: "left" }}>
                    Rate should not be less then 0$
                  </span>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="certification" className="form-label" style={{ float: "left" }}>
                  Certifications
                </label>
                <input
                  /*required={true}*/
                  value={certifications}
                  type="number"
                  min="0"
                  className="form-control"
                  id="certification"
                  placeholder="No Of certification"
                  onChange={(e) => validateCertifications(e.target.value)}
                />
                {certificationError ? (
                  <span style={{ color: "red", float: "left" }}>
                    Certification should not be less then 0
                  </span>
                ) : (
                  <span hidden></span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="taxID" className="form-label" style={{ float: "left" }}>
                  SSN/Tax ID
                </label>
                <input
                  //required={true}
                  value={ssn}
                  type="text"
                  className="form-control"
                  id="taxID"
                  placeholder="Enter Social Security Number/ Tax ID"
                  onChange={(e) => setSsn(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lisence" className="form-label" style={{ float: "left" }}>
                  Driver License #
                </label>
                <input
                  //required={true}
                  value={license}
                  type="number"
                  className="form-control"
                  id="lisence"
                  placeholder="Enter Driver License #"
                  onChange={(e) => setLicense(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="paypal" className="form-label" style={{ float: "left" }}>
                  Paypal ID
                </label>
                <input
                  //required={true}
                  value={paypal_id}
                  type="text"
                  className="form-control"
                  id="paypal"
                  placeholder="Paypal id For Payments"
                  onChange={(e) => setPayPalID(e.target.value)}
                />
              </div>
              {/* react strap  */}
              <Label htmlFor="uploadyourpicture" style={{ float: "left" }}>
                Upload Your Picture
              </Label>{" "}
              <br />
              {uploadYourPictureTitle ? (
                <div className="mt-3 row uploadWidth ">
                  <span className="divPlaceHolder col-4">
                    <div>
                      {!picture ? (
                        <div className="row justify-content-start">JPEG, PNG & less then 2.5MB</div>
                      ) : (
                        <div className="row justify-content-start">{picture}</div>
                      )}
                    </div>
                  </span>
                  <span className="uploadItem col-4">
                    <div className="row justify-content-start">{/* &nbsp; {picture} */}</div>
                  </span>
                  <div className="col-6"></div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {animationupload === false ? (
                    <label
                      style={{ backgroundColor: "#ffad10", border: "none" }}
                      htmlFor="upload"
                      className="btn btn-secondary uploadWidthClass col-2 "
                    >
                      Upload
                      <BiUpload className="uploadIconButton" />
                    </label>
                  ) : (
                    <div className="loaderUploadCSS col-1">
                      <LoaderAnimation size={40} />
                    </div>
                  )}
                  <input
                    id="upload"
                    style={{ display: "none" }}
                    type="file"
                    className="btn btn-secondary uploadWidthClass col-2"
                    onChange={uploadPicture}
                  />
                </div>
              ) : (
                <div className="mt-3 row uploadWidth ">
                  {/* <span className="divPlaceHolder">
                    JPEG, PNG & less then 2.5MB
                  </span> */}
                  <span className="placeholderFileName col-4">
                    <div className="row justify-content-start">
                      &nbsp;&nbsp;&nbsp;
                      {CheckPicture}
                    </div>
                  </span>
                  <div className="col-6"></div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <label
                    htmlFor="uploadDelete"
                    className="btn btn-danger uploadWidthClassDelete col-2 "
                  >
                    Delete
                    <BiTrash className="uploadIconButton" />
                  </label>
                  <input
                    id="uploadDelete"
                    style={{ display: "none" }}
                    className="btn btn-secondary uploadWidthClass col-2"
                    onClick={deletePicture}
                  />{" "}
                </div>
              )}
              <br />
              {/* YAHA SAY */}
              <Label htmlFor="uploadphoto" style={{ float: "left" }}>
                Upload Photo ID
              </Label>{" "}
              <br />
              {uploadPhotoID ? (
                <div className="mt-3 row uploadWidth ">
                  <span className="divPlaceHolder col-4">
                    <div>
                      {!photo ? (
                        <div className="row justify-content-start">JPEG, PNG & less then 2.5MB</div>
                      ) : (
                        <div className="row justify-content-start">{photo}</div>
                      )}
                    </div>
                  </span>
                  <span className="uploadItem col-4">
                    <div className="row justify-content-start">&nbsp;</div>
                  </span>
                  <div className="col-6"></div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {animationuploadPhoto == false ? (
                    <label
                      style={{ backgroundColor: "#ffad10", border: "none" }}
                      htmlFor="photo"
                      className="btn btn-secondary uploadWidthClass col-3 "
                    >
                      Upload
                      <BiUpload className="uploadIconButton" />
                    </label>
                  ) : (
                    <div className="loaderUploadCSS col-1">
                      <LoaderAnimation size={40} />
                    </div>
                  )}
                  <input
                    id="photo"
                    style={{ display: "none" }}
                    type="file"
                    className="btn btn-secondary uploadWidthClass col-3"
                    onChange={uploadPhoto}
                  />
                </div>
              ) : (
                <div className="mt-3 row uploadWidth ">
                  {/* <span className="divPlaceHolder"> */}
                  {/* JPEG, PNG & less then 2.5MB */}
                  <span className="placeholderFileName col-4">
                    <div className="row justify-content-start">
                      &nbsp;&nbsp;&nbsp;
                      {CheckPhoto}
                    </div>
                  </span>
                  <div className="col-6"></div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {/* </span> */}
                  <label htmlFor="photo" className="btn btn-danger uploadWidthClassDelete col-2 ">
                    Delete
                    <BiTrash className="uploadIconButton" />
                  </label>
                  <input
                    id="photo"
                    style={{ display: "none" }}
                    // type="file"
                    className="btn btn-secondary uploadWidthClass col-2"
                    onClick={deletePhotoID}
                  />{" "}
                </div>
              )}
              <br />
              {/* yaha say */}
              <Label htmlFor="formFileMultiple" style={{ float: "left" }}>
                Upload Certificates (Multiple Uploads Available)
              </Label>{" "}
              <br />
              <div className="mt-3 row uploadWidth">
                {certList.length ? (
                  <div>
                    {/* {certList.map((e) => {
                          e.name ,
                          <button className="btn btn-primary btn-sm" >Delete</button>
                          })} */}

                    <div>
                      {certList.map((e, index) => (
                        <li className=" row">
                          <span className="placeholderFileName col-4">
                            {certList[index].includes(
                              "https://somecompany-images.s3.amazonaws.com/"
                            ) ? (
                              <div className="row justify-content-start">
                                &nbsp;&nbsp;&nbsp;
                                {
                                  certList[index].split(
                                    "https://somecompany-images.s3.amazonaws.com/"
                                  )[1]
                                }
                              </div>
                            ) : (
                              <div className="row justify-content-start">
                                &nbsp;&nbsp;&nbsp;
                                {certList[index]}
                              </div>
                            )}
                          </span>
                          <div className="col-6"></div>
                          &nbsp;&nbsp;&nbsp;
                          <label
                            htmlFor="formFileMultipleDel"
                            className="btn  btn-danger uploadWidthClassDelete col-2 "
                            onClick={() => deleteCertificate(index)}
                          >
                            Delete
                            <BiTrash className="uploadIconButton" />
                          </label>
                          <button
                            style={{ display: "none" }}
                            id="formFileMultipleDel"
                            className="btn btn-secondary uploadWidthClassDelete col-2"
                            // onClick={() => deleteCertificate(index)}
                            type="button"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                      {/* {certList.map((e) =>   <button className="btn btn-primary btn-sm" >Delete</button> )} */}
                    </div>
                  </div>
                ) : (
                  <p hidden></p>
                )}
                <span className="divPlaceHolde col-4">
                  {/* <span className="leftAlignUp">Certification Name</span> <br />{" "} */}
                  <span className="leftAlignDown">
                    {!certList.name ? (
                      <div className="row justify-content-start">JPEG, PNG & less then 2.5MB</div>
                    ) : (
                      <div className="row justify-content-start">{certList.name}</div>
                    )}
                  </span>
                </span>
                <div className="col-6"></div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* <span className="uploadItem">
                  {certList.length ? certList.map((e) => e.name).join(",") : ""}
                </span> */}
                {animationuploadMultiple === false ? (
                  <label
                    style={{ backgroundColor: "#ffad10", border: "none" }}
                    htmlFor="formFileMultiple"
                    className="btn btn-secondary uploadWidthClass col-2 "
                  >
                    Upload
                    <BiUpload className="uploadIconButton" />
                  </label>
                ) : (
                  <span style={{ marginTop: "-50px" }} className="multipleLoader">
                    <LoaderAnimation size={40} />
                  </span>
                )}
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="formFileMultiple"
                  multiple
                  className="btn btn-secondary uploadWidthClass col-2"
                  onChange={uploadCertificate}
                />
              </div>
              <br />
              <div className="col-12 updateAndActiveBtns">
                {" "}
                {/* submit button  */} <div className="col-4"></div>{" "}
                {!updateEstimatorLoader ? (
                  <div className="col-4 updateAndActiveBtns">
                    {" "}
                    <div className="col-5">
                      {" "}
                      <Button
                        value="submit"
                        type="submit"
                        id="submit"
                        className="btn btn-sm buttonColor mt-2 updateBtn"
                        onClick={redOutline}
                      >
                        {" "}
                        Update Estimator{" "}
                      </Button>{" "}
                    </div>{" "}
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <div className="col-5">
                      {" "}
                      {isBlackListed ? (
                        <Button
                          onClick={() => {
                            redOutline();
                            makeInactive();
                          }}
                          id="submit"
                          className="btn btn-sm buttonColor mt-2 updateBtn"
                        >
                          {" "}
                          Make In Active{" "}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            redOutline();
                            makeActive();
                          }}
                          id="submit"
                          className="btn btn-sm buttonColor mt-2 updateBtn"
                        >
                          {" "}
                          Make Active{" "}
                        </Button>
                      )}
                    </div>{" "}
                  </div>
                ) : (
                  <LoaderAnimation />
                )}{" "}
                <div className="col-4"></div>{" "}
              </div>{" "}
            </Form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <Modal
        show={inActiveModal}
        onHide={cloneModalClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Block Estimator </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={inActiveSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label modalLabel required">
                Reason to block Estimator
              </label>
              <textarea
                rows={3}
                type="text"
                className="form-control modalInput"
                id="name"
                placeholder="Enter reason to block estimator:"
                required={true}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            {disabledButton ? (
              <input
                disabled
                type="submit"
                value="Submit"
                id="submit"
                className="btn buttonColor mt-2"
              />
            ) : (
              <input type="submit" value="Submit" id="submit" className="btn buttonColor mt-2" />
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cloneModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default UpdateEstimators;
