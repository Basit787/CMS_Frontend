import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Endpoints } from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import Appbar from "../../components/Appbar";
import CMTable from "../../components/CMTable";
import DialogBox from "../../components/Dialog";
import useDialogBoxStore from "../../stores/DialogBoxStore";
import useSnackBarStore, { SnackbarType } from "../../stores/SnacbarStore";
import Addmission from "../Addmission/Addmission";

const Students = () => {
  const [userData, setData] = useState([]);
  const [editedStudentData, setEditedStudentData] = useState();

  const { openDialog } = useDialogBoxStore((state) => state);
  const { openSnackbar } = useSnackBarStore((state) => state);

  //opendialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  //axios
  useEffect(() => {
    getStudentsData();
  }, []);

  //get student
  const getStudentsData = async () => {
    try {
      const res = await instance.get(Endpoints.student);
      console.log("get students", res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.log("cant get the student " + err);
      openSnackbar({
        type: SnackbarType.error,
        message: "Failed to fetched student data!!!",
      });
    }
  };

  //Add student
  const addStudent = async (params) => {
    try {
      const res = await instance.post(Endpoints.registerStudent, params);
      console.log("student added", res.data.data);
      handleClose();
      openSnackbar({
        type: SnackbarType.success,
        message: "Student added successfully",
      });
    } catch (err) {
      console.log("student didnt added!!! " + err);
      openSnackbar({
        type: SnackbarType.error,
        message: "Failed to add student!!!",
      });
    }
  };

  //updateStudent
  const updateStudent = async (updateID) => {
    try {
      const res = await instance.post(Endpoints.updateStudents, updateID);
      console.log("updated Succesfully", res.data.data);
      setEditedStudentData(res.data.data);
      handleClose();
      openSnackbar({
        type: SnackbarType.success,
        message: "Student updated successfully",
      });
    } catch (err) {
      console.error("cant updated!!! ", err);
      openSnackbar({
        type: SnackbarType.error,
        message: "Failed to update student!!!",
      });
    }
  };

  //edit button
  const handleEdit = async (studentId) => {
    setOpen(true);
    try {
      const res = await instance.get(Endpoints.student + studentId);
      console.log("single data occured " + res.data.data);
      setEditedStudentData(res.data.data);
    } catch (err) {
      console.log("single data not occurred" + err);
    }
  };

  //delete button
  const handleDelete = async (params) => {
    try {
      const res = await instance.delete(Endpoints.student + params);
      console.log("student deleted successfully" + res.data);
      openSnackbar({
        type: SnackbarType.success,
        message: "Student deleted successfully",
      });
    } catch (error) {
      console.log("not deleted" + error);
      openSnackbar({
        type: SnackbarType.error,
        message: "Failed to delete student!!!",
      });
    }
  };

  //Validation
  const getValidation = (formData) => {
    if (!formData.studentname || !formData.phoneNumber || !formData.email) {
      return false;
    }
    return true;
  };

  //submit data
  const onSubmitClick = (formData) => {
    if (getValidation(formData)) {
      const params = {
        ...formData,
      };
      editedStudentData ? updateStudent(params) : addStudent(params);
    } else {
      console.log("validation failed");
    }
  };

  const handleAddStudent = () => {
    setOpen(true);
    setEditedStudentData(undefined);
  };

  //delete popup
  const handleClickDeleteOpen = (deleteId, name) => {
    openDialog({
      title: `Are you sure to delete the student name ${name}?`,
      message: "Are you sure, because this procedure cannot be undo!!!",
      response: (ActionType) => {
        if (ActionType === "positive") {
          handleDelete(deleteId);
          openSnackbar({
            type: SnackbarType.success,
            message: "Student deleted successfully",
          });
        }
        if (ActionType === "negative") {
          openSnackbar({
            type: SnackbarType.error,
            message: "Failed to delete student",
          });
        }
      },
    });
  };

  const tablehead = [
    "Name",
    "Contact",
    "E-Mail",
    "Date of Joining",
    "Qualification",
    "Course",
    "Action",
  ];

  const tableBody = userData.map((data) => [
    data.studentname,
    data.phoneNumber,
    data.email,
    data.dateOfJoining,
    data.highestQualification,
    data.selectCourse,
    <Box key={data._id}>
      <Button onClick={() => handleEdit(data._id)} color="success">
        <EditIcon />
      </Button>
      <Button
        onClick={() => handleClickDeleteOpen(data._id, data.studentname)}
        color="error"
      >
        <DeleteIcon />
      </Button>
    </Box>,
  ]);
  return (
    <Box>
      <Appbar>
        <Button variant="contained" onClick={handleAddStudent}>
          Add Student
        </Button>
        {open && (
          <DialogBox close={(event) => setOpen(event)} className="w-full">
            <Addmission
              onSubmit={onSubmitClick}
              sendStudentData={editedStudentData}
            />
          </DialogBox>
        )}
      </Appbar>
      {userData.length === 0 ? (
        <Typography className="text-center">
          {"No students were added"}
        </Typography>
      ) : (
        <CMTable tableHead={tablehead} tableBody={tableBody} />
      )}
    </Box>
  );
};

export default Students;
