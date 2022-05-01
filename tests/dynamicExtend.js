test = {
  aValue: "abc",
  bValue: "xyz",
  start: () => {
      console.log(this.constructor.name+": It lives!!!")
  },

  end: () => {

  }
}

class module_test2 {
  aValue = "abc"
  bValue = "xyz"
  constructor(core, options) {
    this.core = core
    this.options = options
  }
  start() {
    console.log(this.constructor.name+": It lives!!!")
  }
  end () {

  }
}

class test2 {
  aValue = "abc"
  bValue = "xyz"
  constructor(core, options) {
    this.core = core
    this.options = options
  }
  start() {
    console.log(this.constructor.name+": It lives!!!")
  }
  end () {

  }
}


class Mediator {

  #core

  constructor(core, modClass, options) {

    this.#core = core

    // Check that module has required methods
    const required = ['constructor', 'start', 'end']
    const target = Object.getOwnPropertyNames(modClass.prototype)
    const intersection = required.filter(x => target.includes(x));

    // check that module conforms to the naming convention
    const name = modClass.prototype.constructor.name.match(/^module_\s*([$A-Z_][0-9A-Z_$]*)/i)

    this.valid = (required.length === intersection.length)
                && (name !== null)

    console.log('Is module',this.constructor.name,'valid:',this.valid)

    const instance = (this.valid) ? new modClass(this, options) : null

    return instance
  
  }
  test() {
    console.log("Mediator test")
  }
}

function extend(superclass, newTarget) {
    return class extends superclass {
        constructor(...args) {
            let _super = (...args2) => {
                super(...args2)
                return this;
            };
            construct(_super, ...args);
        }
    };
  }

//   function extend(superclass, constructor) {
//     function Extended(...args) {
//       const _super = (...args) => Object.assign(this, new superclass(...args));
//       constructor.call(this, _super, ...args);
//     }
//     Object.setPrototypeOf(Extended, superclass);
//     Object.setPrototypeOf(Extended.prototype, superclass.prototype);
//     return Extended;
//  }


// const newMod = extend(Mediator,test)

// console.log(newMod)

// const nm = new newMod()

// console.log(nm)

// class result extends Mediator{ [test2](){} }

// const newMod = new result()
// newMod.start()

// const list = ["xyz"]

class xyz extends Mediator{

  constructor (target, options) {
    super()
    const propertyNames = Object.getOwnPropertyNames(target.prototype);
    for (const name of propertyNames) {
      this[name] = target[name]
    }
    this.options = options
  }
}

// function build() {
//   return class extends Mediator{

//     constructor (target, options) {
//       super()
//       const propertyNames = Object.getOwnPropertyNames(target.prototype);
//       for (const name of propertyNames) {
//         this[name] = target[name]
//       }
//       this.options = options
//     }
//   }
// }

// const xyz = build()

/**

const abc = new xyz(test2, {col:"#444"})
console.log(abc)


const nameIt = (name, cls) => ({[name] : class extends cls {}})[name];
const DEF = nameIt("module_test2",xyz)
const def = new DEF(test2, {col:"#444"})
console.log(def)

const classes = {}
classes["someName"] = class extends Mediator{

  constructor (target, options) {
    super()
    const propertyNames = Object.getOwnPropertyNames(target.prototype);
    for (const name of propertyNames) {
      this[name] = target[name]
    }
    this.options = options
  }
}

const jkh = new classes["someName"](test2, {col:"#444"})
console.log(jkh)
*/

// console.log(test)
// console.log(test2)

let x = module_test2
const sandbox = new Mediator("",x,{})
if (sandbox.constructor.name !== "Mediator") {
  console.log(sandbox)
  sandbox.start()
  sandbox.Mediator.test()
}
else console.log("module failed")


typeof null