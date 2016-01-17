## 三、Node编程基础
### Node 功能的组织及重用
- 如果模块返回的函数或变量不止一个，那它可以通过设定exports对象的属性来指名它们。如果模块只返回一个函数或变量，则可以设定module.exports属性。
- require 是Node中少有的几个同步I/O操作之一。I/O密集的地方尽量不要用require。
- 如果你创建了一个既有exports又有module.exports的模块，那它会反悔module.exports，而exports会被忽略。（exports不能被重写）
- exports只是对module.exports的一个全局引用，最初被定义为可以添加属性的空对象。所以exports.myFun 只是module.exports.myFun的简写。因此，如果exports设定为别的，就打破了module.exports与exports的引用关系，exports失效。想重新引用的话可以:
```javascript
module.exports = exoprts = myFun;
```
