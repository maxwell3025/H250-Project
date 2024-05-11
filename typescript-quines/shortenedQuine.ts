const data="const data=\"xy\"\nconsole.log(data.replace(/[x][y]/,JSON.stringify(data)))"
console.log(data.replace(/[x][y]/,JSON.stringify(data)))