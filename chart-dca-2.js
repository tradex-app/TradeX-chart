// chart-dca.js
import Overlay from "./overlay"
import { renderLineHorizontal } from "../../renderer/line";
import { renderTextBG } from "../../renderer/text";

const defaults = {
  colour: "#0d872d88", //colour for entry points
  width: 1,
  dash: [1, 0],
  fundsUSDT: 50, // default value for fundsUSDT
  gaps: 0.005, // default value for gaps (0.5%)
  takeProfit: 0.01, // default value for take profit (1%)
  numberOfGrids: 5, // default value for number of grids
  profitColour: "#FF000088", // colour for take profit line
};


function drawText(ctx, txt, x, y, w, theme) {
  let options = {
      fontSize: theme.fontSize * 1.05,
      fontWeight: theme.fontWeight,
      fontFamily: theme.fontFamily,
      txtCol: theme.colourCursor,
      bakCol: theme.colourCursorBG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 3,
      paddingRight: 3,
      width: w
    },
    
    height = options.fontSize + options.paddingTop + options.paddingBottom,
    yPos = y - (height * 0.5);

  ctx.save()

  ctx.fillStyle = options.bakCol
  ctx.fillRect(x, yPos, w, height)

  renderTextBG(ctx, `${txt}`, x, yPos , options)

  ctx.restore()
}


export default class chartDCA extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)
  
  
    // this.params = {
    //   fundsUSDT: defaults.fundsUSDT,
    //   gaps: defaults.gaps,
    //   takeProfit: defaults.takeProfit,
    //   numberOfGrids: defaults.numberOfGrids,
    //   ...params,
    // };

    // add the overlay to the Scale (yAxis)
    console.log("DCA")
    const dca = {class: scaleDCA, fixed: true, required: false}
    if (this.core.config?.dca === true)
      this.scaleOverly = this.chart.scale.addOverlay("dca", dca)
  }

  // Overlay position is fixed and won't pan / scroll with the chart
  set position(p) { this.target.setPosition(0, 0) }

  draw(data = this.core.state.data.chart.data) {
    
    if (this.core.config?.dca !== true) return
    if (!super.mustUpdate()) return

    // let firstPrice = data[0][4];
    let lastPrice = data[data.length - 1][4];

    // clear the overlay canvas
    this.scene.clear()

    let txt, x, y;
    let r = this.scene.width
    let opts = {}

    
    const theme = {...this.theme.yAxis}
    const ctx = this.scene.context

    theme.colourCursorBG = this.theme?.dca?.colour || defaults.colour

    // Default rendering settings
    ctx.save();
    ctx.strokeStyle = this.theme?.dca?.colour || defaults.colour;
    ctx.lineWidth = this.theme?.dca?.width || defaults.width;
    ctx.setLineDash(this.theme?.dca?.dash || defaults.dash);



    // Current Price
    y = this.yAxis.yPos(lastPrice)
    renderLineHorizontal(ctx, y, 0, r, opts)



    // Entry points for the grid
    for (let i = 0; i < defaults.numberOfGrids; i++) {
      let entryPrice = lastPrice * Math.pow(1 - defaults.gaps, i + 1);
      y = this.yAxis.yPos(entryPrice);
      renderLineHorizontal(ctx, y, 0, r, opts);

      // fundsUSDT
      let txt2 = `${defaults.fundsUSDT} USDT -`;
      let w = ctx.measureText(txt2).width + 70;
      x = (this.theme.yAxis.location === "left") ? 0 : r - w;
      drawText(ctx, txt2, x, y, w, theme);
    }

    // Take Profit line
    let takeProfitPrice = lastPrice * (1 + defaults.takeProfit);
    y = this.yAxis.yPos(takeProfitPrice);
    ctx.strokeStyle = defaults.profitColour; // Colour for take profit line
    // ctx.setLineDash([]);
    renderLineHorizontal(ctx, y, 0, r, opts);

    // // Custom value fundsUSDT for take profit
    // let txt3 = `${defaults.fundsUSDT} USDT -`;
    // let w = ctx.measureText(txt3).width + 70;
    // x = (defaults.yAxis.location === "left") ? 0 : r - w;
    // drawText(ctx, txt3, x, y, w, theme);

    // Calculate and display profit for take profit line
    let profitText = `Take Profit: ${defaults.takeProfit *100} %`;

    // Display the profit text
    let wProfitText = ctx.measureText(profitText).width + 80;
    // ctx.strokeStyle = defaults.profitColour; // Colour for take profit line
    x = (this.theme.yAxis.location === "left") ? 0 : r - wProfitText;
    drawText(ctx, profitText, x, y, wProfitText, theme);


    ctx.restore()

    super.updated()

    if ("dca" in this.chart.scale.overlays) {
      this.chart.scale.overlays.dca.instance.setRefresh()
      this.chart.scale.overlays.dca.instance.scaleDraw()
    }

  }
}

class scaleDCA extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params)
    this.viewport = target.viewport
  }

  // Overlay position is fixed and won't pan / scroll with the chart
  set position(p) { this.target.setPosition(0, 0) }

  draw() {}


  //range=this.core.range pointers to stats
  scaleDraw(data = this.core.state.data.chart.data) {
    if (!super.mustUpdate()) return

    this.scene.clear()

    let txt, x, y, w;
    let lastPrice = data[data.length - 1][4];
    const theme = {...this.theme.yAxis}
    const ctx = this.scene.context

    theme.colourCursorBG = this.theme?.dca?.colour || defaults.colour
    // Last Price
    txt = this.chart.Scale.nicePrice(lastPrice)
    x = 1
    y = this.yAxis.yPos(lastPrice) + 1
    w = this.viewport.width
    drawText(ctx, txt, x, y, w, theme)

    // Other entries
    for (let i = 0; i < defaults.numberOfGrids; i++) {
      let entryPrice = lastPrice * Math.pow(1 - defaults.gaps, i + 1);
      y = this.yAxis.yPos(entryPrice) + 1;
      txt = this.chart.Scale.nicePrice(entryPrice)
      drawText(ctx, txt, x, y, w, theme)
    }
    super.updated()
  }

}

