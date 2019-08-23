/// 1.条件判断

var s = "123";
if (s.length) {
  // 条件计算结果为3
  //
}

// JavaScript把null、undefined、0、NaN和空字符串''视为false，其他值一概视为true，因此上述代码条件判断的结果是true。

// switch
/*
switch (表达式) {
  case n:
    代码块;
    break;
  case n:
    代码块;
    break;
  default:
    默认代码块;
} 
*/
switch (new Date().getDay()) {
  case 4:
  case 5:
    text = "周末快到了：）";
    break;
  case 0:
  case 6:
    text = "今天是周末~";
    break;
  default:
    text = "期待周末！";
}
/************************************************************************************************/

/// 2.循环

var arr = ["Apple", "Google", "Microsoft"];
var i, x;
for (i = 0; i < arr.length; i++) {
  x = arr[i];
  console.log(x);
}

// for(;;)
var x = 0;
for (;;) {
  // 将无限循环下去
  if (x > 100) {
    break; // 通过if判断来退出循环
  }
  x++;
}

// for...in
var o = {
  name: "Jack",
  age: 20,
  city: "Beijing"
};
for (var key in o) {
  console.log(key); // 'name', 'age', 'city'
}

// ** 请注意，for...in对Array的循环得到的（i）是String而不是Number。
var a = ["A", "B", "C"];
for (var i in a) {
  console.log(i); // '0', '1', '2'
  console.log(a[i]); // 'A', 'B', 'C'
}

// while
var x = 0;
var n = 99;
while (n > 0) {
  x = x + n;
  n = n - 2;
}
x; // 2500

// do...while
var n = 0;
do {
  n = n + 1;
} while (n < 100);
n; // 100
