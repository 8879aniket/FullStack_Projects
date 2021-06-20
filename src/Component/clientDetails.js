import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./clientDetails.css";

const ClientDetails = function (props) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCPF, setUserCPF] = useState("");
  const [userAmount, setUserAmount] = useState("");

  const nameChangehandler = (event) => {
    setUserName(event.target.value);
  };
  const idChangeHandler = (event) => {
    setUserId(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };
  const cpfChangeHandler = (event) => {
    setUserCPF(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setUserAmount(event.target.value);
  };

  const goToPayment = (e) => {
    e.preventDefault();
    const userDetails = {
      name: userName,
      id: userId,
      email: userEmail,
      cpf: userCPF,
      amount: userAmount,
    };
    console.log(userDetails);
  };

  return (
    <form onSubmit={goToPayment}>
      <div className="container">
        <h1>Client Details</h1>
        <div className="first-row">
          <div className="name">
            <h3>UserName</h3>
            <div className="input-field">
              <input
                type="text"
                value={userName}
                onChange={nameChangehandler}
              ></input>
            </div>
          </div>
          <div className="userid">
            <h3>UserID</h3>
            <div className="input-field">
              <input
                type="text"
                value={userId}
                onChange={idChangeHandler}
              ></input>
            </div>
          </div>
        </div>
        <div className="first-row">
          <div className="email">
            <h3>Email</h3>
            <div className="input-field">
              <input
                type="text"
                value={userEmail}
                onChange={emailChangeHandler}
              ></input>
            </div>
          </div>
          <div className="cpf">
            <h3>CPF</h3>
            <div className="input-field">
              <input
                type="text"
                value={userCPF}
                onChange={cpfChangeHandler}
              ></input>
            </div>
          </div>
        </div>
        <div className="amount">
          <h3>Amount</h3>
          <div className="input-field">
            <input
              type="text"
              value={userAmount}
              onChange={amountChangeHandler}
            ></input>
          </div>
        </div>
        <Link
          to={`/Component/Payment/${userName},${userId},${userEmail},${userCPF},${userAmount}`}
          className="button2"
        >
          Go TO Payment
        </Link>
      </div>
    </form>
  );
};

export default ClientDetails;
