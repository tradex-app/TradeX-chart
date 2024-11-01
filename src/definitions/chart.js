// definitions/chart.js

// import { MINUTE_MS } from "../utils/time"

export const DEFAULT_TIMEVALUE = 1
export const DEFAULT_TIMEINTERVAL = 60000 // MINUTE_MS
export const DEFAULT_TIMEFRAME = "1m"
export const DEFAULT_TIMEFRAMEMS = DEFAULT_TIMEINTERVAL
export const DEFAULT_RANGELENGTH = 100

export const XAXIS_ZOOM = 0.05
export const XAXIS_STEP = 100

export const YAXIS_STEP = 100
export const YAXIS_GRID = 16
export const YAXIS_BOUNDS = 0.3
export const YAXIS_PADDING = 1.04
export const YAXIS_MINDIGITS = 8 // candle count down plus 00:00:00

// YAxis type enum
export class YAXIS_TYPE {
  static default = new YAXIS_TYPE("default")
  static percent = new YAXIS_TYPE("percent")
  static relative = new YAXIS_TYPE("relative")
  static log = new YAXIS_TYPE("log")

  static valid (t) {
    return (t instanceof YAXIS_TYPE) ? t : YAXIS_TYPE.default
  }
  static get types () {
    let types = [];
    for (let key in YAXIS_TYPE) {
      if (YAXIS_TYPE[key] instanceof YAXIS_TYPE) types.push(key)
    }
    return types
  }

  constructor(name) {
    this.name = name
  }
}
export const YAXIS_TYPES = YAXIS_TYPE.types



export const INTITIALCNT = 30
export const LIMITFUTURE = 200
export const LIMITPAST = 200
export const MINCANDLES = 20
export const MAXCANDLES = 1920
export const MAXGRADSPER = 75
export const BUFFERSIZE = 5  // %

export const ROWMINHEIGHT = 50 // px
export const SECONDARYDEFAULTHEIGHT = 30 // %
export const DIVIDERHEIGHT = 8 // px
export const COLLAPSEDHEIGHT = 30 // px

export const UTILSLOCATIONS = [true, "top"]

// OHLCV enum
export class OHLCV {
  static t = 0
  static o = 1
  static h = 2
  static l = 3
  static c = 4
  static v = 5
}

export const OVERLAYPANES = {
  mainPane: {},
  primaryPane: {},
  secondaryPane: {},
  scale: {},
  timeline: {}
}
export const OVERLAYLOCATIONS = Array.from(Object.keys(OVERLAYPANES))
