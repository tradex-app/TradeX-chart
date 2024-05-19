// aop.js
// Aspect Orientated Programming
// https://en.wikipedia.org/wiki/Aspect-oriented_programming
// https://medium.com/@qanlevon/an-introduction-to-aspect-oriented-programming-5a2988f51ee2
// https://www.digitalocean.com/community/tutorials/spring-aop-example-tutorial-aspect-advice-pointcut-joinpoint-annotations

import { isClass } from "../utils/typeChecks";

const joinPoints = [
  "before", "after", "around", "afterReturning", "afterThrowing"
]

export default class Aspect {

  static add(aspect, target) {

    if (!(aspect instanceof Aspect)) return false

    if (isClass(target)) {
      
    }

    const proxy = new Proxy(target, {
      get: (target, property) => {
        if (typeof target[property] === 'function') {
          return Aspect.intercept(aspect, target, property);
        }
        return target[property];
      },
    });
    return proxy;
  }

  static intercept(aspect, target, methodName) {

    const doAdvices = (advices, type, args) => {
      let cnt = 0, input, output = args;
      for (let advice of advices) {
        if (type == advice.type) {
          cnt++
          input = (advice.transfer) ? output : args
          input = (advice.type == "afterReturning") ? advice.args : input
          output = advice.func.apply(target, input);
        }      
      }
      output = (cnt > 0) ? output : undefined
      return output
    }

    return function (...args) {
      const joinPoint = `${methodName}`;
      const advices = aspect.advice[joinPoint];

      // no advice for this target method (joint point) execute normally
      if (!advices) return target[methodName].apply(target, args)

      try {
        let output

        // Replace
        output = doAdvices(advices, "replace", args)
        if (output !== undefined) return output

        // Before Advice
        output = doAdvices(advices, "before", args)

        // target method (joint point)
        if (aspect.transfer && output !== undefined) args = output
        const result = target[methodName].apply(target, args);
  
        // After Advice
        if (aspect.transfer && result !== undefined) args = result
        output = doAdvices(advices, "after", args)

        // Around Advice
        if (aspect.transfer && output !== undefined) args = result
        output = doAdvices(advices, "around", {args, result})

        doAdvices(advices, "afterReturning", args)

        output = (output === undefined) ? result : output
        return output;
      }
      catch(e) {
        doAdvices(advices, ["afterThrowing"], e)
        throw(e)
      }
    };
  }

  constructor(name, transfer=true) {
    this.name = name;
    this.advice = {};
    this.transfer = transfer
  }

  /**
   * Runs before the execution of join point method
   * @param {string} joinPoint - target method to be intercepted by advice
   * @param {function} advice - function to be executed upon target method intercept
   * @param {boolean} transfer
   * @param {array} args
   * @memberof Aspect
   */
  before(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'before', transfer, args)
  }

  /**
   * Runs after the execution of join point method
   * @param {string} joinPoint - target method to be intercepted by advice
   * @param {function} advice - function to be executed upon target method intercept
   * @param {boolean} transfer
   * @param {array} args
   * @memberof Aspect
   */
  after(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'after', transfer, args)
  }

  /**
   * This advice surrounds the join point method 
   * choose whether to execute the join point method or not. 
   * It is the responsibility of around advice to invoke the join point method 
   * and return values if the method is returning something.
   * @param {string} joinPoint - target method to be intercepted by advice
   * @param {function} advice - function to be executed upon target method intercept
   * @param {boolean} transfer
   * @param {array} args
   * @memberof Aspect
   */
  around(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'around', transfer, args)
  }

  /**
   * Sometimes we want advice methods to execute only if the join point method executes normally.
   * AfterReturning advice cannot modify the return value of advised functions. 
   * If you need to modify the return value, use around advice. 
   * @param {string} joinPoint - method to intercept
   * @param {function} advice - function to call on intercept
   * @memberof Aspect
   */
  afterReturning(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'afterReturning', transfer, args)
  }

  /**
   * Called after the target method throws an exception, 
   * and will receive the thrown exception as its only argument.
   * @param {string} joinPoint - method to intercept
   * @param {function} advice - function to call on intercept
   * @memberof Aspect
   */
  afterThrowing(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'afterThrowing', transfer, args)
  }

  #adviceType(joinPoint, advice, type, transfer=true, args=[]) {
    if (typeof joinPoint != "string" ||
        typeof advice != "function" ||
        !Array.isArray(args) ||
        (joinPoints.includes(joinPoint))
        )
        return false
    this.advice[joinPoint] = this.advice[joinPoint] || [];
    this.advice[joinPoint].push({ type, func: advice, args, transfer });
    return true
  }

}

