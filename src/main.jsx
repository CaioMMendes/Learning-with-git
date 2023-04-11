import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/Store";
import { IsOpenAvatarProvider } from "./contexts/IsOpenAvatarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
    <Provider store={store}>
      <IsOpenAvatarProvider>
        <App />
      </IsOpenAvatarProvider>
    </Provider>
  </GoogleOAuthProvider>
  // </React.StrictMode>
);
