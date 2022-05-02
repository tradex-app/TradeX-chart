function hooks() {
  for (const hook of hooks.prototype.hooks) {
    hook(...arguments)
  }
}
hooks.prototype = {
  hooks: [],
  getHooks:function() {
    return this.hooks
  },
  addHook:function(hook) {
    this.hooks.push(hook)
  },
  removeHook:function(hook) {

  }
}

hooks.prototype.addHook(function(){
  console.log("hook 1 arguments:",arguments)

})
hooks.prototype.addHook(function(){console.log("hook 2 arguments:",arguments)})
hooks.prototype.addHook(function(){console.log("hook 3 arguments:",arguments)})
hooks("cat","dog")


function hooks2() {
  hooks = []
  addHook = (hook) => {this.hooks.push(hook)}
}

hooks2.prototype.addHook(function(){console.log("hook2 2 arguments:",arguments)})
hooks2.addHook(function(){console.log("hook2 3 arguments:",arguments)})
hooks2("cat","dog")