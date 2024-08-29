/**
 * Global
 */

import Divider from "../components/widgets/divider"
import { arrowDown, arrowUp, arrowDownRound, arrowUpRound, arrowDownRoundSolid, arrowUpRoundSolid, buySolid, sellSolid, noteSolid, lightning } from "./icons"

export const CHART_MINH = 300
export const CHART_MINW = 400
export const TX_MINW = `${CHART_MINW}px`
export const TX_MINH = `${CHART_MINH}px`
export const TX_MAXW = "100%"
export const TX_MAXH = "100%"
export const UTILSH = 30
export const TOOLSW = 35
export const TIMESCALEH = 25
export const TIMENAVIGATIONH = 25
export const TIMEH = TIMESCALEH + TIMENAVIGATIONH
export const SCALEW = 60

const FONTWEIGHT = "normal"
const FONTSIZE = 12
const FONTSTYLE = "normal"
const FONTFAMILY = "Avenir, Helvetica, Arial, sans-serif"
const COLOUR_BG = "#141414"
const COLOUR_BORDER = "#333"
const COLOUR_TXT = "#cccccc"
const COLOUR_ICON = "#888888"
const COLOUR_ICONHOVER = "#cccccc"
const ICONSIZE = "25px"

export const STYLE_ROWS = "width:100%; min-width:100%;"
export const STYLE_ROW = "position: relative;"
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
  FONT: `${FONTSTYLE} ${FONTSIZE}px ${FONTWEIGHT} ${FONTFAMILY}`,
  FONTSTRING: `font-style: ${FONTSTYLE}; font-size: ${FONTSIZE}px; font-weight: ${FONTWEIGHT}; font-family: ${FONTFAMILY};`,
}

export const CanvasStyle = {
  fontSize: FONTSIZE,
  fontWeight: FONTWEIGHT,
  fontFamily: FONTFAMILY,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderWidth: 1,
  txtCol: "#000000",
  bakCol: "#cccccc",
  stroke: "#ffffff",
  fill: "#888888"
}

export const dashedPatterns = {
  "─────────": [],
  "┈┈┈┈┈┈┈┈┈": [1, 1],
  "- - - - -": [10, 10],
  "─ ─ ─ ─ ─": [20, 5],
  "─ ▪ ─ ▪ ─": [15, 3, 3, 3],
}

export const ToolsStyle = {
  COLOUR_ICON: COLOUR_ICON,
  COLOUR_ICONHOVER: COLOUR_ICONHOVER,
  ICONSIZE: ICONSIZE
}

export const UtilsStyle = {
  COLOUR_ICON: COLOUR_ICON,
  COLOUR_ICONHOVER: COLOUR_ICONHOVER,
  ICONSIZE: ICONSIZE
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
  SHADOW: "rgb(0,0,0) 0px 20px 30px -10px",
  CONTENT: "padding: 1em",
  TITLE: "padding: 2px 1em 5px; background: #333; white-space: nowrap;"
}

export const ProgressStyle = {
  FILL: COLOUR_ICONHOVER+"88"
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
  AREA: 'area',
  LINE: 'line'
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

export const YAxisFontSizeFactor = 1.75

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
  COLOUR_GRID: "#222"
}

export const PriceLineStyle = {
  width: 1,
  stroke: "#ccc",
  dash: [1,1]
}

export const LegendStyle = {
  text: GlobalStyle.FONTSTRING,
  font: GlobalStyle.FONT,
  colour: GlobalStyle.COLOUR_TXT
}

export const DividerStyle = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00",
  LINE: GlobalStyle.COLOUR_BORDER,
  STYLE: "1px solid"
}

export const watermark = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: GlobalStyle.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}

export const drawingNode = {
  passive: {
    stroke: "#000",
    fill: "#ccc",
    width: 1,
    radius: 6,
  },
  hover: {
    stroke: "#800",
    fill: "#fff",
    width: 1,
    radius: 6,
  },
  active: {
    stroke: "#800",
    fill: "#fff",
    width: 1,
    radius: 6,
  },
}

const tradeIcons = { arrowDown, arrowUp, arrowDownRound, arrowUpRound, arrowDownRoundSolid, arrowUpRoundSolid, buySolid, sellSolid }
const eventIcons = { noteSolid, lightning }

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
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: COLOUR_ICON,
    iconHover: COLOUR_ICONHOVER
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
    FontWeight: GlobalStyle.FONTWEIGHT,
    FontSize: GlobalStyle.FONTSIZE,
    FontStyle: GlobalStyle.FONTSTYLE,
    FontFamily: GlobalStyle.FONTFAMILY,
    Font: GlobalStyle.FONT,
    FontString: GlobalStyle.FONTSTRING,
    GridColour: GridStyle.COLOUR_GRID,
  },
  primaryPane: {
    separator: "#666"
  },
  secondaryPane: {
    separator: "#666"
  },
  tools: {
    location: false
  },
  utils: {
    location: false
  },
  time: {
    navigation: false,
    font: LegendStyle.font,
    colour: "#96a9db",
    handleColour: "#586ea6",
  },
  legend: {
    font: LegendStyle.font,
    colour: LegendStyle.colour,
    controls: true,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18,
  },
  icon: {
    colour: COLOUR_ICON,
    hover: COLOUR_ICONHOVER
  },
  divider: {
    active: DividerStyle.ACTIVE,
    idle: DividerStyle.IDLE,
    line: DividerStyle.LINE,
    style: DividerStyle.STYLE
  },
  window: WindowStyle,
  watermark: watermark,
  trades: {
    iconBuy: tradeIcons.arrowUp,
    iconSell: tradeIcons.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: tradeIcons,
    offset: 10,
    positionLine: 1,
    positionStyle: "1px solid",
    positionDash: [1,0],
    stopLossColour: "#fc0",
    stopLossLine: 1,
    stopLossStyle: "1px solid",
    stopLossDash: [1,0],
    takeProfitColour: "#0cf",
    takeProfitLine: 1,
    takeProfitStyle: "1px solid",
    takeProfitDash: [1,0],
  },
  events: {
    iconEvent: eventIcons.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: "#ccc",
    defaultIcons: eventIcons,
    offset: 10
  },
  drawing: {
    node: drawingNode
  }
}

export const cssVars = `
<style id="txc_CSSVars">
  --txc-background: #141414:
  --txc-border-color: #888;
  --txc-time-scrollbar-color: #888;
  --txc-time-handle-color: #888;
  --txc-time-slider-color: #888;
  --txc-time-cursor-fore: #222;
  --txc-time-cursor-back: #ccc;
  --txc-time-icon-color: #888;
  --txc-time-icon-hover-color: #888;
</style>`

const style = `
<style id="txc_globalCSS">
  tradex-chart {
    content-visibility: auto;
    display: grid;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${TX_MINW});
    min-height: var(--txc-min-height, ${TX_MINH});
    max-width: var(--txc-max-width, ${TX_MAXW});
    max-height: var(--txc-max-height, ${TX_MAXH});
    overflow: hidden;
    background: var(--txc-background, ${GlobalStyle.COLOUR_BG});
    font: var(--txc-font, ${GlobalStyle.FONT});
  }
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

