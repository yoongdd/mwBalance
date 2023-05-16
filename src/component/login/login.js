import React, { useState, useEffect } from "react";
import logo from "../../asset/image/logo.png";
import "./../../asset/style/main.css"; // CSS 스타일 파일 import
import { Link } from "react-router-dom";
import { Modal, Input, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

function Login() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("guest");
  const [password, setPassword] = useState("1004");
  const [email, setEmail] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const showModal = () => {
    setVisible(true);
  };

  // 로그인
  const handleSubmit = async (event) => {
    console.log("id, password >> ", id, password);
    event.preventDefault();
    const usernameValue = id;
    const passwordValue = password;
    //id, pw 초기화
    setId("");
    setPassword("");

    // parse - 로그인
    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      console.log(`${loggedInUser.get("username")} login!`);
      const current = await Parse.User.current();
      navigate("/home");
      return true;
    } catch (error) {
      console.log(`Error! ${error}`);
      if (error.message === "username/email is required.") {
        message.warning("아이디와 비밀번호를 입력해주세요.");
      } else {
        message.warning("아이디와 비밀번호를 다시 한번 확인해주세요.");
      }
      return false;
    }
  };

  // 비밀번호 재설정
  const handleOk = async () => {
    console.log("reset email >> ", email);
    // email 정규표현식
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]?)*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regex.test(email)) {
      setVisible(false);
      const emailValue = email;

      // parse - reset password
      try {
        await Parse.User.requestPasswordReset(emailValue);
        message.success(`비밀번호 재설정을 위해 '${email}'을 확인해주세요.`);
        setEmail("");
        return true;
      } catch (error) {
        console.error(`Error! ${error}`);
        message.error(`${error}`);
        setEmail("");
        return false;
      }
    } else {
      message.warning("email을 다시 한번 확인해주세요.");
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setEmail("");
  };

  // 현재 user
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    console.log(
      "currentUser: ",
      currentUser !== null ? currentUser.get("username") : null
    );
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div class="login-page">
      <img src={logo} alt="로고" className="logo" />
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-con">
          <div>
            <input
              type="id"
              id="id"
              value={id}
              onChange={handleIdChange}
              placeholder="아이디를 입력하세요"
              className="login-input"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="off"
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요"
              className="login-input"
            />
          </div>
          <div className="linkarea">
            <Link onClick={showModal}>
              비밀번호 찾기
            </Link>
            <span> | </span>
            <Link to="/join">회원 가입</Link>
          </div>
          <button type="submit" className="login-submit">
            LOGIN
          </button>
        </div>
      </form>
      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="확인"
        cancelText="취소"
        className="passwordmd"
        centered
        footer={[
          <Button key="back" onClick={handleCancel}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            확인
          </Button>,
        ]}
      >
        <h2>비밀번호 찾기</h2>
        <p>비밀번호를 재설정하려면 이메일 주소를 입력하세요.</p>
        <form>
          <Input
            placeholder="이메일 주소"
            value={email}
            onChange={handleEmailChange}
          />
        </form>
      </Modal>
    </div>
  );
}

export default Login;
