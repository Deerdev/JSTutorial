'use strict';
/// Node.js内置的fs模块就是文件系统模块，负责读写文件。


/// 异步读文件
// 按照JavaScript的标准，异步读取一个文本文件的代码如下：
var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
// 请注意，sample.txt文件必须在当前目录下，且文件编码为utf-8。

// 异步读取图片 二进制数据
fs.readFile('sample.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
    }
});
// 当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象。
// >n 在Node.js中，Buffer对象就是一个包含零个或任意个"字节"的数组（注意和Array不同）。

// Buffer对象可以和String作转换，例如，把一个Buffer对象转换成String：
// Buffer -> String
var text = data.toString('utf-8');
console.log(text);

// 或者把一个String转换成Buffer：
// String -> Buffer
var buf = Buffer.from(text, 'utf-8');
console.log(buf);




/// 同步读文件
// 除了标准的异步读取模式外，fs也提供相应的同步读取函数。同步读取的函数和异步函数相比，多了一个Sync后缀，并且不接收回调函数，函数直接返回结果。

// 用fs模块同步读取一个文本文件的代码如下：
var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);
// 可见，原异步调用的回调函数的data被函数直接返回，函数名需要改为readFileSync，其它参数不变。

// 如果同步读取文件发生错误，则需要用try...catch捕获该错误：
try {
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
} catch (err) {
    // 出错了
}



/// 写文件
// 将数据写入文件是通过fs.writeFile()实现的：
var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
// writeFile()的参数依次为 文件名、数据 和 回调函数。
// 如果传入的数据是String，默认按UTF-8编码写入文本文件，如果传入的参数是Buffer，则写入的是二进制文件。回调函数由于只关心成功与否，因此只需要一个err参数。

// 和readFile()类似，writeFile()也有一个同步方法，叫writeFileSync()：
fs.writeFileSync('output.txt', data);




/// stat
// 如果我们要获取文件大小，创建时间等信息，可以使用fs.stat()，它返回一个Stat对象，能告诉我们文件或目录的详细信息：
fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});
// 运行结果如下：
// isFile: true
// isDirectory: false
// size: 181
// birth time: Fri Dec 11 2015 09:43:41 GMT+0800 (CST)
// modified time: Fri Dec 11 2015 12:09:00 GMT+0800 (CST)

// stat()也有一个对应的 "同步" 函数statSync()，请试着改写上述异步代码为同步代码。








