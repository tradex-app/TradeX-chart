export enum ChartResolutionEnum {
  "1m" = "1m",
  "5m" = "5m",
  "10m" = "10m",
  "15m" = "15m",
  "30m" = "30m",
  "1h" = "1h",
  "4h" = "4h",
  "12h" = "12h",
  "1d" = "1d", // 24h

  // not supported by BE ohlcv endpoint: 14.07.23
  "1w" = "1w",
  "1M" = "1M",
}

export enum ColumnAccessorEnum {
  // minutes
  "5 minute" = "5m",
  "15 minute" = "15m",
  "30 minute" = "30m",
  // hours
  "1 hour" = "1h",
  "2 hour" = "2h",
  "4 hour" = "4h",
  "24 hour" = "24h",
  // days
  "1 day" = "1d",
  "7 day" = "1w",
  "30 day" = "1M",
  "365 day" = "1Y",
}

export enum ColumnAccessorEnumReversed {
  // minutes
  "5m" = "5 minute",
  "15m" = "15 minute",
  "30m" = "30 minute",
  // hours
  "1h" = "1 hour",
  "2h" = "2 hour",
  "4h" = "4 hour",
  "24h" = "24 hour",
  // days
  "1d" = "1 day",
  "1w" = "7 day",
  "1M" = "30 day",
  "1Y" = "365 day",
}

// Technical Indicators Enums

export enum RangeResolutionEnum {
  // "1d" = "1d",
  "1w" = "1d",
  "1M" = "1d",
  "1Y" = "1d",

  "4h" = "4h",
}

export enum LevelResolutionEnum {
  "4h" = "1h",
  "1Y" = "1d",
}

export enum RangeLimitEnum {
  "1w" = 148,
}
