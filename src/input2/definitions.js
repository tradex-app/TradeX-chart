// definitions.js

export const status = {
  idle: 0,
  dragStart: 1,
  dragging: 2
}

export class Point {

  x = 0; 
  y = 0;

  constructor() {

    if (arguments.length === 1) {
      const { x, y } = arguments[0];
      this.x = x; 
      this.y = y;
    } else if (arguments.length > 1) {
      const [x, y] = arguments;
      this.x = x;
      this.y = y;
    }
  }

  clone() {
    return new Point(this.x, this.y);
  }
}
