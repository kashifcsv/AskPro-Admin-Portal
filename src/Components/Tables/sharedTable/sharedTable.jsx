import React, { useCallback, useEffect, useState } from "react";
import "./SmartTable.css";
import PropTypes from "prop-types";
import SVGArrowDown from "./icons/SVGArrowDown";
import SVGArrowUp from "./icons/SVGArrowUp";

import TableFooter from "@mui/material/TableFooter";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FaGreaterThan from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { propTypes } from "react-bootstrap/esm/Image";

// let pageNumber = 1;

function SmartTable(props) {
  const [loading] = useState(false);
  const [sortDesc, setSortDesc] = useState({});
  const [tableWidth, setTableWidth] = useState(1000);
  const [data, setData] = useState(props.fiveRows);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState(1);
  const [allData] = useState(props.data);
  const [dataToShowTwo, setDataToShowTwo] = useState([]);

  const [nextDisable, setNextDisable] = useState(false);
  const [previousDisable, setPreviousDisable] = useState(true);
  const [showSearch] = useState(props.search ? true : false);

  const tableWidthFunc = useCallback(() => {
    let tempTableWidth = 0;
    props.headCells.map((cell) => (tempTableWidth += cell.width));

    if (tempTableWidth) setTableWidth(tempTableWidth);
  }, [props.headCells]);

  useEffect(() => {
    tableWidthFunc();
    handleSearch("ab");
    setTimeout(() => {
      handleSearch("");
      setData(data);
    }, 100);
  }, [props.url, props.data, props.rowsPerPage, props.headCells, tableWidthFunc]);

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const handleSearch = debounce((val) => {
    const value = val;
    setSearch(value);

    let bool = false;
    let tempData = props.data.filter((row) => {
      bool = false;
      Object.keys(row).forEach((key) => {
        // bool = true;
        if (row[key]?.toLowerCase()?.includes(value?.toLowerCase())) bool = true;
      });
      return bool;
    });
    setData(tempData);
  }, props.searchDebounceTime ?? 200);

  const sortData = (cell) => {
    let tempData = [...data];

    tempData.sort((a, b) => {
      if (sortDesc[cell]) {
        return a[cell].toLowerCase() < b[cell].toLowerCase() ? 1 : -1;
      } else {
        return a[cell].toLowerCase() > b[cell].toLowerCase() ? 1 : -1;
      }
    });
    setSortDesc({ [cell]: !sortDesc[cell] });
    setData(tempData);
  };

  const handleChangeRowsPerPage = (event) => {
    let newData = props.data.slice();

    if (event.target.value === props.data.length) {
      setNextDisable(true);
      setPreviousDisable(true);
    } else {
      setRowsPerPage(parseInt(event.target.value, 10));
      setData(newData.splice(0, event.target.value));
      setNextDisable(false);
      setPreviousDisable(true);
      setPageNumber(1);
    }
  };
  const navigate = useNavigate();
  const navigateTo = (data) => {
    navigate(`../${props.pageLink}`, { state: { fullData: data } });
  };

  const next = () => {
    let temPageNumber = pageNumber + 1;
    let arr = [];
    for (
      let index = pageNumber * rowsPerPage;
      index < pageNumber * rowsPerPage + rowsPerPage;
      index++
    ) {
      if (index + 1 > props.data.length) {
        setNextDisable(true);
        break;
      } else {
        arr.push(props.data[index]);
        setPreviousDisable(false);
        setPageNumber(temPageNumber);
        setData(arr);
      }
    }
  };

  const previous = () => {
    let temPageNumber = pageNumber - 1;
    let arr = [];
    for (
      let index = pageNumber * rowsPerPage - rowsPerPage;
      index < pageNumber * rowsPerPage && index < props.data.length;
      index++
    ) {
      if (pageNumber === 0) {
        setPreviousDisable(true);
      } else {
        arr.push(props.data[index]);
        setPageNumber(temPageNumber);
        setData(arr);
        setNextDisable(false);
      }
    }
  };

  return (
    <>
      <div className="smartTable-container mb-4 mt-4 row" style={{ borderRadius: "18px" }}>
        <div className="col-12" style={{ marginTop: "-10px" }}>
          {loading && (
            <div className="smartTable-loaderContainer text-primary">
              <div className="spinner-border" role="status"></div>
            </div>
          )}

          <div className="card-title incomingBarDynamicTable">
            <h6>{props.title}</h6>
            {showSearch ? (
              <input
                className="form-inline searchBarRecentEstimatesSearchDynamicTable  mr-sm-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                onChange={(e) => handleSearch(e.target.value)}
              />
            ) : null}
          </div>
          {data.length > 0 ? (
            <div className="row mt-3">
              <div className="smartTable-tableContainer">
                <table
                  className={"smartTable-table table table-hover border"}
                  style={{ minWidth: tableWidth }}
                >
                  <thead className="smartTable-thead">
                    <tr>
                      {props.headCells.map((headCell) => {
                        return (
                          <th
                            id={headCell.id}
                            key={headCell.id}
                            scope="col"
                            style={{ width: headCell.width ?? "auto" }}
                            className={
                              headCell.sortable !== false
                                ? "smartTable-pointer firstRowEstimatorReviewDynamicTable"
                                : ""
                            }
                            onClick={() =>
                              headCell.sortable !== false ? sortData(headCell.id) : {}
                            }
                          >
                            {headCell.label}
                            {sortDesc[headCell.id] ? (
                              <SVGArrowDown />
                            ) : sortDesc[headCell.id] === undefined ? (
                              ""
                            ) : (
                              <SVGArrowUp />
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, idx) => {
                      return (
                        <tr
                          className={
                            (props.navigation ? props.navigation : false) ? "pointer" : null
                          }
                          onClick={
                            (props.navigation ? props.navigation : false)
                              ? () => navigateTo(row)
                              : null
                          }
                          // style={{ width: "auto" }}
                          key={"tr_" + idx}
                        >
                          {props.headCells.map((headCell, idxx) => {
                            return (
                              <td key={"td_" + idx + "_" + idxx}>
                                <span
                                  className={
                                    headCell.id === props?.smartCssId
                                      ? props?.smartCssClass
                                      : "null"
                                  }
                                >
                                  {headCell.render ? headCell.render(row) : row[headCell.id]}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {props.paginator ? (
                <>
                  <div className="row mt-2 mb-2">
                    <TableFooter className="d-flex justify-content-end">
                      <Box sx={{ minWidth: 120 }} className="marginLeftPX">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Rows per page</InputLabel>
                          <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rowsPerPage}
                            label="Rows per page"
                            onChange={handleChangeRowsPerPage}
                          >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <span className="d-flex align-items-center">
                        <button
                          disabled={previousDisable}
                          onClick={previous}
                          className="btn marginLeftPX"
                        >
                          <ArrowBackIosNewIcon fontSize="small" color="black" />
                        </button>
                        <button disabled={nextDisable} onClick={next} className="btn  marginLeftPX">
                          <FaGreaterThan fontSize="small" color="black" />
                        </button>
                        <span style={{ fontWeight: "600" }}>Total: {props.data.length}</span>
                      </span>
                    </TableFooter>
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <div className="row p-4">
              <div className="smartTable-noDataFound col-12">
                <h4>NO DATA FOUND</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

SmartTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.Object),
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  total: PropTypes.number,
  url: PropTypes.string,
  headCells: PropTypes.arrayOf(
    //means Object
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number, //px
      sortable: PropTypes.bool,
      render: PropTypes.func,
    })
  ),
};

export default SmartTable;
