import React from "react";
import "./DonutChart.css";
import DonutChart from "react-donut-chart";

export default function Progress() {
  return (

    <div className="col-lg-3 col-md-3 d-flex align-items-stretch col-sm-12 col-xs-12">
      <div class="card progressCard">
        <div class="card-body">
          <h6 class="card-title"> </h6>
          <div class="card-text">
            <DonutChart
              width={200}
              height={240}
              innerRadius={0.8}
              selectedOffset={0}
              outerRadius={0.9}
              legend={false}
              colors={["skyblue"]}
              emptyColor={["whitesmoke"]}
              clickToggle={[false]}
              onClick={[false]}
              data={[
                {
                  label: "Closing ratio",
                  value: 76,
                },
                {
                  label: "",
                  value: 24,
                  isEmpty: true,

                },
              ]}
            />
            <DonutChart
              width={200}
              height={240}
              innerRadius={0.8}
              selectedOffset={0}
              outerRadius={0.9}
              legend={false}
              colors={["skyblue"]}
              emptyColor={["whitesmoke"]}
              clickToggle={[false]}
              onClick={[false]}
              data={[
                {
                  label: "Rejected",
                  value: 58,
                },
                {
                  label: "",
                  value: 42,
                  isEmpty: true,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>

  );
}
