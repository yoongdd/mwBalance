import { eachDayOfInterval, format, isSameMonth } from "date-fns";
import React from "react";

const MonthlyCalendar = ({
  selectedDate,
  setSelectedDate,
  calStartDate,
  calEndDate,
  monthStartDate,
  isClassDate,
}) => {
  const notCurruntMonth = { color: "lightGrey", fontSize: "13px" };
  const selectedStyle = {
    fontWeight: "550",
    color: "white",
  };
  const normalDate = { fontSize: "13.3px", color: "black" };

  // eachDayOfInterval: 지정된 시간 간격 내의 날짜 배열을 반환
  // 해당하는 달의 날짜 배열을 반환
  const monthDays = eachDayOfInterval({ start: calStartDate, end: calEndDate });

  // monthly calendar day rendering 함수
  const monthDateRender = (day, index) => {
    const formattedDate = format(day, "yyyy/MM/dd");
    const formatSelectedDate = format(selectedDate, "yyyy/MM/dd");
    // isSameMonth: 두 날짜가 같은 달인지 확인, boolean으로 반환
    const isCurrentMonth = isSameMonth(day, monthStartDate);

    // 선택된 날짜
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
            <div key={index} className="test2">
              <div
                style={
                  !isCurrentMonth
                    ? notCurruntMonth
                    : formattedDate === formatSelectedDate // 이번달에 포함된 day
                    ? selectedStyle // 선택된 day
                    : normalDate // 선택되지 않은 day
                }
              >
                {format(day, "d")}
              </div>
            </div>
          </button>
          {isClassDate.includes(formattedDate) ? (
            <div
              className="calendar-day__event"
              style={isCurrentMonth ? {} : { color: "lightGrey" }}
            >
              ㆍ
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-row">
      {monthDays.map((day, i) => monthDateRender(day, i))}
    </div>
  );
};
export default MonthlyCalendar;
