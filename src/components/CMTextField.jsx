import { TextField } from "@mui/material";
import React from "react";

const CMTextField = (props) => {
  return (
    <TextField
      label={props.label}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      className={"w-full"}
      {...props}
    />
  );
};

export default CMTextField;
