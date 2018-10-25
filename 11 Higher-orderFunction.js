/// 1.高阶函数
// 使用函数作为参数
function add(x, y, f) {
    return f(x) + f(y);
}


/************************************************************************************************/


/// 2.map
'use strict';

function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var results = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]

// 变字符串
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']


/************************************************************************************************/


/// 3.reduce
// reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，
// 这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算，其效果就是：

[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)


/************************************************************************************************/


/// 4.fliter（筛选）
// filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。

// 去除偶数
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]


/************************************************************************************************/


/// 5.回调函数(三个参数)

// filter()接收的回调函数，其实可以有多个参数。通常我们仅使用第一个参数，表示Array的某个元素。
// 回调函数还可以接收另外两个参数，表示元素的位置和数组本身：

var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
    console.log(element); // 依次打印'A', 'B', 'C'
    console.log(index); // 依次打印0, 1, 2
    console.log(self); // self就是变量arr
    return true;
});


/************************************************************************************************/


/// 6.sort
// Array的默认排序：先把数字转换成字符串 再排序

// 看上去正常的结果:
['Google', 'Apple', 'Microsoft'].sort(); // ['Apple', 'Google', 'Microsoft'];
// apple排在了最后:
['Google', 'apple', 'Microsoft'].sort(); // ['Google', 'Microsoft", 'apple']
// 无法理解的结果:
[10, 20, 1, 2].sort(); // [1, 10, 2, 20]


// 高阶sort方法
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
});
console.log(arr); // [1, 2, 10, 20]
