"use client";
import { ReactNode, useEffect, useState } from "react";
import MainContext from "./MainContext";
import Cookie from "js-cookie";
import axios from "axios";
import { server_url } from "@/util/http";

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // Check if the cookie exists and get its value
    const jwt = Cookie.get("jwt");

    if (jwt) {
      console.log("JWT cookie exists:", jwt);
    } else {
      console.log("JWT cookie not found");
    }
    async function getUserData() {
      const res = await axios.get(server_url + "/user/", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      //@ts-ignore
      setUserData(res.data.data);
    }
    getUserData();
  }, []);
  console.log(userData);
  return (
    <MainContext.Provider value={{ userData, setUserData }}>
      {children}
    </MainContext.Provider>
  );
};
