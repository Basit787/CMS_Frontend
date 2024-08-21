import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Endpoints } from "../../../apis/apiContsants";
import instance from "../../../apis/apiRequest";
import useSnackBarStore, { SnackbarType } from "../../../stores/SnacbarStore";

const AddChapter = () => {
  const location = useLocation();
  const { courseId, editId } = location?.state;

  const { openSnackbar } = useSnackBarStore((state) => state);

  //chapterForm form
  const [chapterForms, setChapterForms] = useState({
    courseId,
    title: "",
    description: "",
    concepts: [],
    references: [],
    _id: editId,
  });

  //useEffect for submitiing and editing data
  useEffect(() => {
    if (editId) {
      editChapter();
    }
  }, [editId]);

  //input values
  const handleChange = (event) => {
    event.preventDefault();
    setChapterForms((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  //Add chapter
  const addChapter = async (chapterData) => {
    try {
      const res = await instance.post(Endpoints.addChapterApi, chapterData);
      console.log("chapter added", res.data.data);
      openSnackbar({
        message: "Chapter added successfully",
        type: SnackbarType.success,
      });
      // navigate();
    } catch (err) {
      console.log("chapter didnt added!!! " + err);
      openSnackbar({
        message: "failed to added the chapter !!!",
        type: SnackbarType.error,
      });
    }
  };

  //updating the chapter

  const updateChapter = async (data) => {
    try {
      const res = await instance.post(Endpoints.updateChapterApi, data);
      console.log("course updated successfully", res.data.data);
      setChapterForms(res.data.data);
      openSnackbar({
        message: "Chapter updated successfully",
        type: SnackbarType.success,
      });
    } catch (err) {
      console.log("cant updated the student", err);
      openSnackbar({
        message: "Failed to update the chapter!!!",
        type: SnackbarType.error,
      });
    }
  };

  const editChapter = async () => {
    try {
      const res = await instance.get(Endpoints.chapterApi + editId);
      console.log("single chapter data received:", res.data.data);
      setChapterForms(res.data.data);
    } catch (err) {
      console.log("cant get the single chapter data: ", err);
    }
  };

  //submiting and updating the course
  const navigate = useNavigate();
  const handleSubmit = () => {
    const data = {
      ...chapterForms,
    };
    editId ? updateChapter(data) : addChapter(data);
    navigate(-1);
  };

  // adding concepts in form
  const [addConcept, setAddConcept] = useState([]);
  const handleConcepts = (event) => {
    setAddConcept(event.target.value);
  };
  const clickConcept = () => {
    chapterForms.concepts.push(addConcept);
    setAddConcept("");
  };

  //delete the concepts
  const deleteConcepts = (delCon) => {
    const delConcept = [...chapterForms.concepts];
    delConcept.splice(delCon, 1);
    setChapterForms((prv) => ({
      ...prv,
      concepts: delConcept,
    }));
  };

  const editClickConcept = (e) => {
    setChapterForms((previousData) => ({
      ...previousData,
      concepts: { [e.target.name]: e.target.value },
    }));
  };

  //adding references in form
  const [addReferences, setAddReferences] = useState([]);
  const handleReferences = (e) => {
    setAddReferences(e.target.value);
  };
  const clickReferences = () => {
    chapterForms.references.push(addReferences);
    setAddReferences("");
  };

  //delete the refrences
  const deleteReferences = (delRef) => {
    const delReferences = [...chapterForms.references];
    delReferences.splice(delRef, 1);
    setChapterForms((prv) => ({
      ...prv,
      references: delReferences,
    }));
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
    >
      <Paper className="mainSyllabus">
        <Box>
          <h1>{editId ? "Update the chapter" : "Add the chapter"}</h1>
        </Box>
        <Box className="form">
          <Box className="input-syllabus">
            <TextField
              label="Title"
              variant="outlined"
              className="syllabus"
              autoComplete="off"
              onChange={handleChange}
              name="title"
              value={chapterForms.title}
            />
            <TextField
              label="Description"
              variant="outlined"
              className="syllabus"
              autoComplete="off"
              onChange={handleChange}
              name="description"
              value={chapterForms.description}
            />

            {/* concepts */}
            <h1>Concepts</h1>
            <Box>
              <TextField
                variant="outlined"
                autoComplete="off"
                onChange={handleConcepts}
                value={addConcept}
                name="addConcept"
                sx={{ width: "100%" }}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    clickConcept();
                  }
                }}
              />
            </Box>
            <Divider />
            <Box>
              <Box>
                {chapterForms.concepts.map((item, value) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <Box>
                      <TextField
                        variant="outlined"
                        autoComplete="off"
                        onChange={editClickConcept}
                        value={item}
                        sx={{ width: "25rem" }}
                        name="addConcept"
                      />
                    </Box>
                    <Button color="error" onClick={() => deleteConcepts(value)}>
                      <DeleteIcon />
                    </Button>
                  </Box>
                ))}
              </Box>
              <Button
                variant="outlined"
                className="concept-btn"
                onClick={clickConcept}
                sx={{ height: "40px" }}
              >
                Add
              </Button>
            </Box>

            {/* reference */}
            <h1>References</h1>
            <Box>
              <TextField
                variant="outlined"
                autoComplete="off"
                onChange={handleReferences}
                value={addReferences}
                name="addReference"
                sx={{ width: "100%" }}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    clickReferences();
                  }
                }}
              />
            </Box>
            <Divider />
            <Box>
              <Box>
                {chapterForms.references.map((item, value) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                    key={value}
                  >
                    <Box>
                      <TextField
                        variant="outlined"
                        autoComplete="off"
                        onChange={handleReferences}
                        value={item}
                        sx={{ width: "25rem" }}
                        name="addReference"
                      />
                    </Box>
                    <Button
                      color="error"
                      onClick={() => deleteReferences(value)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                ))}
              </Box>
              <Button
                variant="outlined"
                className="concept-btn"
                onClick={clickReferences}
                sx={{ height: "40px" }}
              >
                Add
              </Button>
            </Box>
          </Box>
          <Button
            variant="contained"
            type="submit"
            className="submit-btn"
            onClick={handleSubmit}
          >
            {editId ? "update" : "submit"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddChapter;
