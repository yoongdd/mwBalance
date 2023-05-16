import React from "react";
import Join from "../component/login/join";
import Header from "../component/common/Header";

function JoinPage() {
  return (
    <div className="container">
      <Header title="회원가입" />
        <div className="wrap">
          <Join />
        </div>
    </div>
  );
}

export default JoinPage;
