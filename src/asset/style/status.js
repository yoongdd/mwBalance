import styled from "styled-components";

export const WaitChip = styled.div`
  ${({ status }) => {
    if (
      status === "예약 확정" ||
      status === "예약 가능" ||
      status === "사용중"
    ) {
      return "background-color: #e6e9ff; color:#586bff";
    } else if (status === "취소" || status === "중지") {
      return "background-color: #ffe6e6; color:#ff5655";
    } else if (status === "예약 가능") {
      return "background-color: #e6e9ff; color:#586bff";
    } else if (status === "사용중") {
      return "background-color: #e6e9ff; color:#586bff";
    } else {
      return "background-color: #efeff4; color:#68686c";
    }
  }}
`;
