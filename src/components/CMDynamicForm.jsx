import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CMButton from "./CMButton";
import CMPassword from "./CMPassword";
import CMSelect from "./CMSelect";
import CMTextField from "./CMTextField";

const CMDynamicForm = ({ formFields, editedData, onSubmit }) => {
  const [formData, setFormData] = useState("");

  useEffect(() => {
    if (editedData) {
      setFormData(editedData);
    }
  }, [editedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const RenderField = (field) => {
    if (
      field.type === "text" ||
      field.type === "email" ||
      field.type === "date"
    ) {
      return (
        <CMTextField
          label={field.label}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          onChange={handleChange}
          value={formData[field.name]}
          {...field}
        />
      );
    } else if (field.type === "password") {
      return (
        <CMPassword
          label={field.label}
          onChange={handleChange}
          value={formData[field.name]}
          name={field.name}
          placeholder={field.placeholder}
          {...field}
        />
      );
    } else if (field.type === "select") {
      return (
        <CMSelect
          label={field.label}
          type={field.type}
          onChange={handleChange}
          value={formData[field.name]}
          name={field.name}
          {...field}
        />
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <Box className="flex flex-col gap-3">
      <h2 className="text-center">
        {editedData ? formFields.heading2 : formFields.heading}
      </h2>
      <p className="text-center">{formFields.description}</p>
      <Box
        className={`grid ${
          formFields.fields.length > 3 ? "md:grid-cols-2" : "grid-cols-1"
        } grid-cols-1 gap-3`}
      >
        {formFields.fields.map((field, index) => (
          <Box key={index}>{RenderField(field)}</Box>
        ))}
      </Box>
      <CMButton
        variant="contained"
        onClick={handleSubmit}
        name={editedData ? formFields?.btn2 : formFields?.btn}
      />
    </Box>
  );
};

export default CMDynamicForm;
