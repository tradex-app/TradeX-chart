////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

const OperationModes = {
  None: 0,
  DragReady: 1,
  Dragging: 2,
};

class Point {
  constructor() {
    this.set(...arguments);
  }

  set() {
    if (arguments.length === 0) {
      this.x = 0; this.y = 0;
    } else if (arguments.length === 1) {
      const { x, y } = arguments[0];
      this.x = x; this.y = y;
    } else if (arguments.length > 1) {
      const [x, y] = arguments;
      this.x = x; this.y = y;
    }
  }

  clone() {
    return new Point(this.x, this.y);
  }
}

export { OperationModes, Point };
