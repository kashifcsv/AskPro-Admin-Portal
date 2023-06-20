import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Label, Form } from "reactstrap";
import { addBillingCompanyAPI, addEstimatorAPI } from "../../api/Services";
import { BiUpload } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { uploadImage } from "../../api/Services";
import { toast } from "react-toastify";

import LoaderAnimation from "../../Components/Loader/LoaderAnimation";

const MAX_FILE_SIZE = 1000000 * 2.5,
  ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

const SignUp = () => {
  const [domain, setDomain] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pocname, setPOCName] = useState("");
  const [pocphone, setPOCPhone] = useState("");
  const [tax, setTax] = useState("");
  const [url, setUrl] = useState("");
  const [businessname, setBusinessName] = useState("");
  const [businessindustry, setBusinessIndustry] = useState("");
  const [numberofyear, setNumberOfYear] = useState("");
  const [pocrole, setPocRole] = useState("");
  const [companynumber, setCompanyNumber] = useState("");

  // const [dropdownMenuButton1, setDropDownMenuButton1] = useState("");
  const [photo, setPhoto] = useState({});
  const [estimatorAdded, setEstimatorAdded] = useState(false);
  const [estimatorNotAdded, setEstimatorNotAdded] = useState(false);

  // username error
  const [domainError, setDomainError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [confirmPasswordError, setConfirmPassworderror] = useState(false);

  //error

  const [showerror, setshowerror] = useState();

  //Upload Photo ID
  const [animationuploadPhoto, setAnimationuploadPhoto] = useState(false);

  // animation
  const [addEstimatorLoader, setAddEstimatorLoader] = useState(false);

  const addBillingCompany = async (e) => {
    e.preventDefault();
    // addBillingCompanyAPI

    var payload = JSON.stringify({
      domain: domain,
      username: username,
      password: password,
      confirmPassword: confirmpassword,
      name: name,
      address: address,
      contact: phone,
      pocEmail: email,
      pocName: pocname,
      pocContact: pocphone,
      tax: tax,
      URL: url,
      businessName: businessname,
      businessIndustry: businessindustry,
      numberOfYear: numberofyear,
      pocRole: pocrole,
      CompanyNumber: companynumber,
      // wroking on it
      certificateImages: photo.url ? photo.url : "",
    });

    //check response from API
    let result = await addBillingCompanyAPI(payload);
    if (result.success) {
      // open toast
      setEstimatorAdded(true);
      setAddEstimatorLoader(false);
      // Reseting Form after submitting
      //e.target.reset();
      setDomain("");
      setUserName("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
      setPOCName("");
      setPOCPhone("");
      setTax("");
      setUrl("");
      setBusinessName("");
      setBusinessIndustry("");
      setNumberOfYear("");
      setPocRole("");
      setCompanyNumber("");
      setPhoto({});

      setTimeout(() => {
        setEstimatorAdded(false);
      }, 4000);
    } else {
      setshowerror(result.error.response.data.msg);
      setEstimatorNotAdded(true);
      setAddEstimatorLoader(false);
      setTimeout(() => {
        setEstimatorNotAdded(false);
      }, 4000);
    }

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
    if (confirmpassword === "") {
      showError("confirmpassword", true);
    } else {
      showError("confirmpassword", false);
    }
    if (address === "") {
      showError("address", true);
    } else {
      showError("address", false);
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
    if (pocname === "") {
      showError("pocname", true);
    } else {
      showError("pocname", false);
    }
    if (pocphone === "") {
      showError("pocphone", true);
    } else {
      showError("pocphone", false);
    }
    if (tax === "") {
      showError("tax", true);
    } else {
      showError("tax", false);
    }
    if (url === "") {
      showError("url", true);
    } else {
      showError("url", false);
    }
  };

  const showError = (elementID, flag) => {
    if (flag === true) {
      document.getElementById(elementID).style.border = "1px solid red";
    } else {
      document.getElementById(elementID).style.border = "1px solid lightgray";
    }
  };

  const validateDomain = (domain) => {
    var domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (domainRegex.test(String(domain).toLowerCase())) {
      setDomainError(false);
      setDomain(domain);
    } else {
      setDomainError(true);
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

  const validateConfirmPassword = (cPassword) => {
    if (password !== "" && cPassword === password) {
      setConfirmPassword(cPassword);
      setConfirmPassworderror(false);
    } else {
      setConfirmPassworderror(true);
    }
  };

  return (
    <div className="col-12">
      <div className="card recentEstimatesCard">
        <div className="card-title incomingBar">
          <h6>Sign Up</h6>
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
            <Form id="addEstimatorForm" onSubmit={addBillingCompany}>
              <div>
                <label htmlFor="domanin" className="form-label required" style={{ float: "left" }}>
                  Domain
                </label>
                <input
                  required={true}
                  type="text"
                  className="form-control required"
                  id="domain"
                  aria-describedby="emailHelp"
                  placeholder="test.com"
                  onChange={(e) => validateDomain(e.target.value)}
                />
                {domainError ? (
                  <span style={{ color: "red", float: "left" }}>Invalid Domain Name</span>
                ) : (
                  <span hidden></span>
                )}
                <br />
              </div>
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
              </div>
              <div className="mb-3">
                <label
                  htmlFor="confirmpassword"
                  className="form-label required"
                  style={{ float: "left" }}
                >
                  Confirm Password
                </label>
                <input
                  required={true}
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  aria-describedby="emailHelp"
                  placeholder="ConfirmPassword"
                  onChange={(e) => validateConfirmPassword(e.target.value)}
                />
                {confirmPasswordError ? (
                  <span style={{ color: "red", float: "left" }}>
                    Type the same password as above !
                  </span>
                ) : (
                  <span hidden></span>
                )}
              </div>
              <br />
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
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label required" style={{ float: "left" }}>
                  Address
                </label>
                <input
                  required={true}
                  type="text"
                  className="form-control"
                  id="address"
                  aria-describedby="emailHelp"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
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
                  POC Email
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
                <label htmlFor="name" className="form-label required" style={{ float: "left" }}>
                  POC Name
                </label>
                <input
                  required={true}
                  type="text"
                  className="form-control"
                  id="pocname"
                  aria-describedby="emailHelp"
                  placeholder="POC Name"
                  onChange={(e) => setPOCName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label required" style={{ float: "left" }}>
                  POC Contact Number
                </label>
                <input
                  required={true}
                  type="tel"
                  className="form-control"
                  id="pocphone"
                  placeholder="Phone Number"
                  onChange={(e) => setPOCPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tax" className="form-label required" style={{ float: "left" }}>
                  Tax
                </label>
                <input
                  required={true}
                  type="text"
                  className="form-control"
                  id="tax"
                  aria-describedby="emailHelp"
                  placeholder="Tax"
                  onChange={(e) => setTax(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="url" className="form-label required" style={{ float: "left" }}>
                  URL
                </label>
                <input
                  required={true}
                  type="text"
                  className="form-control"
                  id="url"
                  aria-describedby="emailHelp"
                  placeholder="URL"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="businessname" className="form-label " style={{ float: "left" }}>
                  Business Name
                </label>
                <input
                  required={false}
                  type="text"
                  className="form-control"
                  id="businessname"
                  aria-describedby="emailHelp"
                  placeholder="Business Name"
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="businessindustry" className="form-label " style={{ float: "left" }}>
                  Business Industry
                </label>
                <input
                  required={false}
                  type="text"
                  className="form-control"
                  id="businessindustry"
                  aria-describedby="emailHelp"
                  placeholder="Business Industry"
                  onChange={(e) => setBusinessIndustry(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="numberofyear" className="form-label " style={{ float: "left" }}>
                  Number of Year
                </label>
                <input
                  required={false}
                  type="text"
                  className="form-control"
                  id="numberofyear"
                  aria-describedby="emailHelp"
                  placeholder="Number of Year"
                  onChange={(e) => setNumberOfYear(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pocrole" className="form-label " style={{ float: "left" }}>
                  POC Role
                </label>
                <input
                  required={false}
                  type="text"
                  className="form-control"
                  id="pocrole"
                  aria-describedby="emailHelp"
                  placeholder="POC Role"
                  onChange={(e) => setPocRole(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companynumber" className="form-label" style={{ float: "left" }}>
                  Company Number
                </label>
                <input
                  required={false}
                  type="text"
                  className="form-control"
                  id="companynumber"
                  aria-describedby="emailHelp"
                  placeholder="Company Number"
                  onChange={(e) => setCompanyNumber(e.target.value)}
                />
              </div>
              {/* YAHA SAY */}
              <Label htmlFor="uploadphoto" style={{ float: "left" }}>
                Certificate Image
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
                  {animationuploadPhoto === false ? (
                    <label htmlFor="photo" className="btn btn-secondary uploadWidthClass col-3 ">
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
                  <label
                    htmlFor="photo"
                    className="btn btn-secondary uploadWidthClassDelete col-2 "
                  >
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
              {/* submit button  */}
              {!addEstimatorLoader ? (
                <Button
                  value="submit"
                  type="submit"
                  id="submit"
                  className="btn buttonColor mt-2"
                  onClick={redOutline}
                >
                  Sign Up
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

export default SignUp;
