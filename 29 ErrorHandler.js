/// try ... catch ... finally

var r1, r2, s = null;
try {
    r1 = s.length; // 此处应产生错误, TypeError：null变量没有length属性
    r2 = 100; // 该语句不会执行
} catch (e) {
    console.log('出错了：' + e);
} finally {
    console.log('finally');
}
console.log('r1 = ' + r1); // r1应为undefined
console.log('r2 = ' + r2); // r2应为undefined

// finally无论是否出错都会执行



/// 错误类型
// JavaScript有一个标准的Error对象表示错误，还有从Error派生的  TypeError、ReferenceError  等错误对象。我们在处理错误时，可以通过catch(e)捕获的变量e访问错误对象：

try {
    // ...
} catch (e) {
    if (e instanceof TypeError) {
        alert('Type error!');
    } else if (e instanceof Error) {
        alert(e.message);
    } else {
        alert('Error: ' + e);
    }
}
// 使用变量e是一个习惯用法，也可以以其他变量名命名，如catch(ex)。




/// 抛出错误 throw
var r, n, s;
try {
    s = prompt('请输入一个数字');
    n = parseInt(s);
    if (isNaN(n)) {
        throw new Error('输入错误');   // 实际上，JavaScript允许抛出任意对象，包括数字、字符串。但是，最好还是抛出一个Error对象。
    }
    // 计算平方:
    r = n * n;
    console.log(n + ' * ' + n + ' = ' + r);
} catch (e) {
    console.log('出错了：' + e);
}



/// 错误传播
// 如果在一个函数内部发生了错误，它自身没有捕获，错误就会被抛到外层调用函数，如果外层函数也没有捕获，该错误会一直沿着函数调用链向上抛出，直到被JavaScript引擎捕获，代码终止执行。



/// 异步错误处理
// 异步执行的错误是无法被 try...catch 捕获的，需要对异步方法内部添加try...catch捕获

function printTime() {
    throw new Error();
}

try {
    setTimeout(printTime, 1000);    // 异步，无法捕获 printTime 抛出的错误，因为异步代码执行时，try的流程已经结束了
    console.log('done');
} catch (e) {
    console.log('error');
}





