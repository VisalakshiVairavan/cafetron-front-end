// coffeeShopTheme.js

import { createTheme } from "@mui/material/styles";

const coffeeTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6c280e",
    },
    secondary: {
      main: "#616264",
    },
    background: {
      default: "#f3f1f1",
    },
    text: {
      primary: "#616264",
      secondary: "#616264",
      disabled: "#f44336",
    },
  },
});

export default coffeeTheme;
