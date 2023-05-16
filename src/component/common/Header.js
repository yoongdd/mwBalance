import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import "./../../asset/style/main.css"; // CSS 스타일 파일 import
import logo from "../../asset/image/logo.png";

const Header = (props) => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false); // 헤더 고정 여부 상태
  const navigate = useNavigate(); // useNavigate hook을 사용하여 navigate 함수를 가져옴

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

  // 헤더 아이콘 클릭 이벤트 핸들러
  const handleHeaderIconClick = () => {
    navigate(-1); // 브라우저 뒤로 가기 기능
  };

  return (
    <header className={isHeaderFixed ? "fixed" : ""}>
      <div className="toolbar-container">
        {props.image ? (
          <img src={props.image} alt={props.title} />
        ) : (
          <div className="header-title">
            <ArrowLeftOutlined
              className="header-icon"
              onClick={handleHeaderIconClick} // 헤더 아이콘 클릭 이벤트 등록
            />
            {props.title}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
