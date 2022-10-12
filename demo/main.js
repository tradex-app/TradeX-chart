import { Chart, DOM } from './tradex-chart.es.js'
// import './style.css'


DOM.findBySelector('#app').innerHTML = `
<h1>TradeX Chart</h1>
<p>Trade chart written in plain (vanilla) JavaScript with minimal dependencies</p>
<p>It is still under heavy development and thus not production ready as it still missing features and has bugs.<br/>
I'm interested in constructive feedback (testing) or contributions.<br/>
<strong>GitHub Repository:</strong> <a href="https://github.com/tradex-app/TradeX-chart">github.com/tradex-app/TradeX-chart</a>
</p>
<p>&nbsp;</p>
<div id="container">
  <div id="nav">
    <h2>Demo</h2>
    <button type="button" onclick="window.demo.src='chart-live.html'">History + Stream</button><br/>
    <button type="button" onclick="window.demo.src='chart-stream-only.html'">Stream Only</button><br/>
    <button type="button" onclick="window.demo.src='chart-static.html'">Static Chart</button><br/>
    <button type="button" onclick="window.demo.src='chart-qq.html'">qq</button><br/>
  </div>
  <div id="stage">
    <iframe id="demo" src="chart-live.html" height=""></iframe>
  </div>
</div>

`




