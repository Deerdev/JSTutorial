/// 交叉类型（Intersection Types） T&U
// 混合两个属性
function extend<First, Second>(first: First, second: Second): First & Second {
  const result: Partial<First & Second> = {};
  for (const prop in first) {
    if ((<any>first).hasOwnProperty(prop)) {
      (result as First)[prop] = first[prop];
    }
  }
  for (const prop in second) {
    if ((<any>second).hasOwnProperty(prop)) {
      (result as Second)[prop] = second[prop];
    }
  }
  return result as First & Second;
}

class Person2 {
  constructor(public name: string) { }
}

interface Loggable {
  log(name: string): void;
}

class ConsoleLogger implements Loggable {
  log(name: string) {
    console.log(`Hello, I'm ${name}.`);
  }
}

const jim = extend(new Person2('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);



/// 联合类型
// 可传入 number或 string类型的参数
function padLeft(value: string, padding: string | number) {
  // ...
}
function padLeft2(value: string, padding: string | number): string | number {
  // ...
  return padding;
}

let indentedString = padLeft("Hello world", true); // errors during compilation




/// 类型保护与区分类型（Type Guards and Differentiating Types）
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}
class Pet implements Fish {
  swim(): void { }
  layEggs(): void { }
}

function getSmallPet(): Fish | Bird {
  return new Pet();
}

// 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：
// pet is Fish就是类型谓词。 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

let pet = getSmallPet();
pet.layEggs() // 联合类型，可以调用 Fish 和 Bird 的共有属性

// 'swim' 和 'fly' 调用都没有问题了
if (isFish(pet)) {
  pet.swim();
}
else {
  pet.fly();
}

// typeof 类型判断
// 判断方式：typeof v === "typename"和 typeof v !== "typename"， 
// "typename"必须是 "number"， "string"， "boolean"或 "symbol"。 
function padLeft3(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}


// instanceof类型保护
// 判断实例是否为某个 class
interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) { }
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ?
    new SpaceRepeatingPadder(4) :
    new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // 类型细化为'StringPadder'
}



/// null
// --strictNullChecks 标记：当你声明一个变量时，它不会自动地包含 null或 undefined。 
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以

sn = undefined; // error, 'undefined'不能赋值给'string | null'
// undefined 和 null 是不同的类型

// 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined:
function f(x: number, y?: number) {
  return x + (y || 0);
}
f(1, 2);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'

// 去除参数 null
function f(sn: string | null): string {
  return sn || "default";
}

// 使用 ! 去除 null
function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
    // return name.charAt(0) + '.  the ' + epithet;       // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}





/// 类型别名 type
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

// 结合交叉类型
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
  name: string;
}

var people: LinkedList<Person>;
// var s = people.name;
// var s = people.next.name;
// var s = people.next.next.name;
// var s = people.next.next.next.name;




/// 字符串字面量类型
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
  // 限制传入参数为 3 种
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    }
    else if (easing === "ease-out") {
    }
    else if (easing === "ease-in-out") {
    }
    else {
      // error! should not pass null or undefined.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

/// 数字字面量类型
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
  return 1;
}




/// 可辨识联合（Discriminated Unions）
interface Squarex {
  kind: "square";
  size: number;
}
interface Rectanglex {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circlex {
  kind: "circle";
  radius: number;
}
// 首先我们声明了将要联合的接口。 每个接口都有 kind属性但有不同的字符串字面量类型。 
// kind属性称做 可辨识的特征或 标签。 其它的属性则特定于各个接口
type Shapex = Squarex | Rectanglex | Circlex; // 联合

function area(s: Shapex) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
  }
}

// 检查case的完整性
interface Trianglex {
  kind: "triangle";
  radius: number;
}
type Shapex2 = Squarex | Rectanglex | Circlex | Trianglex;

function area2(s: Shapex) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
    default: assertNever(s)   // error here if there are missing cases; 走到default就抛出异常
  }
}
// assertNever检查 s是否为 never类型—即为除去所有可能情况后剩下的类型
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}




/// 索引类型 keyof
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
  name: string;
  age: number;
}
let personProps: keyof Person; // 'name' | 'age'

// 索引类型和字符串索引签名
interface MapT<T> {
  [key: string]: T;
}
let keys: keyof MapT<number>; // string
let value: MapT<number>['foo']; // number





/// 映射类型: TypeScript提供了从旧类型中创建新类型的一种方式 — 映射类型
// 在映射类型里，新类型以相同的形式去转换旧类型里每个属性, 比如全部转成 readonly 或者 optional

// Readonly 和 Partial 标准库已包含
// 全部定义成 readonly
type ReadonlyT<T> = {
  readonly [P in keyof T]: T[P];
}

// 全部定义成可选属性
type PartialT<T> = {
  [P in keyof T]?: T[P];
}
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;


type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean }; // 内部使用 for...in 处理
// - 类型变量 K，它会依次绑定到每个属性。
// - 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
// - 属性的结果类型(: boolean)。
// type Flags = {
//   option1: boolean;
//   option2: boolean;
// }

// Pick 和 Record 标准库已包含
type PickT<T, K extends keyof T> = {
  [P in K]: T[P];
}
type RecordT<K extends string, T> = {
  [P in K]: T;
}
// Readonly， Partial和 Pick是同态的，但 Record不是。 因为 Record并不需要输入类型来拷贝属性，所以它不属于同态：
// 非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符。
type ThreeStringProps = RecordT<'prop1' | 'prop2' | 'prop3', string>


type Nullable<T> = { [P in keyof T]: T[P] | null }
type PartialX<T> = { [P in keyof T]?: T[P] }
// 同态类型：映射只作用于 T 的属性而没有其它的。 编译器知道在添加任何新属性之前可以拷贝所有存在的属性修饰符。 例如，假设 Person.name是只读的，那么 Partial<Person>.name也将是只读的且为可选的。





/// 由映射类型进行推断
// 现在你了解了如何包装一个类型的属性，那么接下来就是如何拆包:

function unproxify<T>(t: Proxify<T>): T {
  let result = {} as T;
  for (const k in t) {
    result[k] = t[k].get();
  }
  return result;
}

let originalProps = unproxify(proxyProps);
// 注意这个拆包推断只适用于同态的映射类型。 如果映射类型不是同态的，那么需要给拆包函数一个明确的类型参数。

/*
预定义的有条件类型
TypeScript 2.8在lib.d.ts里增加了一些预定义的有条件类型：

Exclude < T, U > --从T中剔除可以赋值给U的类型。
Extract < T, U > --提取T中可以赋值给U的类型。
NonNullable < T > --从T中剔除null和undefined。
ReturnType < T > --获取函数返回值类型。
InstanceType < T > --获取构造函数类型的实例类型。
*/


type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
  return { a: 1, b: s };
}

class C {
  x = 0;
  y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error

type T20 = InstanceType<typeof C>;  // C
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
type T23 = InstanceType<string>;  // Error
type T24 = InstanceType<Function>;  // Error