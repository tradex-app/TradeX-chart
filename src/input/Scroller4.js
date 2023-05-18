// scroll

const NOOP = function(){};

class Scroller {

  #callback
  #zoomComplete
  #zoomLevelStart
  #interruptedAnimation
  #initialTouchLeft
  #initialTouchTop
  #lastScale
  #enableScrollX
  #enableScrollY


  //  Status

  /** {Boolean} Whether only a single finger is used in touch handling */
  #isSingleTouch = false

  /** {Boolean} Whether a touch event sequence is in progress */
  #isTracking = false

  /** {Boolean} Whether a deceleration animation went to completion. */
  #didDecelerationComplete = false

  /**
   * {Boolean} Whether a gesture zoom/rotate event is in progress. Activates when
   * a gesturestart event happens. This has higher priority than dragging.
   */
  #isGesturing = false

  /**
   * {Boolean} Whether the user has moved by such a distance that we have enabled
   * dragging mode. Hint: It's only enabled after some pixels of movement to
   * not interrupt with clicks etc.
   */
  #isDragging = false

  /**
   * {Boolean} Not touching and dragging anymore, and smoothly animating the
   * touch sequence using deceleration.
   */
  #isDecelerating = false

  /**
   * {Boolean} Smoothly animating the currently configured change
   */
  #isAnimating = false



  //  Dimensions

  /** {Integer} Available outer left position (from document perspective) */
  #clientLeft = 0

  /** {Integer} Available outer top position (from document perspective) */
  #clientTop = 0

  /** {Integer} Available outer width */
  #clientWidth = 0

  /** {Integer} Available outer height */
  #clientHeight = 0

  /** {Integer} Outer width of content */
  #contentWidth = 0

  /** {Integer} Outer height of content */
  #contentHeight = 0

  /** {Integer} Snapping width for content */
  #snapWidth = 100

  /** {Integer} Snapping height for content */
  #snapHeight = 100

  /** {Integer} Height to assign to refresh area */
  #refreshHeight = null

  /** {Boolean} Whether the refresh process is enabled when the event is released now */
  #refreshActive = false

  /** {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release */
  #refreshActivate = null

  /** {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled */
  #refreshDeactivate = null

  /** {Function} Callback to execute to start the actual refresh. Call {@link #refreshFinish} when done */
  #refreshStart = null

  /** {Number} Zoom level */
  #zoomLevel = 1

  /** {Number} Scroll position on x-axis */
  #scrollLeft = 0

  /** {Number} Scroll position on y-axis */
  #scrollTop = 0

  /** {Integer} Maximum allowed scroll position on x-axis */
  #maxScrollLeft = 0

  /** {Integer} Maximum allowed scroll position on y-axis */
  #maxScrollTop = 0

  /* {Number} Scheduled left position (final position when animating) */
  #scheduledLeft = 0

  /* {Number} Scheduled top position (final position when animating) */
  #scheduledTop = 0

  /* {Number} Scheduled zoom level (final scale when animating) */
  #scheduledZoom = 0



  // Last Positions

  /** {Number} Left position of finger at start */
  #lastTouchLeft = null

  /** {Number} Top position of finger at start */
  #lastTouchTop = null

  /** {Date} Timestamp of last move of finger. Used to limit tracking range for deceleration speed. */
  #lastTouchMove = null

  /** {Array} List of positions, uses three indexes for each state: left, top, timestamp */
  #positions = null




  // Deceleration

  /** {Number} Current factor to modify horizontal scroll position with on every step */
  #decelerationVelocityX = null

  /** {Number} Current factor to modify vertical scroll position with on every step */
  #decelerationVelocityY = null



  options = {

    // Enable scrolling on x-axis
    scrollingX: true,

    // Enable scrolling on y-axis
    scrollingY: true,

    // Enable animations for deceleration, snap back, zooming and scrolling
    animating: true,

    // duration for animations triggered by scrollTo/zoomTo
    animationDuration: 250,

    // Enable locking to the main axis if user moves only slightly on one of them at start
    locking: true,

    // Enable pagination mode (switching between full page content panes)
    paging: false,

    // Enable snapping of content to a configured pixel grid
    snapping: false,

    // Enable zooming of content via API, fingers and mouse wheel
    zooming: false,

    // Minimum zoom level
    minZoom: 0.5,

    // Maximum zoom level
    maxZoom: 3,

    // Multiply or decrease scrolling speed
    speedMultiplier: 1,

    /* Callback that is fired on the later of touch end or deceleration end
      provided that another scrolling action has not begun. Used to know
      when to fade out a scrollbar. */
    scrollingComplete: NOOP,

    // This configures the amount of change applied to deceleration when reaching boundaries  **/
    penetrationDeceleration : 0.03,

    // This configures the amount of change applied to acceleration when reaching boundaries  **/
    penetrationAcceleration : 0.08,

  };



	constructor (callback, options) {
		
    this.#callback = callback;

    for (var key in options) {
			this.options[key] = options[key];
		}
	}

	/**
	 * @param {Number} pos - position between 0 (start of effect) and 1 (end of effect)
	**/
	easeOutCubic(pos) {
		return (Math.pow((pos - 1), 3) + 1);
	}

	/**
	 * @param {Number} pos - position between 0 (start of effect) and 1 (end of effect)
	**/
	easeInOutCubic(pos) {
		if ((pos /= 0.5) < 1) {
			return 0.5 * Math.pow(pos, 3);
		}
		return 0.5 * (Math.pow((pos - 2), 3) + 2);
	}

  /*
  ---------------------------------------------------------------------------
    PUBLIC API
  ---------------------------------------------------------------------------
  */

		/**
		 * Configures the dimensions of the client (outer) and content (inner) elements.
		 * Requires the available space for the outer element and the outer size of the inner element.
		 * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
		 *
		 * @param clientWidth {Integer ? null} Inner width of outer element
		 * @param clientHeight {Integer ? null} Inner height of outer element
		 * @param contentWidth {Integer ? null} Outer width of inner element
		 * @param contentHeight {Integer ? null} Outer height of inner element
		 */
     setDimensions(clientWidth, clientHeight, contentWidth, contentHeight) {

			// Only update values which are defined
			if (clientWidth === +clientWidth) {
				this.#clientWidth = clientWidth;
			}

			if (clientHeight === +clientHeight) {
				this.#clientHeight = clientHeight;
			}

			if (contentWidth === +contentWidth) {
				this.#contentWidth = contentWidth;
			}

			if (contentHeight === +contentHeight) {
				this.#contentHeight = contentHeight;
			}

			// Refresh maximums
			this.#computeScrollMax();

			// Refresh scroll position
			this.scrollTo(this.#scrollLeft, this.#scrollTop, true);

		}


		/**
		 * Sets the client coordinates in relation to the document.
		 *
		 * @param left {Integer ? 0} Left position of outer element
		 * @param top {Integer ? 0} Top position of outer element
		 */
		setPosition(left, top) {

			this.#clientLeft = left || 0;
			this.#clientTop = top || 0;

		}


		/**
		 * Configures the snapping (when snapping is active)
		 *
		 * @param width {Integer} Snapping width
		 * @param height {Integer} Snapping height
		 */
		setSnapSize(width, height) {

			this.#snapWidth = width;
			this.#snapHeight = height;

		}


    /**
		 * Returns the scroll position and zooming values
		 *
		 * @return {Map} `left` and `top` scroll position and `zoom` level
		 */
		getValues() {

			return {
				left: this.#scrollLeft,
				top: this.#scrollTop,
				zoom: this.#zoomLevel
			};

		}


		/**
		 * Returns the maximum scroll values
		 *
		 * @return {Map} `left` and `top` maximum scroll values
		 */
		getScrollMax() {

			return {
				left: this.#maxScrollLeft,
				top: this.#maxScrollTop
			};

		}


		/**
		 * Zooms to the given level. Supports optional animation. Zooms
		 * the center when no coordinates are given.
		 *
		 * @param level {Number} Level to zoom to
		 * @param animate {Boolean ? false} Whether to use animation
		 * @param originLeft {Number ? null} Zoom in at given left coordinate
		 * @param originTop {Number ? null} Zoom in at given top coordinate
		 * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
		 */
		zoomTo(level, animate, originLeft, originTop, callback) {

			if (!this.options.zooming) {
				throw new Error("Zooming is not enabled!");
			}

			// Add callback if exists
			if(callback) {
				this.#zoomComplete = callback;
			}

			// Stop deceleration
			if (this.#isDecelerating) {
				core.effect.Animate.stop(this.#isDecelerating);
				this.#isDecelerating = false;
			}

			var oldLevel = this.#zoomLevel;

			// Normalize input origin to center of viewport if not defined
			if (originLeft == null) {
				originLeft = this.#clientWidth / 2;
			}

			if (originTop == null) {
				originTop = this.#clientHeight / 2;
			}

			// Limit level according to configuration
			level = Math.max(Math.min(level, this.options.maxZoom), this.options.minZoom);

			// Recompute maximum values while temporary tweaking maximum scroll ranges
			this.#computeScrollMax(level);

			// Recompute left and top coordinates based on new zoom level
			var left = ((originLeft + this.#scrollLeft) * level / oldLevel) - originLeft;
			var top = ((originTop + this.#scrollTop) * level / oldLevel) - originTop;

			// Limit x-axis
			if (left > this.#maxScrollLeft) {
				left = this.#maxScrollLeft;
			} else if (left < 0) {
				left = 0;
			}

			// Limit y-axis
			if (top > this.#maxScrollTop) {
				top = this.#maxScrollTop;
			} else if (top < 0) {
				top = 0;
			}

			// Push values out
			this.#publish(left, top, level, animate);

		}


		/**
		 * Zooms the content by the given factor.
		 *
		 * @param factor {Number} Zoom by given factor
		 * @param animate {Boolean ? false} Whether to use animation
		 * @param originLeft {Number ? 0} Zoom in at given left coordinate
		 * @param originTop {Number ? 0} Zoom in at given top coordinate
		 * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
		 */
		zoomBy(factor, animate, originLeft, originTop, callback) {

			this.zoomTo(this.#zoomLevel * factor, animate, originLeft, originTop, callback);

		}


		/**
		 * Scrolls to the given position. Respect limitations and snapping automatically.
		 *
		 * @param left {Number?null} Horizontal scroll position, keeps current if value is <code>null</code>
		 * @param top {Number?null} Vertical scroll position, keeps current if value is <code>null</code>
		 * @param animate {Boolean?false} Whether the scrolling should happen using an animation
		 * @param zoom {Number?null} Zoom level to go to
		 */
		scrollTo(left, top, animate, zoom) {

			// Stop deceleration
			if (this.#isDecelerating) {
				core.effect.Animate.stop(this.#isDecelerating);
				this.#isDecelerating = false;
			}

			// Correct coordinates based on new zoom level
			if (zoom != null && zoom !== this.#zoomLevel) {

				if (!this.options.zooming) {
					throw new Error("Zooming is not enabled!");
				}

				left *= zoom;
				top *= zoom;

				// Recompute maximum values while temporary tweaking maximum scroll ranges
				this.#computeScrollMax(zoom);

			} else {

				// Keep zoom when not defined
				zoom = this.#zoomLevel;

			}

			if (!this.options.scrollingX) {

				left = this.#scrollLeft;

			} else {

				if (this.options.paging) {
					left = Math.round(left / this.#clientWidth) * this.#clientWidth;
				} else if (this.options.snapping) {
					left = Math.round(left / this.#snapWidth) * this.#snapWidth;
				}

			}

			if (!this.options.scrollingY) {

				top = this.#scrollTop;

			} else {

				if (this.options.paging) {
					top = Math.round(top / this.#clientHeight) * this.#clientHeight;
				} else if (this.options.snapping) {
					top = Math.round(top / this.#snapHeight) * this.#snapHeight;
				}

			}

			// Limit for allowed ranges
			left = Math.max(Math.min(this.#maxScrollLeft, left), 0);
			top = Math.max(Math.min(this.#maxScrollTop, top), 0);

			// Don't animate when no change detected, still call publish to make sure
			// that rendered position is really in-sync with internal data
			if (left === this.#scrollLeft && top === this.#scrollTop) {
				animate = false;
			}

			// Publish new values
			if (!this.#isTracking) {
        this.#publish(left, top, zoom, animate);
      }

		}


		/**
		 * Scroll by the given offset
		 *
		 * @param left {Number ? 0} Scroll x-axis by given offset
		 * @param top {Number ? 0} Scroll x-axis by given offset
		 * @param animate {Boolean ? false} Whether to animate the given change
		 */
		scrollBy(left, top, animate) {

			var startLeft = this.#isAnimating ? this.#scheduledLeft : this.#scrollLeft;
			var startTop = this.#isAnimating ? this.#scheduledTop : this.#scrollTop;

			this.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);

		}



		/*
		---------------------------------------------------------------------------
			EVENT CALLBACKS
		---------------------------------------------------------------------------
		*/

		/**
		 * Mouse wheel handler for zooming support
		 */
		doMouseZoom(wheelDelta, timeStamp, pageX, pageY) {

			var self = this;
			var change = wheelDelta > 0 ? 0.97 : 1.03;

			return this.zoomTo(this.#zoomLevel * change, false, pageX - this.#clientLeft, pageY - this.#clientTop);

		}


		/**
		 * Touch start handler for scrolling support
		 */
		doTouchStart(touches, timeStamp) {

			// Array-like check is enough here
			if (touches.length == null) {
				throw new Error("Invalid touch list: " + touches);
			}

			if (timeStamp instanceof Date) {
				timeStamp = timeStamp.valueOf();
			}
			if (typeof timeStamp !== "number") {
				throw new Error("Invalid timestamp value: " + timeStamp);
			}

			// Reset interruptedAnimation flag
			this.#interruptedAnimation = true;

			// Stop deceleration
			if (this.#isDecelerating) {
				core.effect.Animate.stop(this.#isDecelerating);
				this.#isDecelerating = false;
				this.#interruptedAnimation = true;
			}

			// Stop animation
			if (this.#isAnimating) {
				core.effect.Animate.stop(this.#isAnimating);
				this.#isAnimating = false;
				this.#interruptedAnimation = true;
			}

			// Use center point when dealing with two fingers
			var currentTouchLeft, currentTouchTop;
			var isSingleTouch = touches.length === 1;
			if (isSingleTouch) {
				currentTouchLeft = touches[0].pageX;
				currentTouchTop = touches[0].pageY;
			} else {
				currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
				currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
			}

			// Store initial positions
			this.#initialTouchLeft = currentTouchLeft;
			this.#initialTouchTop = currentTouchTop;

			// Store current zoom level
			this.#zoomLevelStart = this.#zoomLevel;

			// Store initial touch positions
			this.#lastTouchLeft = currentTouchLeft;
			this.#lastTouchTop = currentTouchTop;

			// Store initial move time stamp
			this.#lastTouchMove = timeStamp;

			// Reset initial scale
			this.#lastScale = 1;

			// Reset locking flags
			this.#enableScrollX = !isSingleTouch && this.options.scrollingX;
			this.#enableScrollY = !isSingleTouch && this.options.scrollingY;

			// Reset tracking flag
			this.#isTracking = true;

			// Reset deceleration complete flag
			this.#didDecelerationComplete = false;

			// Dragging starts directly with two fingers, otherwise lazy with an offset
			this.#isDragging = !isSingleTouch;

			// Some features are disabled in multi touch scenarios
			this.#isSingleTouch = isSingleTouch;

			// Clearing data structure
			this.#positions = [];

		}


		/**
		 * Touch move handler for scrolling support
		 */
		doTouchMove(touches, timeStamp, scale) {

			// Array-like check is enough here
			if (touches.length == null) {
				throw new Error("Invalid touch list: " + touches);
			}

			if (timeStamp instanceof Date) {
				timeStamp = timeStamp.valueOf();
			}
			if (typeof timeStamp !== "number") {
				throw new Error("Invalid timestamp value: " + timeStamp);
			}

			// Ignore event when tracking is not enabled (event might be outside of element)
			if (!this.#isTracking) {
				return;
			}


			var currentTouchLeft, currentTouchTop;

			// Compute move based around of center of fingers
			if (touches.length === 2) {
				currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
				currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
			} else {
				currentTouchLeft = touches[0].pageX;
				currentTouchTop = touches[0].pageY;
			}

			var positions = this.#positions;

			// Are we already is dragging mode?
			if (this.#isDragging) {

				// Compute move distance
				var moveX = currentTouchLeft - this.#lastTouchLeft;
				var moveY = currentTouchTop - this.#lastTouchTop;

				// Read previous scroll position and zooming
				var scrollLeft = this.#scrollLeft;
				var scrollTop = this.#scrollTop;
				var level = this.#zoomLevel;

				// Work with scaling
				if (scale != null && this.options.zooming) {

					var oldLevel = level;

					// Recompute level based on previous scale and new scale
					level = level / this.#lastScale * scale;

					// Limit level according to configuration
					level = Math.max(Math.min(level, this.options.maxZoom), this.options.minZoom);

					// Only do further compution when change happened
					if (oldLevel !== level) {

						// Compute relative event position to container
						var currentTouchLeftRel = currentTouchLeft - this.#clientLeft;
						var currentTouchTopRel = currentTouchTop - this.#clientTop;

						// Recompute left and top coordinates based on new zoom level
						scrollLeft = ((currentTouchLeftRel + scrollLeft) * level / oldLevel) - currentTouchLeftRel;
						scrollTop = ((currentTouchTopRel + scrollTop) * level / oldLevel) - currentTouchTopRel;

						// Recompute max scroll values
						this.#computeScrollMax(level);

					}
				}

				if (this.#enableScrollX) {

					scrollLeft -= moveX * this.options.speedMultiplier;
					var maxScrollLeft = this.#maxScrollLeft;

					if (scrollLeft > maxScrollLeft || scrollLeft < 0) {

						// Slow down on the edges
						if (scrollLeft > maxScrollLeft) {

							scrollLeft = maxScrollLeft;

						} else {

							scrollLeft = 0;

						}
					}
				}

				// Compute new vertical scroll position
				if (this.#enableScrollY) {

					scrollTop -= moveY * this.options.speedMultiplier;
					var maxScrollTop = this.#maxScrollTop;

					if (scrollTop > maxScrollTop || scrollTop < 0) {

						// Slow down on the edges
						if (scrollTop > maxScrollTop) {

							scrollTop = maxScrollTop;

						} else {

							scrollTop = 0;

						}
					}
				}

				// Keep list from growing infinitely (holding min 10, max 20 measure points)
				if (positions.length > 60) {
					positions.splice(0, 30);
				}

				// Track scroll movement for decleration
				positions.push(scrollLeft, scrollTop, timeStamp);

				// Sync scroll position
				this.#publish(scrollLeft, scrollTop, level);

			// Otherwise figure out whether we are switching into dragging mode now.
			} else {

				var minimumTrackingForScroll = this.options.locking ? 3 : 0;
				var minimumTrackingForDrag = 5;

				var distanceX = Math.abs(currentTouchLeft - this.#initialTouchLeft);
				var distanceY = Math.abs(currentTouchTop - this.#initialTouchTop);

				this.#enableScrollX = this.options.scrollingX && distanceX >= minimumTrackingForScroll;
				this.#enableScrollY = this.options.scrollingY && distanceY >= minimumTrackingForScroll;

				positions.push(this.#scrollLeft, this.#scrollTop, timeStamp);

				this.#isDragging = (this.#enableScrollX || this.#enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
				if (this.#isDragging) {
					this.#interruptedAnimation = false;
				}

			}

			// Update last touch positions and time stamp for next event
			this.#lastTouchLeft = currentTouchLeft;
			this.#lastTouchTop = currentTouchTop;
			this.#lastTouchMove = timeStamp;
			this.#lastScale = scale;

		}


		/**
		 * Touch end handler for scrolling support
		 */
		doTouchEnd(timeStamp) {

			if (timeStamp instanceof Date) {
				timeStamp = timeStamp.valueOf();
			}
			if (typeof timeStamp !== "number") {
				throw new Error("Invalid timestamp value: " + timeStamp);
			}

			// Ignore event when tracking is not enabled (no touchstart event on element)
			// This is required as this listener ('touchmove') sits on the document and not on the element itthis.
			if (!this.#isTracking) {
				return;
			}

			// Not touching anymore (when two finger hit the screen there are two touch end events)
			this.#isTracking = false;

			// Be sure to reset the dragging flag now. Here we also detect whether
			// the finger has moved fast enough to switch into a deceleration animation.
			if (this.#isDragging) {

				// Reset dragging flag
				this.#isDragging = false;

				// Start deceleration
				// Verify that the last move detected was in some relevant time frame
				if (this.#isSingleTouch && this.options.animating && (timeStamp - this.#lastTouchMove) <= 100) {

					// Then figure out what the scroll position was about 100ms ago
					var positions = this.#positions;
					var endPos = positions.length - 1;
					var startPos = endPos;

					// Move pointer to position measured 100ms ago
					for (var i = endPos; i > 0 && positions[i] > (this.#lastTouchMove - 100); i -= 3) {
						startPos = i;
					}

				this.options.scrollingComplete();

      } else if ((timeStamp - this.#lastTouchMove) > 100) {
					this.options.scrollingComplete();
	 			}
			}

			// If this was a slower move it is per default non decelerated, but this
			// still means that we want snap back to the bounds which is done here.
			// This is placed outside the condition above to improve edge case stability
			// e.g. touchend fired without enabled dragging. This should normally do not
			// have modified the scroll positions or even showed the scrollbars though.
			if (!this.#isDecelerating) {

				if (this.#refreshActive && this.#refreshStart) {

					// Use publish instead of scrollTo to allow scrolling to out of boundary position
					// We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
					this.#publish(this.#scrollLeft, -this.#refreshHeight, this.#zoomLevel, true);

					if (this.#refreshStart) {
						this.#refreshStart();
					}

				} else {

					if (this.#interruptedAnimation || this.#isDragging) {
						this.options.scrollingComplete();
					}
					this.scrollTo(this.#scrollLeft, this.#scrollTop, true, this.#zoomLevel);

					// Directly signalize deactivation (nothing todo on refresh?)
					if (this.#refreshActive) {

						this.#refreshActive = false;
						if (this.#refreshDeactivate) {
							this.#refreshDeactivate();
						}

					}
				}
			}

			// Fully cleanup list
			this.#positions.length = 0;

		}



		/*
		---------------------------------------------------------------------------
			PRIVATE API
		---------------------------------------------------------------------------
		*/

		/**
		 * Applies the scroll position to the content element
		 *
		 * @param left {Number} Left scroll position
		 * @param top {Number} Top scroll position
		 * @param animate {Boolean?false} Whether animation should be used to move to the new coordinates
		 */
		#publish(left, top, zoom, animate) {

			// Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
			var wasAnimating = this.#isAnimating;
			if (wasAnimating) {
				core.effect.Animate.stop(wasAnimating);
				this.#isAnimating = false;
			}

			if (animate && this.options.animating) {

				// Keep scheduled positions for scrollBy/zoomBy functionality
				this.#scheduledLeft = left;
				this.#scheduledTop = top;
				this.#scheduledZoom = zoom;

				var oldLeft = this.#scrollLeft;
				var oldTop = this.#scrollTop;
				var oldZoom = this.#zoomLevel;

				var diffLeft = left - oldLeft;
				var diffTop = top - oldTop;
				var diffZoom = zoom - oldZoom;

				var step = function(percent, now, render) {

					if (render) {

						this.#scrollLeft = oldLeft + (diffLeft * percent);
						this.#scrollTop = oldTop + (diffTop * percent);
						this.#zoomLevel = oldZoom + (diffZoom * percent);

						// Push values out
						if (this.#callback) {
							this.#callback(this.#scrollLeft, this.#scrollTop, this.#zoomLevel);
						}

					}
				};

				var verify = function(id) {
					return this.#isAnimating === id;
				};

				var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
					if (animationId === this.#isAnimating) {
						this.#isAnimating = false;
					}
					if (this.#didDecelerationComplete || wasFinished) {
						this.options.scrollingComplete();
					}

					if (this.options.zooming) {
						this.#computeScrollMax();
						if(this.#zoomComplete) {
							this.#zoomComplete();
							this.#zoomComplete = null;
						}
					}
				};

				// When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
				this.#isAnimating = core.effect.Animate.start(step, verify, completed, this.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);

			} else {

				this.#scheduledLeft = this.#scrollLeft = left;
				this.#scheduledTop = this.#scrollTop = top;
				this.#scheduledZoom = this.#zoomLevel = zoom;

				// Push values out
				if (this.#callback) {
					this.#callback(left, top, zoom);
				}

				// Fix max scroll ranges
				if (this.options.zooming) {
					this.#computeScrollMax();
					if(this.#zoomComplete) {
						this.#zoomComplete();
						this.#zoomComplete = null;
					}
				}
			}
		}


		/**
		 * Recomputes scroll minimum values based on client dimensions and content dimensions.
		 */
		#computeScrollMax(zoomLevel) {

			if (zoomLevel == null) {
				zoomLevel = this.#zoomLevel;
			}

			this.#maxScrollLeft = Math.max((this.#contentWidth * zoomLevel) - this.#clientWidth, 0);
			this.#maxScrollTop = Math.max((this.#contentHeight * zoomLevel) - this.#clientHeight, 0);

		}


}