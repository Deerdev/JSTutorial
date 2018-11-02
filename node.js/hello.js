'use strict';

var s = 'hello';

function greet(name) {
    console.log(`hello ${name}`)
}

// 把函数greet作为模块的输出暴露出去，这样其他模块就可以使用greet函数
// module.exports = greet;

module.exports = {
    greet: greet,
    s: s
};