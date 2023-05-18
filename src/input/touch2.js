// touch.js
// multi-touch input device handler

// https://github.com/bunnybones1/input-touch/blob/master/index.js

const START = 'start',
      MOVE = 'move',
      END = 'end';

const clickDistLimitPx = 5
const clickDistLimitPxSq = clickDistLimitPx ** 2


class Touch {

  /** {Boolean} Whether only a single finger is used in touch handling */
  #isSingleTouch = false

  /** {Boolean} Whether a touch event sequence is in progress */
  #isTracking = false

  constructor(el) {
    this.target = el;
    this.isDocument = this.target === document;
    this.touches = new Array(100);
    this.touchPool = new Array(100).fill(-1);
    eventsUtil.addEvent(target, "touchstart", this.#touchstart);
    eventsUtil.addEvent(target, "touchmove", this.#touchmove);
    eventsUtil.addEvent(target, "touchend", this.#touchend);
  }

  isTouchPosMoved (touch) {
    var deltaX = touch.downX - touch.x;
    var deltaY = touch.downY - touch.y;
    return ((deltaX * deltaX + deltaY * deltaY) > clickDistLimitPxSq);
  }
  
  initTouchEvent (x, y, id) {
    return {
      changedTouches:[{
        clientX: x || 0,
        clientY: y || 0,
        id: id
      }],
      preventDefault () {}
    };
  }

  testStart (x, y, id) {
		this.#touchstart(this.initTouchEvent(x, y, id));
	}

	testMove (x, y, id) {
		this.#touchmove(this.initTouchEvent(x, y, id));
	}

	testEnd (x, y, id) {
		this.#touchend(this.initTouchEvent(x, y, id));
	}

	poolID (id) {
		return this.touchPool.indexOf(id);
	}

	addTouchToPool (id) {
		var index = this.touchPool.indexOf(-1);
		this.touchPool[index] = id;
	}

	releaseTouchFromPool (id) {
		var index = this.touchPool.indexOf(id);
		this.touchPool[index] = -1;
	}

	#processTouchEvent (touchEvent, state) {
		if(this.isDocument) {
			touchEvent.offsetX = touchEvent.clientX;
			touchEvent.offsetY = touchEvent.clientY;
		} else {
			touchEvent.offsetX = touchEvent.clientX - this.target.offsetLeft;
			touchEvent.offsetY = touchEvent.clientY - this.target.offsetTop;
		}
		// console.log('touchEvent.id', touchEvent.id);
		var id = touchEvent.id || 0;
		id = this.poolID(id);
		// console.log('id', id);

		var touch = this.touches[id];
		switch(state) {
			case START:
				touch = {
					downX: touchEvent.offsetX,
					downY: touchEvent.offsetY,
					x: touchEvent.offsetX,
					y: touchEvent.offsetY
				};
				this.touches[id] = touch;
				this.onTouchStartSignal.dispatch(touch.x, touch.y, id);
				break;
			case MOVE:
				var touch = this.touches[id];
				if(!touch) return;
				touch.x = touchEvent.offsetX;
				touch.y = touchEvent.offsetY;
				this.onTouchMoveSignal.dispatch(touch.x, touch.y, id);
				break;
			case END:
				var touch = this.touches[id];
				this.touches[id] = null;
				if(!this.isTouchPosMoved(touch)) {
					this.onTouchTapSignal.dispatch(touch.x, touch.y, id);
				}
				this.onTouchEndSignal.dispatch(touch.x, touch.y, id);
				break;
		}
	}

	#processTouchEvents (touchEventList, state) {
		for (var i = touchEventList.length - 1; i >= 0; i--) {
			this.#processTouchEvent(touchEventList[i], state)
		};
	}

	#touchstart (e) {
		e.preventDefault();
    if (e.changedTouches.length <= 0) return false

    this.#isSingleTouch = (e.changedTouches.length === 1) ? true : false

		for (var i = e.changedTouches.length - 1; i >= 0; i--) {
			this.addTouchToPool(e.changedTouches[i].id);
		};
		this.#processTouchEvents(e.changedTouches, START);
	}

	#touchmove (e) {
		e.preventDefault();
		this.#processTouchEvents(e.changedTouches, MOVE);
	}

	#touchend (e) {
		e.preventDefault();
		this.#processTouchEvents(e.changedTouches, END);
		for (var i = e.changedTouches.length - 1; i >= 0; i--) {
			this.releaseTouchFromPool(e.changedTouches[i].id);
		};
	}

}


module.exports = Touch;