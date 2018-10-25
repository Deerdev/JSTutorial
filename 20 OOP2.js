/// 原型继承
// JavaScript由于采用原型继承，我们无法直接扩展一个Class，因为根本不存在Class这种类型

// 基于Student扩展出PrimaryStudent，可以先定义出PrimaryStudent：
function PrimaryStudent(props) {
    // 调用Student构造函数，绑定this变量:
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 但是，调用了Student构造函数不等于继承了Student，PrimaryStudent创建的对象的原型是：
// new PrimaryStudent() ----> PrimaryStudent.prototype ----> Object.prototype ----> null




// ---------------------------直接替换原型对象？----------------------------------------------------------------

// 如果使用这种方式来继承
PrimaryStudent.prototype = new Student()
// 那么，当需要在 PrimaryStudent.prototype 添加一个 getGrade 方法，那么对于所有通过 new Student 方法创建的对象都可以调用这个方法，这明显是错误的。
// PrimaryStudent和Student共享一个原型对象，那还要定义PrimaryStudent干啥？

// -------------------------------------------------------------------------------------------



// 我们必须借助一个中间对象来实现正确的原型链，这个中间对象的原型要指向Student.prototype
// new PrimaryStudent() ----> PrimaryStudent.prototype ----> Student.prototype ----> Object.prototype ----> null

// PrimaryStudent构造函数:
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 空函数F:
function F() {
}

// 把F的原型指向Student.prototype:
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype:
PrimaryStudent.prototype = new F();

// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;

// 继续在PrimaryStudent原型（就是new F()对象）上定义方法：
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

// 创建xiaoming:
var xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 2
});
xiaoming.name; // '小明'
xiaoming.grade; // 2

// 验证原型:
xiaoming.__proto__ === PrimaryStudent.prototype; // true
xiaoming.__proto__.__proto__ === Student.prototype; // true

// 验证继承关系:
xiaoming instanceof PrimaryStudent; // true
xiaoming instanceof Student; // true


// 注意，函数F仅用于桥接，我们仅创建了一个new F()实例，而且，没有改变原有的Student定义的原型链

/*
                                                                              +---------+
                                                                              |         |
                       +-----------------+        +-------------+    +--------v----------+         +--------------------+
                       |                 | <----+ |             |    |    Student       ||         |    Object          |
                       | primaryStudent  |      | |  F          |    |                  ||         |                    |
                       |     -prototype+ |      | |  -prototype      |      +prototype+ ||         |       +prototype+  |
                       |               | |      | |        +    |    |                | ||         |                 |  |
                       +-----------------+      | +-------------+    +-------------------+         +--------------------+
                                       |        |          |                          | |                            |
                                       |        |          |                          | |                            |
+-----------------+          +---------v---------------+   |         +--------------------+        +--------------------+
|                 |          |                  |      |   +-------> |                | | |        |                 |  |
|    xiaoming     |          |   new F()        |      |             |    someObject1<+ | |        |                 |  |
|                 +---------->      -constructor+      +------------->                  | +-------->     someObject2<+  +---------->null
|     + name      |          |      -getGrade          |             |      +constructor+ |        |                    |
|                 |          |                         |             |      +hello        |        |                    |
|                 |          |                         |             |                    |        |                    |
+-----------------+          +-------------------------+             +--------------------+        +--------------------+

*/


// inherits() 实现方法
// 如果把继承这个动作用一个inherits()函数封装起来，还可以隐藏F的定义，并简化代码：

function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

// 这个inherits()函数可以复用：
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型继承链:
inherits(PrimaryStudent, Student);

// 绑定其他方法到PrimaryStudent原型:
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

// 小结
// JavaScript的原型继承实现方式就是：
// 定义新的构造函数，并在内部用call()调用希望“继承”的构造函数，并绑定this；
// 借助中间函数F实现原型链继承，最好通过封装的inherits函数完成；
// 继续在新的构造函数的原型上定义新方法。

