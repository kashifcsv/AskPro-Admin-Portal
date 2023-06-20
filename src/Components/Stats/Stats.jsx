import React from "react";
import "./Stats.css";

export default function Stats(props, value) {
    return (




        <div className="card StatsMCard col-lg-2 col-md-4 col-sm-4 col-xs-6 d-flex align-items-stretch mb-2">
            <div className=" StatsCard ">
                <div className="row justify-content-center colorTitle">
                    <div className="col-12 p-0 mt-3">
                        <h6 className="card-text mb-2">{props.title}</h6>
                    </div>
                </div>

                <div className="row justify-content-center mt-2">
                    <div className="col-12">

                        <h2 className="card-text colorforvalue">{props.value}</h2>
                    </div>
                </div>
            </div>
        </div>




    );
}
