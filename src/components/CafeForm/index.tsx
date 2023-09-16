import {
  Grid,
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CafeType } from "../../store/cafes/types";
import GoBackWarning from "../GoBackWarning";

interface Props {
  isEdit?: boolean;
  cafe: CafeType | null | undefined;
  updateTempEvent: any;
  updateEvent: any;
}

function CafeForm(props: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!props.cafe?.name?.trim()) {
      newErrors.name = "Name is required";
    }
    if (!props.cafe?.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (!props.cafe?.location?.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(props.updateEvent(props.cafe));
      navigate("/cafe");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      props.updateTempEvent({
        ...props.cafe,
        [name]: value,
      })
    );
  };

  const handleCancel = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    navigate("/cafe");
  };

  const handleConfirm = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Paper elevation={3}>
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            {props.isEdit ? `Edit` : `Add`} Cafe
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  variant="outlined"
                  value={props.cafe?.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  variant="outlined"
                  value={props.cafe?.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  variant="outlined"
                  value={props.cafe?.location}
                  onChange={handleChange}
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </Grid>
              <Grid item container justifyContent="space-around">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 5 }}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outlined"
                  color="secondary"
                  sx={{ marginTop: 5, marginLeft: 10 }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
      <GoBackWarning
        handleCloseDialog={handleCloseDialog}
        handleConfirm={handleConfirm}
        dialogOpen={dialogOpen}
      />
    </Container>
  );
}

export default CafeForm;
