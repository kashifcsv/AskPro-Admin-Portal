/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Input, Label, Form } from "reactstrap";
import "./AddEstimator.css";
import { addEstimatorAPI, getCompanyDetails } from "../../api/Services";
import { getCompaniesAPI } from "../../api/Services";
import { BiUpload } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { uploadImage } from "../../api/Services";
import { color } from "highcharts";
import debug from "react-scroll-to-bottom/lib/utils/debug";
import LoaderAnimation from "../Loader/LoaderAnimation";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { IsAuthorized } from "../../Auth/Authorization";

const MAX_FILE_SIZE = 1000000 * 2.5,
  ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

const AddEstimator = () => {
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const isAddEtimator = IsAuthorized("estimator").create;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [total_experience, setTotalExperience] = useState("");
  const [certifications, setCertifications] = useState("");
  // const [dropdownMenuButton1, setDropDownMenuButton1] = useState("");
  const [ssn, setSsn] = useState("");
  const [license, setLicense] = useState("");
  const [paypal_id, setPayPalID] = useState("");
  const [picture, setPicture] = useState({});
  const [photo, setPhoto] = useState({});
  const [certList, setCertList] = useState([]);
  // const [companyList, setCompanyList] = useState([]);
  const [estimatorAdded, setEstimatorAdded] = useState(false);
  const [estimatorNotAdded, setEstimatorNotAdded] = useState(false);
  const [rate, setRate] = useState(40);
  // username error
  const [userNameError, setUserNameError] = useState(false);
  const [totalExperienceError, setTotatlExperienceError] = useState(false);
  const [certificationError, setCertificationError] = useState(false);
  const [rateError, setRateError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [businessType, setBusinessType] = useState("");
  //error

  const [showerror, setshowerror] = useState();

  //Upload Your Picture
  const [animationupload, setAnimationupload] = useState(false);

  //Upload Photo ID
  const [animationuploadPhoto, setAnimationuploadPhoto] = useState(false);

  //Upload Certificates (Multiple Uploads Available)
  const [animationuploadMultiple, setAnimationuploadMultiple] = useState(false);

  // animation
  const [addEstimatorLoader, setAddEstimatorLoader] = useState(false);

  // getting company ID

  const [companyIDFromDomain, setcompanyIDFromDomain] = useState();

  const addEstimatorButton = async (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      setAddEstimatorLoader(true);

      // !Integrating addEstimator API
      var payload = JSON.stringify({
        username: username,
        name: name,
        contact: phone,
        businessType: businessType,
        email: email,
        role: "estimator",
        password: password,
        ssn: ssn,
        driver_license: license,
        company_id: companyIDFromDomain,
        paypal_id: paypal_id,
        rate: rate,
        status: "active",
        total_experience: total_experience,
        certifications: certifications,
        picture: picture.url ? picture.url : "",
        photoID: photo.url ? photo.url : "",
        certificateImages: certList.length ? certList.map((e) => e.url).join(",") : "",
      });
      //check response from API
      let result = await addEstimatorAPI(payload);

      if (result.success) {
        // open toast
        setEstimatorAdded(true);
        setAddEstimatorLoader(false);
        // Reseting Form after submitting
        e.target.reset();
        setUserName("");
        setPassword("");
        setName("");
        setPhone("");
        setEmail("");
        setTotalExperience("");
        setCertifications("");
        setBusinessType("");
        setRate(40);
        // setDropDownMenuButton1("");
        setSsn("");
        setLicense("");
        setPayPalID("");
        setPicture("");
        setPhoto("");
        setCertList("");
        // setUploadYourPictureTitle(true);
        // setUploadPhotoID(true);

        setTimeout(() => {
          setEstimatorAdded(false);
        }, 4000);
      } else {
        setshowerror(result.msg);

        // open toast
        setEstimatorNotAdded(true);
        setAddEstimatorLoader(false);
        setTimeout(() => {
          setEstimatorNotAdded(false);
        }, 4000);
      }
      // Scrolling to the top of the page after submitting
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    }
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

  const [uploadYourPictureTitle, setUploadYourPictureTitle] = useState(true);
  const uploadPicture = async (event) => {
    let image = event.target.files[0];
    if (checkImage(image)) {
      setAnimationupload(true);
      const result = await uploadImage(image);
      if (result.success) {
        setPicture({ name: image.name, url: result.url });
        setUploadYourPictureTitle(false);
        setAnimationupload(false);
      } else toast.error("Error while uploading image");
    } else {
      toast.error("Either size exceeds 2.5 MB or type is not png/jpeg");
    }
  };

  const deletePicture = () => {
    setPicture({});
    // setTimeout(() => {
    setUploadYourPictureTitle(true);
    // }, 1);
  };

  const [uploadPhotoID, setUploadPhotoID] = useState(true);
  const uploadPhoto = async (event) => {
    let image = event.target.files[0];
    if (checkImage(image)) {
      setAnimationuploadPhoto(true);
      const result = await uploadImage(image);
      if (result.success) {
        setPhoto({ name: image.name, url: result.url });
        setUploadPhotoID(false);
        setAnimationuploadPhoto(false);
      } else toast.error("Error while uploading image");
    } else {
      toast.error("Either size exceeds 2.5 MB or type is not png/jpeg");
    }
  };

  const deletePhotoID = () => {
    setPhoto({});
    // setTimeout(() => {
    setUploadPhotoID(true);
    // }, 1);
  };

  const [uploadCertificateMulti, setUploadCertificateMulti] = useState(true);
  const uploadCertificate = async (event) => {
    setAnimationuploadMultiple(true);
    for (let index = 0; index < event.target.files.length; index++) {
      let image = event.target.files[index];

      if (checkImage(image)) {
        const result = await uploadImage(image);
        setAnimationuploadMultiple(true);
        if (result.success) {
          setCertList((certList) => [...certList, { name: image.name, url: result.url }]);
          setUploadCertificateMulti(false);
          setAnimationuploadMultiple(false);
        } else toast.error("Error while uploading image: ", image.name);
      } else {
        toast.error("Either size exceeds 2.5 MB or type is not png/jpeg");
      }
    }
  };

  const deleteCertificate = (val) => {
    // e.preventDefault();
    certList.splice(val, 1);
    setCertList((certList) => [
      ...certList,
      // certList.splice(val, 1)
    ]);

    // setTimeout(() => {
    setUploadCertificateMulti(true);
    // }, 1);
  };

  // const fetchCompanies = async () => {
  //   let response = await getCompaniesAPI();
  //   setCompanyList(response);
  // };

  useEffect(() => {
    if (!isAddEtimator) {
      toast.error("You are not authorized to add estimator");
      navigate("/ManageEstimators");
    }
  }, []);

  //! Get Companies API

  const redOutline = () => {
    if (username === "") {
      showError("username", true);
    } else {
      showError("username", false);
    }
    if (password === "") {
      showError("password", true);
    } else {
      showError("password", false);
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

  const settingRate = (rate) => {
    if (rate > -1) {
      setRateError(false);
      setRate(rate);
    } else {
      setRateError(true);
    }
  };

  useEffect(async () => {
    let domain = localStorage.getItem("domain_username");
    let response = await getCompanyDetails(domain);
    if (response.success) {
      setcompanyIDFromDomain(response.company.company_id);
    }
  }, []);

  return (
    <div className="col-11">
      <div className="card recentEstimatesCard">
        <div className="card-title incomingBar">
          <h6>Add Estimators</h6>
        </div>

        <div className="card-body text-center">
          <div className="col-11 formDiv">
            {estimatorAdded ? (
              <div
                className="alert alert-primary alert-dismissible fade show col-6 estimatorAlert"
                role="alert"
              >
                <h6 className="estimatorHHeading">Estimator Added Successfully!</h6>
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
                <h6 className="estimatorHHeading">{showerror}</h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={buttonHideNotEstimator}
                ></button>
              </div>
            ) : null}
            <Form id="addEstimatorForm" onSubmit={addEstimatorButton}>
              <div>
                <label htmlFor="username" className="form-label required" style={{ float: "left" }}>
                  Username
                </label>
                <input
                  required={true}
                  type="text"
                  className="form-control required"
                  id="username"
                  aria-describedby="emailHelp"
                  placeholder="Username"
                  onChange={(e) => validateUserName(e.target.value)}
                />
                {userNameError ? (
                  <span style={{ color: "red", float: "left" }}>
                    Username only containes a-z , A-Z , 0-9, @{" "}
                  </span>
                ) : (
                  <span hidden></span>
                )}
                <br />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label required" style={{ float: "left" }}>
                  Password
                </label>
                <input
                  required={true}
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError ? (
                  <span className="passwordError">
                    <br />
                    Password length should be greater then 8
                  </span>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label required" style={{ float: "left" }}>
                  Name
                </label>
                <input
                  required={true}
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
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="taxID" className="form-label" style={{ float: "left" }}>
                  Business Type
                </label>
                <input
                  //required={true}
                  type="text"
                  className="form-control"
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
                  defaultValue={40}
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
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="taxID" className="form-label" style={{ float: "left" }}>
                  SSN/Tax ID
                </label>
                <input
                  //required={true}
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
                    <div className="row justify-content-start">JPEG, PNG & less then 2.5MB</div>
                  </span>
                  <span className="uploadItem col-4">
                    <div className="row justify-content-start">&nbsp; {picture.name}</div>
                  </span>
                  <div className="col-6"></div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {animationupload == false ? (
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
                      &nbsp;&nbsp;&nbsp;{picture.name}
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
                    <div className="row justify-content-start">JPEG, PNG & less then 2.5MB</div>
                  </span>
                  <span className="uploadItem col-4">
                    <div className="row justify-content-start">&nbsp;{photo.name}</div>
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
                      {photo.name}
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
                        //! Remove mt-3
                        <li className="row">
                          <span className="placeholderFileName col-4">
                            <div className="row justify-content-start">
                              &nbsp;&nbsp;&nbsp;
                              {e.name}
                            </div>
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
                    <div className="row mt-3 justify-content-start">
                      JPEG, PNG & less then 2.5MB
                    </div>
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
                  <span className="multipleLoader">
                    <LoaderAnimation size={30} />
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
              {/* submit button  */}
              {!addEstimatorLoader ? (
                <Button
                  value="submit"
                  type="submit"
                  id="submit"
                  className="btn buttonColor mt-2"
                  onClick={redOutline}
                >
                  Add Estimator
                </Button>
              ) : (
                <LoaderAnimation />
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEstimator;
