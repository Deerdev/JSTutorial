/// 1.嵌套
function foo() {
    var x = 1;
    function bar() {
        var y = x + 1; // bar可以访问foo的变量x!
    }
    var z = y + 1; // ReferenceError! foo不可以访问bar的变量y!
}


/************************************************************************************************/


/// 2.变量提升

// 先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部:
function foo() {
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}
foo(); // "Hello, Bob"

// JavaScript引擎自动提升了变量y的声明，但不会提升变量y的赋值:
function foo() {
    var y; // 提升变量y的申明，此时y为undefined
    var x = 'Hello, ' + y;
    console.log(x);
    y = 'Bob';
}
foo(); // Hello, undefined

// ** 请严格遵守“在函数内部首先申明所有变量”这一规则
function foo() {
    var
        x = 1, // x初始化为1
        y = x + 1, // y初始化为2
        z, i; // z和i为undefined
    // 其他语句:
    for (i=0; i<100; i++) {
        // ...
    }
}


/************************************************************************************************/


/// 3.全局作用域
// 不在任何函数内定义的变量就具有全局作用域。
// 实际上，JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window的一个属性：
var course = 'Learn JavaScript';
alert(course); // 'Learn JavaScript'
alert(window.course); // 'Learn JavaScript'
// ** 全局变量和函数，都被绑定到window对象，通过【window.xx】调用

// alert()也是全局方法
window.alert('调用window.alert()');
// 把alert保存到另一个变量:
var old_alert = window.alert;
// 给alert赋一个新函数:
window.alert = function () {}
alert('无法用alert()显示了!');     // 此时alert无法被调用，已经被window.alert替换
// 恢复alert:
window.alert = old_alert;
alert('又可以用alert()了!');


/************************************************************************************************/


/// 4.名字空间
// 解决：全局变量会绑定到window上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突
// 方法：减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：

// 唯一的全局变量MYAPP:
var MYAPP = {};
// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;
// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};


/************************************************************************************************/


/// 5.局部作用域(ES6)
// 由于JavaScript的变量作用域实际上是函数内部，我们在for循环等语句块中是无法定义具有局部作用域的变量的：
function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}

// ** 为了解决块级作用域，【ES6引入了新的关键字let】，用let替代var可以申明一个块级作用域的变量：
function foo() {
    var sum = 0;
    for (let i=0; i<100; i++) {
        sum += i;
    }
    // SyntaxError: 无法使用i了
    i += 1;
}


/************************************************************************************************/


/// 6.常量(ES6)
// 【ES6标准引入了新的关键字const】来定义常量，const与let都具有块级作用域：
const PI = 3.14;
PI = 3; // 某些浏览器不报错，但是无效果！
PI; // 3.14


/************************************************************************************************/


/// 7.解构赋值(ES6)

// 如果浏览器支持解构赋值就不会报错:
var [x, y, z] = ['hello', 'JavaScript', 'ES6']; // x, y, z分别被赋值为数组对应元素:

let [x, [y, z]] = ['hello', ['JavaScript', 'ES6']];
x; // 'hello'
y; // 'JavaScript'
z; // 'ES6'

let [, , z] = ['hello', 'JavaScript', 'ES6']; // 忽略前两个元素，只对z赋值第三个元素
z; // 'ES6'

// 对象的解构赋值
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};
var {name, address: {city, zip}} = person;
name; // '小明'
city; // 'Beijing'
zip; // undefined, 因为属性名是zipcode而不是zip
// 注意: address不是变量，而是为了让city和zip获得嵌套的address对象的属性:
address; // Uncaught ReferenceError: address is not defined

// 要使用的变量名和属性名不一致，可以用下面的语法获取，转换变量名
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
// 把passport属性赋值给变量id:
let {name, passport:id} = person;
name; // '小明'
id; // 'G-12345678'
// 注意: passport不是变量，而是为了让变量id获得passport属性:
passport; // Uncaught ReferenceError: passport is not defined


// 使用默认值，避免undefined
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678'
};
// 如果person对象没有single属性，默认赋值为true:
var {name, single=true} = person;
name; // '小明'
single; // true

// 先声明变量，然后再赋值，会报错
// 声明变量:
var x, y;
// 解构赋值:
/** 
{x, y} = { name: '小明', x: 100, y: 200}; 
// 语法错误: Uncaught SyntaxError: Unexpected token =
**/ 
// 因为JavaScript引擎把{开头的语句当作了块处理，于是=不再合法。解决方法是用【小括号】括起来：
({x, y} = { name: '小明', x: 100, y: 200});

// ** 用处：

// 交换
var x=1, y=2;
[x, y] = [y, x]

// 如果一个函数接收一个对象作为参数，那么，可以使用解构直接把对象的属性绑定到变量中
function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}

buildDate({ year: 2017, month: 1, day: 1 });
// Sun Jan 01 2017 00:00:00 GMT+0800 (CST)