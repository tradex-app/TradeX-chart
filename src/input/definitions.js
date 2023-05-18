// definitions.js

import { isNumber } from "../utils/typeChecks";

export const status = {
  idle: 0,
  dragStart: 1,
  dragging: 2
}

export class Point {

  #x = 0; 
  #y = 0;

  constructor() {

    if (arguments.length === 1) {
      const { x, y } = arguments[0];
      this.x = x || 0;
      this.y = y || 0;
    }
    else if (arguments.length > 1) {
      const [x, y] = arguments;
      this.x = x || 0;
      this.y = y || 0;
    }
  }

  set x(x) { if (isNumber(x)) this.#x = x }
  get x() { return this.#x }
  set y(y) { if (isNumber(y)) this.#y = y }
  get y() { return this.#y }

  clone() {
    return new Point(this.x, this.y);
  }
}

// Keyboard events, key code definitions
// https://www.toptal.com/developers/keycode
// https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
// https://github.com/keithamus/jwerty/blob/master/jwerty.js
export const Keys = {
  // Backspace key, on Mac: ⌫ (Backspace)
  Backspace: 8, '⌫': 8,
  // Tab Key, on Mac: ⇥ (Tab), on Windows ⇥⇥
  Tab: 9, '⇥': 9, '⇆': 9,
  // Return key, ↩
  Enter: 13, '↩': 13, Return: 13, '⌅': 13,
  Shift: 16, '⇧': 16,
  // CTRL key, on Mac: ⌃
  Control: 17, '⌃': 17,
  // ALT key, on Mac: ⌥ (Alt)
  Alt: 18, Option: 18, '⌥': 18,
  // Caps Lock key, ⇪
  // Pause/Break key
  Pause: 19, PauseBreak: 19,
  CapsLock: 20, '⇪': 20, caps: 20,
  // Escape key, on Mac: ⎋, on Windows: Esc
  Escape: 27, esc: 27, '⎋': 27,
  Space: 32, 
  // Page-Up key, or pgup, on Mac: ↖
  PageUp: 33, '↖': 33,
  // Page-Down key, or pgdown, on Mac: ↘
  PageDown: 34, '↘': 34,
  // END key, on Mac: ⇟
  End: 35, '⇟': 35,
  // HOME key, on Mac: ⇞
  Home: 36, '⇞': 36,
  Left: 37, '←': 37,
  Up: 38, '↑': 38,
  Right: 39, '→': 39,
  Down: 40, '↓': 40,
  Insert: 45, Ins: 45,
  Delete: 46, Del: 45,

  D0: 48, D1: 49, D2: 50, D3: 51, D4: 52,
  D5: 53, D6: 54, D7: 55, D8: 56, D9: 57,

  A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71,
  H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78,
  O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84,
  U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,

  Command_Firefox: 224, Command_Opera: 17,
  // META, on Mac: ⌘ (CMD), on Windows (Win), on Linux (Super)
  Command_Left: 91, '⌘': 91,meta: 91,cmd: 91, 'super': 91, win: 91,
  Command_Right: 93,
  
  Multiply: 106, '*': 106,
  Add: 107, Plus: 107, '+': 107,
  Subtract: 108, Minus: 108, '-': 108,
  Divide: 111, Slash: 111, '/': 111,

  Backquote: 192,
};

export const FunctionKeys = {
  Control: 0x1000,
  Alt: 0x2000,
  Shift: 0x4000,
  Command: 0x10000,
  Windows: 0x20000,
};

export const functionKeyCode = [
  Keys.Control, Keys.Shift, Keys.Alt,
  Keys.Command_Left, Keys.Command_Right,
  Keys.Command_Firefox, Keys.Command_Opera
];

export function isFunctionKey(keyCode) {
  return functionKeyCode.includes(keyCode);
}
