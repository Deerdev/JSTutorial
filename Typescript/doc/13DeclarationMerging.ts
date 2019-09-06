/// 多个 Interface namespace 会被编译器合并
interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animal: Sheep): Sheep;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// interface Cloner {
//   clone(animal: Dog): Dog;
//   clone(animal: Cat): Cat;
//   clone(animal: Sheep): Sheep;
//   clone(animal: Animal): Animal;
// }



/// class 合并
// 合并结果是一个类并带有一个内部类
class Album {
  label: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel { }
}


/// 枚举合并
enum Color {
  red = 1,
  green = 2,
  blue = 4
}

namespace Color {
  export function mixColor(colorName: string) {
    if (colorName == "yellow") {
      return Color.red + Color.green;
    }
    else if (colorName == "white") {
      return Color.red + Color.green + Color.blue;
    }
    else if (colorName == "magenta") {
      return Color.red + Color.blue;
    }
    else if (colorName == "cyan") {
      return Color.green + Color.blue;
    }
  }
}




/// 模块扩展
// 不同文件中定义
// observable.js
export class Observable<T> {
  // ... implementation left as an exercise for the reader ...
}

// map.ts
import { Observable } from "./observable";
declare module "./observable" {
  // 声明 定义的扩展方法
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>;
  }
}
Observable.prototype.map = function (f) {
  // ... another exercise for the reader
}



// consumer.ts
import { Observable } from "./observable";
import "./map";
let o: Observable<number>;
o.map(x => x.toFixed());  // 可以正常使用扩展方法



/// 全局扩展
// 在模块内部添加声明到全局作用域中
// observable.ts
export class Observable<T> {
  // ... still no implementation ...
}

declare global {
  interface Array<T> {
    toObservable(): Observable<T>;
  }
}

Array.prototype.toObservable = function () {
  // ...
}