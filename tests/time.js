function ms2TimeUnits( milliseconds ) {
  var weeks, days, hours, minutes, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  days = Math.floor(hours / 24);
  hours = hours % 24;
  weeks = Math.floor(days / 7);
  return {
      w: weeks,
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
      
			weeks: weeks,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
  };
}

function ms2Interval( milliseconds ) {
  const intervals = ms2TimeUnits(milliseconds)
  for (const unit in intervals) {
    if (intervals[unit]) return `${intervals[unit]}${unit}`
  }
}

let ms = 1000 * 60 * 60 * 24 * 8

console.log(ms2TimeUnits(ms))

console.log(ms2Interval(ms))
