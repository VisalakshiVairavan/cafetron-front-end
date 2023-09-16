import {
  Grid,
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EmployeeType } from "../../store/employees/types";
import GoBackWarning from "../GoBackWarning";
import { StateType } from "../../store/root-reducers";
import { getCafesAction } from "../../store/cafes/slice";

interface Props {
  isEdit?: boolean;
  employee: EmployeeType | null | undefined;
  updateTempEvent: any;
  updateEvent: any;
  cafeId?: string;
}

function EmployeeForm(props: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { data } = useSelector((state: StateType) => state.cafes.cafes);
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!props.employee?.name?.trim()) {
      newErrors.name = "Name is required";
    }

    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const email = props.employee?.email_address.trim() || "";
    if (!email) {
      newErrors.email_address = "Email address is required";
    }

    const matchEmail: RegExpMatchArray | null = email.match(emailPattern);
    if (!matchEmail || (matchEmail && matchEmail[0] !== email)) {
      newErrors.email_address = "Email is invalid";
    }
    const phone = props.employee?.phone_number?.trim() || "";
    const phonePattern = /[8-9][0-9]{7}/i;
    if (!phone) {
      newErrors.phone_number = "Phone number is required";
    }
    const matchPhone: RegExpMatchArray | null = phone.match(phonePattern);
    if (!matchPhone || (matchPhone && matchPhone[0] !== phone)) {
      newErrors.phone_number =
        "Phone number is invalid . Enter valid SG number";
    }

    const gender = props.employee?.gender?.trim();
    if (!gender) {
      newErrors.gender = "Gender number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(props.updateEvent(props.employee));
      navigate("/employee");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      props.updateTempEvent({
        ...props.employee,
        [name]: value,
      })
    );
  };
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const cafe = data?.find((d) => d.id === value);
    dispatch(
      props.updateTempEvent({
        ...props.employee,
        cafe: cafe?.name,
        [name]: value,
      })
    );
  };

  const handleCancel = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    navigate("/employee");
  };

  const handleConfirm = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    if (!data) {
      dispatch(getCafesAction(""));
    }
  }, []);

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
                  value={props.employee?.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email address"
                  name="email_address"
                  variant="outlined"
                  value={props.employee?.email_address}
                  onChange={handleChange}
                  error={!!errors.email_address}
                  helperText={errors.email_address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone number"
                  name="phone_number"
                  variant="outlined"
                  value={props.employee?.phone_number}
                  onChange={handleChange}
                  error={!!errors.phone_number}
                  helperText={errors.phone_number}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  variant="outlined"
                  value={props.employee?.gender}
                  onChange={handleChange}
                  error={!!errors.gender}
                  helperText={errors.gender}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="cafe-name">Cafe</InputLabel>
                <Select
                  value={props.employee?.cafe_id || ""}
                  onChange={handleSelectChange}
                  name="cafe_id"
                  label={props.employee?.cafe}
                >
                  {data ? (
                    data.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem key={"loading"} value={"loading"}>
                      Loading..
                    </MenuItem>
                  )}
                </Select>
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

export default EmployeeForm;
