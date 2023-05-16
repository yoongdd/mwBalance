import React from "react";
import Header from "../component/common/Header";
import FixedBottom from "../component/common/bottom";
import CustomCalendar from "../component/reservation/CustomCalendar";
import TodayReservationList from "../component/reservation/TodayReservationList";

function Reservation() {
  return (
    <div className="container">
      <Header title="예약 하기" />
        <div className="wrap">
          <CustomCalendar />
        </div>
      <FixedBottom />
    </div>
  );
}

export default Reservation;
