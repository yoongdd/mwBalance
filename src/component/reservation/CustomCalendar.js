import { Button, Segmented, message } from "antd";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React, { useEffect, useCallback, useState } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import MonthlyCalendar from "./MonthlyCalendar";
import "../../asset/style/calendar.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import TodayReservationList from "./TodayReservationList";
import Parse from "parse";

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [classList, setClassList] = useState([]);
  const [classByDate, setClassByDate] = useState([]);

  const [value, setValue] = useState("주"); // 주: Weekly, 월: Monthly
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // date-fns 함수
  const weekStartDate = startOfWeek(selectedDate); // 그 주의 시작 date (일요일)
  const weekEndDate = endOfWeek(selectedDate); // 그 주의 마지막 date
  const calStartDate = startOfWeek(startOfMonth(selectedDate)); // 이번 달의 시작일이 포함된 주의 시작 date
  const calEndDate = endOfWeek(endOfMonth(selectedDate)); // 이번 달의 시작일이 포함된 주의 마지막 date
  const monthStartDate = startOfMonth(selectedDate); // 이번 달의 시작 날짜 (1일)
  const monthEndDate = endOfMonth(selectedDate); // 이번 달의 마지막 날짜

  // class가 존재하는 날짜 List (중복제거)
  // 예약 불가능한 수업 제거
  let isClassDate = [
    ...new Set(
      classList
        .filter((item) => Number(item.maxNum) > Number(item.rvNum))
        .map((v) => v.startDate)
    ),
  ];

  // today 설정
  const setToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  // calendar prev button
  const handlePrevDate = useCallback(() => {
    setSelectedDate(
      value === "주" ? addDays(selectedDate, -7) : addMonths(selectedDate, -1)
    );
  }, [selectedDate, value]);

  // calendar next button
  const handleNextDate = useCallback(() => {
    setSelectedDate(
      value === "주" ? addDays(selectedDate, 7) : addMonths(selectedDate, 1)
    );
  }, [selectedDate, value]);

  // get class list - parse
  const getClass = useCallback(async () => {
    const parseQuery = new Parse.Query("Class");
    parseQuery.descending("startTime");
    try {
      let Class = await parseQuery.find(); // return parse object type

      let tempList = Class.map((item) => {
        return {
          classId: item.id,
          instructor: item.get("instructor"),
          classTitle: item.get("classTitle"),
          startDate: item.get("startTime").split(" ")[0],
          startTime: item.get("startTime").split(" ")[1],
          startDate: item.get("endTime").split(" ")[0],
          endTime: item.get("endTime").split(" ")[1],
          maxNum: item.get("maxNum"),
          rvNum: item.get("rvNum"),
          classIntro: item.get("classIntro"),
        };
      });
      setClassList(tempList);
      return true;
    } catch (error) {
      console.log(`Error! ${error.message}`);
      message.error("수업 리스트를 가져오는데 실패했어요.");
      return false;
    }
  }, []);

  // 선택된 날짜의 예약 가능한/종료된 클래스 리스트 조회
  const getClassByDate = useCallback(
    async (value) => {
      const formatSelectedDate = format(value, "yyyy/MM/dd");
      const formatToday = format(new Date(), "yyyy/MM/dd kk:mm");

      let tempList = classList
        .filter((item) => Number(item.maxNum) > Number(item.rvNum)) // 예약 가능한 수업만 filter
        .filter((item) => item.startDate === formatSelectedDate); // 선택된 날짜로 class filter

      // 예약 status 추가
      let classByDateList = tempList.map((item) => {
        return {
          ...item,
          status:
            item.startDate + " " + item.startTime < formatToday
              ? "종료"
              : "예약 가능",
        };
      });
      setClassByDate(classByDateList);
    },
    [selectedDate, setSelectedDate, classList]
  );

  useEffect(() => {
    getClass();
  }, []);

  useEffect(() => {
    getClassByDate(selectedDate);
  }, [selectedDate, setSelectedDate, classList]);

  return (
    <div>
      <div className="calendar">
        <div className="calendar__header">
          <Button
            type="button"
            icon={<LeftOutlined />}
            onClick={handlePrevDate}
          />
          <div className="calendar__title">
            {format(selectedDate, "yyyy")}년 {format(selectedDate, "M")}월
          </div>
          <Button
            type="button"
            icon={<RightOutlined />}
            onClick={handleNextDate}
          />
          <div>
            <Button
              className="calendar__change-button"
              size="small"
              onClick={() => {
                setToToday();
              }}
            >
              오늘
            </Button>
            <Segmented
              className="calendar__change-button"
              size="small"
              options={["주", "월"]}
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="calendar-row">
          {dayOfWeek.map((dayName) => (
            <div
              className="calendar-row__dayName"
              key={dayName}
              style={
                dayName === "일"
                  ? { color: "red" }
                  : dayName === "토"
                  ? { color: "#586bff" }
                  : {}
              }
            >
              {dayName}
            </div>
          ))}
        </div>

        {value === "주" ? (
          <WeeklyCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            weekStartDate={weekStartDate}
            isClassDate={isClassDate}
          ></WeeklyCalendar>
        ) : (
          <MonthlyCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            calStartDate={calStartDate}
            calEndDate={calEndDate}
            monthStartDate={monthStartDate}
            isClassDate={isClassDate}
          ></MonthlyCalendar>
        )}
      </div>
      <TodayReservationList classByDate={classByDate}></TodayReservationList>
    </div>
  );
};

export default CustomCalendar;
