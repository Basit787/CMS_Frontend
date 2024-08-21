import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Card,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Endpoints } from "../../../apis/apiContsants";
import instance from "../../../apis/apiRequest";
import useDialogBoxStore from "../../../stores/DialogBoxStore";
import useSnackBarStore, { SnackbarType } from "../../../stores/SnacbarStore";

const Chapter = () => {
  const location = useLocation();
  const { courseTitle, courseId } = location?.state;
  //Syllabus data
  const [chapter, setChapter] = useState([]);
  const navigate = useNavigate();

  const { openDialog } = useDialogBoxStore((state) => state);
  const { openSnackbar } = useSnackBarStore((state) => state);

  //navigate to add course form
  const openChapterForm = () => {
    navigate("/addChapter", { state: { courseId } });
  };

  //useffect for getChapter
  useEffect(() => {
    getChapters();
  }, []);

  //get chapter
  const getChapters = async () => {
    try {
      const res = await instance.get(Endpoints.chapterApi, {
        params: { courseId: courseId },
      });
      console.log("get chapter", res.data.data);
      setChapter(res.data.data);
    } catch (err) {
      console.log("cant get the chapter " + err);
      openSnackbar({
        message: "Failed to fetch the course!!!",
        type: SnackbarType.error,
      });
    }
  };

  //delete button
  const handleDeleteChapter = async (chap) => {
    try {
      await instance.delete(Endpoints.chapterApi + chap);
      console.log("chapter deleted successfully");
      getChapters();
      openSnackbar({
        message: "The chapter deleted successfully",
        type: SnackbarType.success,
      });
    } catch (err) {
      console.log("chapter not deleted" + err);
      openSnackbar({
        message: "Failed to delete the chapter!!!",
        type: SnackbarType.error,
      });
    }
  };

  //Delete popup
  const handleDeleteOpen = (id, title) => {
    openDialog({
      title: `Delete ${title}`,
      message: "Are you sure you want to delete the chapter",
      response: (ActionType) => {
        if (ActionType === "positive") {
          handleDeleteChapter(id);
        } else if (ActionType === "negative") {
          console.log("Failed to perform action");
        }
      },
    });
  };

  //edit
  const handleEditChapter = (id) => {
    navigate("/addChapter", { state: { editId: id } });
  };
  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <h2>
              Course: <i>{courseTitle}</i>
            </h2>
          </Box>
          <Box>
            <Button variant="contained" onClick={openChapterForm}>
              Add Chapter
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {chapter.length === 0 ? (
        <Typography>{"No chapter were added till !!!"}</Typography>
      ) : (
        chapter.map((item) => (
          <Card className="m-2">
            <Accordion className="p-2">
              <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                <Box className="grid grid-cols-2 md:flex md:justify-between w-full">
                  <h2 className="break-words">{item.title}</h2>
                  <Box className="flex flex-col md:flex-row">
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
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box className="flex flex-col gap-3">
                  <p className="break-words">{item.description}</p>
                  <Box className="flex flex-col md:flex-row gap-4">
                    <Box className="w-1/2">
                      <h3>Concepts</h3>
                      <ul className="w-full">
                        {item.concepts.map((concpets) => (
                          <li>{concpets}</li>
                        ))}
                      </ul>
                    </Box>
                    <Box className="w-1/2">
                      <h3>Reference</h3>
                      <ul className="w-full">
                        {item.references.map((references) => (
                          <li>
                            <Link href={references} target="_blank">
                              {references}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Chapter;
