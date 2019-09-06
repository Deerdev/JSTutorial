/// 类型推论
// 被推断成联合类型
let x3 = [0, 1, null]; // (number | null)[]

let zoo1: Animal[] = [new Rhino(), new Elephant(), new Snake()]; // Animal[]
let zoo2 = [new Rhino(), new Elephant(), new Snake()];   // (Rhino | Elephant | Snake)[]


/// 类型兼容
// 比较两个类型是否相同
interface Named {
  name: string;
}

class Person {
  name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person(); // 可以理解成 class Person 默认实现了 interface Named 


let x4: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x4 = y; // y包含了name的定义, 可以复制给x4


// 比较两个函数
let x5 = (a: number) => 0;
let y5 = (b: number, s: string) => 0;

y5 = x5; // OK
x5 = y5; // Error
