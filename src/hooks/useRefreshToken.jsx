import React from "react";
import { useState } from "react";
import { localStorageToken } from "../components/smallComponents/LocalStorage";
import { UserApi } from "./UserApi";

const useRefreshToken = () => {
  // const token = JSON.parse(localStorage.getItem("token"));

  const api = UserApi();
  // const refresh = async () => {

  //   const response = await api
  //     .refresh()
  //     .then((response) => {
  //       console.log(response.data.accessToken);
  //       console.log(response.data);

  //       localStorage.setItem(
  //         "token",
  //         JSON.stringify(response.data.accessToken)
  //       );
  //     })
  //     .catch((error, response) => {
  //       console.log(error);
  //       console.log(response);
  //     });
  //   console.log(response);
  //   return response.data.accessToken;
  // };

  // return refresh;

  const refresh = async () => {
    try {
      const response = await api.refresh();
      const { accessToken } = response.data;
      console.log(accessToken);
      localStorage.setItem("token", JSON.stringify(accessToken));
      return accessToken;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
