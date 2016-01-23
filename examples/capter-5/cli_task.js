var fs = require('fs');
var path = require('path');
// 获取参数
var args = process.argv.splice(2);
var commond = args.shift();
var taskDesc = args.join(' ');
var file = path.join(process.cwd(), '/.tasks');

switch(commond){
  case 'list':
    listTasks(file);
    break;
  case 'add':
    addTask(file, taskDesc);
    break;
  default:
    console.log('Usage: ' + process.argv[0] + ' list|add [taskDesc]');
}

// 加载JSON文件
function loadOrInitializeTaskArray(file, cb){
  fs.exists(file, function(exists){
    if(exists){
      fs.readFile(file, 'utf8', function(err, data){
        if(err) throw err;
        var data = data.toString();
        var tasks = JSON.parse(data||'[]')
        cb(tasks);
      });
    } else {
      cb([]);
    }
  });
}

// 列出任务
function listTasks(file){
  loadOrInitializeTaskArray(file, function(tasks){
    for(var i in tasks){
      console.log(tasks[i]);
    }
  });
}

// 储存任务
function storeTasks(file, tasks){
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', function(err){
    if(err) throw err;
    console.log('saved');
  });
}
// 添加一个任务
function addTask(file, taskDesc){
  loadOrInitializeTaskArray(file, function(tasks){
    tasks.push(taskDesc);
    storeTasks(file, tasks);
  });
}
