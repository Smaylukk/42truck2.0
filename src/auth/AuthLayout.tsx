import React from "react";
import Box from "@mui/material/Box";
import { AuthAppBar } from "./AuthBar";
import { IThemeProps } from "../utils/interfaces";

export const AuthLayout: React.FC<React.PropsWithChildren & IThemeProps> = ({
  children,
  themeChanger,
  useDark,
}) => {
  return (
    <Box>
      <AuthAppBar themeChanger={themeChanger} useDark={useDark} />
      {children}
    </Box>
  );
};
