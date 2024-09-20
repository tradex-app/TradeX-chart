import Chart from './core'
import canvas from './renderer/canvas'
import DOM from './utils/DOM'
import EventHub from './utils/eventHub'
import StateMachine from './scaleX/stateMachne'
import Overlay from './components/overlays/overlay'
import Indicator from './components/overlays/indicator'
import { IndicatorClasses } from './definitions/indicators'
import { Range, detectInterval } from './model/range'
import { copyDeep, mergeDeep, uid } from './utils/utilities'
import * as typeChecks from './utils/typeChecks'
import { isPromise } from './utils/typeChecks'
import { talibAPI } from './definitions/talib-api'
import * as utils from './utils/utilities'
import Aspect from './scaleX/aspect'
import { candleW } from './components/primitives/candle'
import { YAXIS_TYPE, YAXIS_TYPES, YAXIS_PADDING } from './definitions/chart'
import { DEFAULT_STATE } from './state'
import { TimeData } from './utils/time'

// export default Chart
export { 
  Chart, 
  candleW,
  canvas,
  copyDeep, 
  DOM, 
  Aspect,
  EventHub,
  StateMachine,
  Indicator,
  IndicatorClasses,
  talibAPI,
  isPromise,
  typeChecks,
  mergeDeep, 
  Overlay, 
  Range,
  TimeData,
  utils,
  uid,
  YAXIS_TYPE,
  YAXIS_TYPES,
  YAXIS_PADDING,
  DEFAULT_STATE,
}
