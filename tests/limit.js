function limit(val, min, max) {
  return val > max ? max : val < min ? min : val;
}

function limit2(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

let max = 150,
    loop = 1000000

console.time("conditional")
for (let i=0; i<loop; i++) {
  let val = Math.floor(Math.random() * max)
  limit(val, 0, 100)
}
console.timeEnd("conditional")

console.time("conditional2")
for (let i=0; i<loop; i++) {
  let val = Math.floor(Math.random() * max)
  limit2(val, 0, 100)
}
console.timeEnd("conditional2")
