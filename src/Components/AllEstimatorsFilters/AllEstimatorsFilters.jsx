import React from "react";
import "./AllEstimatorsFilters.css";

export default function AllEstimatorsFilters(props, { size, color }) {
  var wareHouseCount = 0;
  var SchoolCount = 0;
  var GymnasiumCount = 0;
  var VendorCount = 0;
  var BankCount = 0;
  var MallsCount = 0;
  var GymsCount = 0;
  var LawFirmsCount = 0;
  var LibraryCount = 0;
  var Vendor2Count = 0;
  var Bank2Count = 0;
  var Malls2Count = 0;
  function hello() {
    //this on click function triggers and when a user click a button. the color is changed
    if (props.title === "Ware House") {
      wareHouseCount = wareHouseCount + 1;
      if (props.title === "Ware House" && wareHouseCount % 2 === 0) {
        document.getElementById("WareHouseID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Ware House" && wareHouseCount % 2 !== 0) {
        document.getElementById("WareHouseID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "School") {
      SchoolCount = SchoolCount + 1;
      if (props.title === "School" && SchoolCount % 2 === 0) {
        document.getElementById("SchoolID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "School" && SchoolCount % 2 !== 0) {
        document.getElementById("SchoolID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Gymnasium") {
      GymnasiumCount = GymnasiumCount + 1;
      if (props.title === "Gymnasium" && GymnasiumCount % 2 === 0) {
        document.getElementById("GymnasiumID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Gymnasium" && GymnasiumCount % 2 !== 0) {
        document.getElementById("GymnasiumID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Vendor" && props.id === "VendorID") {
      VendorCount = VendorCount + 1;
      if (props.title === "Vendor" && VendorCount % 2 === 0) {
        document.getElementById("VendorID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Vendor" && VendorCount % 2 !== 0) {
        document.getElementById("VendorID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Bank" && props.id === "BankID") {
      BankCount = BankCount + 1;
      if (props.title === "Bank" && BankCount % 2 === 0) {
        document.getElementById("BankID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Bank" && BankCount % 2 !== 0) {
        document.getElementById("BankID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Malls" && props.id === "MallsID") {
      MallsCount = MallsCount + 1;
      if (props.title === "Malls" && MallsCount % 2 === 0) {
        document.getElementById("MallsID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Malls" && MallsCount % 2 !== 0) {
        document.getElementById("MallsID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Gyms") {
      GymsCount = GymsCount + 1;
      if (props.title === "Gyms" && GymsCount % 2 === 0) {
        document.getElementById("GymsID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Gyms" && GymsCount % 2 !== 0) {
        document.getElementById("GymsID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Law Firms") {
      LawFirmsCount = LawFirmsCount + 1;
      if (props.title === "Law Firms" && LawFirmsCount % 2 === 0) {
        document.getElementById("LawFirmsID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Law Firms" && LawFirmsCount % 2 !== 0) {
        document.getElementById("LawFirmsID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Library") {
      LibraryCount = LibraryCount + 1;
      if (props.title === "Library" && LibraryCount % 2 === 0) {
        document.getElementById("LibraryID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Library" && LibraryCount % 2 !== 0) {
        document.getElementById("LibraryID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Vendor" && props.id === "Vendor2ID") {
      Vendor2Count = Vendor2Count + 1;
      if (props.title === "Vendor" && Vendor2Count % 2 === 0) {
        document.getElementById("Vendor2ID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Vendor" && Vendor2Count % 2 !== 0) {
        document.getElementById("Vendor2ID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Bank" && props.id === "Bank2ID") {
      Bank2Count = Bank2Count + 1;
      if (props.title === "Bank" && Bank2Count % 2 === 0) {
        document.getElementById("Bank2ID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Bank" && Bank2Count % 2 !== 0) {
        document.getElementById("Bank2ID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
    if (props.title === "Malls" && props.id === "Malls2ID") {
      Malls2Count = Malls2Count + 1;
      if (props.title === "Malls" && Malls2Count % 2 === 0) {
        document.getElementById("Malls2ID").style.backgroundColor = "rgb(255,255,255)";
      }
      if (props.title === "Malls" && Malls2Count % 2 !== 0) {
        document.getElementById("Malls2ID").style.backgroundColor = "rgb(217,229,241)";
      }
    }
  }
  return (
    <div className="card">
      <button id={props.id} name="WareHouse" onClick={hello} className="btn btn_color">
        <div className="row justify-content-center">
          <div className=" mt-1">
            <div size={size} fill={color}>
              <img alt="imageNotFound" src={props.icon} height={props.height} width={props.width} />
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-1">
          <div className="">
            <font size="2" className="card-text mb-2">
              <h6>{props.title}</h6>
            </font>
          </div>
        </div>
      </button>
    </div>
  );
}
