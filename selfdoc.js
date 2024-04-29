import evalSafe from "./evalSafe";

/**
 * "Compiles" a string into an actual Javascript function
 * @param {string} n The Godel number to be executed
 * @returns {(...x: any[]) => any} `n` interpreted as a function
 */
const phi = (n) => (...m) => {
    const executedString = `(${n})(...${JSON.stringify(m)})`;
    return evalSafe(executedString);
}

const f = "x => x";
const u = "(n, ...x) => eval(`(${n})(...${JSON.stringify(x)})`)";
const s = "(n, x) => `(...x) => (${n})(${JSON.stringify(x)}, ...x)`";
const h = `x => \`() => \${JSON.stringify(x)}\``;
const m = `t => (${u})((${h})((${s})(t, t)))`;
const n = phi(s)(m ,m);
console.log(phi(n)());
console.log(n);

/*
This is the evaluation order
s(m, m)() =
m(m)() =
h(s(m, m))() =
(() => s(m, m))() =
s(m, m)
*/