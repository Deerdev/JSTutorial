
/// 接口定义

// 它代表了有一个 label属性且类型为string的对象
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);



/// 可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}
// 好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误


/// 额外检查
function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}
// 会对接口中未定义的类型做额外的检查，报错
// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
// 规避方法1
let mySquare1 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
// 规避方法2
/*
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;  // 添加 字符串索引签名
}
*/
// 规避方法3: 将对象赋值给一个另一个变量squareOptions, 不会做额外检查
let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);



/// 只读属性
// 只能在对象刚刚创建的时候修改其值
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 }; // 初始化
// p1.x = 5; // 赋值error!

// 不可变数组：ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了
let a5: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a5;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
a5 = ro as number[]; // 可以通过 类型转换 赋值



/// readonly vs const
// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 
// - 做为 变量 使用的话用 const ，
// - 若做为 属性 则使用 readonly。




/// 函数类型 接口定义
interface SearchFunc {
  (source: string, subString: string): boolean;
}
// 创建一个函数类型的变量
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) { // 此处函数 参数名 不需要与接口里定义的名字相匹配
  let result = source.search(subString);
  return result > -1;
}
mySearch = function (sc, subStr) { // 此处函数 参数名 也可以不指定类型，ts会自己推断
  let result = sc.search(subStr);
  return result > -1;
}



/// 可索引的类型: 数组、字典类型
// 这个索引签名表示了当用 number 去索引 StringArray 时会得到 string 类型的返回值。
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// 索引签名支持：字符串和数字
// 可以同时使用两种类型的索引: 数字索引的返回值必须是字符串索引返回值类型的 子类型
// 因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

interface NotOkay {
  [x: number]: Dog;
  [x: string]: Animal;

  // error
  // [x: number]: Animal;
  // [x: string]: Dog;
}

// 字典索引
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
  name: number
}

// 只读索引
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
// myArray2[2] = "Mallory"; // error!


/// 类 类型接口
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

// 实现接口: 接口描述了类的公共部分，而不是公共和私有两部分
class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

// 类静态部分与实例部分的区别
// 类是具有两个类型的：静态部分的类型 和 实例的类型

// 当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。
// 当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

// interface ClockConstructor {
//   new(hour: number, minute: number);  // 定义了构造函数签名
// }

// class Clock implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }

// 直接操作类的静态部分
// 定义构造器签名
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface2;
}

interface ClockInterface2 {
  tick(): void;
}

// 创建对象，使用签名的构造函数，构造函数 createClock，它用传入的类型创建实例。
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface2 {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface2 {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface2 {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}

// createClock的第一个参数是ClockConstructor类型，
// 在createClock(AnalogClock, 7, 32)里，会检查AnalogClock是否符合构造函数签名
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


/// 继承接口: 一个接口可以继承多个接口
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;



/// 混合类型: 一个对象可以同时做为函数和对象使用，并带有额外的属性
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c3 = getCounter();
c3(10);
c3.reset();
c3.interval = 5.0;



/// 接口继承类
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实
// 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
  select() { }
}

// 在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 
// 实际上， SelectableControl接口和拥有select方法的Control类是一样的