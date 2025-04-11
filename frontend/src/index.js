import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CustomThemeProvider } from "./ThemeContext";
import "./global.css";
import { CssBaseline, GlobalStyles } from "@mui/material";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);
