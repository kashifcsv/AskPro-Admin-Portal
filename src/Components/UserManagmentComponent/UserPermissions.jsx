import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { roleListApi, upDatePermissions } from "../../api/Services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["EstimatorManagement", "UserManagement", "EstimateManagement"];
// const roles = ["Company_Admin", "Executive"];

const UserPermissions = () => {
  const navigate = useNavigate();
  const [personName, setPersonName] = useState("");
  const [nameRole, setNameRole] = useState("");
  const [roles, setRole] = useState([]);

  const [users, setUsers] = useState([
    { name: "create" },
    { name: "view" },
    { name: "update" },
    { name: "delete" },

    { name: "active" },
    { name: "inActive" },
  ]);

  let newobject = {};
  let newU = [];

  useEffect(() => {
    settingPermisionFalse();
    roleList();
  }, []);

  const settingPermisionFalse = () => {
    for (let i = 0; i < users.length; i++) {
      let key = users[i].name;
      newobject[[users[i].name]] = false;
    }
    newU.push(newobject);
  };

  const roleList = async () => {
    try {
      const rolesList = await roleListApi();
      if (rolesList.success) {
        setRole(rolesList.roles);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChangeRoles = (event) => {
    const {
      target: { value },
    } = event;
    setNameRole(
      // On autofill we get a stringified value.
      value
    );
  };
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      value
    );
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    let moduleName;

    for (let i = 0; i < users.length; i++) {
      let key = users[i].name;
      newobject[[users[i].name]] = users[i].isChecked;
    }
    newU.push(newobject);

    let exists = false;

    for (let i = 0; i < users.length; i++) {
      if (users[i].isChecked) {
        exists = true;
        break;
      }
    }

    switch (personName) {
      case "EstimatorManagement":
        moduleName = "estimator";
        break;
      case "EstimateManagement":
        moduleName = "estimate";
        break;
      case "UserManagement":
        moduleName = "user";
        break;
      default:
        return (moduleName = "estimator");
    }

    let newObj = JSON.stringify({
      module_name: moduleName,
      portal: "company",
      role: nameRole,
      permissions: newU,
    });
    if (exists) {
      const apiResponse = await upDatePermissions(newObj);
      if (apiResponse.success) {
        setIsDisabled(false);
        setUsers([
          { name: "create" },
          { name: "view" },
          { name: "update" },
          { name: "delete" },
          { name: "active" },
          { name: "inActive" },
        ]);
        setNameRole("");
        setPersonName("");
        toast.success(apiResponse.msg);
      } else {
        setIsDisabled(false);
        toast.error(apiResponse.msg);
      }
    } else {
      toast.info("Select atleast one permission");
      setIsDisabled(false);
    }
  };

  const handleChangeSelectAll = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      for (let i = 0; i < tempUser.length; i++) {
        if (tempUser[i].isChecked !== true) {
          tempUser[i].isChecked = false;
        }
      }

      setUsers(tempUser);
    }
  };

  const addRoleFun = () => {
    navigate("/Add-Roles");
  };

  return (
    <div className="card recentEstimatesCard mb-4">
      <div className="card-title incomingBar">
        <h6>User Management</h6>
      </div>

      <div className="card-body text-center">
        <div className="col-11 formDiv">
          <div className="row">
            <div className="col-10">
              <p className="per mt-4">Permissions Access</p>
            </div>
            <div className="col-2">
              <button
                onClick={addRoleFun}
                className="d-flex justify-content-start mt-4  btn btnUser "
              >
                Add Role
              </button>
            </div>
          </div>
          <hr />
          <form onSubmit={handleAddUser}>
            <FormGroup>
              <div className="row">
                <div className="col-6 d-flex justify-content-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="allSelect"
                        checked={!users.some((user) => user?.isChecked !== true)}
                        onChange={(e) => {
                          handleChangeSelectAll(e);
                        }}
                      />
                    }
                    label="Select All"
                    className="per2"
                  />
                </div>
                <div className="col-6 d-flex  justify-content-end">
                  <FormControl sx={{ m: 1, width: 290 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Role</InputLabel>
                    <Select
                      required={true}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      value={nameRole}
                      onChange={handleChangeRoles}
                      input={<OutlinedInput label="Role" />}
                      renderValue={(nameRole) => nameRole}
                      MenuProps={MenuProps}
                    >
                      {roles.map((item) => (
                        <MenuItem key={item.name} value={item.name}>
                          {/* <Checkbox checked={nameRole.indexOf(item.name) > -1} /> */}
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <div className="col-6 d-flex  justify-content-start">
                    <FormControl sx={{ m: 1, width: 290 }}>
                      <InputLabel id="demo-multiple-checkbox-label">Module</InputLabel>
                      <Select
                        required={true}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Module" />}
                        renderValue={(personName) => personName}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            {/* <Checkbox checked={personName.indexOf(name) > -1} /> */}
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="row mt-4 per2">
                {users.map((user, index) => (
                  <div className="col-6 d-flex" key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={user.name}
                          checked={user?.isChecked || false}
                          onChange={(e) => {
                            handleChangeSelectAll(e);
                          }}
                        />
                      }
                      label={user.name}
                    />
                  </div>
                ))}
              </div>
            </FormGroup>
            <div className="row ">
              <div className="d-flex justify-content-center">
                <button disabled={isDisabled} type="submit" className=" btn btnUser mt-5">
                  Update Permissions
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPermissions;
