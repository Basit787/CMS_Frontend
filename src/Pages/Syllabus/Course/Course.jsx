import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Card } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../../apis/apiContsants";
import instance from "../../../apis/apiRequest";
import DialogBox from "../../../components/Dialog";
import CourseAdd from "./CourseAdd";
import useDialogBoxStore from "../../../stores/DialogBoxStore";
import useSnackBarStore, { SnackbarType } from "../../../stores/SnacbarStore";

const Course = () => {
  const [courseData, setCourseData] = useState([]);
  const [editedCourse, setEditedCourse] = useState(); //props send
  const [open, setOpen] = useState(false); //dialog box

  const { openDialog } = useDialogBoxStore((state) => state);
  const { openSnackbar } = useSnackBarStore((state) => state);

  useEffect(() => {
    getCourseData();
  }, []);

  //getCourse
  const getCourseData = async () => {
    try {
      const res = await instance.get(Endpoints.courseApi, {
        params: courseData._id,
      });
      console.log("get course", res.data.data);
      setCourseData(res.data.data);
    } catch (err) {
      console.log("cant get the course " + err);
      openSnackbar({
        message: "Failed to fetch courses",
        type: SnackbarType.error,
      });
    }
  };
  //add course
  const addCourseData = async (params) => {
    try {
      const res = await instance.post(Endpoints.addCourseApi, params);
      console.log("get course", res.data.data);
      getCourseData();
      handleClose();
      openSnackbar({
        message: "Course added successfully",
        type: SnackbarType.success,
      });
    } catch (err) {
      console.log("can't add the course " + err);
      openSnackbar({
        message: "failed to add the course",
        type: SnackbarType.error,
      });
    }
  };

  //updateCourse
  const updateCourseData = async (params) => {
    try {
      const res = await instance.post(Endpoints.updateCourseApi, params);

      console.log("course updated", res.data.data);
      getCourseData();
      handleClose();
      openSnackbar({
        message: "Course updated successfully",
        type: SnackbarType.success,
      });
    } catch (err) {
      console.log("can't update the course " + err);
      openSnackbar({
        message: "Failed to update the course",
        type: SnackbarType.error,
      });
    }
  };

  //editCourse by getting single _id
  const editCourseData = async (params) => {
    setOpen(true);
    try {
      const res = await instance.get(Endpoints.courseApi + params);
      console.log("get single course", res.data.data);
      setEditedCourse(res.data.data);
    } catch (err) {
      console.log("can't add the  course " + err);
    }
  };

  //deleteCourse
  const deleteCourseData = (params) => {
    instance
      .delete(Endpoints.courseApi + params)
      .then((res) => {
        console.log("course deleted", res.data.data);
        getCourseData();
      })
      .catch((err) => {
        console.log("can't delete the  course " + err);
      });
  };

  //validation of course

  const getValidation = (formData) => {
    if (!formData.title || !formData.description) {
      return false;
    }
    return true;
  };

  //course form submit
  const submitCourseForm = (courseData) => {
    if (getValidation(courseData)) {
      const params = {
        ...courseData,
      };
      editedCourse ? updateCourseData(params) : addCourseData(params);
    } else {
      console.log("course validation failed");
    }
  };

  //dialog box for adding course

  const handleClickOpen = () => {
    setEditedCourse({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //viewCourse
  const navigate = useNavigate();
  const viewCourseData = (Id, title) => {
    navigate("/course/chapter", {
      state: { courseId: Id, courseTitle: title },
    });
  };

  //deletecourse pop-up
  const handleDeleteClickOpen = (courseId) => {
    openDialog({
      title: "Confirm Deletion",
      message: "Do you really want to delete the course",
      response: (ActionType) => {
        if (ActionType === "positive") {
          deleteCourseData(courseId);
          openSnackbar({
            message: "Course deleted successfully",
            type: SnackbarType.success,
          });
        } else {
          openSnackbar({
            message: "Failed to delete the course",
            type: SnackbarType.error,
          });
        }
      },
    });
  };

  const getMapData = (item, index) => {
    return (
      <Card key={index} className="m-2 p-2 flex  justify-between items-center">
        <Box>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </Box>
        <Box className="flex flex-col m-2 md:flex-row">
          <Button
            color="success"
            onClick={() => {
              editCourseData(item._id);
            }}
          >
            <EditIcon />
          </Button>
          <Button
            color="error"
            onClick={() => handleDeleteClickOpen(item._id, item.title)}
          >
            <DeleteIcon />
          </Button>
          <Button
            onClick={() => {
              viewCourseData(item._id, item.title);
            }}
          >
            <RemoveRedEyeIcon />
          </Button>
        </Box>
      </Card>
    );
  };
  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {courseData.length === 0 ? (
            <Typography>{"Add Course"}</Typography>
          ) : (
            <Typography>{"Select Course"}</Typography>
          )}
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                handleClickOpen();
                setEditedCourse(undefined);
              }}
            >
              Add Course
            </Button>
            {open && (
              <DialogBox closeTrue={() => setOpen(false)}>
                <CourseAdd
                  onSubmit={submitCourseForm}
                  sendCourse={editedCourse}
                />
              </DialogBox>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Typography>
        {courseData.length === 0 ? (
          <Typography sx={{ textAlign: "center" }}>
            {"No course were added"}
          </Typography>
        ) : (
          <>{courseData.map((item, index) => getMapData(item, index))}</>
        )}
      </Typography>
    </Box>
  );
};

export default Course;
