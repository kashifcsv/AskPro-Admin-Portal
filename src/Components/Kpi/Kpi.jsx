import React from "react";
import "./Kpi.css";
import { useNavigate } from "react-router-dom";

export default function Kpi(props, { size, color }) {
  let navigate = useNavigate();

  function navegate() {
    if (props.id == "ManageEstimators") {
      navigate("/manageestimators", { replace: true });
    }
    // if (props.id == "ManageBillingCompany") {
    //   navigate("/ManageBillingCompany", { replace: true });
    // }
  }
  return (
    <div className="col-lg-2 col-md-4 col-sm-4 col-xs-6 d-flex align-items-stretch mb-2">
      <div className="card kpiMCard ">
        <button id={props.id} onClick={navegate} className="btn btn-light btnInsideCard">
          <div className="card-body kpiCard ">
            <div className="row">
              <div className="col-3">
                <div size={size} fill={color}>
                  <img
                    src={props.icon}
                    height={props.height}
                    width={props.width}
                  />
                </div>
              </div>
              <div className="col-9">
                <h6 className="card-text ">{props.title}</h6>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
