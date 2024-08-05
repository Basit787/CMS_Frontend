import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import React, { useEffect, useState } from "react";
import {
  Endpoints
} from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import Addmission from "../Addmission/Addmission";
import "./student.scss";
import StudentId from "./StudentId";

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
  //axios
  const [userData, setData] = useState([]);

  //edit

  const [editedStudentData, setEditedStudentData] = useState();

  //pagination
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //delete popup

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [idOpen, setIdOpen] = useState(false);

  // dialogbox
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //axios
  useEffect(() => {
    getStudentsData();
  }, []);

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
      })
      .catch((err) => {
        console.log("student didnt added!!! " + err);
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
      })
      .catch((err) => {
        console.error("cant updated!!! ", err);
      });
  };

  //edit button

  const handleEdit = (studentId) => {
    handleClickOpen();
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
        handleDeleteClose();
      })
      .catch((err) => {
        console.log("not deleted" + err);
        handleDeleteClose();
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

  //pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //delete popup
  const handleClickDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  //View Id
  const handleView = (studentId) => {
    handleClickIdOpen();
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
  //open Id
  const handleClickIdOpen = () => {
    setIdOpen(true);
  };
  const handleIdClose = () => {
    setIdOpen(false);
  };
  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                maxWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  handleClickOpen();
                  setEditedStudentData(undefined);
                }}
              >
                Add Student
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogActions>
                  <Addmission
                    onSubmit={onSubmitClick}
                    sendStudentData={editedStudentData}
                  />
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {userData.length === 0 ? (
        <Typography sx={{ textAlign: "center" }}>
          {"No students were added"}
        </Typography>
      ) : (
        <>
          <Box sx={{ my: 2, mx: 2 }} color="text.secondary" align="center">
            <Box
              sx={{
                my: 1,
                mx: 1,
                padding: "10px",
                // overflowY: "auto",
                height: "500px",
              }}
              color="text.secondary"
              align="center"
              className="scrollbar-hidden"
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="center">Contact</StyledTableCell>
                      <StyledTableCell align="center">E-Mail</StyledTableCell>
                      <StyledTableCell align="center">
                        Date of Joining
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Qualification
                      </StyledTableCell>
                      <StyledTableCell align="center">Course</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <StyledTableRow key={row.studentname}>
                          <StyledTableCell component="th" scope="row">
                            {row.studentname}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.phoneNumber}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.email}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.dateOfJoining}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.highestQualification}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.selectCourse}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {/* edit button */}
                            <Button
                              color="success"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEdit(row._id);
                              }}
                            >
                              <EditIcon />
                            </Button>

                            {/* delete button */}
                            <Button
                              color="error"
                              onClick={handleClickDeleteOpen}
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
                                {"Are you sure to delete the student?"}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are you sure, because this procedure cannot be
                                  undo!!!
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleDeleteClose}>
                                  <Button>Cancel</Button>
                                </Button>
                                <Button
                                  onClick={() => handleDelete(row._id)}
                                  autoFocus
                                >
                                  <Button>Sure</Button>
                                </Button>
                              </DialogActions>
                            </Dialog>

                            {/* view button */}
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                handleView(row._id);
                              }}
                            >
                              <RemoveRedEyeIcon />
                            </Button>
                            <Dialog
                              open={idOpen}
                              onClose={handleIdClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogContent>
                                <StudentId
                                  sendStudentData={editedStudentData}
                                />
                              </DialogContent>
                            </Dialog>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        color="secondary"
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        colSpan={7}
                        count={userData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ backgroundColor: "#D6CFCD" }}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Students;
