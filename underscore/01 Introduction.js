/// underscore
// Array有map()和filter()方法，可是Object没有这些方法。此外，低版本的浏览器例如IE6～8也没有这些方法，怎么办？

// 方法一，自己把这些方法添加到Array.prototype中，然后给Object.prototype也加上mapObject()等类似的方法。
// 方法二，直接找一个成熟可靠的第三方开源库，使用统一的函数来实现map()、filter()这些操作。

// 方法二第三方库就是underscore

// 正如jQuery统一了不同浏览器之间的DOM操作的差异，让我们可以简单地对DOM进行操作，
// underscore则提供了一套完善的"函数式"编程的接口，让我们更方便地在JavaScript中实现函数式编程。

// jQuery在加载时，会把自身绑定到唯一的全局变量$上，underscore与其类似，会把自身绑定到唯一的全局变量  _  上(下划线)

_.map([1, 2, 3], (x) => x * x); // [1, 4, 9]
// 咋一看比直接用Array.map()要麻烦一点，可是underscore的map()还可以作用于Object：
_.map({ a: 1, b: 2, c: 3 }, (v, k) => k + '=' + v); // ['a=1', 'b=2', 'c=3']

















