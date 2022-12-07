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
    border: 1px solid ${GlobalStyle.COLOUR_BORDER};
    height: 20px;
    border-radius: 3px;
    flex-basis: 100%;
    overflow: hidden;
  }
  .handle: {
    background: ${handleColour.hex}44; 
    width: 2.57538px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${iconW}px;
  }
  .icon:hover {
    fill: ${GlobalStyle.COLOUR_ICONHOVER};
  }
  .icon svg {
    fill: ${GlobalStyle.COLOUR_ICON};
    width: ${iconW}px;
    height: ${iconH}px;
    margin-top: 1px;
  }
</style>
<div class="scrollBarWidget">
  <span class="icon rwdStart">${rwdStart}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <div class="handle"></div>
  </span>
  <span class="icon fwdEnd">${fwdEnd}</span>
</div>
`

export default class tradeXOverview extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }

  get scrollBarWidget() { return this.shadowRoot.querySelector('.scrollBarWidget') }
  get rwdStart() { return this.shadowRoot.querySelector('.rwdStart') }
  get fwdEnd() { return this.shadowRoot.querySelector('.fwdEnd') }
  get scrollBar() { return this.shadowRoot.querySelector('.scrollBar') }
  get viewport() { return this.shadowRoot.querySelector('.viewport') }
  get handle() { return this.shadowRoot.querySelector('.handle') }
  get icons() { return this.shadowRoot.querySelectorAll('svg') }

}
