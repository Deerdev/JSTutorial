/// 1.标准类型判断

typeof 123; // 'number'
typeof NaN; // 'number'
typeof 'str'; // 'string'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof Math.abs; // 'function'
typeof null; // 'object'
typeof []; // 'object'
typeof {}; // 'object'



/// 2.包装对象
var n = new Number(123); // 123,生成了新的包装类型
var b = new Boolean(true); // true,生成了新的包装类型
var s = new String('str'); // 'str',生成了新的包装类型
// ** 虽然包装对象看上去和原来的值一模一样，显示出来也是一模一样，但他们的类型已经变为object了; 和原值不相等
typeof new Number(123); // 'object'
new Number(123) === 123; // false

typeof new Boolean(true); // 'object'
new Boolean(true) === true; // false

typeof new String('str'); // 'object'
new String('str') === 'str'; // false
// ** 尽量不要使用 包装对象

// 不加new，就是简单的类型转换
var n = Number('123'); // 123，相当于parseInt()或parseFloat()
typeof n; // 'number'

var b = Boolean('true'); // true
typeof b; // 'boolean'

var b2 = Boolean('false'); // true! 'false'字符串转换结果为true！因为它是非空字符串！
var b3 = Boolean(''); // false

var s = String(123.45); // '123.45'
typeof s; // 'string'


/// 3.规则
// ** 不要使用new Number()、new Boolean()、new String()创建包装对象；
// ** 用parseInt()或parseFloat()来转换任意类型到number；
// ** 用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；
// ** 通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；
// ** typeof操作符可以判断出number、boolean、string、function和undefined；
// ** 判断Array要使用Array.isArray(arr)；
// ** 判断null请使用myVar === null；
// ** 判断某个全局变量是否存在用typeof window.myVar === 'undefined'；
// ** 函数内部判断某个变量是否存在用typeof myVar === 'undefined'。

// ** 另：null和undefined就没有toString()方法

// ** 坑 **： 
// 123.toString(); // 报错：SyntaxError
123..toString(); // '123', 注意是两个点！
(123).toString(); // '123'
// 因为 “123.toString()”只有一个小数点，被识别成了浮点数；
// 这样写“123.0.toString()”也没问题,第二个小数点就被认为是方法调用。


