/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Nav from "../../Navigation/Navbar/Nav";
import Sidebar from "../../Navigation/Sidebar/Sidebar";
import Footer from "../../Navigation/Footer/Footer";
// import Table from "react-bootstrap/Table";
import "./RabidRequest.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { borderLeft } from "@mui/system";
import { Hidden } from "@mui/material";
import { getRebidEstimatesAPI, RebidRequestsAPI, RecentEstimatesAPI } from "../../../api/Services";
import { toast } from "react-toastify";

// Dropdown button
import moment from "moment";
import Multiselect from "multiselect-react-dropdown";
import LoaderAnimation from "../../Loader/LoaderAnimation";
import { IsAuthorized } from "../../../Auth/Authorization";

// Full screen
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// images

import Icon_map_expand from "../../../Assets/Images/Icon_map_expand.png";
import { useAuthUser } from "react-auth-kit";

const column = [
  {
    id: "companyName",
    label: "Company Name",
    minWidth: 100,
    align: "left",
    childalign: "left",
  },
  {
    id: "timeStamp",
    label: "Time Stamp",
    minWidth: 100,
    align: "left",
    childalign: "left",
  },
  {
    id: "address",
    label: "Location",
    minWidth: 100,
    align: "left",
    childalign: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "businessType",
    label: "Business Type",
    minWidth: 80,
    align: "center",
    childalign: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "reason",
    label: "Reason",
    minWidth: 80,
    align: "center",
    childalign: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Rebids",
    label: "Rebids",
    minWidth: 80,
    align: "center",
    childalign: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "RebidsStatus",
    label: "Rebids Status",
    minWidth: 80,
    align: "center",
    childalign: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 70,
    align: "center",
    childalign: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "",
    minWidth: 80,
    align: "center",
    childalign: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  companyName,
  timeStamp,
  address,
  businessType,
  reason,
  Rebids,
  RebidsStatus,
  status,
  action
) {
  return {
    companyName,
    timeStamp,
    address,
    businessType,
    reason,
    Rebids,
    RebidsStatus,
    status,
    action,
  };
}
let previousDropdownValue = "";

const RebidRequests = (props) => {
  const authUser = useAuthUser();
  const isViewEstimate = IsAuthorized("estimate").view;

  const [dataTableManageEstimatorList, setDataTableManageEstimatorList] = useState([]);
  const [animation, setAnimation] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isData, setIsData] = useState(false);
  // const status = searchParams.get("status") || '';

  useEffect(async () => {
    await manageEstimator();
  }, []);

  // const manageEstimator = async (status) => {
  //   setAnimation(true);
  //   let response = await RecentEstimatesAPI(status, authUser().company.company_id);
  //   if (response.success) {
  //     setDataTableManageEstimatorList(response.estimates);
  //     setAnimation(false);
  //     setIsData(true);
  //   } else {
  //     setIsData(false);
  //     setAnimation(false);
  //   }
  // };
  const manageEstimator = async () => {
    setAnimation(true);
    let response = await getRebidEstimatesAPI(authUser().company.company_id);

    if (response.success) {
      setDataTableManageEstimatorList(response.rebidEstimates);
      setAnimation(false);
      setIsData(response.rebidEstimates.length ? true : false);
    } else {
      setIsData(false);
      setAnimation(false);
    }
  };

  let rows = [];
  const navigate = useNavigate();

  const viewRecent = (data) => {
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

  for (let data of dataTableManageEstimatorList) {
    rows.push(
      createData(
        data.company_details[0]?.name,
        moment.utc(data.updatedAt).format("MMM Do, YYYY"),
        data.company_details[0]?.address,
        data.company_details[0]?.businessType,
        data.reason,
        data.rebids,
        data.rebids_status,
        data.status === "in_rebid" ? (
          <span
            style={{ color: "navy", cursor: "pointer" }}
            onClick={(e) => LinkToRebid(e, data.estimatorId, data.clientId, data)}
          >
            {data.status}
          </span>
        ) : (
          <p>{data.status}</p>
        ),
        <span
          // onClick={() => getId(data)}
          onClick={() => viewRecent(data)}
          className="btn-sm buttonView pointer w-75 "
          style={{ color: "#29ABE2" }}
        >
          View
        </span>
      )
    );
  }
  // }
  // material ui tables for pages
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dropDown = async (status) => {
    if (previousDropdownValue === status) {
      // When user select previous value
    } else {
      // when user select new value
      previousDropdownValue = status;
      setSearchParams({ status });
      await manageEstimator(status);
    }
  };
  const moveTop = () => {
    // Scrolling to the top of the page after submitting
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const LinkToRebid = (e, id, clientId, data) => {
    navigate("/rebid", {
      state: {
        ID: id,
        clientID: clientId,
        FullData: data,
      },
    });
  };
  return (
    <div className="col-12  ">
      <div className="card recentEstimatesCard">
        <div className="card-title incomingBar">
          <span className="FontSizeAllEstimators"> Rebid Requests</span>
          {props.icon ? (
            <form className="form-inline searchBarRecentEstimatesSearch">
              &nbsp;
              {props.dropdown ? (
                <select
                  onClick={(e) => dropDown(e.target.value)}
                  id="cars"
                  className="buttonColorr"
                >
                  <option value="in_rebid">&nbsp;&nbsp;In Rebid</option>
                  <option value="">&nbsp;&nbsp;Select All</option>
                  <option value="pending">&nbsp;&nbsp;Pending</option>
                  <option value="accepted">&nbsp;&nbsp;Accepted</option>
                  <option value="rejected">&nbsp;&nbsp;Rejected</option>
                  <option value="scheduled">&nbsp;&nbsp;Scheduled </option>
                  <option value="live">&nbsp;&nbsp;Live</option>
                  <option value="expiring_soon">&nbsp;&nbsp;Expiring soon</option>
                  <option value="in_progress">&nbsp;&nbsp;In Progress</option>
                  <option value="terminated">&nbsp;&nbsp;Terminated</option>
                  <option value="revise">&nbsp;&nbsp;Revise</option>
                </select>
              ) : null}
              <Link to="/RebidRequests">
                <img src={Icon_map_expand} alt={"Not Found"} />
              </Link>
              &nbsp;
            </form>
          ) : null}
        </div>
        {props.moveup ? moveTop() : <p hidden></p>}
        <div className="card-body text-center">
          {/* Table start */}
          {/* <FullScreen handle={handle}> */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 840 }}>
              <Table hover={true} stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {column.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          // overflow: "hidden",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {animation === false ? (
                  isData ? (
                    <TableBody>
                      {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                              style={{
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                // overflow-x: "hidden",
                                // overflow-y: "hidden",
                                width: "20%",
                              }}
                            >
                              {column.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    style={{ color: "gray", fontWeight: "bold" }}
                                    className="tableContentCenter "
                                    key={column.id}
                                    align={column.childalign}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  ) : (
                    <>
                      <div className="row mt-4 mb-4">
                        <h1>No Data Found</h1>
                      </div>
                    </>
                  )
                ) : (
                  <div className="loaderCenterRebidRequest">
                    <LoaderAnimation size={100} />
                  </div>
                )}
              </Table>
            </TableContainer>
            {props.paginator ? (
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            ) : (
              <p hidden></p>
            )}
          </Paper>
          {/* </FullScreen> */}
          {/* Table end */}
        </div>
      </div>
    </div>
  );
};

export default RebidRequests;
