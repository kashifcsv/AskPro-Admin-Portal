import React from 'react'
import { roleNormalAction } from '../../Redux/Actions/Action'
import { isLoggedAction } from '../../Redux/Actions/Action'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";


const DashBoardClient = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const myFunction = () => {
    dispatch(isLoggedAction());
    dispatch(roleNormalAction());
    navigate("/", { replace: true });
  }
  return (
    <>
      <h1>DashBoard for normal users works</h1>
      <button
        onClick={myFunction}
        class="btn btn-secondary  btn-lg"
      >
        Log Out
      </button></>

  )
}

export default DashBoardClient