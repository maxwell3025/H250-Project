import * as quineproof from "./quineproof.js"
import { test, expect } from "bun:test"

test("dependencies work", () => {
    const original = "Hello World!";
    const code = quineproof.encode(original);
    const decoded = quineproof.decode(code);
    expect(decoded).toBe(original);
});

test("phi works", () => {
    const multiply = quineproof.encode("(a, b) => a * b");
    expect(quineproof.phi(multiply)(3, 4)).toBe(12n);
});

test("u works", () => {
    const multiply = quineproof.encode("(a, b) => a * b");
    const result = quineproof.phi(quineproof.u)(multiply, 3n, 4n);
    expect(result).toBe(12n)
});

test("s works", () => {
    const multiply = quineproof.encode("(a, b) => a * b");
    const double = quineproof.phi(quineproof.s)(multiply, 2n);
    const result = quineproof.phi(double)(3n);
    expect(result).toBe(6n);
});

test("m works", () => {
    const t = quineproof.encode("x => x");
    const result = quineproof.phi(quineproof.m)(t);
    console.log(quineproof.decode(result))
    // expect(result).toBe(t);
    // m(t) = (h(s(t, t)))() = (h(()=>t(t)))() = (h(()=>t))() = (()=>t)() = t
    // m(t) = (h(s(t, t)))() = (h(()=>t(t)))() = (h(()=>t))() = (() => (()=>t))() = (()=>t)
});



// const multiply = quineproof.encode("(a, b) => a * b");

// const code_1 = quineproof.s_function(multiply, 2n);
// const code_2 = quineproof.phi(quineproof.s)(multiply, 2n);
// console.log(quineproof.decode(code_1));
// console.log(quineproof.decode(code_2));
// console.log(decode(double))

// console.log(phi(multiply)(1, 2))
// console.log(double(4))