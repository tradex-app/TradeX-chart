// core.js

import Chart from './chart'

const instances = {}
  let inCnt = 0


function create(container, options={}) {
  ++inCnt
  instances[inCnt] = new Chart(container, options, inCnt)
  return instances[inCnt]
}

function destroy() {

}

export default create
export { create, destroy }