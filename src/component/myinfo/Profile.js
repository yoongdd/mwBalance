import { useState, useEffect } from "react";
import "./../../asset/style/main.css";
import profile from "../../asset/image/profile.png";
import { Button } from "antd";
import Parse from "parse";

function MyProfile() {
  const [editable, setEditable] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");

  const handleChange = (e) => {
    setPhoneNum(e.target.value);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    setEditable(false);
    const currentUser = await Parse.User.current();
    if (currentUser) {
      currentUser.set("phoneNumber", phoneNum); // phoneNumber 업데이트
      currentUser.save(); // back4app에 저장
    }
  };

  // 현재 user
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    if (currentUser) {
      const name = currentUser.get("nickname");
      const email = currentUser.get("email");
      const phoneNumber = currentUser.get("phoneNumber");
      setName(name);
      setEmail(email);
      setPhoneNum(phoneNumber);
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="myinfo-wrap">
      <div className="myprofile">
        <div className="profile">
          <img src={profile} alt="프로필" />
        </div>
        <p className="name">{name}</p>
        <p className="email">{email}</p>
      </div>
      <div className="border-btm"></div>

      <div className="phone-nm">
        <div className="input-wrap">
          <label>휴대폰 번호</label>
          <input
            id="phoneNum"
            type="text"
            disabled={!editable}
            value={phoneNum}
            onChange={handleChange}
          />
          {!editable ? (
            <Button onClick={handleEdit}>편집</Button>
          ) : (
            <Button onClick={handleSave}>저장</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
