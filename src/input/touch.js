// touch.js

export default class TouchAgent {

  #types = [
    'rotate',
    'rotatestart',
    'rotatemove',
    'rotateend',
    'rotatecancel',
    'pinch',
    'pinchin',
    'pinchout',
    'pinchstart',
    'pinchmove',
    'pinchend',
    'pinchcancel',
    'swipe',
    'swipeleft',
    'swiperight',
    'swipeup',
    'swipedown',
    'tripan',
    'tripanstart',
    'tripanmove',
    'tripanup',
    'tripandown',
    'tripanleft',
    'tripanright',
    'tripanend',
    'tripancancel',
  ]

  #input

  constructor(input) {
    this.#input = input
  }

  has(event) {
    return (this.#types.indexOf(event) == -1) ? false : true
  }

  on (event, handler, options, once) {
    let cb = handler

    switch (event) {
    //   case "swipe":
    //     cb = function (e) {
    //       this.logit(e)
    //       this.#input.onPointerDown(e)
    //       handler(this.#input.pointerEventData(e))
    //     }
    //     break; 
    }
    if (once) this.#input.agent.once(event, cb.bind(this), options)
    else this.#input.agent.on(event, cb.bind(this), options)
    return cb
  }

  off (event, handler, options) {
    this.#input.agent.off(event, handler, options)
  }

}