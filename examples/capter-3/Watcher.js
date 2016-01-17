// 文件监听器

function Watcher(watchDir, processDir) {
  this.watchDir = watchDir;
  this.processDir = processDir;
}

var events = require('events');
var util = require('util');
// 以下等同 Watcher.prototype = new events.EventEmitter();
util.inherits(Watcher, events.EventEmitter);
var fs = require('fs');
var watchDir = './watch';
var processDir = './done';
Watcher.prototype.watch = function() {
  var watcher = this;
  fs.readdir(this.watchDir, function(err, files){
    if(err) throw err;
    for(var index in files) {
      watcher.emit('process', files[index]);
    }
  });
}
Watcher.prototype.start = function(){
  var watcher = this;
  fs.watchFile(watchDir, function(){
    watcher.watch();
  });
}

var watcher = new Watcher(watchDir, processDir);
watcher.on('process', function process(file){
  var watchFile = this.watchDir + '/' + file;
  var processFile = this.processDir + '/' + file.toLowerCase();
  console.log(watchFile, ' to ', processFile);
  fs.rename(watchFile, processFile, function(err){
    if(err) throw err;
  });
});

watcher.start();
