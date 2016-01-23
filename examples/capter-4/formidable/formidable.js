var formidable = require('formidable');
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
  switch(req.method.toLowerCase()){
    case 'post':
      upload(req, res);
      break;
    case 'get':
      show(res);
      break;
  }
});
function show(res){
  res.setHeader('Content-Type', 'text/html');
  var stream = fs.createReadStream('./index.html');
  stream.pipe(res);
}

function upload(req, res){
  if(!isFormData(req)){
    res.statusCode = 400;
    res.end('bad request');
    return;
  }
  var form = new formidable.IncomingForm();
  form.on('field', function(field, value){
    console.log(field);
    console.log(value);
  });
  form.on('file', function(name, file){
    console.log(name);
    console.log(file);
  });
  form.on('end', function(){
    res.end('upload complete');
  });
  // 计算上传进度
  form.on('progress', function(bytesReceived,bytesExpected){
    var percent = Math.floor(bytesReceived/bytesExpected*100);
    console.log(percent);
  });
  form.uploadDir = './upload';
  form.encoding= 'utf-8';
  form.parse(req);
}
function isFormData(req){
  var type = req.headers['content-type']||'';
  return 0 === type.indexOf('multipart/form-data');
}
server.listen(3000)
