import React from "react";
import FixedBottom from "../component/common/bottom";
import CourseReservation from "../component/detail/CourseReservation";
import CourseList from "../component/detail/CourseList";
import { useLocation } from "react-router-dom";
import profile from "../asset/image/profile.png";
import Header from "../component/common/Header";

function ReservationDone() {
  const location = useLocation();

  const reservation = location.state;

  return (
    <div className="container">
      <Header title="예약하기 상세" />
      <div className="wrap">
        <CourseList reservation={reservation} />
        <CourseReservation reservation={reservation} />
      </div>
      <FixedBottom />
    </div>
  );
}

export default ReservationDone;
