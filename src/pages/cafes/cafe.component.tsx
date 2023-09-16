import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCafesAction, deleteCafeAction } from "../../store/cafes/slice";
import { StateType } from "../../store/root-reducers";
import { CafeType } from "../../store/cafes/types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import LoadingSpinner from "../../components/Loader";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataGrid from "../../components/Grid";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import { CellClickedEvent } from "ag-grid-community";

function Cafe() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data, isLoading } = useSelector(
    (state: StateType) => state.cafes.cafes
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let deleteCafeId = useRef("");
  const containerStyle = useMemo(() => ({ height: "100%" }), []);

  const columnDefs: any = [
    { field: "name", headerName: "Name" },
    { field: "description", headerName: "Description" },
    {
      field: "location",
      headerName: "Location",
      filter: "agTextColumnFilter",
    },
    {
      field: "employee_count",
      headerName: "Employee count",
      cellClass: ["ag-cell--link"],
    },
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

  const handleEditClick = (cafe: CafeType) => {
    console.log(cafe);
    navigate("/employee", { state: { cafe: cafe } });
  };

  const handleDeleteClick = (cafe: CafeType) => {
    deleteCafeId.current = cafe.cafeId;
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("deleteCafe", deleteCafeId);
    dispatch(deleteCafeAction(deleteCafeId.current));
    setDeleteDialogOpen(false);
  };

  const handleCellClicked = (event: CellClickedEvent) => {
    console.log(event);
    if (event.colDef.field === "employee_count") {
      navigate("/employee", { state: { cafeId: event.data.cafeId, cafe: event.data.name } });
    }
  };

  const handleAddNew = ()=>{
    
  }
  const onFilterChanged = (data:any) => {
    console.log("onFilterChanged",data)
    // const filterInstance = gridRef..api.getFilterInstance('location'); // Replace 'location' with your column field
    // const filterText = filterInstance ? filterInstance.getFilter() : '';
    // dispatch(getCafesAction());
  };

  useEffect(() => {
    dispatch(getCafesAction(''));
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
          sx={{ paddingTop: 10, paddingRight: 20, paddingLeft: 20 }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item container justifyContent="center">
              <Typography component="h3" variant="h6">
                Cafe List
              </Typography>
            </Grid>
            <Grid item container justifyContent="flex-end">
              <Button variant="outlined" onClick={handleAddNew}>Add cafe</Button>
            </Grid>
          </Grid>
          <Grid item sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              deleteDialogOpen={deleteDialogOpen}
              setDeleteDialogOpen={setDeleteDialogOpen}
              data={data}
              columnDefs={columnDefs}
              handleDeleteConfirm={handleDeleteConfirm}
              handleCellClicked={handleCellClicked}
              onFilterChanged={onFilterChanged}
            />
          </Grid>
        </Grid>
      ) : (
        <Typography component="h3" variant="h5">
          No cafe found!
        </Typography>
      )}
    </div>
  );
}

export default Cafe;
