/*
aaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaa
aaaaakzzzzzzzzzz
*/
const data = `/*
aaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaa
aaaaakzzzzzzzzzz
*/
const data = \`ax\`
const aStr = "\\\\";
const bStr = "\\\\\\\\";
const cStr = "\`";
const dStr = "\\\\\`";
function change(str: string){
    return str.replaceAll(aStr, bStr).replaceAll(cStr, dStr);
}
function replace(str: string, infix: string){
    for(let i = 0; i < str.length; i++){
        if(
            str.charAt(i) == "a" &&
            str.charAt(i + 1) == "x"
        ){
            return str.slice(0, i) + infix + str.slice(i + 2)
        }
    }
    return "";
}
function validate(result: string){
    let hash = 0;
    (result+data+aStr+bStr+cStr+dStr).split("").forEach(char => {
        hash = hash + char.charCodeAt(0);
    })
    if(hash != 0x30001)
        process.exit(1);
    return result;
}
console.log(validate(replace(data, change(data))))
`
const aStr = "\\";
const bStr = "\\\\";
const cStr = "`";
const dStr = "\\`";
function change(str: string){
    return str.replaceAll(aStr, bStr).replaceAll(cStr, dStr);
}
function replace(str: string, infix: string){
    for(let i = 0; i < str.length; i++){
        if(
            str.charAt(i) == "a" &&
            str.charAt(i + 1) == "x"
        ){
            return str.slice(0, i) + infix + str.slice(i + 2)
        }
    }
    return "";
}
function validate(result: string){
    let hash = 0;
    (result+data+aStr+bStr+cStr+dStr).split("").forEach(char => {
        hash = hash + char.charCodeAt(0);
    })
    if(hash != 0x30001)
        process.exit(1);
    return result;
}
console.log(validate(replace(data, change(data))))

