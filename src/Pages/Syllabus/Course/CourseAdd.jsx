import { Box } from "@mui/material";
import React from "react";
import CMDynamicForm from "../../../components/CMDynamicForm";
import addCourseForm from "./AddCourse.json";

const CourseAdd = (props) => {
  const handleSubmit = (formData) => {
    props.onSubmit(formData);
  };
  return (
    <Box>
      <Box className=" w-full">
        <CMDynamicForm
          formFields={addCourseForm}
          onSubmit={handleSubmit}
          editedData={props.sendCourse}
        />
      </Box>
    </Box>
  );
};

export default CourseAdd;
