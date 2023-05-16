import React, { useState, useEffect, useCallback } from "react";
import "../../asset/style/main.css";
import profile from "../../asset/image/profile.png";
import { Button, Empty, Spin } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { WaitChip } from "../../asset/style/status";
import Parse from "parse";
import { format } from "date-fns";

const ReservationList = () => {
  const [myClass, setMyClass] = useState([]);
  const [today, setToday] = useState(new Date());
  const [current, setCurrent] = useState(null);

  // 내 예약 정보 가져오기 - parse
  const getMyReservation = useCallback(async () => {
    const userObjectId = current !== null ? current.id : null;

    let classParse = new Parse.Query("Class"); // 강의 Table
    let reservationParse = new Parse.Query("Reservation"); // 강의 예약 table
    reservationParse.matchesQuery("course", classParse); //  "course"의 값이 "Class" 클래스의 쿼리와 일치하는 객체를 검색
    reservationParse.include("course"); // "course" 객체를 검색할 때 관련된 객체를 함께 검색할 수 있도록 하는 기능, Reservation 클래스의 course 필드에 연결된 Class 객체를 함께 검색할 수 있음.

    if (current) {
      reservationParse.equalTo("userObjectId", userObjectId); // 로그인된 회원의 예약 정보만 검색
      try {
        let reservation = await reservationParse.find();

        const formatToday = format(today, "yyyy/MM/dd kk:mm");

        let tempList = reservation.map((item) => {
          const start = item.get("course")[0].get("startTime");
          const startDate = item
            .get("course")[0]
            .get("startTime")
            .split(" ")[0];
          const startTime = item
            .get("course")[0]
            .get("startTime")
            .split(" ")[1];
          const endDate = item.get("course")[0].get("endTime").split(" ")[0];
          const endTime = item.get("course")[0].get("endTime").split(" ")[1];
          const status = item.get("status");

          return {
            reservationId: item.id,
            name: item.get("name"),
            status: status !== "취소" && start < formatToday ? "종료" : status,
            classTitle: item.get("course")[0].get("classTitle"),
            instructor: item.get("course")[0].get("instructor"),
            startTime: startTime,
            startDate: startDate,
            endTime: endTime,
            endDate: endDate,
            maxNum: item.get("course")[0].get("maxNum"),
            rvNum: item.get("course")[0].get("rvNum"),
            classId: item.get("course")[0].id,
            classIntro: item.get("course")[0].get("classIntro"),
          };
        });

        // merged array sort
        let mergedArr = tempList.sort((a, b) => {
          if (a.startDate + a.startTime > b.startDate + b.startTime) return -1;
          if (a.startDate + a.startTime < b.startDate + b.startTime) return 1;
          return 0;
        });

        setMyClass(mergedArr);
        console.log("내 예약 가져오기 성공!");
      } catch (error) {
        console.error(`Error! ${error}`);
      }
    }
  }, [current]);

  // 현재 user
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrent(currentUser);
    console.log(
      "currentUser: ",
      currentUser !== null ? currentUser.get("username") : null
    );
  };

  useEffect(() => {
    getMyReservation();
    getCurrentUser();
  }, [current]);

  return (
    <div>
      <div className="my-rv">
        <div className="my-rv-top">
          <div className="page-title">
            <span>내 예약</span>
          </div>

          <Button type="button">
            <Link to="/reservation">
              <span class="button-inner">
                더보기
                <CaretRightOutlined />
              </span>
            </Link>
          </Button>
        </div>

        <div className="rv-list">
          {/* reservationData 반복 */}
          {myClass.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            myClass.map((reservation) => (
              <Link
                to={"/Detailed"}
                state={reservation}
                key={reservation.reservationId}
              >
                <div key={reservation.reservationId} className="rv-item">
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
                        <p className="manager">
                          {reservation.instructor} 강사님
                        </p>
                        <div className="profile">
                          <img src={profile} alt="프로필" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
