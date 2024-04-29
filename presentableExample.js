const template="const template=xy\nconst fullSrc=template.replace(/[x][y]/,JSON.stringify(template))\nconsole.log(fullSrc)"
const fullSrc=template.replace(/[x][y]/,JSON.stringify(template))
console.log(fullSrc)