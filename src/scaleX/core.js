import { checkType } from '../utils/typeChecks'

class Core {

  #modules
  #plugins
  #instances
  #sandboxes
  #running
  #mediator

  log = {
    error: function() {},
    log: function() {},
    info: function() {},
    warn: function() {},
    enable: function() {}
  }

  constructor(Sandbox) {

    this.Sandbox = Sandbox

  }

}