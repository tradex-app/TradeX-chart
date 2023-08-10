// definitions/chart.js

import { MINUTE_MS } from "../utils/time"

export const DEFAULT_TIMEVALUE = 1
export const DEFAULT_TIMEINTERVAL = MINUTE_MS
export const DEFAULT_TIMEFRAME = "1m"
export const DEFAULT_TIMEFRAMEMS = DEFAULT_TIMEINTERVAL
export const DEFAULT_RANGELENGTH = 100

export const PRICEDIGITS = 6

export const XAXIS_ZOOM = 0.05
export const XAXIS_STEP = 100

export const YAXIS_STEP = 100
export const YAXIS_GRID = 16
export const YAXIS_TYPES = ["default", "percent", "log"]
export const YAXIS_BOUNDS = 0.3

export const INTITIALCNT = 30
export const LIMITFUTURE = 200
export const LIMITPAST = 200
export const MINCANDLES = 20
export const MAXCANDLES = 4096
export const MAXGRADSPER = 75
export const BUFFERSIZE = 5  // %

export const ROWMINHEIGHT = 50 // px
export const OFFCHARTDEFAULTHEIGHT = 30 // %
export const DIVIDERHEIGHT = 8 // px

