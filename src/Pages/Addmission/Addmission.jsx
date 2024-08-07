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
import CMDynamicForm from "../../components/CMDynamicForm";
import addmissionFields from "./AdmissionForm.json";

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
  //props of students...
  useEffect(() => {
    if (props.sendStudentData) {
      console.log("Data received", props.sendStudentData);
      // setFormData(props.sendStudentData);
    }
    getCourseData();
    getQualificationData();
  }, []);

  //Submit`
  const handleSubmit = (data) => {
    props.onSubmit(data);
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
    <Box className=" w-full">
      <CMDynamicForm
        formFields={addmissionFields}
        onSubmit={handleSubmit}
        editedData={props.sendStudentData}
      />
    </Box>
  );
};

export default Addmission;
