# koa简介

koa是Express的下一代基于Node.js的web框架，目前有1.x和2.0两个版本。

## 历史

## 1. Express

Express是第一代最流行的web框架，它对Node.js的http进行了封装，用起来如下：

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
```

虽然Express的API很简单，但是它是基于ES5的语法，要实现异步代码，只有一个方法：回调。如果异步嵌套层次过多，代码写起来就非常难看：

```js
app.get('/test', function (req, res) {
    fs.readFile('/file1', function (err, data) {
        if (err) {
            res.status(500).send('read file1 error');
        }
        fs.readFile('/file2', function (err, data) {
            if (err) {
                res.status(500).send('read file2 error');
            }
            res.type('text/plain');
            res.send(data);
        });
    });
});
```

虽然可以用async这样的库来组织异步代码，但是用回调写异步实在是太痛苦了！

## 2. koa 1.0

随着新版Node.js开始支持ES6，Express的团队又基于ES6的generator重新编写了下一代web框架koa。和Express相比，koa 1.0使用generator实现异步，代码看起来像同步的：

```js
var koa = require('koa');
var app = koa();

app.use('/test', function *() {
    yield doReadFile1();
    var data = yield doReadFile2();
    this.body = data;
});

app.listen(3000);
```

用generator实现异步比回调简单了不少，但是generator的本意并不是异步。Promise才是为异步设计的，但是Promise的写法……想想就复杂。为了简化异步代码，ES7（目前是草案，还没有发布）引入了新的关键字async和await，可以轻松地把一个function变为异步模式：

```js
async function () {
    var data = await fs.read('/file1');
}
```

这是JavaScript未来标准的异步代码，非常简洁，并且易于使用。

## 3. koa 2

koa团队并没有止步于koa 1.0，他们非常超前地基于ES7开发了koa2，和koa 1相比，koa2完全使用Promise并配合async来实现异步。

koa2的代码看上去像这样：

```js
app.use(async (ctx, next) => {
    await next();
    var data = await doReadFile();
    ctx.response.type = 'text/plain';
    ctx.response.body = data;
});
```

出于兼容性考虑，目前koa2仍支持generator的写法，但下一个版本将会去掉。

## 4.koa2 安装

koa这个包怎么装，app.js才能正常导入它？

方法一：可以用npm命令直接安装koa。先打开命令提示符，务必把当前目录切换到hello-koa这个目录，然后执行命令：

```shell
C:\...\hello-koa> npm install koa@2.0.0
```

npm会把koa2以及koa2依赖的所有包全部安装到当前目录的node_modules目录下。

方法二：在hello-koa这个目录下创建一个package.json，这个文件描述了我们的hello-koa工程会用到哪些包。完整的文件内容如下：

```json
{
    "name": "hello-koa2",
    "version": "1.0.0",
    "description": "Hello Koa 2 example with async",
    "main": "app.js",
    "scripts": {
        "start": "node app.js"
    },
    "keywords": [
        "koa",
        "async"
    ],
    "author": "Michael Liao",
    "license": "Apache-2.0",
    "repository": {
        "type": "git",
        "url": "https://github.com/michaelliao/learn-javascript.git"
    },
    "dependencies": {
        "koa": "2.0.0"
    }
}
```

其中，dependencies描述了我们的工程依赖的包以及版本号。其他字段均用来描述项目信息，可任意填写。

然后，我们在hello-koa目录下执行`npm install`就可以把所需包以及依赖包一次性全部装好：

```shell
C:\...\hello-koa> npm install
```

很显然，第二个方法更靠谱，因为我们只要在package.json正确设置了依赖，npm就会把所有用到的包都装好。

注意，任何时候都可以直接删除整个node_modules目录，因为用npm install命令可以完整地重新下载所有依赖。并且，这个目录不应该被放入版本控制中。

现在，我们的工程结构如下：

```shell
hello-koa/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- app.js <-- 使用koa的js
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

紧接着，我们在package.json中添加依赖包：

```json
"dependencies": {
    "koa": "2.0.0"
}
```

然后使用npm install命令安装后，在VS Code中执行app.js，调试控制台输出如下：

```shell
node --debug-brk=40645 --nolazy app.js 
Debugger listening on port 40645
app started at port 3000...
```

我们打开浏览器，输入http://localhost:3000，即可看到效果。

还可以直接用命令node app.js在命令行启动程序，或者用`npm start`启动。`npm start`命令会让npm执行定义在package.json文件中的start对应命令：

```json
"scripts": {
    "start": "node app.js"
}
```

### 用npm初始化生成package.json

1. 在nodejs项目中命令允许`npm init`初始化
2. 根据命令提示输入配置信息，必须包括`name`和`version`
3. 可以直接输入`npm init --yes` 跳过回答问题，直接生成默认的package.json

配置各项属性的含义：

- name - 包名
- version - 包的版本号，刚初始化的项目总是1.0.0；
- description - 包的描述。
- homepage - 包的官网 url 。
- author - 包的作者姓名。
- contributors - 包的其他贡献者姓名。
- dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
- keywords - 关键字
- license - ISC开源证书




