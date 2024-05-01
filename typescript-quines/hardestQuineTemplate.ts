const d1=xy///"
const d2=xy///"
const d3=xy///"
const dd=d1===d2?d1:d3;
const ra="[x][y]";
const rb="[x][y]";
const rc="[x][y]";
const rr=ra===rb?ra:rc;
console.log(dd.replaceAll(new RegExp(rr,"g"), JSON.stringify(dd)))//
