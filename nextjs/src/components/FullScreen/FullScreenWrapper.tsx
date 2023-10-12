import React, { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function iOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

const FullScreenWrapper = ({ children, ...props }) => {
  const handle = useFullScreenHandle();
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(iOS());
  }, []);

  return (
    <FullScreen handle={handle} className="h-full w-full">
      {children({ handle, isIOS, ...props })}
    </FullScreen>
  );
};

export default FullScreenWrapper;
