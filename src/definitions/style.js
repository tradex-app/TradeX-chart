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

export const UtilsStyle = {
  COLOUR_ICON: "#888"
}

export const MenuStyle = {
  COLOUR_BG: "#141414",
  COLOUR_BORDER: "#666",
  COLOUR_TXT: "#CCC",
}

export const WindowStyle = {
  COLOUR_BG: "#141414",
  COLOUR_BORDER: "#666",
  COLOUR_TXT: "#CCC",
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
  FONTFAMILY: YAxisStyle_FONTFAMILY,
  FONTSIZE: YAxisStyle_FONTSIZE,
  FONTWEIGHT: YAxisStyle_FONTWEIGHT,
  FONT_LABEL: `${YAxisStyle_FONTWEIGHT} ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`,
  FONT_LABEL_BOLD: `bold ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
}

const XAxisStyle_FONTWEIGHT = "normal"
const XAxisStyle_FONTSIZE = 12
const XAxisStyle_FONTFAMILY = "Arial"

export const XAxisStyle = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  FONTFAMILY: XAxisStyle_FONTFAMILY,
  FONTSIZE: XAxisStyle_FONTSIZE,
  FONTWEIGHT: XAxisStyle_FONTWEIGHT,
  FONT_LABEL: `${XAxisStyle_FONTWEIGHT} ${XAxisStyle_FONTSIZE}px ${XAxisStyle_FONTFAMILY}`,
  FONT_LABEL_BOLD: `bold ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
}

export const GridStyle = {
  COLOUR_GRID: "#333"
}

export const PriceLineStyle = {
  lineWidth: 1,
  strokeStyle: "#ccc",
  lineDash: [1,1]
}

export const defaultTheme = {
  candle: {
    Type: CandleType.CANDLE_SOLID,
    UpBodyColour: CandleStyle.COLOUR_CANDLE_UP,
    UpWickColour: CandleStyle.COLOUR_CANDLE_DN,
    DnBodyColour: CandleStyle.COLOUR_WICK_UP,
    DnWickColour: CandleStyle.COLOUR_WICK_DN,
  },
  volume: {
    Height: VolumeStyle.ONCHART_VOLUME_HEIGHT,
    UpColour: VolumeStyle.COLOUR_VOLUME_UP,
    DnColour: VolumeStyle.COLOUR_VOLUME_DN,
  },
  chart: {
    Background: GlobalStyle.COLOUR_BG,
    BorderColour: GlobalStyle.COLOUR_BORDER,
    TextColour: GlobalStyle.COLOUR_TXT,
    GridColour: GridStyle.COLOUR_GRID,
  },
  onChart: {

  },
}

