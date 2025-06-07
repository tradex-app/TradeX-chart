function roundT (value, precision) {
  precision = precision || 10
  precision = Math.min(Math.max(0, precision), 20)
  value = (+value).toFixed(precision)
  return +value
}


console.log(roundT(5.25))
console.log(roundT(5.25,1))
console.log(roundT(0.0005, 3))

function round (n, p) {
	p = p || 100
  const d = Math.pow(10, p);
  return Math.round((n + Number.EPSILON) * d) / d;
}

console.log(round(5.25))
console.log(round(5.25,1))
console.log(round(0.0005, 3))

console.time('roundT')
for (let i = 0; i < 10000; i++) {
	roundT(5.25)
	roundT(5.25,1)
	roundT(0.0005, 3)
}
console.timeEnd('roundT')

console.time('round')
for (let i = 0; i < 10000; i++) {
	round(5.25)
	round(5.25,1)
	round(0.0005, 3)
}
console.timeEnd('round')
