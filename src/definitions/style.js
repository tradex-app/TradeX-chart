/**
 * Global
 */

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW
} from "./core"

const FONTWEIGHT = "normal"
const FONTSIZE = 12
const FONTSTYLE = "normal"
const FONTFAMILY = "Avenir, Helvetica, Arial, sans-serif"
const COLOUR_BG = "#141414"
const COLOUR_BORDER = "#666"
const COLOUR_TXT = "#ccc"
const COLOUR_ICON = "#888"
const COLOUR_ICONHOVER = "#CCC"

export const STYLE_ROWS = "width:100%; min-width:100%;"
export const STYLE_ROW = "position: relative; overflow: hidden;"
export const STYLE_TIME = "border-top: 1px solid;"
export const STYLE_SCALE = "display: block; border-left: 1px solid;"

export const GlobalStyle = {
  COLOUR_BG: COLOUR_BG,
  COLOUR_BORDER: COLOUR_BORDER,
  COLOUR_TXT: COLOUR_TXT,
  COLOUR_ICON: COLOUR_ICON,
  COLOUR_ICONHOVER: COLOUR_ICONHOVER,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: FONTWEIGHT,
  FONTSIZE: FONTSIZE,
  FONTSTYLE: FONTSTYLE,
  FONTFAMILY: FONTFAMILY,
  FONT: `font-style: ${FONTSTYLE}: font-size: ${FONTSIZE}px; font-weight: ${FONTWEIGHT}; font-family: ${FONTFAMILY};`,
}

export const ToolsStyle = {
  COLOUR_ICON: COLOUR_ICON
}

export const UtilsStyle = {
  COLOUR_ICON: COLOUR_ICON
}

export const MenuStyle = {
  COLOUR_BG: COLOUR_BG,
  COLOUR_BORDER: COLOUR_BORDER,
  COLOUR_TXT: COLOUR_TXT,
}

export const WindowStyle = {
  COLOUR_BG: COLOUR_BG,
  COLOUR_BORDER: COLOUR_BORDER,
  COLOUR_TXT: COLOUR_TXT,
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
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
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

const YAxisStyle_FONTWEIGHT = FONTWEIGHT
const YAxisStyle_FONTSIZE = FONTSIZE
const YAxisStyle_FONTFAMILY = FONTFAMILY

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

const XAxisStyle_FONTWEIGHT = FONTWEIGHT
const XAxisStyle_FONTSIZE = FONTSIZE
const XAxisStyle_FONTFAMILY = FONTFAMILY

export const XAxisStyle = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
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

export const LegendStyle = {
  text: GlobalStyle.FONT,
  colour: GlobalStyle.COLOUR_TXT
}

export const defaultTheme = {
  candle: {
    Type: CandleType.CANDLE_SOLID,
    UpBodyColour: CandleStyle.COLOUR_CANDLE_UP,
    UpWickColour: CandleStyle.COLOUR_WICK_UP,
    DnBodyColour: CandleStyle.COLOUR_CANDLE_DN,
    DnWickColour: CandleStyle.COLOUR_WICK_DN,
  },
  volume: {
    Height: VolumeStyle.ONCHART_VOLUME_HEIGHT,
    UpColour: VolumeStyle.COLOUR_VOLUME_UP,
    DnColour: VolumeStyle.COLOUR_VOLUME_DN,
  },
  xAxis: {
    colourTick: XAxisStyle.COLOUR_TICK,
    colourLabel: XAxisStyle.COLOUR_LABEL,
    colourCursor: XAxisStyle.COLOUR_CURSOR,
    colourCursorBG: XAxisStyle.COLOUR_CURSOR_BG,
    fontFamily: XAxisStyle.FONTFAMILY,
    fontSize: XAxisStyle.FONTSIZE,
    fontWeight: XAxisStyle.FONTWEIGHT,
    line: "#656565"
  },
  yAxis: {
    colourTick: YAxisStyle.COLOUR_TICK,
    colourLabel: YAxisStyle.COLOUR_LABEL,
    colourCursor: YAxisStyle.COLOUR_CURSOR,
    colourCursorBG: YAxisStyle.COLOUR_CURSOR_BG,
    fontFamily: YAxisStyle.FONTFAMILY,
    fontSize: YAxisStyle.FONTSIZE,
    fontWeight: YAxisStyle.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: GlobalStyle.COLOUR_BG,
    BorderColour: GlobalStyle.COLOUR_BORDER,
    BorderThickness: GlobalStyle.BORDER_THICKNESS,
    TextColour: GlobalStyle.COLOUR_TXT,
    GridColour: GridStyle.COLOUR_GRID,
  },
  onChart: {

  },
  ofChart: {

  },
  maxVolumeH: VolumeStyle.ONCHART_VOLUME_HEIGHT,
  legend: {
    text: LegendStyle.text,
    colour: LegendStyle.colour,
  }
}

const style = `
<style>
  .tradeXchart {}
  .tradeXchart .tradeXtime .navigation { 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 2px;
  }
  .tradeXchart .tradeXtime .navigation .icon { 
    flex-basis: 20px;
   }
  .tradeXchart .tradeXtime .navigation #tScrollBar { 
    height: 20px; 
    border: 1px solid; 
    border-radius: 3px; 
    flex-basis: 100%;
    overflow: hidden;
  }
  .tradeXchart .tradeXtime .navigation #tScrollBar .handle { 
    height: 18px; 
    border-radius: 2px; 
    margin: 1px;
  }

  tradex-grid {
    position: absolute;
  }
</style>
`
export default style

