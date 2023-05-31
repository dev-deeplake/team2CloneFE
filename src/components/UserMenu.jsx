import React from "react";
import * as layout from "../styles/layouts";
import * as sVar from "../styles/styleVariables";
import IconUsingBtn from "./IconUsingBtn";
import { useState } from "react";
import { ReactComponent as Logout } from "../icons/logout.svg"

function UserMenu({ iconFront, iconTailOne, iconTailTwo, email }) {
  const [isMenuOn, setIsMenuOn] = useState(false);
  const [hover, setHover] = useState(false);
  const menuHandler = () => {
    if (isMenuOn) {
        setIsMenuOn(false)
    } else {
        setIsMenuOn(true)
    }
  }

  return (
    <>
        <layout.FlexCenter
            style={{
                position: "fixed",
                bottom: "0",
                width: "252px",
                paddingTop: "4px",
                borderTop: `1px solid ${sVar.white20}`,
            }}
            >
            <IconUsingBtn
                textWidth="200px"
                customStyle={{ marginBottom: "8px" }}
                iconFront={iconFront}
                iconTailOne={iconTailOne}
                iconTailTwo={iconTailTwo}
                onClick={menuHandler}
            >
                {email}
            </IconUsingBtn>
            {/* user 프로필 버튼, 하단 고정  */}
        </layout.FlexCenter>
        { isMenuOn &&
            <layout.FlexCenter style={{padding:"2px 0 6px 0", borderRadius:"4px", background: `${sVar.black100}`, position:"absolute", bottom:"60px"}}>
                <IconUsingBtn
                    iconFront={<Logout style={{marginRight:"10px"}}/>}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    customStyle={hover ? {height:"55px", borderRadius: "0", background: `${sVar.white100}`} : {height:"55px", borderRadius: "0", background: `${sVar.black100}`}}>
                        Log out
                    </IconUsingBtn>
            </layout.FlexCenter>
        }
    </>
  );
}

export default UserMenu;
