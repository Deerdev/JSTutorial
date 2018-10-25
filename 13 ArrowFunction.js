/// 1.箭头函数(ES6)

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
    }
    else {
        return - x * x;
    }
}

// 两个参数:
(x, y) => x * x + y * y

// 无参数:
var non = () => 3.14

// 可变参数:
var rest = (x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}

// 返回一个对象时，需要用()包裹，防止被是被成函数体{...}
// SyntaxError:
// x => { foo: x }

// ok:
x => ({ foo: x })


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
        return fn.call({birth:2000}, year); // this的绑定无效
    }
};
obj.getAge(2015); // 25




