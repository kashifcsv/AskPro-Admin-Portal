import React from "react";
import "./Footer.css";

function Footer(props) {
  return (
    <div className="footercss">
      <div class="text-center p-3  footercss footer_color">
        <p className="footerFont">© 2022 . All Rights Reserved.</p>
        <p className="text-light ">Version 5.30</p>
      </div>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
