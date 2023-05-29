import React from "react";
import IconUsingBtn from "./IconUsingBtn";
import * as layout from "../styles/layouts";
import { useMutation } from "react-query";
import { logout } from "../api/userAPI";
import { useNavigate } from "react-router-dom";

// email => redux 설정
// user email에 따라 랜덤 아이콘 만들기 구현
function Nav({ email }) {
  const navigate = useNavigate();
  const dummies = {
    success: true,
    data: {
      Today: [
        {
          chatId: 1,
          chatName: "GPT사용법1",
        },
        {
          chatId: 2,
          chatName: "GPT사용법2",
        },
      ],
      Yesterday: [
        {
          chatId: 3,
          chatName: "GPT사용법3",
        },
        {
          chatId: 4,
          chatName: "GPT사용법4",
        },
      ],
    },
  };

  const dateKeys = Object.keys(dummies.data);
  console.log(dateKeys);

  const { mutateAsync: logoutMutation } = useMutation(logout, {
    onSuccess: async (res) => {
      console.log(res);
      alert(res.data["message"]);
      navigate("/");
    },
  });

  return (
    <layout.FlexColumnCenter style={{ width: "260px" }}>
      <IconUsingBtn>New chat</IconUsingBtn>
      {
        // data 객체 안에 있는 key값을 뽑기
        // 해당 key를 기준으로 map 돌리기, 내용을 btn 씌워 반환
        dateKeys.map((group) => {
          return (
            <layout.FlexColumnCenter100>
              <p>{group}</p>
              {dummies["data"][group].map((entry) => (
                <IconUsingBtn key={entry["chatId"]}>
                  {entry["chatName"]}
                </IconUsingBtn>
              ))}
            </layout.FlexColumnCenter100>
          );
        })
      }
      <IconUsingBtn onClickHandler={logoutMutation}>{email}</IconUsingBtn>{" "}
      {/* user 프로필 버튼, 하단 고정  */}
    </layout.FlexColumnCenter>
  );
}

export default Nav;
