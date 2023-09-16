import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Cafe from "../pages/cafes/cafe.component";
import Employee from "../pages/employees/employee.component";


function CustomRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Layout}>
          <Route path="/cafe" Component={Cafe} />
          <Route path="/employee" Component={Employee} />
          <Route path="/" Component={Cafe} />
        </Route>
      </Routes>
    </Router>
  );
}

export default CustomRoutes;
