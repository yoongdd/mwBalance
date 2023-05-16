import React, { useState } from "react";
import { Row, Col } from "antd";
import "./../../asset/style/main.css"; // CSS 스타일 파일 import
import { Link, NavLink } from "react-router-dom";

import {
  HomeOutlined,
  CalendarOutlined,
  HistoryOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const FixedBottom = () => {
  const activeStyle = {
    color: "blue",
    textDecoration: "none",
  };
  const deactiveStyle = {
    color: "gray",
    textDecoration: "none",
  };

  const [isHeaderFixed, setIsHeaderFixed] = useState(false); // 헤더 고정 여부 상태

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    // 스크롤 위치가 100 이상일 때 헤더를 고정
    setIsHeaderFixed(scrollPosition >= 100);
  };

  // 컴포넌트가 마운트될 때와 언마운트될 때 스크롤 이벤트 등록 및 해제
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <bottom className={isHeaderFixed ? "fixed" : ""}>
      <Row justify="space-around" align="middle" className="bottom-toolbar">
        <NavLink
          to="/home"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <Col>
            <HomeOutlined className="bottom-toolbar-icon" />
            <div className="bottom-toolbar-text">Home</div>
          </Col>
        </NavLink>
        <NavLink
          to="/reservation"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <Col>
            <CalendarOutlined className="bottom-toolbar-icon" />
            <div className="bottom-toolbar-text">Reservation</div>
          </Col>
        </NavLink>
        <NavLink
          to="/history"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <Col>
            <HistoryOutlined className="bottom-toolbar-icon" />
            <div className="bottom-toolbar-text">History</div>
          </Col>
        </NavLink>
        <NavLink
          to="/myinfo"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <Col>
            <SettingOutlined className="bottom-toolbar-icon" />
            <div className="bottom-toolbar-text">Settings</div>
          </Col>
        </NavLink>
      </Row>
    </bottom>
  );
};

export default FixedBottom;
