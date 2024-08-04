// Aspect Oriented Programming Library

// Pointcuts
const pointcuts = {
  // Define pointcut types
  before: (target, method, args) => {
    // Before method execution
    console.log(`Before: ${method} called with arguments: ${args}`);
    return true; // Continue execution
  },
  after: (target, method, args, result) => {
    // After method execution
    console.log(`After: ${method} returned: ${result}`);
    return true; // Continue execution
  },
  around: (target, method, args, originalMethod) => {
    // Around method execution
    console.log(`Around: ${method} called`);
    const result = originalMethod.apply(target, args);
    console.log(`Around: ${method} returned: ${result}`);
    return result; // Return result of original method
  },
};

// Advice
class Advice {
  constructor(type, pointcut, func) {
    this.type = type;
    this.pointcut = pointcut;
    this.func = func;
  }

  // Execute advice based on pointcut type
  execute(target, method, args, originalMethod) {
    switch (this.type) {
      case 'before':
        return this.pointcut(target, method, args);
      case 'after':
        const result = originalMethod.apply(target, args);
        return this.pointcut(target, method, args, result);
      case 'around':
        return this.pointcut(target, method, args, originalMethod);
      default:
        return true;
    }
  }
}

// Aspect
class Aspect {
  constructor(name) {
    this.name = name;
    this.advices = [];
  }

  // Add advice to aspect
  addAdvice(type, pointcut, func) {
    this.advices.push(new Advice(type, pointcut, func));
  }

  // Apply aspect to a target object
  apply(target) {
    // Modify target methods with advice
    Object.getOwnPropertyNames(target).forEach(method => {
      if (typeof target[method] === 'function') {
        const originalMethod = target[method];
        target[method] = (...args) => {
          for (const advice of this.advices) {
            if (!advice.execute(target, method, args, originalMethod)) {
              return; // Stop execution if advice returns false
            }
          }
          return originalMethod.apply(target, args);
        };
      }
    });
  }
}
