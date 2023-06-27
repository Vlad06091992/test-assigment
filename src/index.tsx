import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createTheme, ThemeProvider } from "@mui/material";
import { taskStore } from "../src/store";
import { observer } from "mobx-react";
import { createRoot } from "react-dom/client";

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
      main: "#0b167c", // Main color
    },
    secondary: {
      main: "#f48fb1", // Secondary color
    },
    // Additional colors and settings
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#090d38", // Border color
        },
      },
    },
  },
  // Other theme parameters for dark mode
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

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<RootComponent />);
