/// 1.Map
// 最新的ES6规范引入了新的数据类型Map，让键支持其他类型

// object通过属性（也就是名字）来访问对应的成绩，而new Map（）构建了一个属于Map类的一个实例对象，
// 这个对象内部有一个map（也就是一系列的键值对），通过对象的get方法访问这个map，从而获取成绩。
// 所以说，两者在实现上完全不同，一个通过属性访问，一个通过方法访问map从而达到目的。
// 另外，map支持不是字符串的key，比如数字这些，而object的key只能是字符串。

// 初始化Map需要一个二维数组，或者直接初始化一个空Map
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95

// 操作
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined


/************************************************************************************************/


/// 2. Set, 最新的ES6规范引入
// 键不能重复

var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
var s = new Set([1, 2, 3, 3, '3']);  // Set {1, 2, 3, "3"}

s.add(4);
s; // Set {1, 2, 3, 4}
s.add(4);
s; // 仍然是 Set {1, 2, 3, 4}

var s = new Set([1, 2, 3]);
s; // Set {1, 2, 3}
s.delete(3);
s; // Set {1, 2}