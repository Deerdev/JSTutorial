enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

enum DirectionNum {
  Up = 1,
  Down,
  Left,
  Right
}


enum Response01 {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: Response01): void {
  // ...
}

respond("Princess Caroline", Response01.Yes)


/// 异构（Heterogeneous enums）：混合字符串和数字成员，不建议使用
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}



/// 计算的和常量成员
/*
  + 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
  + 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
  + 带括号的常量枚举表达式
  + 一元运算符 +, -, ~其中之一应用在了常量枚举表达式
  + 常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。 若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错。
*/
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length
}




/// 联合枚举与枚举成员的类型
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle; // 没有指定 Square
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c4: Circle = {
  // kind: ShapeKind.Square, // Error! Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  kind: 0,  // ShapeKind.Circle 是 0
  radius: 100,
}


/// 运行时的枚举
enum E {
  X, Y, Z
}
function f(obj: { X: number }) {
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
f(E);

// 反向映射
// 不会为字符串枚举成员生成反向映射
enum Enum {
  A
}
let a6 = Enum.A;
let nameOfA = Enum[a6]; // "A"

// 转义成js
/*
var Enum;
(function (Enum) {
  Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A"
*/




/// const枚举
// 常量枚举通过在枚举上使用 const修饰符
const enum Enum1 {
  A = 1,
  B = A * 2
}
// 类似于 宏定义
// 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 
// 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员

const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
// 生成后的代码为：
// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];




/// 添加静态方法
enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}
namespace Weekday {
  export function isBusinessDay(day: Weekday) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default:
        return true;
    }
  }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun)); // false


// 外部枚举
// 外部枚举用来描述已经存在的枚举类型的形状。
declare enum Color {
  A = 1,
  B,
  C = 2
}