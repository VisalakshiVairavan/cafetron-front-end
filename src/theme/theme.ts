// coffeeShopTheme.js

import { createTheme } from "@mui/material/styles";

const coffeeTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#bf360c",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f3f1f1",
    },
    text: {
      primary: "#c62828",
      secondary: "#c62828",
      disabled: "#f44336",
    },
  },
});

export default coffeeTheme;
