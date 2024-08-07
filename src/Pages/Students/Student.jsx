import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Endpoints } from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import Appbar from "../../components/Appbar";
import DialogBox from "../../components/Dialog";
import { setDialogOpen } from "../../reducers/DialogBoxSlice";
import {
  setSnackBarClose,
  setSnackBarOpen,
  SnackbarType,
} from "../../reducers/SnacbarSlice";
import Addmission from "../Addmission/Addmission";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Students = () => {
  const [userData, setData] = useState([]);
  const [editedStudentData, setEditedStudentData] = useState();

  //opendialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  //axios
  useEffect(() => {
    getStudentsData();
  }, []);

  const dispatch = useDispatch();

  //get student
  const getStudentsData = () => {
    instance
      .get(Endpoints.student)
      .then((res) => {
        console.log("get students", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("cant get the student " + err);
        dispatch(
          setSnackBarOpen({
            type: SnackbarType.error,
            message: "Failed to fetched student data!!!",
          })
        );
      });
  };

  //Add student
  const addStudent = (params) => {
    instance
      .post(Endpoints.registerStudent, params)
      .then((res) => {
        console.log("student added", res.data.data);
        getStudentsData();
        handleClose();
        dispatch(
          setSnackBarOpen({
            type: SnackbarType.success,
            message: "Student added successfully",
          })
        );
      })
      .catch((err) => {
        console.log("student didnt added!!! " + err);
        dispatch(
          setSnackBarClose({
            type: SnackbarType.error,
            message: "Failed to add student!!!",
          })
        );
      });
  };

  //updateStudent
  const updateStudent = (updateID) => {
    instance
      .post(Endpoints.updateStudents, updateID)
      .then((res) => {
        console.log("updated Succesfully", res.data.data);
        setEditedStudentData(res.data.data);
        handleClose();
        dispatch(
          setSnackBarOpen({
            type: SnackbarType.success,
            message: "Student updated successfully",
          })
        );
      })
      .catch((err) => {
        console.error("cant updated!!! ", err);
        dispatch(
          setSnackBarClose({
            type: SnackbarType.error,
            message: "Failed to update student!!!",
          })
        );
      });
  };

  //edit button
  const handleEdit = (studentId) => {
    setOpen(true);
    instance
      .get(Endpoints.student + studentId)
      .then((res) => {
        console.log("single data occured " + res.data.data);
        setEditedStudentData(res.data.data);
      })
      .catch((err) => {
        console.log("single data not occurred" + err);
      });
  };

  //delete button
  const handleDelete = (params) => {
    instance
      .delete(Endpoints.student + params)
      .then((res) => {
        console.log("student deleted successfully" + res.data);
        getStudentsData();
        dispatch(
          setSnackBarOpen({
            type: SnackbarType.success,
            message: "Student deleted successfully",
          })
        );
      })
      .catch((err) => {
        console.log("not deleted" + err);
        dispatch(
          setSnackBarClose({
            type: SnackbarType.error,
            message: "Failed to delete student!!!",
          })
        );
      });
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
      if (editedStudentData) {
        updateStudent(params);
      } else {
        addStudent(params);
      }
    } else {
      console.log("validation failed");
    }
  };

  const handleAddStudent = () => {
    setOpen(true);
    setEditedStudentData(undefined);
  };

  const getTableHeads = () => {
    return (
      <TableRow>
        <StyledTableCell>Name</StyledTableCell>
        <StyledTableCell align="center">Contact</StyledTableCell>
        <StyledTableCell align="center">E-Mail</StyledTableCell>
        <StyledTableCell align="center">Date of Joining</StyledTableCell>
        <StyledTableCell align="center">Qualification</StyledTableCell>
        <StyledTableCell align="center">Course</StyledTableCell>
        <StyledTableCell align="center">Action</StyledTableCell>
      </TableRow>
    );
  };

  const getTableBody = (row, index) => {
    return (
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row">
          {row.studentname}
        </StyledTableCell>
        <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
        <StyledTableCell align="center">{row.email}</StyledTableCell>
        <StyledTableCell align="center">{row.dateOfJoining}</StyledTableCell>
        <StyledTableCell align="center">
          {row.highestQualification}
        </StyledTableCell>
        <StyledTableCell align="center">{row.selectCourse}</StyledTableCell>
        <StyledTableCell align="center">
          <Button
            color="success"
            onClick={() => {
              handleEdit(row._id);
            }}
          >
            <EditIcon />
          </Button>
          <Button
            color="error"
            onClick={() => {
              handleClickDeleteOpen(row._id);
            }}
          >
            <DeleteIcon />
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    );
  };

  //delete popup
  const handleClickDeleteOpen = (deleteId) => {
    console.log("delete id", deleteId);
    dispatch(
      setDialogOpen({
        title: "Are you sure to delete the student?",
        message: "Are you sure, because this procedure cannot be undo!!!",
        response: (ActionType) => {
          if (ActionType === "positive") {
            handleDelete(deleteId);
            dispatch(
              setSnackBarOpen({
                type: SnackbarType.success,
                message: "Student deleted successfully",
              })
            );
          }
          if (ActionType === "negative") {
            dispatch(
              setSnackBarOpen({
                type: SnackbarType.error,
                message: "Failed to delete student",
              })
            );
          }
        },
      })
    );
  };

  return (
    <Box>
      <Appbar>
        <Button variant="contained" onClick={handleAddStudent}>
          Add Student
        </Button>
        {open && (
          <DialogBox openTrue={open} closeTrue={(event) => setOpen(event)}>
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
        <>
          <TableContainer component={Card}>
            <Table aria-label="customized table">
              <TableHead>{getTableHeads()}</TableHead>
              <TableBody>
                {userData.map((row, index) => getTableBody(row, index))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default Students;
