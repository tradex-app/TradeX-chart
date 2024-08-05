import { FullScreenSvgTheme } from "../theme/svg";
import Button from "../Button";
import React from "react";
import { CloseSvg } from "../theme/svg/CloseSvg";
const FullScreenButton = ({ handle, isIOS }) => {
  if (isIOS) return null;

  return (
    <div className="flex flex-row justify-end items-center">
      {handle.active ? (
        <Button
          variant="neutral"
          size="small"
          type="button"
          onClick={handle.exit}
        >
          <CloseSvg />
        </Button>
      ) : (
        <Button
          variant="inactive"
          size="small"
          type="button"
          onClick={handle.enter}
        >
          <FullScreenSvgTheme />
        </Button>
      )}
    </div>
  );
};

export default FullScreenButton;
