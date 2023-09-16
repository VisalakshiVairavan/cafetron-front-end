import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { CellClickedEvent, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useRef } from "react";
import "./grid.style.css";

interface Props {
  columnDefs: any;
  data: any;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteConfirm: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleCellClicked?: (event: CellClickedEvent) => void;
  onFilterChanged: any;
}

function DataGrid(props: Props) {
  const gridRef: any = useRef(null);
  const gridStyle = useMemo(() => ({ height: "100%" }), []);
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      wrapHeaderText: true,
    };
  }, []);

  const handleCloseDeleteDialog = () => {
    props.setDeleteDialogOpen(false);
  };

  const onGridReady = (params: GridReadyEvent<any>) => {
    const gridApi = params.api;
    gridApi.setDomLayout("autoHeight");
    sizeColumnsToFit();
  };

  const sizeColumnsToFit = () => {
    if (gridRef.current) {
      gridRef.current.api.sizeColumnsToFit();
    }
  };

  return (
    <div style={gridStyle} className="ag-theme-material">
      <AgGridReact
        ref={gridRef}
        columnDefs={props.columnDefs}
        rowData={props.data}
        getRowId={(params) => params.data.id || params.data.id}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onCellClicked={props.handleCellClicked}
        domLayout="autoHeight"
        onFilterChanged={props.onFilterChanged}
      />
      <Dialog open={props.deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Deletion!</DialogTitle>
        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DataGrid;
