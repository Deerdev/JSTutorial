# 简单操作

## 进入 node 交互界面

```shell
$ node
>
```

退出：`.exit`

## 运行 js

```shell
node example.js
```

## 严格模式运行 js

```sehll
node --use_strict example.js
```

## require

一般通过相对路径导入模块：

```js
var greet = require("./hello"); // 不要忘了写相对目录!
```

如果只写模块名：

```js
var greet = require("hello");
```

则 Node 会依次在内置模块、全局模块和当前模块下查找 hello.js，你很可能会得到一个错误：

```shell
module.js
    throw err;
          ^
Error: Cannot find module 'hello'
    at Function.Module._resolveFilename
    at Function.Module._load
    ...
    at Function.Module._load
    at Function.Module.runMain
```

遇到这个错误，你要检查：

模块名是否写对了；
模块文件是否存在；
相对路径是否写对了。

## CommonJS 规范

这种模块加载机制被称为 CommonJS 规范。在这个规范下，每个.js 文件都是一个模块，它们内部各自使用的变量名和函数名都互不冲突，例如，`hello.js`和`main.js`都申明了全局变量`var s = 'xxx'`，但互不影响。

一个模块想要对外暴露变量（函数也是变量），可以用`module.exports = variable;`，一个模块要引用其他模块暴露的变量，用`var ref = require('module_name')`;就拿到了引用模块的变量。

## module.exports vs exports

很多时候，你会看到，在 Node 环境中，有两种方法可以在一个模块中输出变量：

方法一：对 module.exports 赋值：

```js
// hello.js

function hello() {
  console.log("Hello, world!");
}

function greet(name) {
  console.log("Hello, " + name + "!");
}

module.exports = {
  hello: hello,
  greet: greet
};
```

方法二：直接使用 exports：

```js
// hello.js

function hello() {
  console.log("Hello, world!");
}

function greet(name) {
  console.log("Hello, " + name + "!");
}

function hello() {
  console.log("Hello, world!");
}

exports.hello = hello;
exports.greet = greet;
```

但是你不可以直接对 exports 赋值：

```js
// 代码可以执行，但是模块并没有输出任何变量:
exports = {
  hello: hello,
  greet: greet
};
```

如果你对上面的写法感到十分困惑，不要着急，我们来分析 Node 的加载机制：

首先，Node 会把整个待加载的 hello.js 文件放入一个包装函数 load 中执行。在执行这个 load()函数前，Node 准备好了 module 变量：

```js
var module = {
  id: "hello",
  exports: {}
};
```

load()函数最终返回 module.exports：

```js
var load = function (exports, module) {
    // hello.js的文件内容
    ...
    // load函数返回:
    return module.exports;
};
var exported = load(module.exports, module);
```

也就是说，默认情况下，Node 准备的 exports 变量和 module.exports 变量实际上是同一个变量，并且初始化为空对象{}，于是，我们可以写：

```js
exports.foo = function() {
  return "foo";
};
exports.bar = function() {
  return "bar";
};
```

也可以写：

```js
module.exports.foo = function() {
  return "foo";
};
module.exports.bar = function() {
  return "bar";
};
```

换句话说，Node 默认给你准备了一个空对象{}，这样你可以直接往里面加东西。

但是，如果我们要输出的是一个函数或数组，那么，只能给 module.exports 赋值：

```js
module.exports = function() {
  return "foo";
};
```

给 exports 赋值是无效的，因为赋值后，module.exports 仍然是空对象{}。

结论
如果要输出一个键值对象{}，可以利用 exports 这个已存在的空对象{}，并继续在上面添加新的键值；

如果要输出一个函数或数组，必须直接对 module.exports 对象赋值。

所以我们可以得出结论：直接对 module.exports 赋值，可以应对任何情况：

```js
module.exports = {
  foo: function() {
    return "foo";
  }
};
```

或者：

```js
module.exports = function() {
  return "foo";
};
```

最终，建议使用 module.exports = xxx 的方式来输出模块变量。

> \*\* 是否可以把 exports 看成是对 module.exports 的引用呢,
> 可以用 exports.foo 往里面增加新的属性,
> 但是如果直接对 exports 赋值,
> exports 就不再是 module.exports 的引用了, 直接就是 exports 变量了。
> 所以 moudule.exports 仍然为空对象{}...
