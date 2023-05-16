import React, { useState } from "react";
import TicketInfo from "./TicketInfo";
import History from "./History";
import CenterInfo from "./CenterInfo";
import "./../../asset/style/main.css";

function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tab-menu">
      <div className="tab-buttons">
        <button
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => handleTabClick("tab1")}
        >
          수강권정보
        </button>
        <button
          className={activeTab === "tab2" ? "active" : ""}
          onClick={() => handleTabClick("tab2")}
        >
          히스토리
        </button>
        <button
          className={activeTab === "tab3" ? "active" : ""}
          onClick={() => handleTabClick("tab3")}
        >
          센터 정보
        </button>
      </div>
      <div className="tab-contents">
        {activeTab === "tab1" && <TicketInfo />}
        {activeTab === "tab2" && <History />}
        {activeTab === "tab3" && <CenterInfo />}
      </div>
    </div>
  );
}

export default Tabs;
