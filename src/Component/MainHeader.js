import React from "react";
import { Link } from "react-router-dom";
import "./MainHeader.css";

const MainHeader = () => {
  return (
    <header className="header">
      <h1>Welcome to Payment Gateway please Click below to enter details</h1>
      <Link to={"/Component/clientDetails"} className="button1">
        Client Details
      </Link>
    </header>
  );
};

export default MainHeader;
