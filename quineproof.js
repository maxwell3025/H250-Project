import evalSafe from "./evalSafe.js";

const encode = (str) => {
    let output = 1n;
    for(let i = 0; i < str.length; i++){
        output = output << 8n;
        output = output | BigInt(str.charCodeAt(i));
    }
    return output;
};

const decode = (code) => {
    let output = [];
    while(code >= 256n){
        const currentCharCode = Number(code & 255n);
        const char = String.fromCharCode(currentCharCode);
        output.push(char);
        code = code >> 8n;
    }
    return output.toReversed().join("");
};

/**
 * "Compiles" a bigint into an actual Javascript function
 * @param {bigint} n The Godel number to be executed
 * @returns {(...x: bigint[]) => bigint} `n` interpreted as a function
 */
const phi = (n) => (...m) => {
    const executedString = `(${decode(n)})(${m.map(m_i => m_i.toString()+"n").join(", ")})`;
    console.log(`executing
\`\`\`js
${executedString}
\`\`\``);
    return evalSafe(executedString);
}

// EXPORTS
const dependency_string = "const encode = (str) => {\n    let output = 1n;\n    for(let i = 0; i < str.length; i++){\n        output = output << 8n;\n        output = output | BigInt(str.charCodeAt(i));\n    }\n    return output;\n};\n\nconst decode = (code) => {\n    let output = [];\n    while(code >= 256n){\n        const currentCharCode = Number(code \& 255n);\n        const char = String.fromCharCode(currentCharCode);\n        output.push(char);\n        code = code >> 8n;\n    }\n    return output.toReversed().join(\"\");\n};";
export {
    encode,
    decode,
    phi
};

// CODE
/**
 * Executes `n` as a function on `x`
 * @param {bigint} n 
 * @param  {bigint[]} x 
 * @returns {bigint}
 * @example
 * input:
 * ```js
 * (a, b) => a * b
 * 3
 * 4
 * 
 * ```
 * output:
 * ```js
 * 12
 * 
 * ```
 */
export const u_function = (n, ...x) => {
    return eval(`(${decode(n)})(${x.map(x_i => x_i.toString() + "n").join(", ")})`)
};
export const u = encode("(n, ...x) => {\n    "+dependency_string+"return eval(`(${decode(n)})(${x.map(x_i => x_i.toString() + \"n\").join(\", \")})`)\n}");

/**
 * "hard-codes" x as the first argument of n
 * This function exists due to the s-m-n theorem
 * @param {bigint} n 
 * @param {bigint} x 
 * @returns {bigint}
 * @example
 * input:
 * ```js
 * (a, b) => a * b,
 * 2
 * ```
 * output:
 * ```js
 * (...x) => ((a, b) => a * b)(2, ...x)
 * ```
 */
export const s_function = (n, x) => {
    return encode(`(...x) => ((${decode(n)})(${x}n, ...x))`)
};
export const s = encode("(n, x) => {"+dependency_string+"\n    return encode(`(...x) => ((${decode(n)})(${x}n, ...x))`)\n}");

const iden = encode("(x => x)");
export const h = encode(`x => (${decode(s)})(${iden}n, x)`)

const a = 412342315n;
const ret_a = phi(s)(s, a);

/**
 * This is the encoding of (t, ...x) => ((h)((s)(t, t)))(...x)
 */
export const m = encode(`(t, ...x) => (${decode(u)})(
    (${decode(h)})(
        (${decode(s)})(
            t,
            t
        )
    ),
    ...x
)`);

/**
 * This is the encoding of (t, ...x) => s(t, t)
 */
export const v_1 = phi(s)(s, s)
// ...x => s(s, ...x) = (...y) => s(x, ...y)
// (s(s, s))(t, ...x) = 
// (...y => s(s, ...y))(t, ...x) =
// s(s, t, ...x) =
// (...y) => s(t, ...y)
export const v_2 = phi(s)(s, s)
// 


const fixed_point = phi(s)(m, m);
console.log(fixed_point - phi(fixed_point)())
/*
This is the evaluation order
s(m, m)() =
m(m)() =
h(s(m, m))() =
(() => s(m, m))() =
s(m, m)
*/