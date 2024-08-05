import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AddCourse.scss";

const AddCourse = ({ onSubmit, sendCourse }) => {
  const [name, setName] = useState({
    title: "",
    description: "",
  });

  //props for course
  useEffect(() => {
    if (sendCourse) {
      console.log("Course Data Received", sendCourse);
      setName(sendCourse);
    } 
  }, [sendCourse]);

  //inputs
  const handleChange = (event) => {
    setName((previousValue) => ({
      ...previousValue,
      [event.target.name]: event.target.value,
    }));
  };

  //submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("course submitted");
    onSubmit(name);
  };
  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {sendCourse === undefined ? (
            <h1>Add Course</h1>
          ) : (
            <h1>Edit Course</h1>
          )}
        </Box>
        <form onSubmit={handleSubmit} className="courseForm">
          <TextField
            label="Title"
            variant="outlined"
            className="courseInput"
            placeholder="Enter the Title of Course"
            onChange={handleChange}
            name="title"
            value={name.title}
          />
          <TextField
            label="Description"
            variant="outlined"
            className="courseInput"
            placeholder="Enter the Description of Course"
            onChange={handleChange}
            name="description"
            value={name.description}
          />
          <Button variant="contained" className="courseBtn" type="submit">
            {sendCourse === undefined ? "Submit" : "Update"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddCourse;
