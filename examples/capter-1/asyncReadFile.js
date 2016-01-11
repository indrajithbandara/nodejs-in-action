var fs = require('fs');

fs.readFile('./src/test.json', function(err, data){
    console.log(data);
});
console.log("last code");
