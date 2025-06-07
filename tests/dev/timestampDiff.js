const timestampDiff = {

  inSeconds: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2-t1)/1000);
  },
  inMinutes: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/(60*1000));
  },

  inHours: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/(3600*1000));
  },

  inDays: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/(24*3600*1000));
  },

  inWeeks: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/(24*3600*1000*7));
  },

  inMonths: function(d1, d2) {
         d1 = new Date(d1)
         d2 = new Date(d2)
    let d1Y = d1.getFullYear();
    let d2Y = d2.getFullYear();
    let d1M = d1.getMonth();
    let d2M = d2.getMonth();

    return (d2M+12*d2Y)-(d1M+12*d1Y);
  },

  inYears: function(d1, d2) {
    let d1Y = new Date(d1)
    let d2Y = new Date(d2)
    return d2Y.getFullYear()-d1Y.getFullYear();
  }
  
}

// Saturday, 28 May 2022 06:34:32
let d1 = 1640673272000

// Saturday, 28 May 2022 06:34:32
let d2 = 1653719672000

let diff = timestampDiff.inYears(d1,d2)

console.log(diff)


// Monday, 28 March 2022 06:34:32
 d1 = 1648449272000

// Saturday, 28 May 2022 06:34:32
 d2 = 1653719672000

 diff = timestampDiff.inYears(d1,d2)

console.log(diff)


// Sunday, 28 March 2021 06:34:32
d1 = 1616913272000

// Saturday, 28 May 2022 06:34:32
 d2 = 1653719672000

 diff = timestampDiff.inYears(d1,d2)

console.log(diff)


// Saturday, 28 March 2020 06:34:32
d1 = 1585377272000

// Saturday, 28 May 2022 06:34:32
 d2 = 1653719672000

 diff = timestampDiff.inYears(d1,d2)

console.log(diff)
