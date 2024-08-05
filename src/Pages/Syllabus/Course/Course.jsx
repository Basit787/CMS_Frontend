import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  Card,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Endpoints} from "../../../apis/apiContsants";
import instance from "../../../apis/apiRequest";
import AddCourse from "./Course Form/AddCourse";
import "./Course.scss";

const Course = () => {
  const [courseData, setCourseData] = useState([]);
  const [editedCourse, setEditedCourse] = useState(); //props send
  const [open, setOpen] = useState(false); //dialog box
  const [dialogBoxDelete, setDialogBoxDelete] = useState();
  const [deleteName, setDeleteName] = useState();

  useEffect(() => {
    getCourseData();
  }, []);
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
        handleDeleteClose();
      })
      .catch((err) => {
        console.log("can't delete the  course " + err);
      });
  };

  //deletecourse pop-up
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteClickOpen = (courseId, courseTitle) => {
    setDialogBoxDelete(courseId);
    setDeleteName(courseTitle);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
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
    navigate("/course/chapter", { state: { courseId: Id, courseTitle: title } });
  };
  return (
    <Box>
      <Box>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {courseData.length === 0 ? (
              <Typography sx={{ fontSize: "2rem", fontWeight: "bolder" }}>
                {"Add Course"}
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "2rem", fontWeight: "bolder" }}>
                {"Select Course"}
              </Typography>
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
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <AddCourse
                    onSubmit={submitCourseForm}
                    sendCourse={editedCourse}
                  />
                </DialogContent>
              </Dialog>
            </Box>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          {courseData.length === 0 ? (
            <Typography sx={{ textAlign: "center" }}>
              {"No course were added"}
            </Typography>
          ) : (
            <>
              {courseData.map((item, index) => (
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                  key={index}
                >
                  <Box className="courses">
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "10px",
                      gap: "10px",
                    }}
                  >
                    {/* edit button */}
                    <Button
                      color="success"
                      onClick={() => {
                        editCourseData(item._id);
                      }}
                    >
                      <EditIcon />
                    </Button>

                    {/* delete button */}
                    <Button
                      color="error"
                      onClick={() =>
                        handleDeleteClickOpen(item._id, item.title)
                      }
                    >
                      <DeleteIcon />
                    </Button>
                    <Dialog
                      open={deleteOpen}
                      onClose={handleDeleteClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Confirm Deletion"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          `Do you really want to delete the{" "}
                          <b>
                            <big>{deleteName}</big>
                          </b>
                          , this step is undone!!!`
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDeleteClose} variant="contained">
                          Disagree
                        </Button>
                        <Button
                          onClick={() => deleteCourseData(dialogBoxDelete)}
                          variant="contained"
                          color="error"
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* view button */}
                    <Button
                      onClick={() => {
                        viewCourseData(item._id, item.title);
                      }}
                    >
                      <RemoveRedEyeIcon />
                    </Button>
                  </Box>
                </Card>
              ))}
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default Course;
