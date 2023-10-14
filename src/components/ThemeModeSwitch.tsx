import { FormControlLabel, Switch } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import React from "react";

const ThemeModeSwitch = (props: {
  useDark: boolean;
  onChange: (_e: any, checked: boolean) => void;
}) => {
  return (
    <FormControlLabel
      labelPlacement="end"
      label={props.useDark ? <DarkModeIcon /> : <LightModeIcon />}
      control={<Switch checked={props.useDark} onChange={props.onChange} />}
    />
  );
};

export default ThemeModeSwitch;
