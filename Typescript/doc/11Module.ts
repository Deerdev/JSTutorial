// 导出接口
export interface StringValidator {
  isAcceptable(s: string): boolean;
}

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };



/// 默认导出
// 每个模块都可以有一个default导出。 默认导出使用 default关键字标记；并且一个模块只能够有一个default导出。 需要使用一种特殊的导入形式来导入 default导出。

export default class ZipCodeValidator2 {
  static numberRegexp = /^[0-9]+$/;
  isAcceptable(s: string) {
    return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
  }
}

// import 可以任意命名 ZipCodeValidator2 类名
// import validator from "./ZipCodeValidator";




/// export = 和 import = require()
// CommonJS和AMD的环境里都有一个exports变量，这个变量包含了一个模块的所有导出内容
// 为了支持CommonJS和AMD的exports, TypeScript提供了export =语法。

// export =语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举。
// 若使用export = 导出一个模块，则必须使用TypeScript的特定语法import module = require("module")来导入此模块。
class ZipCodeValidator3 {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
export = ZipCodeValidator3;

// import zip = require("./ZipCodeValidator");