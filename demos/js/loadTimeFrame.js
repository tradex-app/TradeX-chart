
import { binanceTF } from "./binanceTF";
import { dropDown } from "./dropdown";

export function loadTimeFrame(chart) {

  const fn = (e) => {
    (e) => chart.state.dataSource.timeFrameUse(e.target.value)
  }
  dropDown("nav", binanceTF, fn)
}
