import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Main from "../components/Main";
import * as layout from "../styles/layouts";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { cryptoKey, decrypt } from "../util/crypto";
import { gptAPI } from "../axios/api";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const email = localStorage.getItem("USR") ? decrypt(localStorage.getItem("USR"), cryptoKey).email : "example@naver.com";

  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E"]; // F는 흐린 계열이 나오지 않게 하기 위해 제외
  const getHex = () => {
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * hexValues.length);
      hex += hexValues[index];
    }
    return hex;
  };

  const [response, setResponse] = useState(false);
  const userHex = sessionStorage.getItem("userHex") ? sessionStorage.getItem("userHex") : sessionStorage.setItem("userHex", getHex());

  const {
    data: chats,
    isLoading,
    isError,
  } = useQuery(["chat"], gptAPI.getChats, {
    select: (data) => data.data.data,
    // refetchInterval: 5000,
    enabled: !response,
    onError: () => {
      alert("로그인이 필요합니다!");
      sessionStorage.removeItem("Login");
      navigate("/login");
    },
    onSuccess: () => {
      sessionStorage.setItem("Login", true);
    },
    refetchOnWindowFocus: false,
  });

  if (!isLoading && isError) {
    setResponse(true);
  }

  useEffect(() => {
    if (email === "example@naver.com") {
      sessionStorage.removeItem("Login");
      navigate("/login");
    }
    if (!!sessionStorage.getItem("Logout")) {
      navigate("/login");
    }
  }, [navigate, email]);

  return (
    <>
      {!!chats ? (
        <layout.Flex100>
          <Nav email={email} hex={userHex} chats={chats} />
          <Main />
        </layout.Flex100>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Layout;
