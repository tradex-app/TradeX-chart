/**
 * Global
 */
export const GlobalStyle = {
  COLOUR_BG: "#141414",
  COLOUR_BORDER: "#666",
  COLOUR_TXT: "#CCC",
}

export const ToolsStyle = {
  COLOUR_ICON: "#888"
}

/**
* Candlesticks
*/
export const CandleType = {
  CANDLE_SOLID: 'candle_solid',
  CANDLE_HOLLOW: 'candle_hollow',
  CANDLE_UP_HOLLOW: 'candle_up_hollow',
  CANDLE_DOWN_HOLLOW: 'candle_down_hollow',
  OHLC: 'ohlc',
  AREA: 'area'
}

export const CandleStyle = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04",

}

export const VolumeStyle = {
  COLOUR_VOLUME_UP: "#00F04088",
  COLOUR_VOLUME_DN: "#F0004088",
  ONCHART_VOLUME_HEIGHT: 15,
}

/**
* y-axis position
*/
export const YAxisPosition = {
  LEFT: 'left',
  RIGHT: 'right'
}
  
/**
*y-axis type
*/
export const YAxisType = {
  NORMAL: 'normal',
  PERCENTAGE: 'percentage',
  LOG: 'log'
}

const YAxisStyle_FONTWEIGHT = "normal"
const YAxisStyle_FONTSIZE = 12
const YAxisStyle_FONTFAMILY = "Arial"

export const YAxisStyle = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: "Arial",
  FONTSIZE: 12,
  FONTWEIGHT: "normal",
  FONT_LABEL: `${YAxisStyle_FONTWEIGHT} ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
}

export const XAxisStyle = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  FONT_LABEL: "12px Arial"
}

export const GridStyle = {
  COLOUR_GRID: "#333"
}