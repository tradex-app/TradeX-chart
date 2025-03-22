import { dropDown } from "./dropdown";

export function addIndicatorDropdown(chart) {
  let k = Object.keys(chart.indicatorClasses)
  let keys = [['Indicators', ''], ...k]

  const indicators = Object.fromEntries(
    keys.map((key, index) => [key, keys[index]]),
  );

  const fn = (e) => {
    chart.addIndicator(indicators[e.target.value])
  }
  dropDown("nav", indicators, fn)
}

