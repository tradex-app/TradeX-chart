let x = 28788.201,
		int;

int = parseInt(x)
console.log(int)

int = x | 0
console.log(int)

// fastest
function precision(value) {
  let a
  if (typeof value !== "number") a = parseFloat(value); 
  if (isNaN(value)) return 0;
  if (!isFinite(value)) return 0;
  var e = 1, p = 0;
  while (Math.round(value * e) / e !== value) { e *= 10; p++; }
  return p;
}

// slowest by a large margin
function decimalPlaces(n) {
  function hasFraction(n) {
    return Math.abs(Math.round(n) - n) > 1e-10;
  }

  let count = 0;
  // multiply by increasing powers of 10 until the fractional part is ~ 0
  while (hasFraction(n * (10 ** count)) && isFinite(10 ** count))
    count++;
  return count;
}

// close second
function getPrecision (value) {
  const str = value.toString()
  const eIndex = str.indexOf('e')
  if (eIndex > 0) {
    const precision = +str.slice(eIndex + 1)
    return precision < 0 ? -precision : 0
  } else {
    const dotIndex = str.indexOf('.')
    return dotIndex < 0 ? 0 : str.length - 1 - dotIndex
  }
}


let i = 0
console.time("precision")
while (i < 100000) { precision(x); i++}
console.timeEnd("precision")
let c = 0
console.time("decimalPlaces")
while (c < 100000) { decimalPlaces(x); c++}
console.timeEnd("decimalPlaces")
let d = 0
console.time("getPrecision")
while (d < 100000) { getPrecision(x); d++}
console.timeEnd("getPrecision")