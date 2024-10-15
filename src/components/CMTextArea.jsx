import { TextareaAutosize } from "@mui/material";
import React from "react";

const CMTextArea = (props) => {
  return (
    <TextareaAutosize
      label={props.label}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      className={"w-full p-3 text-lg col-span-2"}
      {...props}
    />
  );
};

export default CMTextArea;
