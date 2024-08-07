import { TextField } from "@mui/material";
import React from "react";

const CMTextField = (props) => {
  return (
    <TextField
      label={props.label}
      variant={props.variant || "outlined"}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      {...props}
      className={props.classname || "w-full"}
    />
  );
};

export default CMTextField;
