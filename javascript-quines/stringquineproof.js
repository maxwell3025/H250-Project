const h = "x => `() => ${JSON.stringify(x)}`";
const u = "(n, ...x) => eval(`(${n})(...${JSON.stringify(x)})`)";
const s = "(n, x) => `(...x) => (${n})(${JSON.stringify(x)}, ...x)`";
const m = `t => (${u})((${h})((${s})(t, t)))`
const s_function = new Function(s);
const n = s_function(m ,m);
const n_function = new Function(n);
console.log(n_function() === n);

/*
This is the evaluation order
s(m, m)() =
m(m)() =
h(s(m, m))() =
(() => s(m, m))() =
s(m, m)
*/