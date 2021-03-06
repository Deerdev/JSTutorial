/// 1.操作

var arr = [1, 2, 3.14, "Hello", null, true];
arr.length; // 6

// ** 请注意，直接给Array的length赋一个新的值会导致Array大小的变化：
var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]

// 索引修改值
var arr = ["A", "B", "C"];
arr[1] = 99;
arr; // arr现在变为['A', 99, 'C']

// ** 请注意，如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化：
var arr = [1, 2, 3];
arr[5] = "x";
arr; // arr变为[1, 2, 3, undefined, undefined, 'x']w

// indexOf
var arr = [10, 20, "30", "xyz"];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(20); // 元素20的索引为1
arr.indexOf(30); // 元素30没有找到，返回-1
arr.indexOf("30"); // 元素'30'的索引为2
// 遇到重复元素时，indexOf只返回第一个元素的位置

// slice返回一个新array
// 起止参数包括开始索引，不包括结束索引。
var arr = ["A", "B", "C", "D", "E", "F", "G"];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']
// 使用slice不传参数  等于  copy数组
var arr = ["A", "B", "C", "D", "E", "F", "G"];
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false

// push和pop
var arr = [1, 2];
arr.push("A", "B"); // 返回Array新的长度: 4
arr; // [1, 2, 'A', 'B']
arr.pop(); // pop()返回'B'
arr; // [1, 2, 'A']
arr.pop();
arr.pop();
arr.pop(); // 连续pop 3次
arr; // []
arr.pop(); // 空数组继续pop不会报错，而是返回undefined
arr; // []

// unshift和shift
// 如果要往Array的头部添加若干元素，使用unshift()方法，shift()方法则把Array的第一个元素删掉：
var arr = [1, 2];
arr.unshift("A", "B"); // 返回Array新的长度: 4
arr; // ['A', 'B', 1, 2]
arr.shift(); // 'A'
arr; // ['B', 1, 2]
arr.shift();
arr.shift();
arr.shift(); // 连续shift 3次
arr; // []
arr.shift(); // 空数组继续shift不会报错，而是返回undefined
arr; // []

// sort()可以对当前Array进行排序，它会直接修改当前Array的元素位置，直接调用时，按照默认顺序排序：
var arr = ["B", "C", "A"];
arr.sort();
arr; // ['A', 'B', 'C']

// reverse()把整个Array的元素给掉个个，也就是反转：
var arr = ["one", "two", "three"];
arr.reverse();
arr; // ['three', 'two', 'one']

// splice()方法是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：
var arr = ["Microsoft", "Apple", "Yahoo", "AOL", "Excite", "Oracle"];
// - 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, "Google", "Facebook"); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// - 只删除,不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// - 只添加,不删除:
arr.splice(2, 0, "Google", "Facebook"); // 返回[],因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']

// concat()方法把当前的Array和另一个Array连接起来，并返回一个【新】的Array：
var arr = ["A", "B", "C"];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']
// ** 请注意，concat()方法并没有修改当前Array，而是返回了一个新的Array。
// ** 实际上，concat()方法可以接收任意个元素和Array，并且自动把Array拆开，然后全部添加到新的Array里：
var arr = ["A", "B", "C"];
arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]

// join()方法是一个非常实用的方法，它把当前Array的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：
var arr = ["A", "B", "C", 1, 2, 3];
arr.join("-"); // 'A-B-C-1-2-3'
// ** 如果Array的元素不是字符串，将自动转换为字符串后再连接。

/************************************************************************************************/

/// 2.多维数组
// Array包含3个元素，其中头两个元素本身也是Array。
var arr = [[1, 2, 3], [400, 500, 600], "-"];

/// 3.BuffArray
// ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。
// ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容
