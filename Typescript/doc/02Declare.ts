/// var let const

/// Destructuring 解构

// 数组
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

let [first1, ...rest] = [1, 2, 3, 4];
console.log(first1); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]

let [first2] = [1, 2, 3, 4];
console.log(first2); // outputs 1

let [, second2, , fourth] = [1, 2, 3, 4];
console.log(second2); // outputs 2
console.log(fourth); // outputs 4

// tuple
let tuple: [number, string, boolean] = [7, "hello", true];
let [aa, bb, cc] = tuple; // a: number, b: string, c: boolean

let [a1, ...bc] = tuple; // bc: [string, boolean]
let [a2, b2, c2, ...d] = tuple; // d: [], the empty tuple

let [a3] = tuple; // a: number
let [, b3] = tuple; // b: string

// 对象
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};

let { a, b } = o;

({ a, b } = { a: "baz", b: 101 });  // 需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块

// ...语法创建剩余变量：
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;

// 属性重命名为 newName1 newName2
let { a: newName1, b: newName2 } = o;
// 指定类型
let { a, b }: { a: string, b: number } = o;
