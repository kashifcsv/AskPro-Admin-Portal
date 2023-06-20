import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import manageEstimatorListPlusIcon from "../../Assets/Images/manageEstimatorListPlusIcon.png";
import LoaderAnimation from "../Loader/LoaderAnimation";
import "./userManagement.css";
import { toast } from "react-toastify";
import { getUsersList, deleteUserApi } from "../../api/Services";
import { useAuthUser } from "react-auth-kit";
import { IsAuthorized } from "../../Auth/Authorization";

const UserManagementListComponent = () => {
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [animation, setAnimation] = useState(false);
  const isAddUser = IsAuthorized("user").create;
  const isUpdateUser = IsAuthorized("user").update;
  const isViewUser = IsAuthorized("user").view;
  const isDeleteUser = IsAuthorized("user").delete;

  useEffect(() => {
    if (isViewUser) {
      userListData();
    } else {
      toast.error("You are not authorized to view users");
      navigate("/Dashboard");
    }
  }, []);

  const userListData = async () => {
    try {
      const userListResponse = await getUsersList();
      if (userListResponse.success) {
        setAnimation(true);
        setUserList(userListResponse.usersList);
      } else {
        setAnimation(true);
        setUserList([]);
        toast.error("No Data Available");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const editUser = (e, item) => {
    e.preventDefault();
    if (isUpdateUser) {
      navigate("/Update-User", { state: { fullData: item } });
    } else {
      toast.error("You are not authorized to update user");
    }
  };

  const deleteUser = async (e, item) => {
    e.preventDefault();

    if (isDeleteUser) {
      try {
        const deleteU = await deleteUserApi(item.userName);
        if (deleteU.success) {
          toast.success(deleteU.msg);
          userListData();
        } else {
          toast.error(deleteU.msg);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("You are not authorized to delete user");
    }
  };

  const addUser = () => {
    if (isAddUser) {
      navigate("/Add-User");
    } else {
      toast.error("You are not authorized to add user");
    }
  };

  const handlePermissions = () => {
    navigate("/User-Permissions");
  };

  return (
    <div className="col-12">
      <div className="card ManageEstimatorListCard">
        <div className="card-title incomingBar">
          <h6>User Management</h6>

          <span onClick={addUser} className="pointer">
            <img src={manageEstimatorListPlusIcon} className="manageEstimatorIcon" alt="" />
          </span>
        </div>

        <div className="card-body mt-4 mb-4">
          <div className="row">
            <div className="col-9">
              {" "}
              <span className="  userListLine mb-4"> User You Want To Give Access For Options</span>
            </div>

            {authUser().role[0].role === "Company_Admin" ? (
              <div className="col-2">
                <button
                  className="d-flex justify-content-center mb-4 btn-sm pointer buttoninside  buttonColor permissions"
                  onClick={() => handlePermissions()}
                >
                  Permissions
                </button>
              </div>
            ) : null}
          </div>
          <hr />
          <div className="container mt-4">
            <div className="container">
              <table className="mt-4 row">
                {animation ? (
                  userList.length > 0 ? (
                    userList.map((item) => (
                      <>
                        <tr className="d-flex mb-4">
                          <td className="userListData col-10">
                            <span className="d-flex">{item?.userName}</span>
                          </td>
                          <td
                            className="btn-sm pointer buttoninside  buttonColor col-1 "
                            onClick={(e) => editUser(e, item)}
                          >
                            Edit
                          </td>
                          &nbsp;&nbsp;&nbsp;
                          <td
                            className="btn-sm pointer buttoninside  buttonColorDelete col-1 "
                            onClick={(e) => deleteUser(e, item)}
                          >
                            Delete
                          </td>
                        </tr>
                        <hr />
                      </>
                    ))
                  ) : (
                    <h1>No Data Found</h1>
                  )
                ) : (
                  <LoaderAnimation />
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementListComponent;
