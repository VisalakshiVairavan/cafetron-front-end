import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Cafe from "../pages/cafes/cafe.component";
import Employee from "../pages/employees/employee.component";
import AddCafe from "../pages/cafes/add-cafe.component";
import EditCafe from "../pages/cafes/edit-cafe.component";
import EditEmployee from "../pages/employees/edit-employee";
import AddEmployee from "../pages/employees/add-employee";

function CustomRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Layout}>
          <Route path="/cafe" Component={Cafe} />
          <Route path="/cafe/new" Component={AddCafe} />
          <Route path="/cafe/:id" Component={EditCafe} />
          <Route path="/employee" Component={Employee} />
          <Route path="/employee/new" Component={AddEmployee} />
          <Route path="/employee/:id" Component={EditEmployee} />
          <Route path="/" Component={Cafe} />
        </Route>
      </Routes>
    </Router>
  );
}

export default CustomRoutes;
