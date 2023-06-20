import React from "react";
import "./LineChart.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function PastWeekInquiries() {
  // Chart Start

  const options = {
    chart: {
      type: "areaspline",
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "top",
      // x: 150,
      y: 100,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
    },
    xAxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      plotBands: [
        {
          // visualize the weekend
          from: 4.5,
          to: 6.5,
          color: "rgba(68, 170, 213, .2)",
        },
      ],
    },
    tooltip: {
      shared: true,
      valueSuffix: " units",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    series: [
      {
        // name: "John",
        data: [3, 4, 3, 5, 4, 10, 12],
      },
    ],
  };

  // chart end

  return (

    <div className="col-lg-3 col-md-3 d-flex align-items-stretch col-sm-12 col-xs-12">
      {/* Card 1 Start */}
      <div class="card pastWeekInquiriesCard">
        <div class="card-body">
          <h6 class="card-title">Past Week Inquiries</h6>
          <hr />
          <div class="card-text">
            {/* chart start */}

            <HighchartsReact highcharts={Highcharts} options={options} />

            {/* chart end */}
          </div>
        </div>
      </div>
      {/* Card End */}
    </div>

  );
}
