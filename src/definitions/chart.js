// definitions/chart.js

export const TIMEUNITS = ['s','m','h','d','w','M','y']
const SECOND = 1000;
const MINUTE = SECOND * 60;
const MINUTE3 = MINUTE * 3;
const MINUTE5 = MINUTE * 5;
const MINUTE15 = MINUTE * 15;
const MINUTE30 = MINUTE * 30;
const HOUR = MINUTE * 60;
const HOUR4 = HOUR * 4;
const HOUR12 = HOUR * 12;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = WEEK * 4;
const YEAR = DAY * 365;
const MONTHMAP = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // Grid time steps

const TIMESCALES = [YEAR * 10, YEAR * 5, YEAR * 3, YEAR * 2, YEAR, MONTH * 6, MONTH * 4, MONTH * 3, MONTH * 2, MONTH, DAY * 15, DAY * 10, DAY * 7, DAY * 5, DAY * 3, DAY * 2, DAY, HOUR * 12, HOUR * 6, HOUR * 3, HOUR * 1.5, HOUR, MINUTE30, MINUTE15, MINUTE * 10, MINUTE5, MINUTE * 2, MINUTE]; // Grid $ steps

const $SCALES = [0.05, 0.1, 0.2, 0.25, 0.5, 0.8, 1, 2, 5];

export const PRICEDIGITS = 8

export const YAXIS_STEP = 100
export const YAXIS_TYPES = ["default", "percent", "log"]