class axis {

	constructor(config) {
  	this.config = config
  }
  
  get height() {
  	return this.config.height
  }
}

class yAxis extends axis {

	constructor(config) {
  	// super(config)
    super(config)
    //this.config = config
  }
  
  height1() {
  	console.log(super.height)
  }
  height2() {
  	console.log(this.config.height)
  }
}

const config = { height: 100 }
const test = new yAxis(config)
test.height1()

config.height = 200
test.height1()
test.height2()
