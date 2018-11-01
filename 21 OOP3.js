/// class继承[ES6]
// 新的关键字class从ES6开始正式被引入到JavaScript中

class Student {
    // 构造函数
    constructor(name) {
        this.name = name;
    }

    // 方法，没有 function 关键字
    hello() {
        alert('Hello, ' + this.name + '!');
    }
}

var xiaoming = new Student('小明');
xiaoming.hello();


// 【继承】
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}

// ** 因为不是所有的主流浏览器都支持ES6的class。如果一定要现在就用上，就需要一个工具把class代码转换为传统的prototype代码，可以试试[Babel][https://babeljs.io/]这个工具。