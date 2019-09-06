/// 泛型定义
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
let output1 = identity("myString"); // 推断 string


// function loggingIdentity<T>(arg: Array<T>): Array<T> {}
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}




/// 泛型类型
let type: <T>(arg: T) => T = identity
// 可以使用带有调用签名的对象字面量来定义泛型函数
let myIdentity: { <T>(arg: T): T } = identity;

// 泛型接口定义
interface GenericIdentityFn {
  <T>(arg: T): T;
}
let myIdentity2: GenericIdentityFn = identity;

// 把泛型T定义在整个接口上
interface GenericIdentityFn2<T> {
  (arg: T): T;
}
let myIdentity3: GenericIdentityFn2<number> = identity;





/// 泛型类
// 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };




/// 泛型约束
interface Lengthwise {
  length: number;
}
// 约束T的类型
function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}
loggingIdentity2({ length: 10, value: 3 });


function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x2 = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x2, "a"); // okay
getProperty(x2, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.




/// 泛型使用 类类型
function create<T>(c: { new(): T; }): T {
  return new c();
}

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal0 {
  numLegs: number;
}

class Bee extends Animal0 {
  keeper: BeeKeeper;
}

class Lion extends Animal0 {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal0>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!