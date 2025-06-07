import { describe, expect, expectTypeOf, test } from 'vitest'
import { JSDOM } from 'jsdom'
import { HTMLElement } from './HTMLElement'
import { Chart } from '../src'


describe(`class TradeXchart HTML component and API`, () => {
  const dom = new JSDOM(`<!DOCTYPE html><div id="contianer"><tradex-chart id="chart"></tradex-chart></div>`);
  const target = dom.window.document.getElementById("chart")
})