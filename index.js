
import React from "react";
import { View, StyleSheet } from "react-native";
import App from "./Container/App";
import { Provider } from "react-redux";
import store from "./Store/store";
import { LoginProvider } from "../AdoptMe/Components/Login/loginProvider";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export default function Main() {
  return (
    <Provider store={store}>
      <LoginProvider>
        <View style={styles.container}>
          <App />
        </View>
      </LoginProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
