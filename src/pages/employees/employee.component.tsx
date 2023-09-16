import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StateType } from "../../store/root-reducers";
import { EmployeeType } from "../../store/employees/types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import LoadingSpinner from "../../components/Loader";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataGrid from "../../components/Grid";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  deleteEmployeeAction,
  deletePendingEmployeeAction,
  editPendingEmployee,
  getEmployeesAction,
} from "../../store/employees/slice";

function Employee() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data, isLoading } = useSelector(
    (state: StateType) => state.employees.employees
  );
  const { deletePending } = useSelector((state: StateType) => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const containerStyle = useMemo(() => ({ height: "100%" }), []);

  const columnDefs: any = [
    { field: "name", headerName: "Name",  width: 250 },
    {
      field: "email_address",
      headerName: "Email",
      width: 350
    },
    {
      field: "phone_number",
      headerName: "Phone number",
      width: 250
    },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "cafe_name", headerName: "Cafe", width: 350 },
    { field: "days_worked", headerName: "Days worked", width: 150 },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Box pr={2}>
          <IconButton onClick={() => handleEditClick(params.data)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.data)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
      sortable: false,
    },
  ];

  const handleEditClick = (employee: EmployeeType) => {
    dispatch(editPendingEmployee(employee));
    navigate(`/employee/${employee.id}`);
  };

  const handleDeleteClick = (employee: EmployeeType) => {
    setDeleteDialogOpen(true);
    dispatch(deletePendingEmployeeAction(employee?.id || ""));
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteEmployeeAction(deletePending?.id || ""));
    setDeleteDialogOpen(false);
  };

  const handleAddNew = () => {
    navigate("/employee/new", { state: { id: location?.state?.id } });
  };

  const onFilterChanged = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    if (location?.state?.id) {
      dispatch(getEmployeesAction(location.state.id));
    } else {
      dispatch(getEmployeesAction(""));
    }
  }, []);

  return (
    <div style={containerStyle}>
      {isLoading ? (
        <LoadingSpinner />
      ) : data ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ paddingRight: 10, paddingLeft: 10 }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item container justifyContent="center">
              <Typography component="h3" variant="h6">
                Employee List{" "}
                {location?.state?.id ? `of ${location.state.cafe}` : ""}
              </Typography>
            </Grid>
            <Grid item container justifyContent="flex-end">
              <Button variant="outlined" onClick={handleAddNew}>
                Add employee
              </Button>
            </Grid>
          </Grid>
          <Grid item sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              deleteDialogOpen={deleteDialogOpen}
              setDeleteDialogOpen={setDeleteDialogOpen}
              data={data}
              columnDefs={columnDefs}
              handleDeleteConfirm={handleDeleteConfirm}
              onFilterChanged={onFilterChanged}
            />
          </Grid>
        </Grid>
      ) : (
        <span>No employee found!</span>
      )}
    </div>
  );
}

export default Employee;
