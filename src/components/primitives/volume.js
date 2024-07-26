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
  }

  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const barColour = hilo ? this.theme.up.colour.value: this.theme.dn.colour.value
    
    ctx.save();
    ctx.strokeStyle = barColour;
    ctx.fillStyle = barColour;

    ctx.fillRect(
      Math.floor(data.x),
      Math.floor(data.z - data.h),
      Math.floor(data.w),
      Math.floor(data.h)
    );

    ctx.restore();

  }
  
}