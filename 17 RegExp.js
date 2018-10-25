/// 1.正则表达式

// 两种写法一致
var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');
re1; // /ABC\-001/
re2; // /ABC\-001/

// 使用test()测试
var re = /^\d{3}\-\d{3,8}$/;
re.test('010-12345'); // true
re.test('010-1234x'); // false
re.test('010 12345'); // false


/// 2.切分字符串
'a b   c'.split(' '); // ['a', 'b', '', '', 'c'], 不能很好的切分空格
'a b   c'.split(/\s+/); // ['a', 'b', 'c']
'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']


/// 3.分组
// 正则表达式还有提取子串的强大功能。用()表示的就是要提取的分组（Group）
var re = /^(\d{3})-(\d{3,8})$/;
re.exec('010-12345'); // ['010-12345', '010', '12345']
re.exec('010 12345'); // null
// ** exec()方法在匹配成功后，会返回一个Array，第一个元素是正则表达式匹配到的整个字符串，后面的字符串表示匹配成功的子串。
// ** exec()方法在匹配失败时返回null。

/// 4.贪婪匹配(默认是)

var re = /^(\d+)(0*)$/;
re.exec('102300'); // ['102300', '102300', '']
// 由于\d+采用贪婪匹配，直接把后面的0全部匹配了，结果0*只能匹配空字符串了。

// ** 必须让\d+采用非贪婪匹配（也就是尽可能少匹配），才能把后面的0匹配出来，加个?就可以让\d+采用非贪婪匹配：
var re = /^(\d+?)(0*)$/;
re.exec('102300'); // ['102300', '1023', '00']


/// 5.全局搜索

// JavaScript的正则表达式还有几个特殊的标志，最常用的是g，表示全局匹配：
var r1 = /test/g;
// 等价于:
var r2 = new RegExp('test', 'g');



// 全局匹配可以多次执行exec()方法来搜索一个匹配的字符串。当我们指定g标志后，每次运行exec()，正则表达式本身会更新lastIndex属性，表示上次匹配到的最后索引：
var s = 'JavaScript, VBScript, JScript and ECMAScript';
var re=/[a-zA-Z]+Script/g;

// 使用全局匹配:
re.exec(s); // ['JavaScript']
re.lastIndex; // 10

re.exec(s); // ['VBScript']
re.lastIndex; // 20

re.exec(s); // ['JScript']
re.lastIndex; // 29

re.exec(s); // ['ECMAScript']
re.lastIndex; // 44

re.exec(s); // null，直到结束仍没有匹配到
// 全局匹配类似搜索，因此不能使用/^...$/，那样只会最多匹配一次。

// ** 正则表达式还可以指定i标志，表示忽略大小写，m标志，表示执行多行匹配。