import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeToggleContext = createContext();

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",      // very light gray background
      paper: "#ffffff",        // card/panel background
    },
    primary: {
      main: "#c17e30",         // warm bronze/gold tone
      contrastText: "#ffffff", // white text on primary
    },
    secondary: {
      main: "#9c6733",         // slightly darker bronze
      contrastText: "#ffffff",
    },
    text: {
      primary: "#1e1e1e",      // deep gray text
      secondary: "#555555",    // medium gray
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // white paper
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#1e1e1e",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          borderRadius: "10px",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 20px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#a46428", // Dark bronze hover
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#c17e30",
        },
        track: {
          backgroundColor: "#c17e30",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0",
          borderRadius: "6px",
        },
        notchedOutline: {
          borderColor: "#c17e30",
        },
        input: {
          color: "#1e1e1e",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#555555",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#1e1e1e",
        },
      },
    },
  },
});


export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#b08d57",
      contrastText: "#fff"
    },
    secondary: {
      main: "#98794b",
      contrastText: "#fff"
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          color: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 20px",
          boxShadow: "none",
          backgroundColor: "#b08d57",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#98794b",
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: '#b08d57',
          '&.Mui-checked': {
            color: '#b08d57',
            '& + .MuiSwitch-track': {
              backgroundColor: '#b08d57',
            },
          },
        },
        track: {
          backgroundColor: '#b08d57',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#2c2c2c",
          borderRadius: "6px",
        },
        notchedOutline: {
          borderColor: "#b08d57",
        },
        input: {
          color: "#fff",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#cccccc",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "darkred",
          "&:hover": {
            color: "red",
          },
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
