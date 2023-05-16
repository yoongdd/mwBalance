import React from "react";
import Header from "../component/common/Header";
import FixedBottom from "../component/common/bottom";
import MyInfo from "../component/myinfo/MyInfo";

function MyInfoPage() {
  return (
    <div className="container">
      <Header title="내 정보" />
      <MyInfo />
      <FixedBottom />
    </div>
  );
}

export default MyInfoPage;
