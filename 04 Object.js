
// JavaScript的对象是一种无序的集合数据类型，它由若干键值对组成。
// 实际上JavaScript对象的所有属性都是字符串，不过属性对应的值可以是任意数据类型。
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};

xiaoming.name; // '小明'
xiaoming.birth; // 1990


// 如果属性名(键)包含特殊字符，就必须用''括起来
var xiaohong = {
    name: '小红',
    'middle-school': 'No.1 Middle School'
};
// 访问这个属性也无法使用.操作符，必须用['xxx']来访问：
xiaohong['middle-school']; // 'No.1 Middle School'
xiaohong['name']; // '小红'
xiaohong.name; // '小红'

// ** 访问不存在的属性不报错，而是返回undefined
console.log(xiaoming.name);
console.log(xiaoming.age); // undefined


// 可以自由地给一个对象添加或删除属性：
var xiaoming = {
    name: '小明'
};
xiaoming.age; // undefined
xiaoming.age = 18; // 新增一个age属性
xiaoming.age; // 18
delete xiaoming.age; // 删除age属性
xiaoming.age; // undefined
delete xiaoming['name']; // 删除name属性
xiaoming.name; // undefined
delete xiaoming.school; // 删除一个不存在的school属性也不会报错

// 检测xiaoming是否拥有某一属性，可以用in操作符：
'name' in xiaoming; // true
'grade' in xiaoming; // false
// ** 小心，如果in判断一个属性存在，这个属性不一定是xiaoming的，它可能是xiaoming继承得到的：
'toString' in xiaoming; // true, toString定义在object对象中

// 判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()方法：
var xiaoming = {
    name: '小明'
};
xiaoming.hasOwnProperty('name'); // true
xiaoming.hasOwnProperty('toString'); // false