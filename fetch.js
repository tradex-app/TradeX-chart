function f(n) {
  console.log("attempt",n)
  const url = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&startTime=1728688920000&limit=100"; 
  fetch(url)
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(
    e => {
      console.log("error", n)
      console.error(e)
    }
  )
}

f(1);

let g = (n) => f(n)
g(2)

setTimeout(g, 100, 3)

// To assign event
const startEvent = new Event("start");
// To trigger the event Listener
document.addEventListener("start", () => {
    g(4)
});
// To trigger the Event
document.dispatchEvent(startEvent);

function onLimit() {
  f(5)
}
onLimit()
