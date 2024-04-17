
const data = `
const data = \`ax\`
function escape(str: string){
    return str.replaceAll("\\\\", "\\\\\\\\").replaceAll("\`", "\\\\\`");
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
console.log(replace(data, escape(data)))
`
function escape(str: string){
    return str.replaceAll("\\", "\\\\").replaceAll("`", "\\`");
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
console.log(replace(data, escape(data)))
