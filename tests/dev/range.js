const data =  [
  [
      1543572000000,
      4239.4,
      4239.6,
      4079.6,
      4079.63478779,
      2993.45281556
  ],
  [
      1543575600000,
      4082.2,
      4082.2,
      4020.2,
      4033.5,
      3216.95571165
  ],
  [
      1543579200000,
      4035.6,
      4072.78348726,
      3965,
      4055.6,
      2157.50135341
  ],
  [
      1543582800000,
      4055.6,
      4100,
      4035,
      4059.1719252,
      1660.6115119
  ],
  [
      1543586400000,
      4059.1,
      4076.6,
      4014.1,
      4060,
      1070.09946267
  ],
  [
      1543590000000,
      4060.5,
      4060.5,
      3987.2,
      4049.2,
      1530.46774287
  ],
  [
      1543593600000,
      4049.2,
      4092.7,
      4035,
      4089.6691106,
      922.84509291
  ],
  [
      1543597200000,
      4089.9,
      4098.6,
      4060,
      4073.2,
      793.81081878
  ],
  [
      1543600800000,
      4073.7,
      4084.3,
      4045.3,
      4049.7,
      382.60686566
  ],
  [
      1543604400000,
      4049.9,
      4074.5,
      4041,
      4042.1554296,
      587.91082169
  ],
  [
      1543608000000,
      4042.1,
      4058.2,
      4025,
      4031.3,
      399.88361961
  ],
  [
      1543611600000,
      4031.3,
      4054.8,
      3953.5,
      4005,
      1462.60523159
  ],
  [
      1543615200000,
      4005,
      4026.5,
      3953.6,
      4022.7,
      818.53015592
  ],
  [
      1543618800000,
      4022.8,
      4065,
      4018.9,
      4039.5,
      971.06384284
  ],
  [
      1543622400000,
      4038.5,
      4065,
      4010.1,
      4052,
      726.79477438
  ],
  [
      1543626000000,
      4052.1,
      4070.8,
      4040.1,
      4045,
      495.99207452
  ],
  [
      1543629600000,
      4045,
      4045.9,
      4014.5,
      4014.6,
      487.14701364
  ],
  [
      1543633200000,
      4014.6,
      4041.7,
      4005.6,
      4031.8,
      505.30648465
  ],
  [
      1543636800000,
      4032,
      4032,
      3986.1,
      4008.8,
      792.52103654
  ],
  [
      1543640400000,
      4008.8,
      4017.1,
      3975.8,
      4003.7,
      489.94574863
  ],
  [
      1543644000000,
      4003.7,
      4017.2,
      3964.5,
      3991.7,
      1004.91928605
  ]
]

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

function getRange( data, start=0, end=data.length-1 ) {
  let r = {}
  r.dataLen = data.length
  r.dataTimeS = data[0][0]
  r.dataTimeE = data[r.dataLen - 1][0]
  r.indexS = start
  r.indexE = end
  r.len = end - start
  r.timeS = data[r.indexS][0]
  r.timeE = data[r.indexE][0]
  r.interval = data[r.indexS+1][0] - data[r.indexS][0]
  r.intervalStr = ms2Interval(r.interval)
  r.minTime = data[r.indexS][0]
  r.maxTime = data[r.indexE-1][0]
  r = {...r, ...maxMinPriceVol(data, start, end)}
  r.scale = (r.dataLen - 1) / (r.len)
  return r
}

function maxMinPriceVol( data, start=0, end=data.length-1 ) {
if (start > end) [start, end] = [end, start]
const l = (end > (data.length - 1)) ? data.length - 1 : end
let i = (start < 0) ? 0 : start
let minPrice  = data[0][3]
let maxPrice  = data[0][2]
let minVolume = data[0][5]
let maxVolume = data[0][5]

while(i < l) {
  minPrice  = (data[i][3] < minPrice) ? data[i][3] : minPrice
  maxPrice  = (data[i][2] > maxPrice) ? data[i][2] : maxPrice
  minVolume = (data[i][5] < minVolume) ? data[i][5] : minVolume
  maxVolume = (data[i][5] > maxVolume) ? data[i][5] : maxVolume
  i++
}

return {
  minPrice: minPrice,
  maxPrice: maxPrice,
  minVolume: minVolume,
  maxVolume: maxVolume
}
}

console.log(maxMinPriceVol(data))
console.log(getRange(data))
