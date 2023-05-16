import React from "react";
import "../../asset/style/main.css";
import { WaitChip } from "../../asset/style/status";

const CourseList = ({ reservation }) => {
  const rvTimeString = reservation.startDate + " " + reservation.startTime;

  const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
  let reservationDay = WEEKDAY[new Date(rvTimeString).getDay()];

  return (
    <div>
      <div className="detail-my-rv">
        <div className="detail-rv-list">
          <div className="detail-rv-item">
            <div className="item-top">
              <p className="time">
                {reservation.startDate}
                {" ("}
                {reservationDay}
                {") "}
                <span>
                  {reservation.startTime} ~ {reservation.endTime}
                </span>
              </p>
              <WaitChip status={reservation.status} className="wait-chip">
                <p>{reservation.status}</p>
              </WaitChip>
            </div>
            <div className="detail-gray-card">
              <div className="class-name">{reservation.classTitle}</div>
              <div className="bottom">
                <p className="rv-info">
                  예약인원({reservation.rvNum}) | 최대인원({reservation.maxNum})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
