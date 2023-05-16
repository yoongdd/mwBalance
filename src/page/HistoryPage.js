import React from "react";
import FixedBottom from "../component/common/bottom";
import Tabs from "../component/history/Tabs";
import Header from "../component/common/Header";

function HistoryPage() {
  return (
    <div className="container">
      <Header title="이용 내역" />
      <div className="wrap">
        <Tabs />
      </div>
      <FixedBottom />
    </div>
  );
}

export default HistoryPage;
