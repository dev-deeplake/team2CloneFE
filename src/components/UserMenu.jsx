import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { userAPI } from "../axios/api";

import * as layout from "../styles/layouts";
import * as style from "../styles/styles";
import * as sVar from "../styles/styleVariables";
import IconUsingBtn from "./IconUsingBtn";
import { ReactComponent as Logout } from "../icons/logout.svg";
import LogoutPopup from "./LogoutMenu";

function UserMenu({ iconFront, iconTailOne, iconTailTwo, email }) {
  const [isMenuOn, setIsMenuOn] = useState(false);
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();

  const menuHandler = () => {
    if (isMenuOn) {
      setIsMenuOn(false);
    } else {
      setIsMenuOn(true);
    }
  };

  const { mutateAsync: logoutMutation } = useMutation(userAPI.logout, {
    onSuccess: async (res) => {
      console.log(res);
      sessionStorage.removeItem("Login");
      sessionStorage.setItem("Logout", true);
      alert(res.data["message"]);
      navigate("/home");
    },
  });

  return (
    <>
      <layout.FlexCenter
        style={{
          // position: "fixed",
          // bottom: "0",
          width: "inherit",
          paddingTop: "4px",
          paddingBottom: "16px",
          borderTop: `1px solid ${sVar.white20}`,
          background: `${sVar.darkSide}`,
        }}
      >
        <IconUsingBtn textWidth="200px" customStyle={{ marginBottom: "8px" }} iconFront={iconFront} iconTailOne={iconTailOne} iconTailTwo={iconTailTwo} onClick={menuHandler}>
          {email}
        </IconUsingBtn>
        {/* user 프로필 버튼, 하단 고정  */}
      </layout.FlexCenter>
      {isMenuOn && (
        <layout.FlexCenter onClick={logoutMutation} style={{ padding: "2px 0 6px 0", borderRadius: "4px", background: `${sVar.black100}`, position: "absolute", bottom: "60px" }}>
          <LogoutPopup iconFront={<Logout style={{ marginRight: "10px" }} />}>Log out</LogoutPopup>
        </layout.FlexCenter>
      )}
    </>
  );
}

export default UserMenu;
