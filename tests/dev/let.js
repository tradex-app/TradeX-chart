console.time("single")
for (let i=0; i<1000000; i++) {
	let a
  let b
  let c
  let d
  let e
  let f
  let h
  let i
  let j
  let k
}
console.timeEnd("single")

console.time("once")
for (let i=0; i<1000000; i++) {
  let a
  ,b
  ,c
  ,d
  ,e
  ,f
  ,h
  ,i
  ,j
  ,k;
}
console.timeEnd("once")
