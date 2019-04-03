/// 1.箭头函数(ES6)

// 并且没有自己的this， arguments， super或 new.target。 这些函数表达式更适用于那些本来需要匿名函数的地方， 并且它们不能用作构造函数。

// 相当于匿名函数

x => x * x
// 等价于
function anonymouse(x) {
    return x * x;
}


// 箭头函数有两种格式，一种像上面的，只包含一个表达式，连{ ... }和return都省略掉了。
// 还有一种可以包含多条语句，这时候就不能省略{ ... }和return：
x => {
    if (x > 0) {
        return x * x;
    } else {
        return -x * x;
    }
}

// 两个参数:
(x, y) => x * x + y * y

// 无参数:
var non = () => 3.14

// 可变参数:
var rest = (x, y, ...rest) => {
    var i, sum = x + y;
    for (i = 0; i < rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}

// 返回一个对象时，需要用()包裹，防止被是被成函数体{...}
// SyntaxError:
// x => { foo: x }

// ok:
x => ({
    foo: x
}) // "()"代表 返回：{foo: x}, 类似 return {foo: x}


/************************************************************************************************/


/// 2.this的作用域限制

// ** 箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj：
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25

// ** 由于this在 箭头函数 中已经按照词法作用域绑定了，
// 所以，用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略：
var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({
            birth: 2000
        }, year); // this的绑定无效
    }
};
obj.getAge(2015); // 25


// 箭头函数不会创建自己的this,它只会从自己的作用域链的 "上一层" 继承this。因此，在下面的代码中，传递给setInterval的函数内的this与封闭函数中的this值相同：

function Person() {
    this.age = 0;

    setInterval(() => {
        this.age++; // 箭头函数内 |this| 正确地指向person 对象
    }, 1000);
}

var p = new Person();