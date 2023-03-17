import { apiPrivate } from "./UserApi";
import React, { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { localStorageToken } from "../components/smallComponents/LocalStorage";

const useApiPrivate = () => {
  const refresh = useRefreshToken();
  // const token = JSON.parse(localStorage.getItem("token"));
  const token = localStorageToken();

  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept);
      apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, token]);

  return apiPrivate;
};

export default useApiPrivate;
