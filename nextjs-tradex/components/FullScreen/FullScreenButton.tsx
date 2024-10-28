'use client';
import { FullScreenSvg } from '../theme/SVGs';
import React, { useState } from 'react';
import { CloseSvg } from '../theme/SVGs';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';

const FullScreenButton = ({
  handle,
  isIOS
}: {
  handle: any;
  isIOS: boolean;
}) => {
  const { theme, setTheme } = useTheme();
  const [initialTheme, setInitialTheme] = useState(
    theme === 'dark' ? 'dark' : 'light'
  );
  if (isIOS) return null;

  const enterFullScreen = async () => {
    setTheme('dark');
    await handle.enter();
  };

  const exitFullScreen = async () => {
    await handle.exit();
    setTheme(initialTheme);
  };

  return (
    <div className="">
      {handle.active ? (
        <Button
          variant="ghost"
          size="toolbarIcon"
          type="button"
          onClick={exitFullScreen}
        >
          <CloseSvg />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => {
            setInitialTheme(theme === 'dark' ? 'light' : 'dark');
            enterFullScreen();
          }}
        >
          <FullScreenSvg />
        </Button>
      )}
    </div>
  );
};

export default FullScreenButton;
