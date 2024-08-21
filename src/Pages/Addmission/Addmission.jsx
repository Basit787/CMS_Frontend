import { Box } from "@mui/material";
import { Endpoints } from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import CMDynamicForm from "../../components/CMDynamicForm";
import addmissionFields from "./AdmissionForm.json";
import { useEffect, useState } from "react";

const Addmission = (props) => {
  useEffect(() => {
    getCourseData();
    getQualificationData();
  }, []);

  //Submit
  const handleSubmit = (data) => {
    props.onSubmit(data);
  };

  //get course data

  const [courseData, setCourseData] = useState([]);

  const getCourseData = async () => {
    try {
      const getCourse = await instance.get(Endpoints.courseApi);
      console.log("get course is", getCourse.data.data);
      setCourseData(getCourse.data.data);
    } catch (error) {
      console.log("cant get the course " + error);
    }
  };

  //Api for qualification

  const [qualificationData, setQualificationData] = useState([]);

  const getQualificationData = async () => {
    try {
      const getQualify = await instance.get(Endpoints.getQualification);
      console.log("the qualification data is ", getQualify.data.data);
      setQualificationData(getQualify.data.data);
    } catch (error) {
      console.log("Cant get the qualification data", error);
    }
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
