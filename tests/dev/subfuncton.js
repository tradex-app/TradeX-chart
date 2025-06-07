function test() {
	let core = function() {
  }
  core.foo = function() {
  	console.log("foo")
  }
  return core
}

let testme = test()
testme.foo()
