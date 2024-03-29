import React from "react";
import axios from "axios";

const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const isToday = (storedDate: string) => {
  const today = getTodayDateString();
  return storedDate === today;
};

const getUser = async () => {
  let user;
  try {
    const cachedUserData = localStorage.getItem("savedUser");
    const lastUpdatedDate = localStorage.getItem("lastUpdatedDate");

    if (cachedUserData && lastUpdatedDate && isToday(lastUpdatedDate)) {
      console.log("fetched from cache");
      return JSON.parse(cachedUserData);
    }

    let data = await axios.get("https://codrive.pythonanywhere.com/get_user", {
      params: {
        userId: "zoRqVAbw0ZI13ndOs0ni",
      },
    });

    localStorage.setItem("savedUser", JSON.stringify(data.data));
    localStorage.setItem("lastUpdatedDate", getTodayDateString());

    user = data.data;
  } catch (error) {
    console.error(error);
  }
  return user;
};

export default getUser;
