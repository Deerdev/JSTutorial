// symbol类型的值是通过Symbol构造函数创建的。

let sym1 = Symbol();

let sym2 = Symbol("key"); // 可选的字符串key

// Symbols是不可改变且唯一的。
let sym3 = Symbol("key");
let sym4 = Symbol("key");
sym4 === sym3; // false, symbols是唯一的


// 可以做key
let sym = Symbol();

let obj = {
  [sym]: "value"
};
console.log(obj[sym]); // "value"


// Symbols也可以与计算出的属性名声明相结合来声明对象的属性和类成员
const getClassNameSymbol = Symbol();

class CY {
  [getClassNameSymbol]() {
    return "C";
  }
}
let cy = new CY();
let className = cy[getClassNameSymbol](); // "C"
