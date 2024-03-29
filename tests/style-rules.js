zingchart.setModule("api-rules"),
  zingchart.extendAPI("addrule", function (e, r) {
    var l = zingchart.exec(e, "getdata"),
      t = r.id || "rule" + parseInt(1e4 + 89999 * Math.random(), 10),
      s = l.graphset[0];
    (s.plot = s.plot || {}), (s.series = s.series || []);
    var a = null;
    if (null !== ZC._n_(r.plotindex)) {
      var n = parseInt(r.plotindex, 10);
      a = n < s.series.length ? s.series[n] : s.plot;
    } else a = s.plot;
    a.rules = a.rules || [];
    var i = r.style || {};
    (i.rule = r.rule || ""),
      (i.id = t),
      a.rules.push(i),
      zingchart.exec(e, "setdata", { data: l });
  }),
  zingchart.extendAPI("removerule", function (e, r) {
    var l,
      t = zingchart.exec(e, "getdata"),
      s = r.id || "rule" + parseInt(1e4 + 89999 * Math.random(), 10),
      a = t.graphset[0];
    (a.plot = a.plot || {}), (a.series = a.series || []);
    for (var n = s instanceof Array ? s : [s], i = 0; i < n.length; i++) {
      var u = null;
      if (null !== ZC._n_(r.plotindex)) {
        var p = parseInt(r.plotindex, 10);
        u = p < a.series.length ? a.series[p] : a.plot;
      } else u = a.plot;
      for (u.rules = u.rules || [], l = u.rules.length - 1; l >= 0; l--)
        u.rules[l].id === n[i] && u.rules.splice(l, 1);
      if (null === ZC._n_(r.plotindex))
        for (var o = 0; o < a.series.length; o++)
          if (a.series[o].rules)
            for (l = a.series[o].rules.length - 1; l >= 0; l--)
              a.series[o].rules[l].id === n[i] &&
                a.series[o].rules.splice(l, 1);
    }
    zingchart.exec(e, "setdata", { data: t });
  }),
  zingchart.extendAPI("updaterule", function (e, r) {
    var l = zingchart.exec(e, "getdata"),
      t = r.id || "rule" + parseInt(1e4 + 89999 * Math.random(), 10),
      s = l.graphset[0];
    (s.plot = s.plot || {}), (s.series = s.series || []);
    var a = null;
    if (null !== ZC._n_(r.plotindex)) {
      var n = parseInt(r.plotindex, 10);
      a = n < s.series.length ? s.series[n] : s.plot;
    } else a = s.plot;
    a.rules = a.rules || [];
    for (var i = a.rules.length - 1; i >= 0; i--)
      if (a.rules[i].id === t) {
        var u = r.style || {};
        (u.rule = r.rule || a.rules[i].rule), (u.id = t), (a.rules[i] = u);
      }
    zingchart.exec(e, "setdata", { data: l });
  }),
  zingchart.extendAPI("getrules", function (e, r) {
    var l = zingchart.exec(e, "getdata").graphset[0];
    (l.plot = l.plot || {}), (l.series = l.series || []);
    var t = null;
    if (null !== ZC._n_(r.plotindex)) {
      var s = parseInt(r.plotindex, 10);
      t = s < l.series.length ? l.series[s] : l.plot;
    } else t = l.plot;
    t.rules = t.rules || [];
    for (var a = [], n = 0, i = t.rules.length; n < i; n++)
      a.push(t.rules[n].id || "");
    return a;
  });
