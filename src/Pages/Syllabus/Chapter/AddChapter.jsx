import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Paper, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Endpoints } from "../../../apis/apiContsants";
import instance from "../../../apis/apiRequest";
import useSnackBarStore, { SnackbarType } from "../../../stores/SnacbarStore";

const AddChapter = () => {
  const location = useLocation();
  const { courseId, editId } = location?.state;
  const { openSnackbar } = useSnackBarStore((state) => state);
  const navigate = useNavigate();

  const [chapterForms, setChapterForms] = useState({
    courseId,
    title: "",
    description: "",
    concepts: [],
    references: [],
    _id: editId,
  });

  const [newConcept, setNewConcept] = useState("");
  const [newReference, setNewReference] = useState("");

  useEffect(() => {
    if (editId) {
      editChapter();
    }
  }, [editId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChapterForms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConceptChange = (index, value) => {
    setChapterForms((prev) => ({
      ...prev,
      concepts: prev.concepts.map((concept, i) =>
        i === index ? value : concept
      ),
    }));
  };

  const handleReferenceChange = (index, value) => {
    setChapterForms((prev) => ({
      ...prev,
      references: prev.references.map((reference, i) =>
        i === index ? value : reference
      ),
    }));
  };

  const clickConcept = () => {
    if (newConcept.trim()) {
      setChapterForms((prev) => ({
        ...prev,
        concepts: [...prev.concepts, newConcept],
      }));
      setNewConcept("");
    }
  };

  const clickReference = () => {
    if (newReference.trim()) {
      setChapterForms((prev) => ({
        ...prev,
        references: [...prev.references, newReference],
      }));
      setNewReference("");
    }
  };

  const deleteConcept = (index) => {
    setChapterForms((prev) => ({
      ...prev,
      concepts: prev.concepts.filter((_, i) => i !== index),
    }));
  };

  const deleteReference = (index) => {
    setChapterForms((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const data = { ...chapterForms };
    editId ? updateChapter(data) : addChapter(data);
    navigate(-1);
  };

  const addChapter = async (chapterData) => {
    try {
      const res = await instance.post(Endpoints.addChapterApi, chapterData);
      openSnackbar({
        message: "Chapter added successfully",
        type: SnackbarType.success,
      });
    } catch (err) {
      openSnackbar({
        message: "Failed to add the chapter",
        type: SnackbarType.error,
      });
    }
  };

  const updateChapter = async (data) => {
    try {
      const res = await instance.post(Endpoints.updateChapterApi, data);
      setChapterForms(res.data.data);
      openSnackbar({
        message: "Chapter updated successfully",
        type: SnackbarType.success,
      });
    } catch (err) {
      openSnackbar({
        message: "Failed to update the chapter",
        type: SnackbarType.error,
      });
    }
  };

  const editChapter = async () => {
    try {
      const res = await instance.get(Endpoints.chapterApi + editId);
      setChapterForms(res.data.data);
    } catch (err) {
      console.log("Error fetching chapter data:", err);
    }
  };

  return (
    <Box className="flex justify-center items-center">
      <Paper
        variant="outlined"
        className="flex flex-col justify-center items-center md:w-1/2 p-4"
      >
        <h1>{editId ? "Update the chapter" : "Add the chapter"}</h1>
        <Box className="w-full">
          <Box className="grid md:grid-cols-2 gap-2">
            <TextField
              label="Title"
              name="title"
              onChange={handleChange}
              value={chapterForms.title}
              className="w-full"
            />
            <TextField
              label="Description"
              name="description"
              onChange={handleChange}
              value={chapterForms.description}
              className="w-full"
            />
          </Box>

          {/* Concepts */}
          <Box className="flex flex-col gap-4">
            <h1>Concepts</h1>
            <Box className="flex  gap-2">
              <TextField
                value={newConcept}
                onChange={(e) => setNewConcept(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && clickConcept()}
                placeholder="Add new concept"
                className="w-full"
              />
              <Button variant="outlined" onClick={clickConcept}>
                Add
              </Button>
            </Box>
            <Box className="grid md:grid-cols-2 gap-2">
              {chapterForms.concepts.map((item, index) => (
                <Box key={index} className="flex flex-row">
                  <TextField
                    value={item}
                    onChange={(e) => handleConceptChange(index, e.target.value)}
                    label={`Concept ${index + 1}`}
                    className="w-full"
                  />
                  <Button color="error" onClick={() => deleteConcept(index)}>
                    <DeleteIcon />
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>

          {/* References */}
          <Box className="flex flex-col gap-4">
            <h1>References</h1>
            <Box className="flex gap-2">
              <TextField
                value={newReference}
                onChange={(e) => setNewReference(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && clickReference()}
                placeholder="Add new reference"
                className="w-full"
              />
              <Button variant="outlined" onClick={clickReference}>
                Add
              </Button>
            </Box>
            <Box className="grid md:grid-cols-2 gap-2">
              {chapterForms.references.map((item, index) => (
                <Box key={index} className="flex flex-row">
                  <TextField
                    value={item}
                    onChange={(e) =>
                      handleReferenceChange(index, e.target.value)
                    }
                    label={`Reference ${index + 1}`}
                    className="w-full"
                  />
                  <Button color="error" onClick={() => deleteReference(index)}>
                    <DeleteIcon />
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="flex justify-center items-center mt-6">
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              {editId ? "Update" : "Submit"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddChapter;
