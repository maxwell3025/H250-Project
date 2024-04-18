//HASH: aaaaaaaaaaaaaaaaaaaez
const data = `//HASH: aaaaaaaaaaaaaaaaaaaez
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
}
function validate(){
    let hash = 0;
    (data+aStr+bStr+cStr+dStr).split("").forEach(char => {
        hash = hash + char.charCodeAt(0);
    })
    if(hash != 0xd800)
        process.exit(1);
}
validate();
console.log(replace(data, change(data)))
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
}
function validate(){
    let hash = 0;
    (data+aStr+bStr+cStr+dStr).split("").forEach(char => {
        hash = hash + char.charCodeAt(0);
    })
    if(hash != 0xd800)
        process.exit(1);
}
validate();
console.log(replace(data, change(data)))

