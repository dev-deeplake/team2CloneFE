import React from "react";
import Nav from "../components/Nav";
import Main from "../components/Main";
import * as layout from "../styles/layouts";
import { useRecoilValue } from "recoil";
import { userEmail } from "../recoil/userInfo/atoms";

function Layout() {
  const email = useRecoilValue(userEmail); // 추후 recoil에서 빼서 쓰기
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E"]; // F는 흐린 계열이 나오지 않게 하기 위해 제외
  const getHex = () => {
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * hexValues.length);
      hex += hexValues[index];
    }
    return hex;
  };
  const userHex = getHex();
  return (
    <layout.Flex100>
      <Nav email={email} hex={userHex} />
      {/* cookie에 email 저장 후 cookie에서 이메일 빼 쓰기 */}
      <Main />
    </layout.Flex100>
  );
}

export default Layout;
