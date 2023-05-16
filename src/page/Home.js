import React from "react";
import Header from "../component/common/Header";
import MainScreen from "../component/home/MainScreen";
import FixedBottom from "../component/common/bottom";
import ReservationList from "../component/home/ReservationList";
import logo from "../asset/image/logo.png";

function Home() {
  return (
    <div className="container">
      <Header title="홈" image={logo} />
        <div className="wrap">
          <MainScreen />
          <ReservationList />
        </div>
      <FixedBottom />
    </div>
  );
}

export default Home;
