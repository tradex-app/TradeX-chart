////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

const Utility = {
	invokeIfExist(obj, method) {
		if (typeof method === "string") {
			if (typeof obj[method] !== "function") return;
			method = obj[method];
		}
	
		if (typeof method === "function") {
			return method.apply(obj, Array.prototype.slice.call(arguments, 2));
		}
	},
	
	deprecate(oldStuff, newStuff) {
		var warningMessageDisplayed = false;
	
		return function() {
			if (!warningMessageDisplayed) {
				console.warn(oldStuff + " is deprecated, use " + newStuff + " instead");
				warningMessageDisplayed = true;
			}
			return eval(newStuff);
		}
	}
};

export { Utility };

if (!Array.prototype._t_foreach) {
	Object.defineProperty(Array.prototype, "_t_foreach", {
		value: function(iterator) {
			if (typeof iterator !== "function") return;

			for (let i = 0; i < this.length; i++) {
				const element = this[i];
				iterator.call(this, i, element);
			}
		},
		enumerable: false
	});
}

// if (!Array.prototype._t_arrayIndexOf) {
// 	Object.defineProperty(Array.prototype, "_t_arrayIndexOf", {
// 		value: function(element) {
// 			for (var i = 0; i < this.length; i++) {
// 				var item = this[i];
		
// 				if (item === element) {
// 					return i;
// 				}
// 			}
		
// 			return -1;
// 		},
// 		enumerable: false
// 	});
// }

if (!Array.prototype._t_remove) {
	Object.defineProperty(Array.prototype, "_t_remove", {
		value: function(element) {
			var index = this.indexOf(element);
			if (index > -1) this.splice(index, 1);
		},
		enumerable: false
	});
}

if (!Array.prototype._t_removeAt) {
	Object.defineProperty(Array.prototype, "_t_removeAt", {
		value: function(index, count = 1) {
			this.splice(index, count);
		}
	});
}

if (!Array.prototype._t_clear) {
	Object.defineProperty(Array.prototype, "_t_clear", {
		value: function() {
			this.length = 0;
		},
		enumerable: false
	});
}

if (!Array.prototype._t_pushIfNotExist) {
	Object.defineProperty(Array.prototype, "_t_pushIfNotExist", {
		value: function(element) {
			if (!this.includes(element)) {
				this.push(element);
			}
		},
		enumerable: false
	});
}

if (!Array.prototype._t_set) {
	Object.defineProperty(Array.prototype, "_t_set", {
		value: function(i) {
			if (arguments.length > 1) {
				for (var j = 1; j < arguments.length - 1; j++) {
					this[i++] = arguments[j];
				}
			}
		},
		enumerable: false
	});
}

// if (!Array.prototype._t_any) {
// 	Object.defineProperty(Array.prototype, "_t_any", {
// 		value: function(handler) {
// 			for (var i = 0; i < this.length; i++) {
// 				var item = this[i];
		
// 				if (handler(item)) {
// 					return true;
// 				}
// 			}
// 		}
// 	});
// }

if (!Object.prototype._t_foreach) {
  Object.defineProperty(Object.prototype, "_t_foreach", {
    value: function(iterator) {
      if (this == null) {
        throw Error("Cannot iterate over null object");
      }
      const _this = this || window;
      for (const key in _this) {
        if (_this.hasOwnProperty(key)) {
          const ret = iterator.call(_this, key, _this[key]);
          if (ret === false) break;
        }
      }
    },
    enumerable: false,
  });
}


