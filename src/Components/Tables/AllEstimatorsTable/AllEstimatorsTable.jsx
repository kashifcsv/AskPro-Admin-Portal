import React, { useEffect, useState } from "react";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { borderLeft } from "@mui/system";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const column = [
  { id: "OrganizationName", label: "Organization name", minWidth: 70, align: "center" },
  { id: "EstimateDate", label: "Estimate Date", minWidth: 100, align: "center" },
  {
    id: "ResultsFound",
    label: "10 Results Found",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(OrganizationName, EstimateDate, ResultsFound) {
  // const density = population / size;
  return {
    OrganizationName,
    EstimateDate,
    ResultsFound,
  };
}

export const AllEstimatorsTable = () => {
  var jsonDummyData = [
    {
      userId: "Edward",
      id: "15-03-2022",
      title: "delectus aut autem",
      completed: "false",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: "Edward",
      id: "15-03-2022",
      title: "quis ut nam ",
      completed: "false",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: "Edward",
      id: "15-03-2022",
      title: "fugiat veniam minus",
      completed: "false",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: "Edward",
      id: "15-03-2022",
      title: "et porro tempora",
      completed: "true",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: "Edward",
      id: "15-03-2022",
      title: "laboriosam",
      completed: "false",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: 1,
      id: 6,
      title: "qui ullam r",
      completed: "false",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: 1,
      id: 7,
      title: "illo expedita consequatur quia in",
      completed: "false",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: 1,
      id: 8,
      title: "quo adipisci enim quam ut ab",
      completed: "true",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: 1,
      id: 8,
      title: "quo adipisci enim quam ut ab",
      completed: "true",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: 1,
      id: 8,
      title: "quo adipisci enim quam ut ab",
      completed: "true",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
    {
      userId: 1,
      id: 8,
      title: "quo adipisci enim quam ut ab",
      completed: "true",
      type: "Bank",
      reason: "Overpriced",
      rebids: "1",
      rebids_status: "Accepted",
      status: "Rejected",
    },
  ];
  const [dataTable, setDataTable] = useState(jsonDummyData);

  let rows = [];
  for (let data of dataTable) {
    // WE ARE FIXING THE TABLE ROWS TO 5. Its Dynamic but our requirement is to limit it to 5
    if (rows.length < 5) {
      rows.push(
        createData(
          data.userId,
          data.id,
          <Button onClick={showID} className="btn-sm buttoninside w-75 buttonColor">
            View Estimate
          </Button>,
          data.body
        )
      );
    }
  }
  function showID() {
    toast.success("data.id", rows.id);
  }

  return (
    <div className="col-12 ">
      <div className="card recentEstimatesCard">
        <div className="card-body text-center">
          {/* Table start */}

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table hover={true} stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {column.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {column.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
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
              </Table>
            </TableContainer>
            {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
          </Paper>
          {/* Table end */}
        </div>
      </div>
    </div>
  );
};
