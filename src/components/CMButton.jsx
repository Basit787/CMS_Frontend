import { Button } from "@mui/material";
import React from "react";

const CMButton = (props) => {
  return (
    <Button {...props} className={"w-full"}>
      {props.name}
    </Button>
  );
};

export default CMButton;
