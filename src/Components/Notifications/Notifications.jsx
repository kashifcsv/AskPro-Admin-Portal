/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Notifications.css";
import { Button } from "react-bootstrap";
import { GetLimitedNotificationsAPI, readAllNotifications } from "../../api/Services";

//import LoaderAnimation from "../../Loader/LoaderAnimation";
import LoaderAnimation from "../Loader/LoaderAnimation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { notificationCountAction } from "../../Redux/Actions/Action";
import { IsAuthorized } from "../../Auth/Authorization";

export default function Notifications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isViewEstimate = IsAuthorized("estimate").view;

  const [Notifications, setNotifications] = useState([]);
  const [animation, setAnimation] = useState(false);
  const [limit, setLimit] = useState(100);
  const [intervalTime, setIntervalTime] = useState(15000);
  const [isSeeAll, setIsSeeAll] = useState(true);

  useEffect(() => {
    getNotifications();

    const interval = setInterval(() => {
      getNotifications();
    }, intervalTime);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [limit]);

  const getNotifications = async () => {
    let response = await GetLimitedNotificationsAPI(limit, localStorage.getItem("company__ID"));
    if (response.success) {
      notificationReads();
      setNotifications(response.notifications);
      setAnimation(true);
    }
  };

  const allNotifications = async () => {
    setIsSeeAll(false);
    setLimit(limit * 1000);
    setIntervalTime(intervalTime * 4);
  };

  const seeLessNotifications = async () => {
    setIsSeeAll(true);
    setLimit(100);
    setIntervalTime(15000);
  };

  const notificationReads = async () => {
    try {
      const response = await readAllNotifications(localStorage.getItem("company__ID"));
      if (response.success) {
        dispatch(notificationCountAction(0));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const LinkToRebid = (data) => {
    if (isViewEstimate) {
      navigate("/rebid", {
        state: {
          FullData: data.payload,
        },
      });
    } else {
      toast.error("You are not authorized to view quotation");
    }
  };

  const LinkToRecentOfferas = (data) => {
    if (isViewEstimate) {
      const payload = {
        status: data?.status,
        reason: data?.reason,
        _id: data?.estimateId,
        estimatorId: data?.estimatorId,
        clientId: data?.clientId,
      };
      navigate("/RecentOfferas", {
        state: {
          FullData: payload,
        },
      });
    } else {
      toast.error("You are not authorized to view Estimate");
    }
  };

  return (
    <>
      <div className="card d-flex align-self-stretch notificationCard">
        {/* height 500px */}

        <h6 className="card-title notificationBar">Notifications</h6>
        <div className="card-body text-center">
          <div className="notificationBody">
            {animation === true ? (
              Notifications.length ? (
                Notifications.map(
                  (item, index) => {
                    switch (item.title) {
                      case "Estimate Entered Rebid":
                        return (
                          <div>
                            <h5
                              style={{ color: "blue" }}
                              className="pointer"
                              onClick={() => LinkToRebid(item)}
                            >
                              {item.title}
                            </h5>
                            <p className="notificationDescription">{item.body}</p>
                            <p className="notificationTime timeShowCss">{item.since}</p>
                            <hr />
                          </div>
                        );

                      case "Quotation Ready":
                        return (
                          <div>
                            <h5
                              style={{ color: "blue" }}
                              className="pointer"
                              onClick={() => LinkToRecentOfferas(item)}
                            >
                              {item.title}
                            </h5>
                            <p className="notificationDescription">{item.body}</p>
                            <p className="notificationTime timeShowCss">{item.since}</p>
                            <hr />
                          </div>
                        );

                      default:
                        return (
                          <div>
                            <h5>{item.title}</h5>
                            <p className="notificationDescription">{item.body}</p>
                            <p className="notificationTime timeShowCss">{item.since}</p>
                            <hr />
                          </div>
                        );
                    }
                  }
                  // item.title === "Estimate Entered Rebid" ? (
                  //   <div>
                  //     <h5
                  //       style={{ color: "blue" }}
                  //       className="pointer"
                  //       onClick={() => LinkToRebid(item)}
                  //     >
                  //       {item.title}
                  //     </h5>
                  //     <p className="notificationDescription">{item.body}</p>
                  //     <p className="notificationTime timeShowCss">{item.since}</p>
                  //     <hr />
                  //   </div>
                  // ) : item.title === "Quotation Ready" ? (
                  //   <div>
                  //     <h5
                  //       style={{ color: "blue" }}
                  //       className="pointer"
                  //       onClick={() => LinkToRecentOfferas(item)}
                  //     >
                  //       {item.title}
                  //     </h5>
                  //     <p className="notificationDescription">{item.body}</p>
                  //     <p className="notificationTime timeShowCss">{item.since}</p>
                  //     <hr />
                  //   </div>
                  // ) : (
                  //   <div>
                  //     <h5>{item.title}</h5>
                  //     <p className="notificationDescription">{item.body}</p>
                  //     <p className="notificationTime timeShowCss">{item.since}</p>
                  //     <hr />
                  //   </div>
                  // )
                )
              ) : (
                <h1>No data found!</h1>
              )
            ) : (
              <div>
                <LoaderAnimation size={100} />
              </div>
            )}
          </div>
        </div>
        {isSeeAll ? (
          <Button onClick={allNotifications} className="seeAllBtn" variant="primary">
            See All
          </Button>
        ) : (
          <Button onClick={seeLessNotifications} className="seeAllBtn" variant="primary">
            See Less
          </Button>
        )}
      </div>
      &nbsp;
    </>
  );
}
