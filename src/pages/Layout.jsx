import React from "react";
import Nav from "../components/Nav";
import Main from "../components/Main";
import * as layout from "../styles/layouts";
import { useSelector } from "react-redux";

function Layout() {
  const userInfo = useSelector((state) => state.userInfo);
  // const email = "dummy@gmail.com"; // 추후 redux store에서 빼서 쓰기
  return (
    <layout.Flex100>
      <Nav email={userInfo.email} />
      <Main />
    </layout.Flex100>
  );
}

export default Layout;
