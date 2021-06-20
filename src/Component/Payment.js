import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../Component/Payment.css";

const Payment = function (props) {
  const params = useParams();
  console.log(params.userName);

  const [clientOwner, setClientOwner] = useState("");
  const [clientCVV, setClientCVV] = useState("");
  const [clientCardNumber, setClientCardNumber] = useState("");
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [reasonMessage, setReasonMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [issuedBy, setIssuedBy] = useState("");

  const [isValid, setIsValid] = useState(false);

  const ownerChangeHandler = (e) => {
    setClientOwner(e.target.value);
  };
  const cvvChangeHandler = (e) => {
    setClientCVV(e.target.value);
  };
  const cardNumberChangeHandler = (e) => {
    setClientCardNumber(e.target.value);
  };

  const paymentCall = () => {
    if (clientOwner === "" || clientCVV === "" || clientCardNumber === "") {
      setIsValid(true);
      setPaymentFailed(false);
      setPaymentSuccessful(false);
      return;
    }
    fetch("http://localhost:4000/payment", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userName: clientOwner,
        userId: params.userId,
        userEmail: params.userEmail,
        userCPF: params.userCPF,
        userAmount: params.userAmount,
        userCVV: clientCVV,
        userCardNumber: clientCardNumber,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status) {
          setPaymentSuccessful(true);
          setPaymentFailed(false);
          setIsValid(false);
          setResponseMessage(res.message);
          setPaymentMethod(res.modeOfPayment);
          setIssuedBy(res.issuedBy);
        } else {
          setPaymentFailed(true);
          setPaymentSuccessful(false);
          setIsValid(false);
          setResponseMessage(res.message);
          setReasonMessage(res.reason);
          setPaymentMethod(res.modeOfPayment);
          setIssuedBy(res.issuedBy);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setClientOwner("");
    setClientCVV("");
    setClientCardNumber("");
  };

  return (
    <div>
      <div className="container">
        <h1>Payment</h1>
        <div className="first-row">
          <div className="owner">
            <h3>Owner</h3>
            <div className="input-field">
              <input
                type="text"
                value={clientOwner}
                onChange={ownerChangeHandler}
              ></input>
            </div>
          </div>
          <div className="cvv">
            <h3>CVV</h3>
            <div className="input-field">
              <input
                type="password"
                value={clientCVV}
                onChange={cvvChangeHandler}
              ></input>
            </div>
          </div>
        </div>
        <div className="second-row">
          <div className="card-number">
            <h3>Card Number</h3>
            <div className="input-field">
              <input
                type="text"
                value={clientCardNumber}
                onChange={cardNumberChangeHandler}
              ></input>
            </div>
          </div>
        </div>
        <div className="third-row">
          <h3>Expiry Date</h3>
          <div className="selection">
            <div className="date">
              <select name="months" id="months">
                <option value="">Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select name="years" id="years">
                <option value="">Year</option>
                <option value="20">2020</option>
                <option value="21">2021</option>
                <option value="22">2022</option>
                <option value="23">2023</option>
                <option value="24">2024</option>
              </select>
            </div>
          </div>
        </div>
        <button className="button" onClick={paymentCall}>
          Confirm Payment
        </button>
      </div>
      {paymentSuccessful && (
        <div>
          <h3 className="successMessage">Payment Successful</h3>
          <h3 className="successMessage">{`payment done by ${paymentMethod}, Issued by ${issuedBy}`}</h3>
          <h3 className="successMessage">{responseMessage}</h3>
        </div>
      )}
      {paymentFailed && (
        <div>
          <h3 className="failedMessage">Payment Faield</h3>
          <h3 className="failedMessage">{`payment done by ${paymentMethod}, Issued by ${issuedBy}`}</h3>
          <h3 className="failedMessage">{reasonMessage}</h3>
          <h3 className="failedMessage">{responseMessage}</h3>
        </div>
      )}
      {isValid && (
        <h3 className="failedMessage">Please Enter Details Correctly</h3>
      )}
    </div>
  );
};

export default Payment;
