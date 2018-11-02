/// map/filter
// 和Array的map()与filter()类似，但是underscore的map()和filter()可以作用于Object。当作用于Object时，传入的函数为function (value, key)，第一个参数接收value，第二个参数接收key：
var obj = {
    name: 'bob',
    school: 'No.1 middle school',
    address: 'xueyuan road'
};
var upper = _.map(obj, function (value, key) {
    return key + '=' + value;
});
// 返回数组： ["name=bob","school=No.1 middle school","address=xueyuan road"]

// mapObject()方法：返回object
var upperObject = _.mapObject(obj, function (value, key) {
    return key + '=' + value;
});
// {"name":"name=bob","school":"school=No.1 middle school","address":"address=xueyuan road"}



/// every / some
// 当集合的所有元素都满足条件时，_.every()函数返回true，当集合的至少一个元素满足条件时，_.some()函数返回true：
// 所有元素都大于0？
_.every([1, 4, 7, -3, -9], (x) => x > 0); // false
// 至少一个元素大于0？
_.some([1, 4, 7, -3, -9], (x) => x > 0); // true


var obj = {
    name: 'bob',
    school: 'No.1 middle school',
    address: 'xueyuan road'
};
// 判断key和value是否全部是小写：
var r1 = _.every(obj, function (value, key) {
    return value.toLowerCase() === value && key.toLowerCase() === key;  // false
});
var r2 = _.some(obj, function (value, key) {
    return value.toLowerCase() === value && key.toLowerCase() === key;  // true
});



/// max / min
// 这两个函数直接返回集合中最大和最小的数：
var arr = [3, 5, 7, 9];
_.max(arr); // 9
_.min(arr); // 3

// 空集合会返回-Infinity和Infinity，所以要先判断集合不为空：
_.max([]) // -Infinity
_.min([]) // Infinity

// 注意，如果集合是Object，max()和min()只作用于 "value" ，忽略掉key：
_.max({ a: 1, b: 2, c: 3 }); // 3




/// groupBy 分组
// groupBy()把集合的元素按照"key"归类，key由传入的函数返回：
var scores = [20, 81, 75, 40, 91, 59, 77, 66, 72, 88, 99];
var groups = _.groupBy(scores, function (x) {
    if (x < 60) {
        return 'C';
    } else if (x < 80) {
        return 'B';
    } else {
        return 'A';
    }
});
// 结果:
// {
//   A: [81, 91, 88, 99],
//   B: [75, 77, 66, 72],
//   C: [20, 40, 59]
// }
// 可见groupBy()用来分组是非常方便的。




/// shuffle / sample
// shuffle()用洗牌算法随机打乱一个集合：
// 注意每次结果都不一样：
_.shuffle([1, 2, 3, 4, 5, 6]); // [3, 5, 4, 6, 2, 1]

// sample()则是随机选择一个或多个元素：
// 注意每次结果都不一样：
// 随机选1个：
_.sample([1, 2, 3, 4, 5, 6]); // 2
// 随机选3个：
_.sample([1, 2, 3, 4, 5, 6], 3); // [6, 1, 4]



// 更多完整的函数请参考underscore的文档：http://underscorejs.org/#collections











