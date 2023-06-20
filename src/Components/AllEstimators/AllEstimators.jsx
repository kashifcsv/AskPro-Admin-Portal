import React from "react";
import "./AllEstimators.css";
const AllEstimators = () => {
  return (
    <div className="col-12">
      <div className="card recentEstimatesCard">
        <div className="card-title incomingBarAllEstimator">
          <span className="FontSizeAllEstimators">All Estimates</span>
          <form className="form-inline col-lg-5 searchBarRecentEstimatesSearch">
            {/* <input
                            className="form-control  inputIcon mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"

                        />{" "} */}
            &nbsp;
            {/* <Button className="btn-sm" color="primary" outline>
                            Search
                        </Button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AllEstimators;
