/// 1.方法 & this

// 绑定到对象上的函数称为【方法】，和普通函数也没啥区别，但是它在内部使用了一个this关键字
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

xiaoming.age; // function xiaoming.age()
xiaoming.age(); // 今年调用是25,明年调用就变成26了

// ** 在一个方法内部，this是一个特殊变量，它始终指向当前对象，也就是xiaoming这个变量。
// 所以，this.birth可以拿到xiaoming的birth属性

// ** 坑1：分开写 **
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25, 正常结果
getAge(); // NaN，此时this指向了全局(即 window)，所以NaN

// ** 坑2：赋值一次方法 **
var fn = xiaoming.age; // 先拿到xiaoming的age函数
fn(); // NaN
// ** 要保证this指向正确，必须用obj.xxx()的形式调用
// 'use strict' 时，会报错

// ** 坑3：函数内部使用this **
'use strict';
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - this.birth;
        }
        return getAgeFromBirth();
    }
};

xiaoming.age(); // Uncaught TypeError: Cannot read property 'birth' of undefined

// ** 原因是this指针只在age方法的函数内指向xiaoming，
// ** 在函数内部定义的函数，this又指向undefined了！（在非strict模式下，它重新指向全局对象window！）
// 解决方法，在函数内部重新赋值一次this，然后再使用
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var that = this; // 在方法内部一开始就捕获this
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - that.birth; // 用that而不是this
        }
        return getAgeFromBirth();
    }
};


/************************************************************************************************/


/// 2. apply & call
// 改变this的指向对象
// apply方法，它接收两个参数，第一个参数就是需要绑定的this变量，第二个参数是Array，表示函数本身的参数。

function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};
xiaoming.age(); // 25
getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空


// call和apply一致，只是函数参数是按顺序传递的
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
// 对普通函数调用，我们通常把this绑定为null。


/************************************************************************************************/


/// 3.装饰器

// 利用apply，重新包裹函数
// 例如：统计parseInt被调用次数
'use strict';
var count = 0;
var oldParseInt = parseInt; // 保存原函数
window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};