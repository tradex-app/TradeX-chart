import React from "react";
import useTheme from "../hooks/useTheme";

const withThemeSvg = (Component) => {
  return (props) => {
    const { isLightTheme } = useTheme();
    const color = isLightTheme ? "#232635" : "#ffffff";

    return <Component {...props} color={color} />;
  };
};

export default withThemeSvg;
