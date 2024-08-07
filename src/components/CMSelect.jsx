import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const CMSelect = (props) => {
  return (
    <FormControl className="w-full">
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        {...props}
      >
        <MenuItem value="" disabled>
          Select Option
        </MenuItem>
        {props.options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CMSelect;
