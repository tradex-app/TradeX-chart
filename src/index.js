import Chart from './core'
import DOM from './utils/DOM'
import Overlay from './components/overlays/overlay'
import Indicator from './components/overlays/indicator'
import { copyDeep, mergeDeep, uid } from './utils/utilities'
import { isPromise } from './utils/typeChecks'

// export default Chart
export { 
  Chart, 
  copyDeep, 
  DOM, 
  Indicator, 
  isPromise,
  mergeDeep, 
  Overlay, 
  uid 
}
