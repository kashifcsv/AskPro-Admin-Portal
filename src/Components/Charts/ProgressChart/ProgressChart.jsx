import React from "react";
import "./ProgressChart.css";
import Table from "react-bootstrap/Table";
import VerticalBarChart from 'react-vertical-bar-chart';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Button } from "react-bootstrap";

import { BsChevronDoubleDown } from "react-icons/bs";

export default function RecentJobs() {
  return (

    <div className="col-lg-6 col-md-6 d-flex align-items-stretch col-sm-12 col-xs-12">
      <div class="card recentJobsCard">
        <div class="card-body">
          <h6 class="card-title"> Recent Jobs </h6>


          <Button className="moreInfoBtn" size="sm" variant="primary">More info &nbsp;&nbsp; <BsChevronDoubleDown />{" "}</Button>


          {/* <button className="btn btn-sm btn-primary moreInfoBtn">
              More info &nbsp;&nbsp; <BsChevronDoubleDown />{" "}
            </button> */}
          {/* Table start */}

          <Table hover>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Status</th>
                <th>Completion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Job ID 1</td>
                <td>Completed</td>
                <td><ProgressBar now={60} /></td>
              </tr>
              <tr>
                <td>Job ID 2</td>
                <td>Completed</td>
                <td><ProgressBar now={80} /></td>
              </tr>
              <tr>
                <td>Job ID 3</td>
                <td>Completed</td>
                <td><ProgressBar now={30} /></td>
              </tr>
              <tr>
                <td>Job ID 4</td>
                <td>Completed</td>
                <td><ProgressBar now={90} /></td>
              </tr>
              <tr>
                <td>Job ID 5</td>
                <td>Completed</td>
                <td><ProgressBar now={200} /></td>
              </tr>

            </tbody>
          </Table>

          {/* Table end */}

        </div>
      </div>
    </div>

  );
}
