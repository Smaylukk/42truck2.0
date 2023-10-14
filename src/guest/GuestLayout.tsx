import React from "react";
import Box from "@mui/material/Box";
import { IThemeProps } from "../utils/interfaces";
import { GuestAppBar } from "./GuestBar";

export const GuestLayout: React.FC<React.PropsWithChildren & IThemeProps> = ({
  children,
  themeChanger,
  useDark,
}) => {
  return (
    <Box>
      <GuestAppBar themeChanger={themeChanger} useDark={useDark} />
      {children}
    </Box>
  );
};
