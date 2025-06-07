/**
 * Debounce: the original function will be called after the caller stops calling the 
 * decorated function after a specified period.
 * debouncing, executes the function if there was no new event in $wait milliseconds
 * If `immediate` is passed, trigger the function on the leading edge, 
 * instead of the trailing.
 * @param {function} fn
 * @param {number} wait
 * @param {*} scope
 * @param {boolean} immediate
 * @returns {Function}
 */
function debounce(fn, wait, scope, immediate) {
  var timeout;
  var core = function() {
    var context = scope || this
    var args = arguments;
    var later = function() {
        timeout = null;
        if (!immediate) fn.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  };
  return core
};

/**
 * Throttle: the original function will be called 
 * at most once per specified period.
 * in case of a "storm of events", this executes once every $threshold
 * @param {function} fn
 * @param {number} threshhold
 * @param {*} scope
 * @returns {Function}
 */
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, deferTimer;
  var core = function () {
    var context = scope || this;

    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
    core.reset = function() {
      cancelTimer();
      last = 0;
    }
    return core
  };
}
