//HASH: aawaabZ
const data = `//HASH: aawaabZ
const data = \`ax\`
function change(str: string){
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
function validate(){
    let hash = 0;
    data.split("").forEach(char => {
        hash = hash + char.charCodeAt(0);
    })
    if(hash != 0xb000)
        process.exit(1);
}
validate();
console.log(replace(data, change(data)))
`
function change(str: string){
    return str.replaceAll("\\", "\\\\").replaceAll("[MUTATION HERE]", "\\`");
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
    data.split("").forEach(char => {
        hash = hash + char.charCodeAt(0);
    })
    if(hash != 0xb000)
        process.exit(1);
}
validate();
console.log(replace(data, change(data)))

