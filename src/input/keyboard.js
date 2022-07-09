////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

const Keys = {
  Backspace: 8, Tab: 9, Enter: 13,
  Shift: 16, Control: 17, Alt: 18,

  Escape: 27, Space: 32, PageUp: 33, PageDown: 34,
  End: 35, Home: 36,
  Left: 37, Up: 38, Right: 39, Down: 40,
  Insert: 45, Delete: 46,

  D0: 48, D1: 49, D2: 50, D3: 51, D4: 52,
  D5: 53, D6: 54, D7: 55, D8: 56, D9: 57,

  A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71,
  H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78,
  O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84,
  U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,

  Command_Firefox: 224, Command_Opera: 17,
  Command_Left: 91, Command_Right: 93,
  
  Multiply: 106, Add: 107, Subtract: 108, Divide: 111,

  Backquote: 192,
};

const FunctionKeys = {
  Control: 0x1000,
  Alt: 0x2000,
  Shift: 0x4000,
  Command: 0x10000,
  Windows: 0x20000,
};

const functionKeyCode = [
  Keys.Control, Keys.Shift, Keys.Alt,
  Keys.Command_Left, Keys.Command_Right,
  Keys.Command_Firefox, Keys.Command_Opera
];

function isFunctionKey(keyCode) {
  return functionKeyCode.includes(keyCode);
}

export class KeyboardAgent {
  constructor(controller) {
    this.controller = controller;
    this.element = controller.element;

    this.lastKeyCode = 0;
    this.pressedKeys = [];

    this.attach();
  }

  attach() {
    const controller = this.controller;
    const element = this.element;

    element.addEventListener("keydown", e => {
      this.pressedKeys._t_pushIfNotExist(e.keyCode);
      this.lastKeyCode = e.keyCode;
      
      const arg = this.createEventArgument(e);

      if (arg.isHotkey) {
        controller.raise(this, "hotkey", arg);
      }

      if (!arg.isProcessed) {
        controller.raise(this, "keydown", arg);
      }

      if (arg.isProcessed) {
        e.preventDefault();
        return false;
      }
    });

    element.addEventListener("keyup", (e) => {
      this.pressedKeys._t_remove(e.keyCode);
      this.lastKeyCode = e.keyCode;

      const arg = this.createEventArgument(e);

      controller.raise(this, "keyup", arg);

      if (arg.isProcessed) {
        e.preventDefault();
        return false;
      }
    });

    // hotkey
    // window.addEventListener("keydown", e => {
    //   const arg = this.createEventArgument(e);
     
    //   if (arg.isHotkey) {
    //     controller.raise(this, "hotkey", arg);
    //   }

    //   if (arg.isProcessed) {
    //     e.preventDefault();
    //     return false;
    //   }
    // });

    element.addEventListener("blur", (e) => {
      this.pressedKeys = [];
    });

    window.addEventListener("blur", (e) => {
      this.pressedKeys = [];
    });
  }

  createEventArgument(e) {
    const arg = {
      domEvent: e,
     
      keyCode: e.keyCode,
      keyValue: e.keyCode, 
    };

    let functionKeyDown = false;

    if (e.ctrlKey) {
      arg.keyValue |= FunctionKeys.Control;
      functionKeyDown = true;
    }

    if (e.altKey) {
      arg.keyValue |= FunctionKeys.Alt;
      functionKeyDown = true;
    }

    if (e.shiftKey) {
      arg.keyValue |= FunctionKeys.Shift;
      functionKeyDown = true;
    }

    if (e.metaKey) {
      arg.keyValue |= FunctionKeys.Command;
      functionKeyDown = true;
    }

    if (functionKeyDown) {
      if (!isFunctionKey(e.keyCode)) arg.isHotkey = true;
    }

    return arg;
  }

  isKeyPressed(key) { 
    return this.pressedKeys.includes(key);
  }
}

export { Keys, FunctionKeys };