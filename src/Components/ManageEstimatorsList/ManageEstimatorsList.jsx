/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ManageEstimatorsAPI, searchEstimatorAPI } from "../../api/Services";
import "./ManageEstimatorsList.css";

// MUI Tables
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import LoaderAnimation from "../Loader/LoaderAnimation";
// ICON

import manageEstimatorListPlusIcon from "../../Assets/Images/manageEstimatorListPlusIcon.png";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { IsAuthorized } from "../../Auth/Authorization";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "jobcompleted", label: "Job Completed", minWidth: 100 },
  {
    id: "rating",
    label: "Rating",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "rejectionratio",
    label: "Rejection Ratio",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cleaningcompany",
    label: "Cleaning Company",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "avgjobtime",
    label: "Avg. Job Time",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];
function createData(
  name,
  jobcompleted,
  rating,
  rejectionratio,
  cleaningcompany,
  avgjobtime,
  action
) {
  // const density = population / size;
  return {
    name,
    jobcompleted,
    rating,
    rejectionratio,
    cleaningcompany,
    avgjobtime,
    action,
  };
}
const ManageEstimatorsList = (props) => {
  let rows = [];
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const isViewEtimator = IsAuthorized("estimator").view;
  const isAddEtimator = IsAuthorized("estimator").create;
  const isUpdateEtimator = IsAuthorized("estimator").update;
  const [dataTableManageEstimatorList, setDataTableManageEstimatorList] = useState([]);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (!isViewEtimator) {
      toast.error("You are not authorized to view etimator list");
      navigate("/Dashboard");
    }
    manageEstimator();
  }, []);

  const manageEstimator = async () => {
    let response = await ManageEstimatorsAPI(authUser().company.company_id);
    if (response.success) {
      setAnimation(true);
      setDataTableManageEstimatorList(response.estimators);
    } else {
      setAnimation(true);
      setDataTableManageEstimatorList([]);
    }
  };

  const getId = (data) => {
    if (isUpdateEtimator) {
      navigate("/UpdateEstimators", {
        state: {
          username: data.username,
        },
      });
    } else {
      toast.error("You are not authorized to update estimator");
    }
  };
  const estimatorPage = (data) => {
    navigate("/EstimatorRating", {
      state: {
        data: data,
      },
    });
  };

  if (dataTableManageEstimatorList !== undefined) {
    for (let data of dataTableManageEstimatorList) {
      rows.push(
        createData(
          data.name,
          data.jobs_completed,
          <span onClick={() => estimatorPage(data)} style={{ color: "navy" }} className="pointer">
            {parseFloat(data.rating).toFixed(2)}
          </span>,
          parseFloat(data.rejection_ratio).toFixed(2),
          data.company_name,
          data.avg_job_time,
          <Button
            onClick={() => getId(data)}
            className="btn-sm buttoninside w-75 buttonColor pointer"
          >
            Edit
          </Button>
        )
      );
    }
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const searchEstimator = async (name) => {
    try {
      let searchEsimatorResponse = await searchEstimatorAPI(name);
      if (searchEsimatorResponse.success) {
        setDataTableManageEstimatorList(searchEsimatorResponse.estimator);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const addEstimator = () => {
    if (isAddEtimator) {
      navigate("/AddEstimator");
    } else {
      toast.error("You are not authorized to add estimator");
    }
  };

  return (
    <div className="col-12">
      <div className="card mb-4 recentEstimatesCard">
        <div className="card-title incomingBar">
          <h6>Manage Estimators List</h6>
          <form className="form-inline  searchBarRecentEstimatesSearch">
            <input
              style={{ marginLeft: "-15%" }}
              className="form-control  mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => searchEstimator(e.target.value)}
            />
          </form>
          <span className="pointer" onClick={addEstimator}>
            <img alt="notFound" src={manageEstimatorListPlusIcon} className="manageEstimatorIcon" />
          </span>
        </div>

        <div className="card-body">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {animation ? (
                  dataTableManageEstimatorList.length ? (
                    <TableBody>
                      {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    // style={{alignItems:'left'}}
                                    key={column.id}
                                    align={column.align}
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
                  <div className="loaderCenter">
                    <LoaderAnimation size={100} />
                  </div>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

ManageEstimatorsList.propTypes = {};
export default ManageEstimatorsList;
