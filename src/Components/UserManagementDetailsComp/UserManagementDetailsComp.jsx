import React from "react";
import "./UserManagementDetailsComp.css";

// button

import Button from "@mui/material/Button";

// icons

import schoolIcon from "../../Assets/Images/schoolIcon.png";

// table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// table parts

function createData(name) {
  return { name };
}

const rows = [createData("Billing Statement"), createData("VBL FUND")];

// counts
var countWarehouse = 0;
var countSchool = 0;
var number3 = 0;
var number4 = 0;
var number5 = 0;

const UserManagementDetailsComp = (props) => {
  // fuctions

  function selectedFiltersWarehouse(id) {
    countWarehouse = countWarehouse + 1;
    if (countWarehouse % 2 !== 0) {
      document.getElementById(id).style.backgroundColor = "rgb(217,229,241)";
    } else {
      document.getElementById(id).style.backgroundColor = "rgb(255,255,255)";
    }
  }

  function selectedFiltersSchool(id) {
    countSchool = countSchool + 1;
    if (countSchool % 2 !== 0) {
      document.getElementById(id).style.backgroundColor = "rgb(217,229,241)";
    } else {
      document.getElementById(id).style.backgroundColor = "rgb(255,255,255)";
    }
  }

  function selectedFiltersnumber3(id) {
    number3 = number3 + 1;
    if (number3 % 2 !== 0) {
      document.getElementById(id).style.backgroundColor = "rgb(217,229,241)";
    } else {
      document.getElementById(id).style.backgroundColor = "rgb(255,255,255)";
    }
  }

  function selectedFiltersnumber4(id) {
    number4 = number4 + 1;
    if (number4 % 2 !== 0) {
      document.getElementById(id).style.backgroundColor = "rgb(217,229,241)";
    } else {
      document.getElementById(id).style.backgroundColor = "rgb(255,255,255)";
    }
  }

  function selectedFiltersnumber5(id) {
    number5 = number5 + 1;
    if (number5 % 2 !== 0) {
      document.getElementById(id).style.backgroundColor = "rgb(217,229,241)";
    } else {
      document.getElementById(id).style.backgroundColor = "rgb(255,255,255)";
    }
  }

  return (
    <div className="col-12  ">
      <div className="card RebidRequestCard">
        <div className="card-title incomingBar">
          <span className="FontSizeAllEstimators"> User Management</span>
        </div>
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>
        <div className="row ">
          <div className="col-1"></div>
          <div className="col-4 userListLine ">
            Select The User You Want To Give Access For Options
          </div>
          <div className="col-7"></div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12">
            <hr className="hr_css" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-1">&nbsp;</div>
          <div className="col-1">
            <div className="card border_class">
              <button
                id="WarehouseID"
                name="School"
                onClick={() => selectedFiltersWarehouse("WarehouseID")}
                className="btn btn_color"
              >
                <div className="row justify-content-center">
                  <div className=" mt-1">
                    <div size="1 ">
                      <img
                        className="responsiveImg"
                        src={schoolIcon}
                        height="75"
                        width="60"
                        alt=""
                      />
                    </div>
                    <div className="mt-2 selectedCardUserManagement">ABC company</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-1">&nbsp;</div>
          <div className="col-1">
            <div className="card border_class">
              <button
                id="SchoolID"
                name="School"
                onClick={() => selectedFiltersSchool("SchoolID")}
                className="btn btn_color"
              >
                <div className="row justify-content-center">
                  <div className=" mt-1">
                    <div size="1 ">
                      <img
                        className="responsiveImg"
                        src={schoolIcon}
                        height="75"
                        width="60"
                        alt=""
                      />
                    </div>
                    <div className="mt-2 selectedCardUserManagement">Etimator</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-1">&nbsp;</div>
          <div className="col-1">
            <div className="card border_class">
              <button
                id="number3"
                name="School"
                onClick={() => selectedFiltersnumber3("number3")}
                className="btn btn_color"
              >
                <div className="row justify-content-center">
                  <div className=" mt-1">
                    <div size="1 ">
                      <img
                        className="responsiveImg"
                        src={schoolIcon}
                        height="75"
                        width="60"
                        alt=""
                      />
                    </div>
                    <div className="mt-2 selectedCardUserManagement"> Client</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-1">&nbsp;</div>
          <div className="col-1">
            <div className="card border_class">
              <button
                id="number4"
                name="School"
                onClick={() => selectedFiltersnumber4("number4")}
                className="btn btn_color"
              >
                <div className="row justify-content-center">
                  <div className=" mt-1">
                    <div size="1 ">
                      <img
                        className="responsiveImg"
                        src={schoolIcon}
                        height="75"
                        width="60"
                        alt=""
                      />
                    </div>
                    <div className="mt-2 selectedCardUserManagement">hello</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-1">&nbsp;</div>
          <div className="col-1">
            <div className="card border_class">
              <button
                id="number5"
                name="School"
                onClick={() => selectedFiltersnumber5("number5")}
                className="btn btn_color"
              >
                <div className="row justify-content-center">
                  <div className=" mt-1">
                    <div size="1 ">
                      <img
                        className="responsiveImg"
                        src={schoolIcon}
                        height="75"
                        width="60"
                        alt=""
                      />
                    </div>
                    <div className="mt-2 selectedCardUserManagement">hello</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>

        <div className="row">
          <div className="col-1">&nbsp;</div>
          <div className="col-10">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="permissionsListItem">
                      <select id="cars" className="service_border permissionsListItem">
                        <option value="in_rebid">&nbsp;&nbsp;Service</option>
                        <option value="">&nbsp;&nbsp;Select All</option>
                        <option value="pending">&nbsp;&nbsp;Pending</option>
                        <option value="accepted">&nbsp;&nbsp;Accepted</option>
                        <option value="Rejected">&nbsp;&nbsp;1 Rejected</option>
                        <option value="Rejected">&nbsp;&nbsp;2 Rejected</option>
                        <option value="failed">&nbsp;&nbsp;Failed</option>
                        <option value="expiringSoon">&nbsp;&nbsp;Expiring soon</option>
                        <option value="in_progress">&nbsp;&nbsp;In Progress</option>
                        <option value="terminated">&nbsp;&nbsp;Terminated</option>
                      </select>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div className="row mt-2">
                          <span className="col-10 permissionsListItem">{row.name}</span>
                          <span className="col-2">
                            {" "}
                            <Button variant="outlined">View Details</Button>
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="col-1">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDetailsComp;
