import React, { useState, useEffect } from "react";
import "./../../asset/style/main.css";
import profile from "../../asset/image/profile.png";
import customProfile from "../../asset/image/customProfile.png";
import { Modal, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Parse from "parse";

function MyInfo() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const showModal = () => {
    setVisible(true);
  };

  // 로그아웃
  const handleOk = async () => {
    setVisible(false);

    // parse - 로그아웃
    try {
      await Parse.User.logOut();
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        message.success("로그아웃이 완료되었습니다.");
      }
      window.location.reload(); // Refresh the page
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // 회원탈퇴
  const handleWithdrawal = async () => {
    setVisible(false);

    try {
      const currentUser = await Parse.User.current();
      if (currentUser) {
        await currentUser.destroy();
        message.success("회원탈퇴가 완료되었습니다.");
        navigate("/"); // Redirect to the login page
      }
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  // 현재 user
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    if (currentUser) {
      const name = currentUser.get("nickname");
      const email = currentUser.get("email");
      console.log("nickname: ", name);
      setName(name);
      setEmail(email);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="myinfo-wrap">
      <div className="myinfo">
        {isLoggedIn ? (
          <Link to={"/myprofile"}>
            <div className="profile">
              <div className="left">
                <img src={profile} alt="프로필" />
                <div className="pf-info">
                  <p className="name">{name}님</p>
                  <p className="info">{email}</p>
                </div>
              </div>
              <div className="right">
                <icon />
              </div>
            </div>
          </Link>
        ) : (
          <div className="profile">
            <div className="left">
              <img src={customProfile} alt="프로필" />
              <div className="pf-info">
                <p>로그인해주세요</p>
              </div>
            </div>
            <div className="right">
              <icon />
            </div>
          </div>
        )}
        <div className="item-list">
          {isLoggedIn ? (
            <div className="item" onClick={showModal}>
              로그아웃
              <icon />
            </div>
          ) : (
            <div className="item">
              <Link to={"/"}>로그인</Link>
              <icon />
            </div>
          )}
          <div className="item">
            <p>회원탈퇴</p>
            <icon />
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="확인"
        cancelText="취소"
        className="logoutmd"
        centered
      >
        <p>정말 로그아웃 하시겠습니까?</p>
      </Modal>
      <footer>
        <div className="footer-wrap">
          <p className="footer-title">MW.Balance</p>
          <ul>
            <li>대표 : 이경찬</li>
            <li>
              주소 : 경기도 성남시 분당구 정자로 2, 1동 1302호 (푸르지오 시티)
            </li>
            <li>이메일 : millionwaredevcenter@gmail.com</li>
            <li>사업자등록번호 : 664-87-00668</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default MyInfo;
