// Setup
const testLog = console.log;
const logs = [];
window.console.log = message => {
    logs.push(message);
}

// Code
const TARGET_QUINE = "./hardenedreadable.js";
/** @type { string } */
const PROGRAM_TEXT = await(await fetch(TARGET_QUINE)).text();

window.eval(PROGRAM_TEXT);
await new Promise(resolve => setTimeout(resolve, 0));
delete window._;

for (let i = 0; i < PROGRAM_TEXT.length; i++) {
    const MODIFIED_TEXT = PROGRAM_TEXT.slice(0, i) + PROGRAM_TEXT.slice(i + 1, PROGRAM_TEXT.length);
    window.eval(MODIFIED_TEXT);
    await new Promise(resolve => setTimeout(resolve, 0));
    delete window._;
    delete window.printed;
}

await new Promise(resolve => setTimeout(resolve, 1000));

const diffDisplay = document.createElement("div");
diffDisplay.classList.add("difference-display")
logs.forEach(output => {
    const originalText = document.createElement("pre");
    const outputText = document.createElement("pre");
    originalText.innerText = PROGRAM_TEXT;
    outputText.innerText = output;
    testLog(output === "Special String");
    diffDisplay.appendChild(originalText);
    diffDisplay.appendChild(outputText);
})
document.body.appendChild(diffDisplay);