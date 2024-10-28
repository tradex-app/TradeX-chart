
import { binanceTF } from "./binanceTF";

export function loadTimeFrame(chart) {
  const nav = document.querySelector("nav")

  const select = document.createElement("select", )
  let options = ""
  for (let [key, value] of Object.entries(binanceTF)) {
    options += `<option value="${value}">${key}</option>\n`
  }
  select.innerHTML = options
  select.addEventListener("change", (e) => chart.state.dataSource.timeFrameUse(e.target.value))
  nav?.appendChild(select)
}
