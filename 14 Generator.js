/// 1.定义
// generator由function*定义（注意多出的*号），并且，除了return语句，还可以用yield返回多次
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}

// 实现斐波那契
function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n ++;
    }
    return;
}
// 直接调用
// 直接调用一个generator和调用函数不一样，fib(5)仅仅是"创建"了一个generator对象，还没有去执行它
fib(5); // fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}


/************************************************************************************************/


/// 2.调用方式
// next
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}
// next()方法会执行generator的代码，然后，每次遇到“ yield x; ”就返回一个对象{value: x, done: true/false}
// 调用next()后，[暂停]，等到下一次next()执行
// value: yield的返回值
// done: generator是否已执行结束

// for...of循环迭代
// 不需要自己判断done
for (var x of fib(10)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3, ...
}


/************************************************************************************************/


/// 3.作用
// 像一个可以记住执行状态的函数, 可以像面向对象一样保存状态，但是不需要面向对象的成员变量

// 实现一个自增Id，不需要外部变量来保存这个自增Id
function* next_id() {
    var current_id=0;
    while (true) {
        current_id++;
        yield current_id;
    }
}
