import { addDays, format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";

const WeeklyCalendar = ({
  selectedDate,
  setSelectedDate,
  weekStartDate,
  isClassDate,
}) => {
  const selectedStyle = { fontWeight: "550", color: "white" };
  const normalDate = { fontSize: "13.3px", color: "black" };

  let date = weekStartDate;

  // 해당하는 날짜(weekStartDate)의 주단위 가져오기 = 이번주
  const week = [...Array(7)].map((v, index) => addDays(date, index));
  // 다음주 시작 날짜
  date = addDays(week[6], 1);

  // weekly calendar day rendering 함수
  const weekDateRender = (day, index) => {
    const formattedDate = format(day, "yyyy/MM/dd");
    const formatSelectedDate = format(selectedDate, "yyyy/MM/dd");
    const isSelectedDate = formattedDate === formatSelectedDate;

    return (
      <div className="calendar-day" key={formattedDate}>
        <div className={isSelectedDate ? "selected-circle" : ""}>
          <button
            className="calendar-day__info"
            onClick={() => {
              setSelectedDate(day);
            }}
          >
            <div key={index}>
              <div style={isSelectedDate ? selectedStyle : normalDate}>
                {format(day, "d")}
              </div>
            </div>
          </button>
          {isClassDate.includes(formattedDate) ? (
            <div className="calendar-day__event">ㆍ</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-row">
      {week.map((day, i) => weekDateRender(day, i))}
    </div>
  );
};
export default WeeklyCalendar;
