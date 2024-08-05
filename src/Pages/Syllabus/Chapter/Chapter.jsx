import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../../apis/apiRequest";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { chapterApi, Endpoints } from "../../../apis/apiContsants";

const Chapter = () => {
  //uselocation to get the heading from add_course page

  const location = useLocation();
  const { courseTitle, courseId } = location.state;
  //Syllabus data
  const [chapter, setChapter] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState();
  const [deleteName, setDeleteName] = useState();

  // usenavigate
  const navigate = useNavigate();

  //navigate to add course form
  const openChapterForm = () => {
    // console.log("the id is" + id);
    navigate("/addChapter", { state: { courseId } });
  };

  //useeffect for getChapter
  useEffect(() => {
    getChapters();
  }, []);

  //get chapter
  const getChapters = () => {
    instance
      .get(Endpoints.chapterApi, { params: { courseId: courseId } })
      .then((res) => {
        console.log("get chapter", res.data.data);
        setChapter(res.data.data);
      })
      .catch((err) => {
        console.log("cant get the chapter " + err);
      });
  };

  //delete button

  const handleDeleteChapter = (chap) => {
    instance
      .delete(Endpoints.chapterApi + chap)
      .then(() => {
        console.log("chapter deleted successfully");
        getChapters();
        handleDeleteClose();
      })
      .catch((err) => {
        console.log("chapter not deleted" + err);
      });
  };

  //Delete popup

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleDeleteOpen = (id, title) => {
    setConfirmDelete(id);
    setDeleteName(title);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  //edit
  const handleEditChapter = (id) => {
    navigate("/addChapter", { state: { editId: id } });
  };
  return (
    <Box>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <h2>
              Course: <i>{courseTitle}</i>
            </h2>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={openChapterForm}
            >
              Add Chapter
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {chapter.length === 0 ? (
        <Typography>{"No chapter were added till !!!"}</Typography>
      ) : (
        chapter.map((item) => (
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<GridExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <h2>{item.title}</h2>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        margin: "10px",
                      }}
                    >
                      {/* edit button */}
                      <Button
                        color="success"
                        onClick={() => handleEditChapter(item._id)}
                      >
                        <EditIcon />
                      </Button>
                      {/* delete button */}

                      <Button
                        color="error"
                        onClick={() => handleDeleteOpen(item._id, item.title)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                        <DialogTitle id="alert-dialog-title">
                          {"Confirm Deletion"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Do you really want to delete{" "}
                            <b>
                              <big>{deleteName}</big>
                            </b>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            onClick={handleDeleteClose}
                          >
                            Disagree
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteChapter(confirmDelete)}
                            autoFocus
                          >
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <p>{item.description}</p>
                    <h3>Concepts</h3>
                    <ul>
                      {item.concepts.map((concpets) => (
                        <li>{concpets}</li>
                      ))}
                    </ul>
                    <h3>Reference</h3>
                    <ul>
                      {item.references.map((references) => (
                        <li>
                          <Link href={references} target="_blank">
                            {references}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Chapter;
