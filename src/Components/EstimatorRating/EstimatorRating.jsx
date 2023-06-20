/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getReviewListAPIEstimator } from "../../api/Services";
import LoaderAnimation from "../Loader/LoaderAnimation";
import "./EstimatorRating.css";
import { toast } from "react-toastify";

const EstimatorRating = () => {
  const location = useLocation();

  // hooks Start
  const [reviewList, setReviewList] = useState({});
  const [animation, setAnimation] = useState(false);
  // hooks End

  // Useeffect start
  useEffect(async () => {
    try {
      let response = await getReviewListAPIEstimator(location.state.data._id);
      if (response.success) {
        setAnimation(true);
        setReviewList(response.result);
      } else {
        setAnimation(true);
        setReviewList([]);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, []);

  // Useeffect end

  return (
    <div className="col-11">
      <div className="card recentEstimatesCard">
        <div className="card-title incomingBar">
          <h5>Estimator Reviews</h5>
        </div>

        <div className="card-body text-center">
          <div className="row mb-4">
            <div className="col-3">
              <span className="firstRowEstimatorReview">Client Name</span>
            </div>
            <div className="col-3">
              <span className="firstRowEstimatorReview">Job Number</span>
            </div>
            <div className="col-6">
              <span className="firstRowEstimatorReview d-flex">Review</span>
            </div>

            {animation ? (
              reviewList.length ? (
                reviewList.map((item, index) => (
                  <>
                    <div className="col-3 mt-4">
                      <span className="detailRowEstimatorReview">{item.clientName}</span>
                    </div>
                    <div className="col-3 mt-4">
                      <span className="detailRowEstimatorReview"> {item._id}</span>
                    </div>
                    <div className="col-6 mt-4">
                      <span className="detailsRowEstimatorReview d-flex">{item.comment}</span>
                    </div>
                  </>
                ))
              ) : (
                <h1 className="mt-4">No Data Found</h1>
              )
            ) : (
              <LoaderAnimation />
            )}
            {/* Map End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatorRating;
