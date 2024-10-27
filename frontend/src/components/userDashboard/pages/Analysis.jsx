import React from 'react';
import NavigationPanel from "../NavigationPanel";
import '../userDash.css'
import { ToastContainer } from "react-toastify";

const Analysis = () => {
  return (
    <>
      <div className="DashboardPagesContainer">
        <NavigationPanel />

        <div id="main-content">
          <div>analysis page</div>
        </div>
      </div>
      <ToastContainer />

    </>
  )
};

export default Analysis;
