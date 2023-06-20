import React from "react";
import { useEffect, useState } from "react";
import manageEstimatorListPlusIcon from "../../Assets/Images/manageEstimatorListPlusIcon.png";
import LoaderAnimation from "../Loader/LoaderAnimation";
import "./userManagement.css";
import { toast } from "react-toastify";
import { addRole, roleListApi, updateRole, deleteRole } from "../../api/Services";
import TextField from "@mui/material/TextField";
import { Modal, Button } from "react-bootstrap";
import { useAuthUser } from "react-auth-kit";

const AddRole = () => {
  const authUser = useAuthUser();

  const [animation, setAnimation] = useState(false);
  const [addModalSubmit, setAddModalSubmit] = useState(false);
  const [editModalSubmit, setEditModalSubmit] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editRoleName, setEditRoleName] = useState("");
  const [editRoleId, setEditRoleId] = useState("");
  const [roleNamePlaceHolder, setRoleNamePlaceHolder] = useState("");

  useEffect(() => {
    roleListFunction();
  }, []);

  const roleListFunction = async () => {
    try {
      const rolesList = await roleListApi();
      if (rolesList.success) {
        setRoleList(rolesList.roles);
        setAnimation(true);
      } else {
        setAnimation(true);
      }
    } catch (error) {
      setAnimation(true);
      toast.error(error.message);
    }
  };

  const addRoles = () => {
    setRoleName("");
    setAddModal(true);
  };

  const closeModal = () => {
    setAddModal(false);
  };

  const closeEditModal = () => {
    setRoleNamePlaceHolder("");
    setEditRoleName("");
    setEditRoleId("");
    setEditModal(false);
  };

  const editRoles = (e, data) => {
    e.preventDefault();

    if (data.name !== "Company_Admin") {
      setEditRoleId(data._id);
      setRoleNamePlaceHolder(data.name);
      setEditModal(true);
    } else {
      toast.error("Not allowed to edit Company_Admin");
    }
  };

  const deleteRoles = async (e, data) => {
    e.preventDefault();
    if (data.name !== "Company_Admin") {
      try {
        const roleResponse = await deleteRole(data.name);
        if (roleResponse.success) {
          roleListFunction();
          toast.success(roleResponse.msg);
        } else {
          toast.error(roleResponse.msg);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Not allowed to delete Company_Admin");
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setEditModalSubmit(true);
    const payload = JSON.stringify({
      _id: editRoleId,
      name: editRoleName,
      portal: "company",
    });
    try {
      const roleResponse = await updateRole(payload);
      closeEditModal();
      if (roleResponse.success) {
        roleListFunction();
        setEditModalSubmit(false);
        toast.success("Role name updated successfully");
      } else {
        setEditModalSubmit(false);
        toast.error(roleResponse.msg);
      }
    } catch (error) {
      setEditModalSubmit(false);
      toast.error(error.message);
      closeEditModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddModalSubmit(true);
    const payload = JSON.stringify({
      name: roleName,
      portal: "company",
    });
    try {
      const roleResponse = await addRole(payload);
      closeModal();
      if (roleResponse.success) {
        roleListFunction();
        setAddModalSubmit(false);
        toast.success("Role added successfully");
      } else {
        setAddModalSubmit(false);
        toast.error(roleResponse.msg);
      }
    } catch (error) {
      setAddModalSubmit(false);
      toast.error(error.message);
      closeModal();
    }
  };

  return (
    <div className="col-12">
      <div className="card ManageEstimatorListCard">
        <div className="card-title incomingBar">
          <h6>Roles Management</h6>

          <span onClick={addRoles} className="pointer">
            <img src={manageEstimatorListPlusIcon} className="manageEstimatorIcon" alt="" />
          </span>
        </div>

        <div className="card-body mt-4 mb-4">
          <div className="row">
            <div className="col-2">
              <span style={{ fontSize: "20px" }} className="per d-flex justify-content-center mb-4">
                {" "}
                Roles List
              </span>
            </div>
          </div>
          <hr />
          <div className="container mt-4">
            <div className="container">
              <table className="mt-4 row">
                {animation ? (
                  roleList.length > 0 ? (
                    roleList.map((item) => (
                      <>
                        <tr className="d-flex mb-4">
                          <td className="userListData col-10">
                            <span className="d-flex">{item?.name}</span>
                          </td>
                          <td
                            className="btn-sm pointer buttoninside  buttonColor col-1 "
                            onClick={(e) => editRoles(e, item)}
                          >
                            Edit
                          </td>
                          {/* &nbsp;&nbsp;&nbsp;
                          <td
                            className="btn-sm pointer buttoninside  buttonColorDelete col-1 "
                            onClick={(e) => deleteRoles(e, item)}
                          >
                            Delete
                          </td> */}
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
      <Modal
        show={addModal}
        onHide={closeModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Role </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <TextField
              color="secondary"
              className="mt-4"
              fullWidth
              label="Role Name"
              id="name"
              variant="outlined"
              required
              type="text"
              placeholder="Enter Role Name"
              onChange={(e) => setRoleName(e.target.value)}
              defaultValue={roleName}
            />
            <div className="d-flex justify-content-center">
              <input
                disabled={addModalSubmit}
                type="submit"
                value="Submit"
                id="submit"
                className="btn buttonColor mt-4 "
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={editModal}
        onHide={closeEditModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitEdit}>
            <TextField
              color="secondary"
              className="mt-4"
              fullWidth
              label="Role Name"
              id="name"
              variant="outlined"
              required
              type="text"
              placeholder={roleNamePlaceHolder}
              onChange={(e) => setEditRoleName(e.target.value)}
              defaultValue={editRoleName}
            />
            <div className="d-flex justify-content-center">
              <input
                disabled={editModalSubmit}
                type="submit"
                value="Submit"
                id="submit"
                className="btn buttonColor mt-4 "
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddRole;
