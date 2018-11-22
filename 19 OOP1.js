//JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。

var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

var xiaoming = {
    name: '小明'
};

xiaoming.__proto__ = Student;
// 通过__proto__把xiaoming的原型指向了Student，于是xiaoming就有了run方法
xiaoming.name; // '小明'
xiaoming.run(); // 小明 is running...

// ** 在编写JavaScript代码时，不要直接用obj.__proto__去改变一个对象的原型，并且，低版本的IE也无法使用__proto__

/// 通过Object.create()创建对象
// 原型对象:
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    // 初始化新对象:
    s.name = name;
    return s;
}

var xiaoming = createStudent('小明');
xiaoming.run(); // 小明 is running...
xiaoming.__proto__ === Student; // true


/// 创建对象

// JavaScript对每个创建的对象都会设置一个原型，指向它的原型对象。
// 当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，如果没有找到，就到其原型对象上找，
// 如果还没有找到，就一直上溯到Object.prototype对象，最后，如果还没有找到，就只能返回undefined。

var arr = [1, 2, 3];
// Array对象原型链是：
// arr ----> Array.prototype ----> Object.prototype ----> null
// Array.prototype定义了indexOf()、shift()等方法，因此你可以在所有的Array对象上直接调用这些方法。

// 函数原型链
// foo ----> Function.prototype ----> Object.prototype ----> null
// 由于Function.prototype定义了apply()等方法，因此，所有函数都可以调用apply()方法。



// 【构造函数】
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
// 注意，如果不写new，这就是一个普通函数，它返回undefined。
// 但是，如果写了new，它就变成了一个构造函数，它绑定的this指向新创建的对象，并默认返回this，也就是说，不需要在最后写return this;。
var xiaoming = new Student('小明');
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!
// xiaoming ----> Student.prototype ----> Object.prototype ----> null

// 用new Student()创建的对象还从原型上获得了一个constructor属性，它指向函数Student本身
xiaoming.constructor === Student.prototype.constructor; // true
Student.prototype.constructor === Student; // true
Object.getPrototypeOf(xiaoming) === Student.prototype; // true
xiaoming instanceof Student; // true

/*
Student.prototype指向的对象就是xiaoming的原型对象someObject1
这个原型对象someObject1自己还有个属性constructor，指向Student函数本身
                                       +---------+
                                       |         |
                              +--------v----------+         +--------------------+
                              |    Student       ||         |    Object          |
                              |                  ||         |                    |
                              |      -prototype+ ||         |       -prototype+  |
                              |                | ||         |                 |  |
                              +-------------------+         +--------------------+
                                               | |                            |
                                               | |                            |
+-----------------+           +--------------------+        +--------------------+
|                 |           |                | | |        |                 |  |
|    xiaoming     |           |    someObject1<+ | |        |                 |  |
|                 +----------->                  | +-------->     someObject2<+  +---------->null
|     - name      |           |      -constructor+ |        |                    |
|     - hello     |           |                    |        |                    |
|                 |           |                    |        |                    |
+-----------------+           +--------------------+        +--------------------+
*/

// 函数不共享
xiaoming.name; // '小明'
xiaohong.name; // '小红'
xiaoming.hello; // function: Student.hello()
xiaohong.hello; // function: Student.hello()
xiaoming.hello === xiaohong.hello; // false

// 要让创建的对象共享一个hello函数，根据对象的属性查找原则，
// 我们只要把hello函数移动到xiaoming、xiaohong这些对象共同的原型上就可以了，也就是Student.prototype：
function Student(name) {
    this.name = name;
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

/*
将函数定义到原型someObject1上即可
                                       +---------+
                                       |         |
                              +--------v----------+         +--------------------+
                              |    Student       ||         |    Object          |
                              |                  ||         |                    |
                              |      -prototype+ ||         |       -prototype+  |
                              |                | ||         |                 |  |
                              +-------------------+         +--------------------+
                                               | |                            |
                                               | |                            |
+-----------------+           +--------------------+        +--------------------+
|                 |           |                | | |        |                 |  |
|    xiaoming     |           |    someObject1<+ | |        |                 |  |
|                 +----------->                  | +-------->     someObject2<+  +---------->null
|     - name      |           |      -constructor+ |        |                    |
|                 |           |      -hello        |        |                    |
|                 |           |                    |        |                    |
+-----------------+           +--------------------+        +--------------------+

*/

// ** 调用构造函数千万不要忘记写new。为了区分普通函数和构造函数，按照约定，构造函数首字母应当大写

// 封装构造函数
function Student(props) {
    this.name = props.name || '匿名'; // 默认值为'匿名'
    this.grade = props.grade || 1; // 默认值为1
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

function createStudent(props) {
    return new Student(props || {})
}

// 不要写new，传入对象
var xiaoming = createStudent({
    name: '小明'
});

xiaoming.grade; // 1