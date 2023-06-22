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
      main: "#1976d2", // Основной цвет
    },
    secondary: {
      main: "#dc004e", // Вторичный цвет
    },
    // Дополнительные цвета и настройки
  },
  // Другие параметры темы для светлого режима
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#033773", // Основной цвет
    },
    secondary: {
      main: "#2c33b9", // Вторичный цвет
    },
    // Дополнительные цвета и настройки
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "red", // Specify the border color here
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: "#94d90c", // Настройка цвета рамки чекбокса
        },
      },
    },
  },
});

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "red", // Specify the border color here
            },
          },
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
    // Обновляем компонент при изменении isDarkMode
    ReactDOM.render(<RootComponent />, document.getElementById("root"));
  }, [taskStore.isDarkMode]);

  return <RootComponent />;
};

ReactDOM.render(<RootContainer />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
