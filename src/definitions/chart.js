// definitions/chart.js

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const MINUTE2 = MINUTE * 2
export const MINUTE3 = MINUTE * 3;
export const MINUTE5 = MINUTE * 5;
export const MINUTE10 = MINUTE * 10
export const MINUTE15 = MINUTE * 15;
export const MINUTE30 = MINUTE * 30;
export const HOUR = MINUTE * 60;
export const HOUR1_5 = HOUR * 1.5
export const HOUR3 = HOUR * 3
export const HOUR4 = HOUR * 4;
export const HOUR6 = HOUR * 6
export const HOUR12 = HOUR * 12;
export const DAY = HOUR * 24;
export const DAY2 = DAY * 2
export const DAY3 = DAY * 3
export const DAY5 = DAY * 5
export const DAY7 = DAY * 7
export const DAY10 = DAY * 10
export const DAY15 = DAY * 15
export const WEEK = DAY * 7;
export const MONTH = WEEK * 4;
export const MONTH2 = MONTH * 2
export const MONTH4 = MONTH * 4
export const MONTH3 = MONTH * 3
export const MONTH6 = MONTH * 6
export const YEAR = DAY * 365;
export const YEAR2 = YEAR * 2
export const YEAR3 = YEAR * 3
export const YEAR5 = YEAR * 5
export const YEAR10 = YEAR * 10

export const MONTHMAP = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // Grid time steps

const $SCALES = [0.05, 0.1, 0.2, 0.25, 0.5, 0.8, 1, 2, 5];
export const TIMESCALES = [YEAR * 10, YEAR * 5, YEAR * 3, YEAR * 2, YEAR, MONTH * 6, MONTH * 4, MONTH * 3, MONTH * 2, MONTH, DAY * 15, DAY * 10, DAY * 7, DAY * 5, DAY * 3, DAY * 2, DAY, HOUR * 12, HOUR * 6, HOUR * 3, HOUR * 1.5, HOUR, MINUTE30, MINUTE15, MINUTE * 10, MINUTE5, MINUTE * 2, MINUTE]; // Grid $ steps

export const TIMEINCS = {
  // [YEAR10]: {max: [10, 'y'], min: [5, 'y']},
  // [YEAR5]: {max: [5, 'y'], min: [, ]},
  // [YEAR3]: {max: [3, 'y'], min: [1, 'y']},
  // [YEAR2]: {max: [2, 'y'], min: [1, 'y']},
  [YEAR]: {max: [1, 'y'], min: [1, 'M']},
  [MONTH6]: {max: [6, 'M'], min: [1, 'M']},
  [MONTH4]: {max: [4, 'M'], min: [2, 'w']},
  [MONTH3]: {max: [3, 'M'], min: [1, 'w']},
  [MONTH2]: {max: [2, 'M'], min: [1, 'w']},
  [MONTH]: {max: [1, 'M'], min: [3, 'd']},
  [DAY15]: {max: [15, 'd'], min: [2, 'd']},
  [DAY10]: {max: [10, 'd'], min: [1, 'd']},
  [DAY7]: {max: [7, 'd'], min: [12, 'h']},
  [DAY5]: {max: [5, 'd'], min: [12, 'h']},
  [DAY3]: {max: [3, 'd'], min: [6, 'h']},
  [DAY2]: {max: [2, 'd'], min: [4, 'h']},
  [DAY]: {max: [1, 'd'], min: [2, 'h']},
  [HOUR12]: {max: [12, 'h'], min: [1, 'h']},
  [HOUR6]: {max: [6, 'h'], min: [30, 'm']},
  [HOUR3]: {max: [3, 'h'], min: [20, 'm']},
  [HOUR1_5]: {max: [1.5, 'h'], min: [15, 'm']},
  [HOUR]: {max: [1, 'h'], min: [5, 'm']},
  [MINUTE30]: {max: [30, 'm'], min: [3, 'm']},
  [MINUTE15]: {max: [15, 'm'], min: [2, 'm']},
  [MINUTE10]: {max: [10, 'm'], min: [1, 'm']},
  [MINUTE5]: {max: [5, 'm'], min: [30, 's']},
  // [MINUTE2]: {max: [, ], min: [, ]},
  // [MINUTE]: {max: [, ], min: [, ]},
}

export const TIMEUNITS = ['s','m','h','d','w','M','y']

export const DEFAULT_TIMEVALUE = 1
export const DEFAULT_TIMEINTERVAL = MINUTE
export const DEFAULT_TIMEFRAME = "1m"
export const DEFAULT_TIMEFRAMEMS = DEFAULT_TIMEINTERVAL
export const DEFAULT_RANGELENGTH = 100

export const PRICEDIGITS = 6

export const XAXIS_ZOOM = 0.05

export const YAXIS_STEP = 100
export const YAXIS_GRID = 16
export const YAXIS_TYPES = ["default", "percent", "log"]
export const YAXIS_BOUNDS = 0.005

export const LIMITFUTURE = 200
export const LIMITPAST = 200
export const MINCANDLES = 20
export const MAXCANDLES = 4096
export const MAXGRADSPER = 100
export const BUFFERSIZE = 20  // %

export const ROWMINHEIGHT = 50 // px
export const OFFCHARTDEFAULTHEIGHT = 30 // %
export const DIVIDERHEIGHT = 8 // px
