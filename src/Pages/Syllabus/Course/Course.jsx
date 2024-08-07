import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Card } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../../apis/apiContsants";
import instance from "../../../apis/apiRequest";
import DialogBox from "../../../components/Dialog";
import { setDialogOpen } from "../../../reducers/DialogBoxSlice";
import { setSnackBarOpen, SnackbarType } from "../../../reducers/SnacbarSlice";
import CourseAdd from "./CourseAdd";

const Course = () => {
  const [courseData, setCourseData] = useState([]);
  const [editedCourse, setEditedCourse] = useState(); //props send
  const [open, setOpen] = useState(false); //dialog box

  useEffect(() => {
    getCourseData();
  }, []);

  const dispatch = useDispatch();

  //getCourse
  const getCourseData = () => {
    instance
      .get(Endpoints.courseApi, { params: courseData._id })
      .then((res) => {
        console.log("get course", res.data.data);
        setCourseData(res.data.data);
      })
      .catch((err) => {
        console.log("cant get the course " + err);
      });
  };
  //add course
  const addCourseData = (params) => {
    instance
      .post(Endpoints.addCourseApi, params)
      .then((res) => {
        console.log("get course", res.data.data);
        getCourseData();
        handleClose();
      })
      .catch((err) => {
        console.log("can't add the course " + err);
      });
  };

  //updateCourse
  const updateCourseData = (params) => {
    instance
      .post(Endpoints.updateCourseApi, params)
      .then((res) => {
        console.log("course updated", res.data.data);
        getCourseData();
        handleClose();
      })
      .catch((err) => {
        console.log("can't update the course " + err);
      });
  };

  //editCourse by getting single _id
  const editCourseData = (params) => {
    setOpen(true);
    instance
      .get(Endpoints.courseApi + params)
      .then((res) => {
        console.log("get single course", res.data.data);
        setEditedCourse(res.data.data);
        // handleClose();
      })
      .catch((err) => {
        console.log("can't add the  course " + err);
      });
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
    dispatch(
      setDialogOpen({
        title: "Confirm Deletion",
        message: "Do you really want to delete the course",
        response: (ActionType) => {
          if (ActionType === "positive") {
            deleteCourseData(courseId);
            dispatch(
              setSnackBarOpen({
                message: "Course deleted successfully",
                type: SnackbarType.success,
              })
            );
          } else {
            dispatch(
              setSnackBarOpen({
                message: "Failed to delete the course",
                type: SnackbarType.error,
              })
            );
          }
        },
      })
    );
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
            <DialogBox openTrue={open} closeTrue={() => setOpen(false)}>
              <CourseAdd
                onSubmit={submitCourseForm}
                sendCourse={editedCourse}
              />
            </DialogBox>
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
