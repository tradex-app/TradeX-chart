import { JSDOM } from 'jsdom'
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
export const HTMLElement = dom.window.HTMLElement
