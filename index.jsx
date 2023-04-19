import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "../AdoptMe/Store/index";
import LandingPage from "./Components/LandingPage/LandingPage";
// import axios from "axios";
// import { Auth0Provider } from "@auth0/auth0-react";
// axios.defaults.baseURL = "http://localhost:3001";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        {/* <Auth0Provider
          domain="dev-77nfowmcbvvszdyt.us.auth0.com"
          clientId="eChd9pg5QYfd7HnBDa1W5KJY1CRMKWj1"
          redirectUri={window.location.origin}
          useRefreshTokens={true}
          cacheLocation="localstorage"
        >
        </Auth0Provider> */}
        <div>
          <App />
        </div>
      </React.StrictMode>
    </Provider>
  );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();