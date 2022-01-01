
/// 1 只能判断空字符串，不能判断空数组（和 Python 不同）
// Longhand
if (test1 === true) or if (test1 !== "") or if (test1 !== null)
// Shorthand //it will check empty string,null and undefined too
if (test1)  // 注意：如果 test1 有值，将执行 if 之后的逻辑，这个操作符主要用于 null 或 undefinded 检查。


/// 2 多变量赋值
//Longhand 
let test1, test2, test3;
test1 = 1;
test2 = 2;
test3 = 3;
//Shorthand 
let [test1, test2, test3] = [1, 2, 3];


/// 3 null、undefined 和空值检查 (|| 或 ??)
// Longhand
if (test1 !== null || test1 !== undefined || test1 !== '') {
  let test2 = test1;
}
// Shorthand
let test2 = test1 || '';
let test3 = test1 ?? '';


/// 4 用于多个条件判断的 && 操作符
//Longhand 
if (test1) {
  callMethod(); 
} 
//Shorthand 
test1 && callMethod();



/// 5 比较后返回
// Longhand
let test;
function checkReturn() {
  if (!(test === undefined)) {
      return test;
  } else {
      return callMe('test');
  }
}
var data = checkReturn();
console.log(data); //output test
function callMe(val) {
  console.log(val);
}
// Shorthand
function checkReturn() {
  return test || callMe('test');
}


/// 6 简短的函数调用
// Longhand
function test1() {
  console.log('test1');
};
function test2() {
  console.log('test2');
};
var test3 = 1;
if (test3 == 1) {
  test1();
} else {
  test2();
}
// Shorthand
(test3 === 1? test1 : test2)();


/// 7 switch-case 简化
// Longhand
switch (data) {
  case 1:
  test1();
  break;
  case 2:
  test2();
  break;
  case 3:
  test();
  break;
  // And so on...
}
// Shorthand
var data = {
  1: test1,
  2: test2,
  3: test
};
data[something] && data[something]();


/// 8 函数默认参数值
//Longhand
function add(test1, test2) {
  if (test1 === undefined)
    test1 = 1;
  if (test2 === undefined)
    test2 = 2;
  return test1 + test2;
}
//shorthand
add = (test1 = 1, test2 = 2) => (test1 + test2);
add() //output: 3



/// 9 对象属性赋值
let test1 = 'a'; 
let test2 = 'b';
//Longhand 
let obj = {test1: test1, test2: test2}; 
//Shorthand 
let obj = {test1, test2};


/// 10 将字符串转成数字
//Longhand 
let test1 = parseInt('123'); 
let test2 = parseFloat('12.3'); 
//Shorthand 
let test1 = +'123'; 
let test2 = +'12.3';


/// 11 条件查找简化
// Longhand
if (type === 'test1') {
  test1();
}
else if (type === 'test2') {
  test2();
}
else if (type === 'test3') {
  test3();
}
else if (type === 'test4') {
  test4();
} else {
  throw new Error('Invalid value ' + type);
}
// Shorthand
var types = {
  test1: test1,
  test2: test2,
  test3: test3,
  test4: test4
};
var func = types[type];
(!func) && throw new Error('Invalid value ' + type);
func();


/// 12 重复打印字符串
//longhand 
let test = ''; 
for(let i = 0; i < 5; i ++) { 
  test += 'test '; 
} 
console.log(str); // test test test test test 
//shorthand 
'test '.repeat(5);


/// 13 指数幂简化
//longhand
Math.pow(2,3); // 8
//shorthand
2**3 // 8