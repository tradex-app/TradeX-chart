// listeners.js

   /**
   * return a function which attaches a listeners to an element
   * @param {string} selector - valid DOM selector
   * @param {string} event
   * @param {function} fn
   * @return {function} 
   * @memberof Dialogue
   */ 
  export function provideEventListener(selector, event, fn) {
    const listeners = [{event, fn}]
    return provideEventListeners(selector, listeners)
  }

  /**
   * return a function which attaches an array of listeners to an element
   * @param {string} selector
   * @param {array} listeners - [{event, function}]
   * @return {function}  
   * @memberof Dialogue
   */
  export function provideEventListeners(selector, listeners) {
    // el - host root element for dialogue content
    const func = (el) => {
      const elm = el.querySelector(selector)
      if (!!elm) {
        for (let l of listeners) {
          elm.addEventListener(l.event, 
            (e) => {
              l.fn(e)
            })
        }
      }
    }
    return func
  }