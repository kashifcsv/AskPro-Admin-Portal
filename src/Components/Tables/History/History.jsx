import React, { useEffect, useState } from "react";
import "./History.css";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { getCompanyDetails, HistoryAPI } from "../../../api/Services";
import moment from "moment";
// images
import LoaderAnimation from "../../Loader/LoaderAnimation";
import Icon_map_expand from "../../../Assets/Images/Icon_map_expand.png";
import { useAuthUser } from "react-auth-kit";

const column = [
  { id: "companyName", label: "Company Name", minWidth: 170, align: "left" },
  {
    id: "estimatorName",
    label: "Estimator Name",
    minWidth: 100,
    align: "left",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 150,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "businessType",
    label: "Business Type",
    minWidth: 170,
    align: "center",
    childalign: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "timeStamp",
    label: "Time Stamp",
    minWidth: 170,
    align: "center",
    childalign: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "left",
    childalign: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "left",
    childalign: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];
function createData(companyName, estimatorName, address, businessType, timeStamp, status, action) {
  return {
    companyName,
    estimatorName,
    address,
    businessType,
    timeStamp,
    status,
    action,
  };
}

const History = (props) => {
  const authUser = useAuthUser();
  const [dataTableManageEstimatorList, setDataTableManageEstimatorList] = useState([]);
  const [animation, setAnimation] = useState(true);
  const [isData, setIsData] = useState(false);
  // const status = searchParams.get("status") || '';

  useEffect(() => {
    historyApiData();
  }, []);

  const historyApiData = async () => {
    let response = await HistoryAPI(authUser().company.company_id);
    if (response.success) {
      setDataTableManageEstimatorList(response.estimates);
      setAnimation(false);
      setIsData(true);
    } else {
      setIsData(false);
      setAnimation(false);
    }
  };

  let rows = [];

  if (dataTableManageEstimatorList !== undefined) {
    for (let data of dataTableManageEstimatorList) {
      rows.push(
        createData(
          data.company_details[0]?.name,
          data.estimator_name,
          data.company_details[0]?.address,
          data.company_details[0]?.businessType,
          moment.utc(data.updatedAt).format("MMM Do, YYYY"),
          data.status,
          <span className="btn-sm buttonView w-75 " style={{ color: "#29ABE2" }}>
            View
          </span>
        )
      );
    }
  }

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

  const moveTop = () => {
    // Scrolling to the top of the page after submitting
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className="col-12 ">
      <div className="card recentEstimatesCard">
        <div className="card-title incomingBar">
          <span className="FontSizeAllEstimators">History</span>

          <form className="form-inline col-lg-5 searchBarRecentEstimates justify-content-end">
            {props.icon ? (
              <Link to="/History">
                <img src={Icon_map_expand} alt={"Not Found"} />
              </Link>
            ) : (
              <span hidden></span>
            )}
            &nbsp;
          </form>
        </div>
        {props.moveup ? moveTop() : <p hidden></p>}

        <div className="card-body text-center">
          {/* Table start */}
          {/* <FullScreen handle={handle}> */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                                overflow: "hidden",
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
                  <div className="loaderCenter">
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

export default History;
