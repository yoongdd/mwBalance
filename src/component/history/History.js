import React, { useEffect, useState, useCallback } from "react";
import { WaitChip } from "../../asset/style/status";
import "./../../asset/style/main.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Parse from "parse";
import { addDays, format, differenceInDays } from "date-fns";

function History() {
  const [ticketUsageStatus, setTicketUsageStatus] = useState([]);
  const [ticketData, setTicketData] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (current) {
      const ticketParse1 = new Parse.Query("TicketUsageStatus");
      const ticketDataParse = new Parse.Query("TicketData");

      ticketParse1.matchesQuery("ticket", ticketDataParse);
      ticketParse1.include("ticket");
      ticketParse1.equalTo("userObjectId", current.id);

      const ticketParse2 = new Parse.Query("TicketUsageStatus");
      // ticketParse2.equalTo("status", "사용중");

      const ticketParse = new Parse.Query.and(ticketParse1, ticketParse2);

      ticketParse
        .find()
        .then((results) => {
          let tempList = results.map((item) => {
            const ticket = item.get("ticket")?.[0];
            const ticketName = ticket ? ticket.get("ticketName") : "";
            const period = ticket ? ticket.get("period") : "";
            const instructor = ticket ? ticket.get("instructor") : "";
            const count = ticket ? ticket.get("count") : "";
            const status = item.get("status");
            const remainingCount = item.get("remainingCount");
            const startDate = item.get("startDate");
            const remainingDays =
              ticket && startDate
                ? period - differenceInDays(new Date(), new Date(startDate))
                : 0;
            return {
              ticketName,
              period,
              instructor,
              status,
              count,
              remainingCount,
              startDate,
              remainingDays,
            };
          });
          setTicketUsageStatus(tempList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      ticketDataParse
        .find()
        .then((results) => {
          setTicketData(results);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [current]);

  useEffect(() => {
    console.log("ticketUsageStatus changed:", ticketUsageStatus);
  }, [ticketUsageStatus]);

  useEffect(() => {
    console.log("ticketData changed:", ticketData);
  }, [ticketData]);

  const getCurrentUser = useCallback(async () => {
    const currentUser = await Parse.User.current();
    setCurrent(currentUser);
    console.log(
      "currentUser: ",
      currentUser !== null ? currentUser.get("username") : null
    );
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (ticketUsageStatus.length === 0) {
    return <div></div>;
  }

  return ticketUsageStatus
    .filter((ticket) => ticket.status)
    .map((ticket) => (
      <div className="history-item">
        <div key={ticket.ticketName}>
          <WaitChip status={ticket.status} className="wait-chip">
            <p>{ticket.status}</p>
          </WaitChip>
          <p className="history-tit">{ticket.ticketName}</p>
          <p className="ticket">{ticket.count}회권</p>
          <ul className="box-min">
            <li>
              <p className="tit">기간</p>
              {/* <p className="date">{ticket.startDate}~{moment(ticket.startDate).add(ticket.period, 'days').format('YYYY/MM/DD')}</p> */}
              <p className="date">
                {ticket.startDate}~
                {format(
                  addDays(new Date(ticket.startDate), ticket.period),
                  "yyyy/MM/dd"
                )}
              </p>
            </li>
          </ul>
        </div>
      </div>
    ));
}

export default History;
