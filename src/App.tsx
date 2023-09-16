import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import CustomRoutes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <CustomRoutes />
    </Provider>
  );
}

export default App;
