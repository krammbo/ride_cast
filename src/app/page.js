"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Anchorage",
  "America/Adak",
  "Pacific/Honolulu"
];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Home() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    backupEmail: "",
    timezone: "",
    rideInStart: null,
    rideInEnd: null,
    rideBackStart: null,
    rideBackEnd: null,
    home: "",
    work: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.firstname) newErrors.firstname = "Required";
    if (!form.lastname) newErrors.lastname = "Required";
    if (!form.email) newErrors.email = "Required";
    else if (!validateEmail(form.email)) newErrors.email = "Invalid email";
    if (form.backupEmail && !validateEmail(form.backupEmail)) newErrors.backupEmail = "Invalid email";
    if (!form.timezone) newErrors.timezone = "Required";
    if (!form.rideInStart) newErrors.rideInStart = "Required";
    if (!form.rideInEnd) newErrors.rideInEnd = "Required";
    if (form.rideInStart && form.rideInEnd && dayjs(form.rideInStart).isAfter(dayjs(form.rideInEnd))) newErrors.rideInEnd = "End must be after start";
    if (!form.rideBackStart) newErrors.rideBackStart = "Required";
    if (!form.rideBackEnd) newErrors.rideBackEnd = "Required";
    if (form.rideBackStart && form.rideBackEnd && dayjs(form.rideBackStart).isAfter(dayjs(form.rideBackEnd))) newErrors.rideBackEnd = "End must be after start";
    if (!form.home) newErrors.home = "Required";
    if (!form.work) newErrors.work = "Required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      alert("This will work once Jeff gives me an endpoint");
    }
  };

  return (
    <>
    <h1>Ride Cast</h1>
    <h3>SHUTUP, I will fix the UI</h3>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, maxWidth: 600, mx: "auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstname"
              required
              fullWidth
              value={form.firstname}
              onChange={handleChange}
              error={!!errors.firstname}
              helperText={errors.firstname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastname"
              required
              fullWidth
              value={form.lastname}
              onChange={handleChange}
              error={!!errors.lastname}
              helperText={errors.lastname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              required
              fullWidth
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Backup Email"
              name="backupEmail"
              fullWidth
              value={form.backupEmail}
              onChange={handleChange}
              error={!!errors.backupEmail}
              helperText={errors.backupEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Timezone"
              name="timezone"
              required
              fullWidth
              value={form.timezone}
              onChange={handleChange}
              error={!!errors.timezone}
              helperText={errors.timezone}
            >
              {timezones.map((tz) => (
                <MenuItem key={tz} value={tz}>{tz}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Ride In Start"
              value={form.rideInStart}
              onChange={(value) => handleTimeChange("rideInStart", value)}
              renderInput={(params) => (
                <TextField {...params} required fullWidth error={!!errors.rideInStart} helperText={errors.rideInStart} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Ride In End"
              value={form.rideInEnd}
              onChange={(value) => handleTimeChange("rideInEnd", value)}
              renderInput={(params) => (
                <TextField {...params} required fullWidth error={!!errors.rideInEnd} helperText={errors.rideInEnd} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Ride Back Start"
              value={form.rideBackStart}
              onChange={(value) => handleTimeChange("rideBackStart", value)}
              renderInput={(params) => (
                <TextField {...params} required fullWidth error={!!errors.rideBackStart} helperText={errors.rideBackStart} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Ride Back End"
              value={form.rideBackEnd}
              onChange={(value) => handleTimeChange("rideBackEnd", value)}
              renderInput={(params) => (
                <TextField {...params} required fullWidth error={!!errors.rideBackEnd} helperText={errors.rideBackEnd} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Home Address"
              name="home"
              required
              fullWidth
              value={form.home}
              onChange={handleChange}
              error={!!errors.home}
              helperText={errors.home}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Work Address"
              name="work"
              required
              fullWidth
              value={form.work}
              onChange={handleChange}
              error={!!errors.work}
              helperText={errors.work}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" fullWidth>
              Let&apos;s Ride
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
    </>
  );
}
