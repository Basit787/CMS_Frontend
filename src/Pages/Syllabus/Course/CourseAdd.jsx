import { Box } from "@mui/material";
import React from "react";
import CMDynamicForm from "../../../components/CMDynamicForm";
import addCourseForm from "./AddCourse.json";

const CourseAdd = (props) => {
  const handleSubmit = (formData) => {
    props.onSubmit(formData);
  };
  return (
    <Box className=" w-full">
      <CMDynamicForm
        formFields={addCourseForm}
        onSubmit={handleSubmit}
        editedData={props.sendCourse}
      />
    </Box>
  );
};

export default CourseAdd;
