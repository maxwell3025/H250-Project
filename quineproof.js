import evalSafe from "./evalSafe.js";

/**
 * Encodes a string as a bigint.
 * @param {string} str 
 * @returns {bigint}
 */
const encode = (str) => {
    let output = 1n;
    for(let i = 0; i < str.length; i++){
        output = output << 8n;
        output += BigInt(str.charCodeAt(i));
    }
    return output;
};

/**
 * Decodes a string from a bigint.
 * @param {bigint} code 
 * @returns {str}
 */
const decode = (code) => {
    let output = "";
    while(code >= 256n){
        const currentCharCode = Number(code % 256n);
        const char = String.fromCharCode(currentCharCode);
        output = `${char}${output}`;
        code = code >> 8n;
    }
    return output;
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
const dependency_string = "/**\n * Encodes a string as a bigint.\n * @param {string} str \n * @returns {bigint}\n */\nconst encode = (str) => {\n    let output = 1n;\n    for(let i = 0; i < str.length; i++){\n        output = output << 8n;\n        output += BigInt(str.charCodeAt(i));\n    }\n    return output;\n};\n\n/**\n * Decodes a string from a bigint.\n * @param {bigint} code \n * @returns {str}\n */\nconst decode = (code) => {\n    let output = \"\";\n    while(code >= 256n){\n        const currentCharCode = Number(code % 256n);\n        const char = String.fromCharCode(currentCharCode);\n        output = `${char}${output}`;\n        code = code >> 8n;\n    }\n    return output;\n};\n"
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
export const h = encode(`x => (${decode(u)})(${s}n, ${iden}n, x)`)
// x => s((c), x)
// x => u(s, (console.log), x)

export const m = encode(`(t, ...x) => (${decode(u)})(
    (${decode(u)})(
        ${h}n,
        (${decode(u)})(
            ${s}n,
            t,
            t
        )
    ),
    ...x
)`);

const fixed_point = phi(s)(m, m);
console.log(fixed_point - phi(fixed_point)())
// ??how is this not an infinite loop??