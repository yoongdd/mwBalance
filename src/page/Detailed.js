import React, { useState } from "react";
import Header from "../component/common/Header";
import CourseDetail from "../component/detail/CourseDetail";
import CourseList from "../component/detail/CourseList";
import { useLocation } from "react-router-dom";
import FixedBottom from "../component/common/bottom";

function Detailed() {
  const location = useLocation();
  console.log("location", location);
  const reservation = location.state;
  return (
    <div className="container">
      <Header title="예약하기" />
      <div className="wrap">
        <CourseList reservation={reservation} />
        <CourseDetail reservation={reservation} />
      </div>
      <FixedBottom />
    </div>
  );
}

export default Detailed;
