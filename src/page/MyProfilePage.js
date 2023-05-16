import React from "react";
import Header from "../component/common/Header";
import FixedBottom from "../component/common/bottom";
import MyProfile from "../component/myinfo/Profile";

function MyProfilePage() {
  return (
    <div className="container">
      <Header title="프로필 편집" />
      <MyProfile />
      <FixedBottom />
    </div>
  );
}

export default MyProfilePage;
