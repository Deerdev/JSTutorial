class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// 继承
class GreetChildren extends Greeter {
  constructor(message: string) {
    super(message);
  }
}



/// 公共，私有与受保护的修饰符，属性访问控制
// public 可以被类外访问
// private 只能在类内访问
// protected 成员在派生类中仍然可以访问
// readonly 将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化
class Animals {
  public name: string;
  private name2: string;
  protected name3: string;
  readonly numberOfLegs: number = 8;
  public constructor(theName: string) { this.name = theName; this.name2 = theName; this.name3 = theName; }

  // 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
  // protected constructor(theName: string) { this.name = theName; }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Deer extends Animals {
  constructor(theName: string) {
    super(theName);
    // this.name2 = theName; // 无法访问
    this.name3 = theName;
  }
}

// 参数属性: 把声明和赋值合并至一处
// 参数属性通过给构造函数参数前面添加一个访问限定符来声明。 
// 使用 private限定一个参数属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样。
class Octopus {
  readonly numberOfLegs: number = 8;
  // 在构造函数里使用 readonly name: string参数来创建和初始化 name 成员。 
  constructor(readonly name: string) {
  }
}


/// getter setter
let passcode = "secret passcode";

class Employee {
  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName;
    }
    else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  alert(employee.fullName);
}



/// 静态属性, 类属性
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number; }) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) { }
}





/// 抽象类, 虚基类
// 做为其它派生类的基类使用。 它们一般不会直接被实例化
abstract class AnimalAbstract {
  abstract makeSound(): void; // 抽象方法，需要子类实现
  move(): void {
    console.log('roaming the earch...');
  }
}




/// 类定义会创建两个东西：类的实例类型和一个构造函数
class Greeter2 {
  static standardGreeting = "Hello, there";
  greeting: string = "";
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    }
    else {
      return Greeter2.standardGreeting;
    }
  }
}

let greeter1: Greeter2;
greeter1 = new Greeter2();
console.log(greeter1.greet());

// 创建类类型 typeof Class
let greeterMaker: typeof Greeter2 = Greeter2;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter2 = new greeterMaker();
console.log(greeter2.greet());

// 把类当做接口使用
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };