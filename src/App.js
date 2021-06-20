import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Payment from "./Component/Payment";
import ClientDetails from "./Component/clientDetails";
import MainHeader from "./Component/MainHeader";

function App() {
  return (
    <div>
      <MainHeader></MainHeader>
      <main>
        <Route path="/Component/clientDetails">
          <ClientDetails></ClientDetails>
        </Route>
        <br></br>
        <Route path="/Component/Payment/:userName,:userId,:userEmail,:userCPF,:userAmount">
          <Payment></Payment>
        </Route>
      </main>
    </div>
  );
}

export default App;
