import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, Card } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Endpoints } from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import "./Admission.scss";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const Addmission = (props) => {
  const [formData, setFormData] = useState({
    studentname: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dateOfJoining: "",
    aadharCard: "",
    panCard: "",
    highestQualification: "",
    selectCourse: "",
    address: "",
    password: "",
    studentId: "",
  });

  //props of students...
  useEffect(() => {
    if (props.sendStudentData) {
      console.log("Data received", props.sendStudentData);
      setFormData(props.sendStudentData);
    }
    getCourseData();
    getQualificationData();
  }, []);

  //inputs
  const handleChange = (event) => {
    setFormData((previousValue) => ({
      ...previousValue,
      [event.target.name]: event.target.value,
    }));
  };

  //Submit`
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  //password

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //get course data

  const [courseData, setCourseData] = useState([]);
  const getCourseData = () => {
    instance
      .get(Endpoints.courseApi)
      .then((res) => {
        console.log("get course is", res.data.data);
        setCourseData(res.data.data);
      })
      .catch((err) => {
        console.log("cant get the course " + err);
      });
  };

  //Api for qualification

  const [qualificationData, setQualificationData] = useState([]);

  const getQualificationData = () => {
    instance
      .get(Endpoints.getQualification)
      .then((res) => {
        console.log("the qualification data is ", res.data.data);
        setQualificationData(res.data.data);
      })
      .catch((error) => {
        console.log("Cant get the qualification data", error);
      });
  };
  return (
    <Box>
      <Card className="card">
        <h1>Admission Form</h1>

        <form onSubmit={handleSubmit}>
          <Box className="input-group">
            {/* name */}
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              placeholder="Enter Your name"
              onChange={handleChange}
              className="input-field"
              name="studentname"
              value={formData.studentname}
            />
            {/* studentID */}
            <TextField
              label="Student Id"
              variant="outlined"
              type="text"
              placeholder="Enter Your Student Id"
              onChange={handleChange}
              className="input-field"
              name="studentId"
              value={formData.studentId}
            />
            {/* password */}

            <FormControl variant="outlined" className="input-field">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={handleChange}
                name="password"
                value={formData.password}
              />
            </FormControl>

            {/* Date of birth */}
            <TextField
              label="Date of Birth"
              variant="outlined"
              type="date"
              onChange={handleChange}
              className="input-field"
              name="dateOfBirth"
              focused
              value={formData.dateOfBirth}
            />
            {/* phone number */}
            <TextField
              label="Phone Number"
              variant="outlined"
              type="text"
              onChange={handleChange}
              className="input-field"
              name="phoneNumber"
              maxLength={10}
              value={formData.phoneNumber}
            />
            {/* e-mail */}
            <TextField
              label="E-Mail"
              variant="outlined"
              type="email"
              placeholder="Enter Your E-Mail"
              onChange={handleChange}
              className="input-field"
              name="email"
              value={formData.email}
            />
            {/* gender */}
            <FormControl className="input-field">
              <InputLabel id="demo-simple-select-label">
                Select Gender
              </InputLabel>
              <Select
                value={formData.gender}
                label="Select Gender"
                onChange={handleChange}
                name="gender"
              >
                <MenuItem value="" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>

            {/* joining date */}
            <TextField
              label="Date of Joining"
              variant="outlined"
              type="date"
              onChange={handleChange}
              className="input-field"
              name="dateOfJoining"
              focused
              value={formData.dateOfJoining}
            />

            {/* aadhar card */}
            <TextField
              label="Aadhaar-card"
              variant="outlined"
              type="text"
              placeholder="Enter Your Aadhaar Card number"
              onChange={handleChange}
              className="input-field"
              name="aadharCard"
              maxLength={12}
              value={formData.aadharCard}
            />

            {/* pancard */}
            <TextField
              label="Pan-Card (optional)"
              variant="outlined"
              type="text"
              placeholder="Enter Your Pan-Card number"
              onChange={handleChange}
              className="input-field"
              name="panCard"
              maxLength={10}
              value={formData.panCard}
            />

            {/* qualification */}
            <FormControl className="input-field">
              <InputLabel id="demo-simple-select-label">
                Highest Qualification
              </InputLabel>
              <Select
                label="Highest Qualification"
                onChange={handleChange}
                name="highestQualification"
                value={formData.highestQualification}
              >
                <MenuItem disabled>Select Highest Qualification</MenuItem>
                {qualificationData.map((data) => (
                  <MenuItem value={data.key}>{data.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* course selection */}
            <FormControl className="input-field">
              <InputLabel id="demo-simple-select-label">
                Select Course
              </InputLabel>
              <Select
                label="Select Course"
                onChange={handleChange}
                name="selectCourse"
                value={formData.selectCourse}
              >
                <MenuItem disabled>Select Course</MenuItem>
                {courseData.map((data, index) => (
                  <MenuItem value={data.title} key={index}>
                    {data.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* address */}
            <Textarea
              aria-label="minimum height"
              minRows={2}
              placeholder="Enter your address"
              style={{ width: "94.5%" }}
              name="address"
              onChange={handleChange}
              value={formData.address}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            className="submit-btn"
            // onClick={handleSubmit}
          >
            {props.sendStudentData === undefined ? "Submit" : "Update"}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default Addmission;
