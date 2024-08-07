import { differenceInCalendarDays } from 'date-fns';
import { ChartResolutionEnum, ColumnAccessorEnumReversed } from './enums';
import { IChartOption, IIndicatorOption } from './types';

export const LIMIT = 250;
export const DEFAULT_RANGE_LIMIT = 96;

export const CHART_OPTIONS: IChartOption[] = [
  {
    id: 1,
    label: 'CANDLE',
    value: 'candle_solid'
  },
  {
    id: 2,
    label: 'LINE',
    value: 'area'
  }
];

const TIME = {
  sec: 1000,
  min: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000
};

export const FACTOR = {
  '1m': LIMIT * TIME.min,
  '5m': (LIMIT * TIME.hour) / 12,
  '10m': (LIMIT * TIME.hour) / 6,
  '15m': (LIMIT * TIME.hour) / 4,
  '30m': (LIMIT * TIME.hour) / 2,
  '1h': LIMIT * TIME.hour,
  '4h': (LIMIT * TIME.day) / 6,
  '12h': (LIMIT * TIME.day) / 2,
  '1d': LIMIT * TIME.day,
  //
  '1w': LIMIT * TIME.week,
  '1M': LIMIT * TIME.month
};

export const getIndicatorsData = (
  indicatorsData,
  data: number[],
  indicator: IIndicatorOption,
  interval: string
) => {
  let name = indicatorsData[0].indicator;
  let indType = 'RANGE';
  let d = [];

  switch (indicator.value) {
    case 'RANGE':
      name = indicatorsData[0].indicator;
      indType = 'RANGE';
      d = data.map((candle) => [
        candle[0],
        indicatorsData[0].values[ColumnAccessorEnumReversed[interval]] || 0,
        indicatorsData[1].values[ColumnAccessorEnumReversed[interval]] || 0,
        indicatorsData[2].values[ColumnAccessorEnumReversed[interval]] || 0
      ]);
      break;
    case 'LEVEL':
      name = 'Level';
      indType = 'LEVEL';
      d = data.map((candle) => [
        candle[0],
        indicatorsData[0].values[ColumnAccessorEnumReversed[interval]] || 0,
        indicatorsData[1].values[ColumnAccessorEnumReversed[interval]] || 0
      ]);

      break;
  }

  return {
    name,
    value: indType,
    data: d
  };
};

// Intervals

export const INTERVALS = [
  { id: ChartResolutionEnum['1m'], value: ChartResolutionEnum['1m'] },
  { id: ChartResolutionEnum['5m'], value: ChartResolutionEnum['5m'] },
  { id: ChartResolutionEnum['10m'], value: ChartResolutionEnum['10m'] },
  { id: ChartResolutionEnum['15m'], value: ChartResolutionEnum['15m'] },
  { id: ChartResolutionEnum['30m'], value: ChartResolutionEnum['30m'] },
  { id: ChartResolutionEnum['1h'], value: ChartResolutionEnum['1h'] },
  { id: ChartResolutionEnum['4h'], value: ChartResolutionEnum['4h'] },
  { id: ChartResolutionEnum['12h'], value: ChartResolutionEnum['12h'] },
  { id: ChartResolutionEnum['1d'], value: ChartResolutionEnum['1d'] }
];

// Calculate Resolution

const DAY_INTERVAL = [
  ChartResolutionEnum['1m'],
  ChartResolutionEnum['5m'],
  ChartResolutionEnum['10m'],
  ChartResolutionEnum['15m']
];

const WEEK_INTERVAL = [ChartResolutionEnum['30m'], ChartResolutionEnum['1h']];

const WEEKS_INTERVAL = [ChartResolutionEnum['1h'], ChartResolutionEnum['1d']];

const MONTH_INTERVAL = [
  ChartResolutionEnum['1h'],
  ChartResolutionEnum['1d'],
  ChartResolutionEnum['1w']
];

const MONTHS_INTERVAL = [
  ChartResolutionEnum['1d'],
  ChartResolutionEnum['1w'],
  ChartResolutionEnum['1M']
];

// time < 1Day [1m, 5m, 10m, 15m]
// time > 1Day and < 1week = [30m, 1h]
// time > 1 week and < 2weeks [1h, 1d]
// time > 2 weeks [1h and above]
export const calculateResolution = (
  start: Date,
  end: Date,
  resolution: ChartResolutionEnum
) => {
  if (start === null || end === null) {
    return resolution;
  }

  const diffInDays = Math.abs(differenceInCalendarDays(start, end));
  let resolutionArr;

  if (diffInDays === 0) {
    resolutionArr = [...DAY_INTERVAL];
  } else if (diffInDays <= 7) {
    resolutionArr = [...WEEK_INTERVAL];
  } else if (diffInDays <= 31) {
    resolutionArr = [...WEEKS_INTERVAL];
  } else if (diffInDays <= 62) {
    resolutionArr = [...MONTH_INTERVAL];
  } else {
    resolutionArr = [...MONTHS_INTERVAL];
  }

  if (resolutionArr.includes(resolution)) {
    return resolution;
  }

  return resolutionArr[0];
};
