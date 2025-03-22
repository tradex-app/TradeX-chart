// volume.js
// draws a single volume bar

import { defaultTheme } from "../../definitions/style"

export default class VolumeBar {

  constructor(scene, theme) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.theme = theme
    // this.cfg = ("volume" in theme) ? theme.volume : theme
    this.dpr = window.devicePixelRatio || 1
  }

  alignToPixel(value) {
    return Math.round(value * this.dpr) / this.dpr
  }

  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const barColour = hilo ? this.theme.up.colour.value: this.theme.dn.colour.value
    
    let w = Math.max(data.w - 1, 1);
    let hw = w * 0.5;
    w = this.alignToPixel(w);
    
    // Calculate center x position
    const centerX = this.alignToPixel(data.x);
    // Calculate bar position to be centered on centerX
    const barX = centerX - (w / 2) + hw;
    const h = this.alignToPixel(data.h);
    const z = this.alignToPixel(data.z);
    
    ctx.save();
    ctx.fillStyle = barColour;

    // Draw bar centered on the x position
    ctx.fillRect(
      barX,
      z - h,
      w,
      h
    );

    ctx.restore();
  }
}
