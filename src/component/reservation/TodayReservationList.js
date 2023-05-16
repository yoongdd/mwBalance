import React from "react";
import profile from "../../asset/image/profile.png";
import { WaitChip } from "../../asset/style/status";
import { Link } from "react-router-dom";
import { Avatar, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";

const TodayReservationList = ({ classByDate }) => {
  return classByDate && classByDate.length !== 0 ? (
    <div>
      <div className="my-rv">
        <div className="rv-list">
          {/* reservationData 반복 */}
          {classByDate.map((reservation, index) => (
            <Link
              to={"/ReservationDone"}
              state={reservation}
              key={reservation.classId}
            >
              <div key={reservation.classId} className="rv-item">
                <div className="item-top">
                  <p className="time">
                    {reservation.startDate} {reservation.startTime} ~{" "}
                    {reservation.endTime}
                  </p>
                  <WaitChip status={reservation.status} className="wait-chip">
                    <p>{reservation.status}</p>
                  </WaitChip>
                </div>
                <div className="gray-card">
                  <div className="class-name">{reservation.classTitle}</div>
                  <div className="bottom">
                    <p className="rv-info">
                      예약인원({reservation.rvNum}) | 최대인원(
                      {reservation.maxNum})
                    </p>
                    <div className="right">
                      <p className="manager">{reservation.instructor} 강사님</p>
                      <div className="profile">
                        <img src={profile} alt="프로필" />
                        {/* <Avatar size={18} icon={<UserOutlined />} /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

export default TodayReservationList;
