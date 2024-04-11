type UnWrap<T extends string> = `${T}${T}`;
type Quine = UnWrap<`
type UnWrap<T extends string> = \`\${T}\${T}\`;
type Quine = UnWrap<escapethis>
`>
// BELOW IS TESTING CODE
const test: Quine = `
type UnWrap<T extends string> = \`\${T}\${T}\`;
type Quine = UnWrap<escapethis>

type UnWrap<T extends string> = \`\${T}\${T}\`;
type Quine = UnWrap<escapethis>
`;
console.log("Hello via Bun!");