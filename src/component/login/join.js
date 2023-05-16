import React, { useState } from "react";
import { message } from "antd";
import "./../../asset/style/main.css";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import logo from "../../asset/image/logo.png";

function Join() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 회원가입
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!id || !password || !email || !name) {
      message.error(`회원 정보를 정확히 입력해주세요.`);
    } else {
      //parse - 회원가입
      let user = new Parse.User();
      user.set("username", id);
      user.set("password", password);
      user.set("nickname", name);
      user.set("email", email);
      user.set("phoneNumber", phoneNumber);

      try {
        const result = await user.signUp();
        message.success(
          `${name}님, 회원가입이 완료되었어요. 로그인을 해주세요!`
        );
        navigate("/");
        return true;
      } catch (error) {
        console.error(`Error! ${error}`);
        if (error.message === "Cannot sign up user with an empty username.") {
          message.error(`아이디를 입력해주세요.`);
        } else if (
          error.message === "Cannot sign up user with an empty password."
        ) {
          message.error(`비밀번호를 입력해주세요.`);
        } else if (
          error.message === "Account already exists for this username."
        ) {
          message.error(`동일한 아이디가 존재합니다.`);
        } else if (
          error.message === "Account already exists for this email address."
        ) {
          message.error(`동일한 이메일이 존재합니다.`);
        } else {
          message.error(`입력하신 회원 정보를 다시 한번 확인해주세요.`);
        }
        return false;
      }
    }
  };

  return (
    <div className="join-page">
      <form onSubmit={handleSubmit} className="join-form">
        <img src={logo} alt="로고" className="logo" />

        <div className="form-group">
          <label htmlFor="id" className="join-labal">
            아이디
          </label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(event) => setId(event.target.value)}
            className="join-input"
            placeholder="아이디 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="join-labal">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="join-input"
            placeholder="비밀번호 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="join-labal">
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="join-input"
            placeholder="이름 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="join-labal">
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="join-input"
            placeholder="이메일 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber" className="join-labal">
            휴대폰 번호
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="join-input"
            placeholder="휴대폰 번호 입력"
          />
        </div>
        <button type="submit" className="join-button">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Join;
