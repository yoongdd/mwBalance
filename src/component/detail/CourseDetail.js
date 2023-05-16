import React, { useState, useCallback, useEffect } from "react";
import { Modal, Button, message } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import profile from "../../asset/image/profile.png";
import { CaretRightOutlined } from "@ant-design/icons";
import "../../asset/style/main.css";
import { addDays, format } from "date-fns";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

function CourseDetail({ reservation }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null); // 현재 로그인한 사용자
  const [showModal, setShowModal] = useState(false);

  //취소 가능 시간
  const TimeString = reservation.startDate + " " + reservation.startTime;
  const cancelTime = addDays(new Date(TimeString), -1);
  const formatCancelTime = format(cancelTime, "yyyy/MM/dd kk:mm");
  const today = format(new Date(), "yyyy/MM/dd kk:mm");
  let cancellable = reservation.status !== "취소" && formatCancelTime > today;

  const handleBooking = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Reservation, Class table에 status 업데이트
  const handleUpdateStatus = useCallback(async () => {
    let rvParse = new Parse.Object("Reservation");
    rvParse.set("objectId", reservation.reservationId);
    rvParse.set("status", "취소");

    let classParse = new Parse.Object("Class");
    let updateRvNum = Number(reservation.rvNum) - 1;
    classParse.set("objectId", reservation.classId);
    classParse.set("rvNum", updateRvNum.toString());

    try {
      await rvParse.save();
      await classParse.save();
      message.success("예약 취소를 완료했어요.");
      navigate("/home");
      return true;
    } catch (error) {
      message.error("예약 취소를 실패했어요.");
      console.log(`Error! ${error.message}`);
      return false;
    }
  }, []);

  const handleCancleClass = useCallback(() => {
    handleUpdateStatus();
    setShowModal(false);
  }, []);

  // 현재 user
  const getCurrentUser = useCallback(async () => {
    const currentUser = await Parse.User.current();
    setCurrent(currentUser);
    console.log(
      "currentUser: ",
      currentUser !== null ? currentUser.get("username") : null
    );
  }, []);

  useEffect(() => {
    getCurrentUser();
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
            <button disabled={cancellable ? false : true}>
              <div
                className="button-inner"
                onClick={cancellable ? handleBooking : undefined}
              >
                예약 취소
              </div>
            </button>
          </div>
          <Modal
            title="예약 취소"
            centered
            open={showModal}
            onCancel={handleCloseModal}
            footer={[
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button key="cancel" onClick={handleCloseModal}>
                  취소
                </Button>
                <Button
                  key="confirm"
                  type="primary"
                  onClick={handleCancleClass}
                >
                  확인
                </Button>
              </div>,
            ]}
          >
            <p>
              지금 예약을 취소하면 횟수가 차감됩니다. 예약을 취소하시겠어요?
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
