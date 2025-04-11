import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeToggleContext = createContext();

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // deeper gray
      paper: "#1e1e1e",    // card surfaces
    },
    primary: {
      main: "#cd7f32",     // bronze for buttons and highlights
      contrastText: "#fff"
    },
    secondary: {
      main: "#a0522d",     // darker bronze
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: "#1e1e1e", // paper/card surfaces
      },
    },
  },
  
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e", // match dark paper
          color: "#ffffff",           // card text
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          backgroundColor: "#cd7f32",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#b06b2c", // bronze hover
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#2c2c2c", // input fields
          color: "#fff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#2c2c2c", // form field color
          color: "#fff",              // text inside inputs
        },
        notchedOutline: {
          borderColor: "#cd7f32",     // bronze outline
        },
        input: {
          color: "#fff",              // cursor & value
        },
      },
    },
  },
});


export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeToggleContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
