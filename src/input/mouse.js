////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { OperationModes, Point } from "./defines";

const MouseButtons = {
  None: 0,
  Left: 1,
  Middle: 2,
  Right: 3,
};

class MouseAgent {
  constructor(controller) {
    this.controller = controller;
    this.element = controller.element;

    // current mouse position
    this.position = new Point();

    // amount of mouse movement difference
    this.movement = new Point();
    this.firstMovementUpdate = true;

    // draging start and end position
    this.dragstart = new Point();
    this.dragend = new Point();
    this.dragCheckThreshold = 3;

    // mouse wheel
    this.wheeldelta = 0;

    // current pressed mouse buttons
    this.pressedButtons = [];

    this.attach();
  }

  attach() {
    const element = this.element;
    const controller = this.controller;

    element.addEventListener("mousedown", (e) => {

      const clientRect = element.getBoundingClientRect();

      this.position.x = e.clientX - clientRect.left;
      this.position.y = e.clientY - clientRect.top;

      this.movement.x = 0;
      this.movement.y = 0;

      this.dragstart.x = this.position.x;
      this.dragstart.y = this.position.y;

      switch (e.button) {
        case 0: this.pressedButtons._t_pushIfNotExist(MouseButtons.Left); break;
        case 1: this.pressedButtons._t_pushIfNotExist(MouseButtons.Middle); break;
        case 2: this.pressedButtons._t_pushIfNotExist(MouseButtons.Right); break;
      }

      this.controller.operationMode = OperationModes.DragReady;
      
      controller.raise(this, "mousedown", this.createEventArgument(e));
    });
 
    element.addEventListener("mousemove", e => {
      
      if (controller.operationMode == OperationModes.DragReady) {
        if (Math.abs(this.position.x - this.dragstart.x) > this.dragCheckThreshold
          || Math.abs(this.position.y - this.dragstart.y) > this.dragCheckThreshold) {
          
          controller.raise(this, "begindrag", this.createEventArgument(e));
          controller.operationMode = OperationModes.Dragging;
        }
      }
      else if (controller.operationMode === OperationModes.None) {
        const clientRect = element.getBoundingClientRect();
        const client = {
          x: e.clientX - clientRect.left,
          y: e.clientY - clientRect.top
        }

        if (this.firstMovementUpdate) {
          this.movement.x = 0;
          this.movement.y = 0;
          this.firstMovementUpdate = false;
        } else {
          this.movement.x = client.x - this.position.x;
          this.movement.y = client.y - this.position.y;
        }

        this.position.x = client.x;
        this.position.y = client.y;

        if (Math.abs(this.movement.x) > 0 || Math.abs(this.movement.y) > 0) {
          controller.raise(this, "mousemove", this.createEventArgument(e));
        }
      }
    });
  
    element.addEventListener("wheel", (e) => {
      this.wheeldelta = e.wheelDelta;

      const arg = this.createEventArgument(e);
      controller.raise(this, "mousewheel", arg);
      
      if (arg.isProcessed) {
        e.preventDefault();
        return false;
      }
    }, { passive: false });

    element.addEventListener("mouseenter", (e) => {
      controller.raise(this, "mouseenter", this.createEventArgument(e));
    });

    element.addEventListener("mouseout", (e) => {
      controller.raise(this, "mouseout", this.createEventArgument(e));
    });

    window.addEventListener("mousemove", (e) => {

      const clientRect = element.getBoundingClientRect();
      
      const client = {
        x: e.clientX - clientRect.left,
        y: e.clientY - clientRect.top
      };

      // FIXME: first drag doesn't pass correct movement
      
      if (this.firstMovementUpdate) {
        this.movement.x = 0;
        this.movement.y = 0;
        this.firstMovementUpdate = false;
      } else {
        this.movement.x = client.x - this.position.x;
        this.movement.y = client.y - this.position.y;
      }
  
      this.position.x = client.x;
      this.position.y = client.y;
  
      switch (controller.operationMode) {
        case OperationModes.Dragging:
          controller.raise(this, "drag", this.createEventArgument(e));
          break;
      }
    });

    element.addEventListener("mouseup", e => {
      if (controller.operationMode !== OperationModes.Dragging) {
        controller.raise(this, "mouseup", this.createEventArgument(e));
      }
    });
  
    window.addEventListener("mouseup", e => {
      if (controller.operationMode === OperationModes.Dragging) {
        controller.raise(this, "enddrag", this.createEventArgument(e));
      }

      controller.operationMode = OperationModes.None;

      switch (e.button) {
        case 0: this.pressedButtons._t_remove(MouseButtons.Left); break;
        case 1: this.pressedButtons._t_remove(MouseButtons.Middle); break;
        case 2: this.pressedButtons._t_remove(MouseButtons.Right); break;
      }
    });
  }

  isButtonPressed(button) {
    return this.pressedButtons.includes(button);
  }

  createEventArgument(e) {
    return {
      isProcessed: false,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      domEvent: e,
    }
  }

  // TODO: use stack
  setCursor(type) {
		this.element.style.cursor = type;
	}
}

export { MouseAgent, MouseButtons };
