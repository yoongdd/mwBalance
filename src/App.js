import React from "react";
import Home from "./page/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./page/Reservation";
import Reservation from "./page/Reservation";
import HistoryPage from "./page/HistoryPage";
import MyInfoPage from "./page/MyInfoPage";
import Parse from "parse";
import Detailed from "./page/Detailed";
import ReservationDone from "./page/ReservationDone";
import LoginPage from "./page/LoginPage";

import { Reset } from "styled-reset";
import JoinPage from "./page/JoinPage";
import MyProfilePage from "./page/MyProfilePage";

function App() {
  // Parse initialization configuration
  const PARSE_APPLICATION_ID = "ht2lEg05pd67wVm5f5IedcR1rJQzkB4HoWlYMUtS";
  const PARSE_HOST_URL = "https://parseapi.back4app.com/";
  const PARSE_JAVASCRIPT_KEY = "ODAeYFhtXTZc4i72cjuw8SmKH6p3KlH3P1wP4x8R";
  const PARSE_MASTER_KEY = "c5Obm8aWMUTvkP3luextPbDi4pKm7qr8KitjQafF";
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY, {
    masterKey: PARSE_MASTER_KEY,
  });
  Parse.serverURL = PARSE_HOST_URL;

  return (
    <div className="App">
      <Reset />
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/join" element={<JoinPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/reservation" element={<Reservation />} />
        <Route exact path="/history" element={<HistoryPage />} />
        <Route exact path="/myinfo" element={<MyInfoPage />} />
        <Route exact path="/Detailed" element={<Detailed />} />
        <Route exact path="/ReservationDone" element={<ReservationDone />} />
        <Route exact path="/myprofile" element={<MyProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
