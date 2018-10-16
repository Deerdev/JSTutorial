/// 1.定义

function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}
// ** 如果没有return语句，函数执行完毕后也会返回结果，只是结果为undefined


// 由于JavaScript的函数也是一个对象，上述定义的abs()函数实际上是一个函数对象，而函数名abs可以视为指向该函数的变量。
var abs = function (x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
};
// ** 在这种方式下，function (x) { ... }是一个【匿名函数】，它没有函数名。但是，这个匿名函数赋值给了变量abs，所以，通过变量abs就可以调用该函数。
// ** 上述两种定义完全等价，注意第二种方式按照完整语法需要在函数体末尾加一个;，表示赋值语句结束。


/// 2.函数调用
abs(-9); // 返回9

// 由于JavaScript允许传入任意个参数而不影响调用，因此传入的参数比定义的参数多也没有问题，虽然函数内部并不需要这些参数：
// 依然取第一个参数
abs(10, 'blablabla'); // 返回10
abs(-9, 'haha', 'hehe', null); // 返回9

// 传入的参数比定义的少也没有问题：
abs(); // 返回NaN, 此时abs(x)函数的参数x将收到undefined，计算结果为NaN。

// 参数检查
function abs(x) {
    if (typeof x !== 'number') {
        throw 'Not a number';
    }
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}

/// 3.arguments
// JavaScript还有一个免费赠送的关键字arguments，它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。
// arguments类似Array但它不是一个Array：

function foo(x) {
    console.log('x = ' + x); // 10
    for (var i=0; i<arguments.length; i++) {
        console.log('arg ' + i + ' = ' + arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);

// 不定义参数，也可以通过arguments读取
function abs() {
    if (arguments.length === 0) {
        return 0;
    }
    var x = arguments[0];
    return x >= 0 ? x : -x;
}
abs(); // 0
abs(10); // 10
abs(-9); // 9

// 实际上arguments最常用于判断传入参数的个数
// foo(a[, b], c)
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo(a, b, c) {
    if (arguments.length === 2) {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
        // ** 要把中间的参数b变为“可选”参数，就只能通过arguments判断，然后重新调整参数并赋值。
    }
    // ...
}

/// 4.rest参数

// 无rest
function foo(a, b) {
    var i, rest = [];
    if (arguments.length > 2) {
        // 为了获取除了已定义参数a、b之外的参数，我们不得不用arguments，并且循环要从索引2开始以便排除前两个参数
        for (i = 2; i<arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

// ES6标准引入了rest参数
// rest参数只能写在最后，前面用...标识
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1);
// 结果:
// a = 1
// b = undefined
// Array [],    rest参数会接收一个空数组（注意不是undefined）


/// 5.return的坑
function foo() {
    return
        { name: 'foo' };
}

function foo() {
    return; // 自动添加了分号，相当于return undefined;
        { name: 'foo' }; // 这行语句已经没法执行到了
}

// 正确写法
function foo() {
    return { // 这里不会自动加分号，因为{表示语句尚未结束
        name: 'foo'
    };
}