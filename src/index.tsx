import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createTheme, ThemeProvider } from "@mui/material";
import { taskStore } from "../src/store";
import { observer } from "mobx-react";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#033773",
    },
    secondary: {
      main: "#2c33b9",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "red",
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: "#94d90c",
        },
      },
    },
  },
});

const RootComponent = observer(() => {
  const theme = taskStore.isDarkMode ? darkTheme : lightTheme;

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
});

const RootContainer = () => {
  useEffect(() => {
    ReactDOM.render(<RootComponent />, document.getElementById("root"));
  }, [taskStore.isDarkMode]);

  return <RootComponent />;
};

ReactDOM.render(<RootContainer />, document.getElementById("root"));
reportWebVitals();
