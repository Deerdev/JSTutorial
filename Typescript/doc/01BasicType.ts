// TypeScript中的数据类型有：

/// Undefined:
// 任何类型未初始化，就是 Undefined
var age: number
console.log(age)  // Undefined


/// Number:    数值类型;
// 所有的数字都是Number类型，这不分是整数还是小数
var age: number = 18
var stature: number = 178.5
console.log(age)
console.log(stature)

// + NaN：它是Not a Number 的简写，意思就是不是一个数值。如果一个计算结果或者函数的返回值本应该是数值，但是由于种种原因，他不是数字。出现这种状况不会报错，而是把它的结果看成了NaN。
// + Infinity: 正无穷大。
// + -Infinity：负无穷大


/// string:    字符串类型;
var ts: string = "typescript";


/// Boolean:   布尔类型；
var b: boolean = true
var c: boolean = false


/// enum ：    枚举类型；
enum REN { nan, nv }
console.log(REN.nan)  //返回了0，这是索引index，跟数组很像。

enum REN2 {
  nan = '男',
  nv = '女'
}
console.log(REN2.nan)  //返回了男 这个字


/// any:       任意类型；兼容js
var t: any = 10
t = "jspang"
t = true
console.log(t)
// 用于数组
let list0: any[] = [1, true, "free"];
list0[1] = 100;



/// Null 和 Undefined
// + Null类型：与 Undefined 类似，都代表空。Null 代表是引用类型为空
let u: undefined = undefined;
let n: null = null;
// 默认情况下null和undefined是所有类型的子类型, 可以赋值给任意类型
// *** 当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自



/// void ：    空类型:表 示没有任何类型
// 函数返回空值
function warnUser(): void {
  alert("This is my warning message");
}
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let unusable: void = undefined;



/// Array:     数组类型;
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];


/// Tuple:     元祖类型；
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10];
// 下标访问
console.log(x[0].substring(1));



/// Never: 表示的是那些永不存在的值的类型
// never 作为返回值的函数: 1. 永远会抛出异常；2. 函数永远不会返回
// never 作为变量，只能赋值给自己；即使any也不可以赋值给never
// never类型是任何类型的子类型，也可以赋值给任何类型

// 返回never的函数必须存在无法达到的终点（抛出异常）
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

/// Object: 代表非内置原始类型；可以理解成js的对象{}
// 可以用于定义传入 {} 的接口
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error


/// 类型推断 Type assertions

// 转换成明确的类型
let someValue: any = "this is a string";
// 方法1
let strLength1: number = (<string>someValue).length;
// 方法2
let strLength2: number = (someValue as string).length;


/// dict 定义
// key 为 string,value 为 number;
const dic: { [key: string]: number; } = {
  key1: 1,
};
// 添加key,value;
dic['b'] = 2;
dic.c = 3;

// 遍历;
for (const key in dic) {
    if (dic.hasOwnProperty(key)) {
        console.log(dic[key]);
    }
}
// Map
const dic1: Map<string, number> = new Map([
  ['key1', 1]
])
  
/// type assert
interface Foo {
  bar: number;
  bas: string;
}

// var foo = <foo>bar; 效果一致
const foo1 = {} as Foo;
foo1.bar = 123;
foo1.bas = 'hello';

// 双重断言
function handler(event: Event) {
  const element = (event as any) as HTMLElement; // ok
}