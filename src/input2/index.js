// index.js
// input controller, pointer, keys

import { status } from "./definitions"
import { EventsAgent } from "./events";

const defaultOptions = {
  element: undefined,
  contextMenu: true
}

export default class Input  {

  constructor (element, options) {

    this.options = { ...defaultOptions, ...options };
    this.status = status.idle
    this.element = element

    if (!this.element && this.options.elementId) {
      this.element = document.getElementById(this.options.elementId);
    }

    if (!this.element) {
      throw "Must specify an element to receive user input.";
    }

    this.eventsAgent = new EventsAgent(this);

    if (!this.options.contextMenu) {
      window.oncontextmenu = (e) => {
        e.preventDefault();
        return false;
      };
    }
  }

  on (event, handler, options) {
    return this.eventsAgent.addListener(event, handler, options)
  }

  off (event, handler, options) {
    return this.eventsAgent.removeListener(event, handler, options)
  }

  invoke (agent, eventName, args) {
    this.currentAgent = agent;
    this.eventsAgent.invoke(eventName, this.createEventArgument(args));
  }

  createEventArgument (args) {
    const arg = args || {};
    arg.isButtonPressed = button => this.isButtonPressed(button);
    arg.isKeyPressed = key => this.isKeyPressed(key);
    arg.controller = this;
    return arg;
  }

  isButtonPressed (button) {
    return this.pointerAgent.isButtonPressed(button);
  }
  
  isKeyPressed (key) {
    return this.keyboardAgent.isKeyPressed(key);
  }

  setCursor (type) {
    this.pointerAgent.setCursor(type);
  }
}
