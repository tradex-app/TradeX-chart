import { Chart, DOM } from './tradex-chart.es.js'
// import './style.css'


DOM.findBySelector('#app').innerHTML = `
<h1>TradeX Chart</h1>
<div id="container">
  <div id="nav">
    <button type="button" onclick="window.demo.src='chart-live.html'">Live Chart</button>
    <button type="button" onclick="window.demo.src='chart-static.html'">Static Chart</button>
  </div>
  <div id="stage">
    <iframe id="demo" src="chart-live.html" height=""></iframe>
  </div>
</div>

`




