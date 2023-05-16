import React, { useState, useCallback, useEffect } from "react";
import Parse from "parse";
import profile from "../../asset/image/profile.png";
import { CaretRightOutlined } from "@ant-design/icons";
import { addDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function CourseReservation({ reservation }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null); // 현재 로그인한 사용자
  const [disable, setDisbale] = useState(true);

  // 취소 가능 시간
  const TimeString = reservation.startDate + " " + reservation.startTime;
  const cancelTime = addDays(new Date(TimeString), -1);
  const formatCancelTime = format(cancelTime, "yyyy/MM/dd kk:mm");
  const today = format(new Date(), "yyyy/MM/dd kk:mm");

  // Reservation table에 예약 정보 추가
  const handleUpdateRv = useCallback(
    async (course) => {
      if (current) {
        const username = current.get("username");
        const userObjectId = current.id;

        let rvParse = new Parse.Object("Reservation");
        rvParse.set("objectId", reservation.reservationId);
        rvParse.set("status", "예약 확정");
        rvParse.set("name", username);
        rvParse.set("userObjectId", userObjectId);
        rvParse.set("course", course);

        try {
          await rvParse.save();
          message.success("예약을 완료했어요.");
          console.log("예약완료");
          navigate("/home");
          return true;
        } catch (error) {
          message.error("예약에 실패했어요.");
          console.log(`Error! ${error.message}`);
          return false;
        }
      }
    },
    [current, navigate, reservation]
  );

  // Class table에 예약인원(rvNum) +1 정보 업데이트
  const handleUpdateStatus = useCallback(async () => {
    let classParse = new Parse.Object("Class");
    let updateRvNum = Number(reservation.rvNum) + 1;
    classParse.set("objectId", reservation.classId);
    classParse.set("rvNum", updateRvNum.toString());

    let classParseQuery = new Parse.Query("Class");
    classParseQuery.equalTo("objectId", reservation.classId);
    try {
      await classParse.save();
      handleUpdateRv(await classParseQuery.find());
      return true;
    } catch (error) {
      console.log(`Error! ${error.message}`);
      return false;
    }
  }, [handleUpdateRv, reservation.classId, reservation.rvNum]);

  // 현재 user
  const getCurrentUser = useCallback(async () => {
    const currentUser = await Parse.User.current();
    setCurrent(currentUser);
    console.log(
      "currentUser: ",
      currentUser !== null ? currentUser.get("username") : null
    );
  }, []);

  // button disable
  const noReservation = useCallback(async () => {
    if (current) {
      // 내가 이미 완료한 예약은 disable 처리 => 수정 필요
      let classParseQuery = new Parse.Query("Class");
      let rvParse1 = new Parse.Query("Reservation");
      rvParse1.matchesQuery("course", classParseQuery);
      rvParse1.include("course");

      let rvParse2 = new Parse.Query("Reservation");
      rvParse2.equalTo("userObjectId", current.id);

      const rvParse = Parse.Query.and(rvParse1, rvParse2);
      try {
        // 내예약 리스트
        let myReservation = await rvParse.find();
        let tempList = myReservation.map((item) => {
          return {
            reservationId: item.get("course")[0].id,
            status: item.get("status"),
          };
        });

        let isDisabled = tempList
          .filter((item) => item.status === "예약 확정")
          .every((item) => {
            return item.reservationId !== reservation.classId;
            // "예약 확정"인 예약 item이 해당 조건에(내 예약과 일치하는 예약이 없음) 모두 true여야 true를 반환
          });

        if (!isDisabled && TimeString > today) {
          message.warning("이미 예약 완료된 강의입니다.");
        }

        setDisbale(isDisabled);
      } catch (error) {
        console.error(`Error! ${error}`);
      }
    }

    if (TimeString < today) {
      setDisbale(false);
    }
  }, [current]);

  useEffect(() => {
    getCurrentUser();
    noReservation();
  }, [current]);

  return (
    <div>
      <div className="detail-class-top">
        <div className="left">
          <div className="profile">
            <img src={profile} alt="프로필" />
          </div>
          <p className="manager">{reservation.instructor} 강사님</p>
          <CaretRightOutlined />
        </div>
      </div>
      <div className="btm">
        <p className="class-btm-tit">수업소개</p>
        <p className="cont"> {reservation.classIntro} </p>
        <div className="cancle-box">
          <div className="cancle-tit"> 예약 ・ 취소 가능 시간 </div>
          <div className="cancle-con">
            <div className="con-li">
              <p className="tit">예약 가능시간</p>
              <p className="time">
                <span>{TimeString}</span> 까지
              </p>
            </div>
            <div className="con-li">
              <p className="tit">취소 가능시간</p>
              <p className="time">
                <span>{formatCancelTime}</span> 까지
              </p>
            </div>
          </div>
          <div className="cancle-button">
            <button disabled={!disable}>
              <div
                className="button-inner"
                onClick={disable ? handleUpdateStatus : undefined}
              >
                예약 하기
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseReservation;
