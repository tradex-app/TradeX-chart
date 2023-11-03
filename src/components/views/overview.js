// overview.js
// <tradex-overview></tradex-overview>

import element from "./classes/element"
import { fwdEnd, rwdStart } from "../../definitions/icons"
import Colour from "../../utils/colour"

import {
  GlobalStyle
} from "../../definitions/style"
const iconW = 20
const iconH = 20
const handleColour = new Colour(GlobalStyle.COLOUR_BORDER)
const template = document.createElement('template')
template.innerHTML = `
<style>
  .scrollBarWidget {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 2px;
  }
  .scrollBar {
    position: relative;
    border: 1px solid var(--txc-time-scrollbar-color, ${GlobalStyle.COLOUR_BORDER});
    height: 20px;
    border-radius: 3px;
    flex-basis: 100%;
    overflow: hidden;
  }
  .scrollBar input {
    pointer-events: none;
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    width: 100%;
    outline: none;
    height: 100%;
    margin: 0;
    padding: 0;
    background:  var(--txc-time-slider-color, #555);

  }
  .scrollBar input::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none; 
    pointer-events: auto;
    position: relative;
    z-index: 10;
    outline: 0;
    height: 100%;
  }
  .scrollBar input::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    appearance: none; 
    pointer-events: auto;
    position: relative;
    z-index: 1;
    height: 100%;
  }
  .scrollBar input::-moz-range-track {
    position: relative;
    z-index: -1;
    background-color: rgba(0, 0, 0, 1);
    border: 0;
  }
  .scrollBar input:last-of-type::-moz-range-track {
    -moz-appearance: none;
    background: none transparent;
    border: 0;
  }
  .scrollBar input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none !important;
    appearance: none;
    background: none transparent;
    cursor: default;
    height: 1px; /* Required for Samsung internet based browsers */
    outline: 0;
  }
  .scrollBar input[type=range]::-moz-focus-outer {
    border: 0;
  }
  input[type=range] {
    -webkit-appearance: none;
    background: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
    border: none;
    border-radius: 3px;
    background: transparent;
  }

  input[type=range]::-ms-track {
    height: 5px;
    background: transparent;
    border: none;
    border-radius: 3px;
  }

  input[type=range]::-moz-range-track {
    height: 5px;
    background: transparent;
    border: none;
    border-radius: 3px;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 16px;
    border-radius: 3px;
    background: var(--txc-time-slider-color, #555);
    margin-top: -10px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]::-ms-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 16px;
    border-radius: 3px;
    background:  var(--txc-time-slider-color, #555);
    margin-top: -5px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]::-moz-range-thumb {
    -webkit-appearance: none;
    border: none;
    height: 100%;
    width: 16px;
    border-radius: 3px;
    background:  var(--txc-time-slider-color, #555);
    margin-top: -5px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]:focus {
    outline: none;
  }

  .handle {
    background-color: var(--txc-time-handle-color, ${handleColour.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${iconW}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${GlobalStyle.COLOUR_ICON});
    width: ${iconW}px;
    height: ${iconH}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${GlobalStyle.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${rwdStart}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${fwdEnd}</span>
</div>
`;

export default class tradeXOverview extends element {

  #template
  #scrollBarWidget
  #rwdStart
  #fwdEnd
  #scrollBar
  #viewport
  #handle
  #icons
  #max
  #min
  #sliders
  #overviewCSS

  constructor () {
    super(template)
    this.#template = template
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback(
      () => {
      const bar = document.getElementById('slider-bar')
        this.#scrollBarWidget = this.shadowRoot.querySelector('.scrollBarWidget')
        this.#rwdStart = this.shadowRoot.querySelector('.rwdStart')
        this.#fwdEnd = this.shadowRoot.querySelector('.fwdEnd')
        this.#scrollBar = this.shadowRoot.querySelector('.scrollBar')
        this.#viewport = this.shadowRoot.querySelector('.viewport')
        this.#handle = this.shadowRoot.querySelector('.handle')
        this.#icons = this.shadowRoot.querySelectorAll('svg')
        this.#max = this.shadowRoot.querySelector('#max')
        this.#min = this.shadowRoot.querySelector('#min')
        this.#sliders = this.shadowRoot.querySelectorAll('input')
        this.#overviewCSS = this.shadowRoot.querySelector('style[title=overview]')
      this.max.addEventListener('input', this.onChangeSliderHandler.bind({self: this, input: this.max}))
      this.min.addEventListener('input', this.onChangeSliderHandler.bind({self: this, input: this.min}))
    }
    )
  }


  get scrollBarWidget() { return this.#scrollBarWidget }
  get rwdStart() { return this.#rwdStart }
  get fwdEnd() { return this.#fwdEnd }
  get scrollBar() { return this.#scrollBar }
  get viewport() { return this.#viewport }
  get handle() { return this.#handle }
  get icons() { return this.#icons }
  get max() { return this.#max }
  get min() { return this.#min }
  get sliders() { return this.#sliders }
  get overviewCSS() { return this.#overviewCSS }

  onChangeSliderHandler() {
    console.log(`${this.input.value}, ${this.input.getAttribute('max')}`)
  }

}
