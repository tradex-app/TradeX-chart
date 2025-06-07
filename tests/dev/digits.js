function numDigits(x) {
  return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}

function numDigits2(x) {
  return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
}

let x = 28788.201

console.log(numDigits(x))
console.log(numDigits2(x))

let c = 0
console.time("numDigits")
while (c < 100000) { numDigits(x); c++}
console.timeEnd("numDigits")
let d = 0
console.time("numDigits2")
while (d < 100000) { numDigits2(x); d++}
console.timeEnd("numDigits2")