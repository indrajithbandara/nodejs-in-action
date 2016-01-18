// 使用附加模块中的流程控制工具

var flow = require('nimble');
var exec = require('child_process').exec;

function downloadNodeVersion(version, destination, callback) {
  var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
  var filepath = destination + '/' + version + '.tgz';
  exec('curl ' + url + ' >' + filepath, callback);
}
// 按顺序执行串行话任务
flow.series([
  function(callback){
    // 并行下载
    flow.parallel([
      function(callback){
        console.log('Downloading Node v0.4.6...');
        downloadNodeVersion('0.4.6', './tmp', callback);
      },
      function (callback) {
        console.log('Downloading Node v0.4.7...');
        downloadNodeVersion('0.4.7', './tmp', callback);
      }
    ], callback);
  },
  function(callback){
    console.log('Creating archive of downloaded files...');
    exec(
      'tar cvf node.tar ./tmp/0.4.6.tgz ./tmp/0.4.7.tgz',
      function (err, stdout, stderr) {
        console.log('All donw!');
        callback();
      }
    );
  }
]);
